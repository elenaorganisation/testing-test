import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import jwt_decode, { JwtPayload } from "jwt-decode"
import Router from "next/router"
import useAuthStore from "../../store/authStore"
import useStore from "../../store"
import AuthApi from "../auth"

import { queryClient } from "../../queryClient"

import { datadogLogs } from "@datadog/browser-logs"
import { datadogRum } from "@datadog/browser-rum"
import useIntegrationStore from "../../store/integrationStore"

let isRefreshing = false

const refreshToken = async () => {
  isRefreshing = true

  useAuthStore.setState({
    isAuthenticated: false,
  })
  const data = await AuthApi.authRefresh()
  if (data) {
    useAuthStore.setState({
      accessToken: data.data.accessToken,
      isAuthenticated: true,
    })
    isRefreshing = false
    queryClient.refetchQueries({
      predicate: query => !query.isDisabled,
    })
  }
}

axios.defaults.withCredentials = true

axios.interceptors.request.use(
  async config => {
    if (config) {
      config.headers["correlation-id"] = uuidv4()
    }

    const accessToken = useAuthStore.getState().accessToken
    if (accessToken) {
      const expiration = jwt_decode<JwtPayload>(accessToken).exp * 1000
      const now = Date.now()
      const minuteBeforeExpiration = expiration - 60000
      if (
        minuteBeforeExpiration < now &&
        !config.url.includes("/auth/passwordless/")
      ) {
        if (!isRefreshing) {
          await refreshToken()
          return
        } else {
          throw new axios.Cancel(`Needs to refresh token`)
        }
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (config) {
    return Promise.resolve(config)
  },
  async error => {
    if (error.config?.url.includes("/auth/passwordless/refresh/")) {
      if (error.response.status === 401) {
        if (error.response.data.code !== 4821) {
          datadogLogs.logger.error("Error log", {
            source: "http",
            type: error.response.status,
            message: `Request to ${error.config?.url}, correlationID: ${error.config?.headers["correlation-id"]}`,
            stack: getErrorStack(error),
          })
          datadogRum.addError(
            `Request to ${error.config?.url}, correlationID: ${error.config?.headers["correlation-id"]}, data: ${error.config.data}`
          )
        }
        if (!error.config.headers.pin) {
          useAuthStore.setState({
            isAuthenticated: false,
            refreshingToken: false,
            hasValidToken: false,
          })
          useIntegrationStore.setState({
            isXeroConnected: false,
            isReceiptSubmissionEnabled: false,
          })

          Router.push("/login")
          return
        } else {
          return Promise.reject(error)
        }
      }

      if (error.response.status === 400) {
        useAuthStore.setState({
          isAuthenticated: false,
          refreshingToken: false,
          hasValidToken: false,
          requiredPasscode: true,
        })
        isRefreshing = false
        return Promise.reject(error)
      }
      return
    } else {
      if (error.response?.status === 401) {
        if (!useAuthStore.getState().accessToken) {
          Router.push("/login")
          return
        }

        if (!isRefreshing) {
          await refreshToken()
          return
        }
      }

      if (error.config?.data) {
        if (
          !(
            error.config?.url.includes("/passwordless/") &&
            error.response.status === 400
          )
        ) {
          useStore.setState({
            correlationId: error.config?.headers["correlation-id"],
          })
        }

        datadogLogs.logger.error("Error log", {
          source: "http",
          type: error.response.status,
          message: `Request to ${error.config?.url}, correlationID: ${error.config?.headers["correlation-id"]}`,
          stack: getErrorStack(error),
        })
        datadogRum.addError(
          `Request to ${error.config?.url}, correlationID: ${error.config?.headers["correlation-id"]}, data: ${error.config.data}`
        )
      }
    }

    return Promise.reject(error)
  }
)

const getErrorStack = error => {
  delete error.config.headers["Authorization"]
  if (error.config?.url.includes("/passwordless/")) {
    error.config.data = "Auth data"
    return { data: "Auth data", error: error }
  }

  return { data: error.config.data, error: error }
}

export default axios

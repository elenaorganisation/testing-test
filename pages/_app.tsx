import { useEffect, useState } from "react"

// Next.js imports
import Head from "next/head"
import { useRouter } from "next/router"

// Styled components imports
import { ThemeProvider } from "styled-components"
import GlobalStyle from "../utils/styled-components/globalStyles"
import { theme } from "../utils/styled-components/theme"

// React Query imports
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "../utils/queryClient"

// React components imports

// Framer motion imports
import { AnimatePresence } from "framer-motion"

// Config import
import { dev } from "../utils/config"

// Store imports
import useAuthStore from "../utils/store/authStore"
import useStore from "../utils/store"

// Datadog RUM
import { datadogRum } from "@datadog/browser-rum"
import { datadogLogs } from "@datadog/browser-logs"

// LaunchDarkly imports
import { LDProvider } from "launchdarkly-react-client-sdk"

if (process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID) {
  datadogLogs.init({
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
    site: "datadoghq.eu",
    service: "web-portal",
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
    telemetrySampleRate: 100,
  })

  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
    site: "datadoghq.eu",
    service: "web-portal",

    // Specify a version number to identify the deployed version of your application in Datadog
    version: process.env.appVersion,
    sessionSampleRate: 100,
    telemetrySampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
  })

  datadogRum.startSessionReplayRecording()
}

// For 30s response will still be considered fresh and not stale - dismissing the need for a new request
const STALE_TIME = 30000

const App = ({ Component, pageProps }) => {
  const [error, setError] = useState(false)

  const router = useRouter()

  const unprotectedUrl =
    router.pathname === "/login" || router.pathname === "/concur-landing"

  const { setIsUnauthenticated, setHasValidToken, accessToken, account } =
    useAuthStore(state => state)
  const { pageLoaded, setPageLoaded, correlationId } = useStore(state => state)

  queryClient.setDefaultOptions({
    queries: {
      staleTime: STALE_TIME,
      retry: false,
      onError: (error: any) => {
        if (error.response?.status === 500) {
          setError(true)
        }

        if (error.response?.status === 401) {
          setIsUnauthenticated()
          setHasValidToken(false)
        }
      },
    },
  })

  useEffect(() => {
    if (accessToken && router.pathname === "/login") {
      router.push("/")
      return
    }
    setPageLoaded(true)
  }, [])

  return (
    <>
      <Head>
        <title>Archa - Web Portal</title>
        <link
          rel="icon"
          type="image/png"
          href={
            process.env.NODE_ENV === "production"
              ? `/favicon-prod.ico`
              : `/favicon.ico`
          }
        />
        <meta name="description" content="Archa Web Portal" />
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="expires" content={""} />
        <meta httpEquiv="pragma" content="no-cache" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <Component {...pageProps} />
        </ThemeProvider>
        {dev && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        )}
      </QueryClientProvider>
    </>
  )
}

export default App

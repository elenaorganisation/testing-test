import { AccountingIntegrationState } from "../enums/accountingIntegrationState"
import { IntegrationState } from "../enums/integrationState"
import Underline from "../styled-components/shared/Underline"

const getStatusText = status => {
  switch (status) {
    case AccountingIntegrationState.CONNECTED:
      return "View your bank feed settings"
    case AccountingIntegrationState.PERMISSION_REVOKED:
      return "Error - Permission revoked"
    case AccountingIntegrationState.NO_CONNECTION:
      return "Error - Unable to establish connection"
    case AccountingIntegrationState.SERVER_OFFLINE:
      return "Error - Xero is currently offline"
    case AccountingIntegrationState.NOT_INTEGRATED:
      return "Connect your bank feed"
  }
}

export const getIntegrationStatus = integration => {
  if (!integration.connected) {
    switch (integration.status.connection.tokenState) {
      case IntegrationState.NOT_SET:
        return AccountingIntegrationState.NOT_INTEGRATED
      case IntegrationState.UNSET:
        return AccountingIntegrationState.PERMISSION_REVOKED
      case IntegrationState.INVALID:
        return AccountingIntegrationState.NO_CONNECTION
      case IntegrationState.UNKNOWN:
        return AccountingIntegrationState.SERVER_OFFLINE
      default:
        return AccountingIntegrationState.CONNECTED
    }
  } else if (!integration.configured) {
    if (!integration.enabled) {
      return AccountingIntegrationState.NO_CONNECTION
    }

    if (
      integration.status.configuration.organisationState !==
      IntegrationState.VALID
    ) {
      switch (integration.status.configuration.organisationState) {
        case IntegrationState.UNSET:
          return AccountingIntegrationState.PERMISSION_REVOKED
        case IntegrationState.NOT_SET:
          return AccountingIntegrationState.NO_CONNECTION
        case IntegrationState.UNKNOWN:
          return AccountingIntegrationState.SERVER_OFFLINE
        case IntegrationState.INVALID:
          return AccountingIntegrationState.NO_CONNECTION
        default:
          return AccountingIntegrationState.CONNECTED
      }
    }

    if (
      integration.status.configuration.accountState !== IntegrationState.VALID
    ) {
      switch (integration.status.configuration.accountState) {
        case IntegrationState.UNSET:
          return AccountingIntegrationState.PERMISSION_REVOKED
        case IntegrationState.NOT_SET:
          return AccountingIntegrationState.NO_CONNECTION
        case IntegrationState.UNKNOWN:
          return AccountingIntegrationState.SERVER_OFFLINE
        case IntegrationState.INVALID:
          return AccountingIntegrationState.NO_CONNECTION
        default:
          return AccountingIntegrationState.CONNECTED
      }
    }

    if (
      integration.status.configuration.bankFeedState !== IntegrationState.VALID
    ) {
      switch (integration.status.configuration.bankFeedState) {
        case IntegrationState.UNSET:
          return AccountingIntegrationState.PERMISSION_REVOKED
        case IntegrationState.NOT_SET:
          return AccountingIntegrationState.NO_CONNECTION
        case IntegrationState.UNKNOWN:
          return AccountingIntegrationState.SERVER_OFFLINE
        case IntegrationState.INVALID:
          return AccountingIntegrationState.NO_CONNECTION
        default:
          AccountingIntegrationState.CONNECTED
      }
    }

    if (
      integration.status.configuration.receiptSubmissionState !==
      IntegrationState.VALID
    ) {
      switch (integration.status.configuration.receiptSubmissionState) {
        case IntegrationState.UNSET:
          return AccountingIntegrationState.PERMISSION_REVOKED
        case IntegrationState.NOT_SET:
          return AccountingIntegrationState.NO_CONNECTION
        case IntegrationState.UNKNOWN:
          return AccountingIntegrationState.SERVER_OFFLINE
        case IntegrationState.INVALID:
          return AccountingIntegrationState.NO_CONNECTION
        default:
          return AccountingIntegrationState.CONNECTED
      }
    }
  }

  return AccountingIntegrationState.CONNECTED
}

export const getIntegrationStatusTitle = data => {
  const status = getIntegrationStatus(data)

  switch (status) {
    case AccountingIntegrationState.CONNECTED:
      return "Connected"
    case AccountingIntegrationState.PERMISSION_REVOKED:
      return "Error - Permission revoked"
    case AccountingIntegrationState.NO_CONNECTION:
      return "Error - Unable to establish connection"
    case AccountingIntegrationState.SERVER_OFFLINE:
      return "Error - Xero is currently offline"
    case AccountingIntegrationState.NOT_INTEGRATED:
      return "Connect your bank feed"
    default:
      ""
  }
}

export const getIntegrationStatusText = data => {
  if (data) {
    const status = getIntegrationStatus(data)

    const text = getStatusText(status)
    return text
  }

  return ""
}

export const checkIsErrorStatus = data => {
  if (data) {
    const status = getIntegrationStatus(data)
    if (
      status === AccountingIntegrationState.NO_CONNECTION ||
      status === AccountingIntegrationState.SERVER_OFFLINE ||
      status === AccountingIntegrationState.PERMISSION_REVOKED
    ) {
      return true
    }
    return false
  }

  return false
}

export const getIntegrationErrorDescription = (data, action = null) => {
  if (data) {
    const status = getIntegrationStatus(data)

    switch (status) {
      case AccountingIntegrationState.PERMISSION_REVOKED:
        return (
          <>
            This is usually caused by permissions being changed in Xero. Please
            log in to Xero and check your account permissions haven’t changed.
            If the error persists, please{" "}
            <Underline onClick={action}>contact Archa support</Underline>
          </>
        )
      case AccountingIntegrationState.NO_CONNECTION:
        return (
          <>
            Please try disabling then re-enabling your Xero Integration. If the
            error persists, please{" "}
            <Underline onClick={action}>contact Archa support</Underline>
          </>
        )
      case AccountingIntegrationState.SERVER_OFFLINE:
        return "Due to an issue with Xero’s servers, we are unable to establish a connection at this time. Please try again later."
      default:
        ""
    }
  }

  return ""
}

export const getIntegrationConnectError = statusCode => {
  switch (statusCode) {
    case 400:
      return "The details you entered did not match any on record. Please try connecting your Xero account again."
    case 401:
    case 403:
      return "You do not have permission to authorise an integration with this Xero account. Please try again with another Xero account."
    case 501:
    case 503:
      return "Xero is temporarily unavailable, please try again later."
    default:
      return "Please try connecting your Xero account again. If this problem persists, please contact Archa support."
  }
}

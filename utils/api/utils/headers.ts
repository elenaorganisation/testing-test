import { v4 as uuidv4 } from "uuid"
import platform from "platform"

export const installationId = uuidv4()

const clientContextHeaders = window => {
  window.platform = platform

  return {
    client: {
      type: "webbrowser",
      versionName: process.env.NEXT_PUBLIC_ARCHA_PUBLIC_APP_NAME,
      versionNumber: process.env.NEXT_PUBLIC_ARCHA_PUBLIC_APP_VERSION,
      buildNumber: process.env.NEXT_PUBLIC_ARCHA_PUBLIC_APP_NAME,
      packageName: process.env.NEXT_PUBLIC_ARCHA_PUBLIC_APP_VERSION,
      installationId: installationId,
    },
    env: {
      platform: (window.platform && window.platform.name) || "unknown",
      model:
        (window.platform && window.platform.os && window.platform.os.family) ||
        "unknown",
      make: "unknown",
      platformVersion:
        (window.platform && window.platform.os && window.platform.os.version) ||
        "unknown",
      deviceId: "",
      deviceName: (window.platform && window.platform.name) || "unknown",
      screen_resolution:
        window.innerWidth && window.innerHeight
          ? `${window.innerWidth}x${window.innerHeight}`
          : "unknown",
      locale:
        (window.clientInformation &&
          window.clientInformation.platform &&
          window.clientInformation.platform.language) ||
        "unknown",
      time_stamp: `${new Date().getTime() / 1000}`,
    },
  }
}

export const generateStandardHeaders = (accept = null) => {
  const standardHeaders = {
    Accept: `application/vnd.archa.api+json; version=${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_VERSION}`,
    "Content-Type": "application/json",
    "x-archa-client-context": Buffer.from(
      JSON.stringify(
        clientContextHeaders(typeof window !== "undefined" && window)
      )
    ).toString("base64"),
  }

  if (accept) {
    switch (accept) {
      case "pdf":
        standardHeaders.Accept = `application/pdf; version=${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_VERSION}`
        break
      case "xeroCSV":
        standardHeaders.Accept = `text/csv; version=${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_VERSION}`
        break
      case "image":
        standardHeaders.Accept = `image/jpeg; version=${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_VERSION}`
      default:
        standardHeaders.Accept = `image/${accept}; version=${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_VERSION}`
        break
    }
  }

  return standardHeaders
}

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

// React components imports

// Framer motion imports
import { AnimatePresence } from "framer-motion"

// Config import

// Store imports

// Datadog RUM
import { datadogRum } from "@datadog/browser-rum"
import { datadogLogs } from "@datadog/browser-logs"

// LaunchDarkly imports

// For 30s response will still be considered fresh and not stale - dismissing the need for a new request
const STALE_TIME = 30000

const App = ({ Component, pageProps }) => {
  const [error, setError] = useState(false)

  const router = useRouter()

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
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App

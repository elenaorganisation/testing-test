import { DefaultTheme } from "styled-components"
import { Breakpoints } from "./breakpoints"
import { Colors } from "./colors"

export const theme = {
  colors: {
    body: Colors.white,
    text: Colors.almostBlack,
    textLight: Colors.white,
    background: Colors.white,
    modal: {
      background: Colors.white,
      backgroundOverlay: "rgba(0, 0, 0, 0.24)",
      border: Colors.purple95,
    },
    utilisedBar: {
      background: Colors.lightGrey,
      backgroundProgress: Colors.purple75,
      backgroundProgressFull: Colors.burntSiennaRedPrimary,
    },
    remainingChart: {
      background: Colors.lightGrey,
      backgroundProgress: Colors.purple75,
    },
    sidebar: {
      color: Colors.white,
      background: Colors.purplePrimary,
      hoverButtonBackground: Colors.purple20,
      activeButtonBackground: Colors.purple10,
    },
    selectorTag: {
      background: Colors.purple90,
      text: Colors.almostBlack,
    },
    teamsWidget: {
      background: Colors.white,
      backgroundHover: Colors.purple99,
      backgroundActive: Colors.purple98,
    },
    teamMemberAvatar: {
      background: Colors.purple95,
      text: Colors.purplePrimary,
    },
    switch: {
      backgroundEnabled: Colors.purplePrimary,
      backgroundDisabled: Colors.purple95,
      slider: Colors.white,
      sliderDisabled: Colors.lightGrey,
      backgroundSkeleton: Colors.lightGrey,
    },
    actionButton: {
      background: Colors.white,
      backgroundHover: Colors.purple99,
      backgroundActive: Colors.purple98,
    },
    skeletonLoader: {
      textPlaceholder: Colors.lightGrey,
    },
    detailsCell: {
      label: Colors.grey,
    },
    input: {
      background: Colors.purple98,
      backgroundHover: Colors.purple97,
      backgroundFocus: Colors.purple98,
    },
    tab: {
      active: Colors.almostBlack,
      hover: Colors.purple95,
    },
    standardButton: {
      color: Colors.white,
      background: Colors.purplePrimary,
      backgroundHover: Colors.purplePrimary70,
      backgroundActive: Colors.purplePrimary,
      backgroundDisabled: Colors.middleGrey,
    },
    secondaryButton: {
      color: Colors.almostBlack,
      background: Colors.purple98,
      backgroundHover: Colors.purple95,
      backgroundActive: Colors.purple98,
      backgroundDisabled: Colors.middleGrey,
    },
    tableCell: {
      backgroundHover: Colors.purple99,
      backgroundSelected: Colors.purple98,
      backgroundActive: Colors.purple97,
      border: Colors.purple95,
    },
    listButton: {
      backgroundHover: Colors.purple99,
      backgroundActive: Colors.purple98,
    },
    contactButton: {
      background: Colors.white,
      backgroundHover: Colors.purple99,
      backgroundActive: Colors.purple98,
    },
    cardGraphic: {
      text: Colors.white,
      background: Colors.purplePrimary,
      overlay: "rgba(0, 0, 0, 0.5)",
      backgroundSkeleton: Colors.lightGrey,
    },
    snackbar: {
      background: Colors.purple20,
      text: Colors.white,
      undo: Colors.purple75,
      close: Colors.white,
      divider: Colors.purple40,
    },
    detailBlockLabel: {
      background: "transparent",
      backgroundHover: Colors.purple99,
      backgroundActive: Colors.purple98,
      border: Colors.purple95,
    },
    imageModal: {
      button: {
        text: Colors.white,
        background: "transparent",
        backgroundHover: "rgba(255, 255, 255, 0.1)",
        backgroundActive: "rgba(255, 255, 255, 0.15)",
      },
    },
    receiptTab: {
      noReceiptBackground: Colors.notQuiteWhite,
      noReceiptText: Colors.middleGrey,
      skeletonBackground: Colors.lightGrey,
      uploadBackground: Colors.purple99,
      uploadBackgroundDragActive: Colors.purple95,
      overlayIcon: Colors.white,
      actionButton: {
        background: Colors.white,
        hover: Colors.purple99,
        backgroundActive: Colors.purple98,
      },
      menu: {
        background: Colors.purple98,
      },
    },
    csvUpload: {
      background: Colors.purple99,
    },
    errorMessage: {
      background: Colors.burntSiennaRed40,
    },
    warningBox: {
      background: Colors.burntSiennaRed40,
    },
    tipBox: {
      background: Colors.purple98,
    },
    ...Colors,
  },
  boxShadows: {
    default: "0px 2px 10px rgba(0, 0, 0, 0.05)",
    loFiDefault: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  mediaQueries: {
    sm: `max-width: ${Breakpoints.sm}px`,
    md: `max-width: ${Breakpoints.md}px`,
    lg: `max-width: ${Breakpoints.lg}px`,
    xl: `max-width: ${Breakpoints.xl}px`,
    xxl: `max-width: ${Breakpoints.xxl}px`,
  },
}

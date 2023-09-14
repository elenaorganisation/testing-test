import { create } from "zustand"

const useStore = create<any>((set, get) => ({
  portalUrl: "https://portal.archa.com.au/onboarding/verification/email",
  setPortalUrl: url => {
    set({ portalUrl: url })
  },
  sidebarExpanded: true,
  expandSidebar: () => {
    set({ sidebarExpanded: true })
  },
  shrinkSidebar: () => {
    set({ sidebarExpanded: false })
  },
  toggleSidebar: () => {
    set(state => ({ sidebarExpanded: !state.sidebarExpanded }))
  },
  isHamburgerMenuOpen: false,
  openHamburgerMenu: () => {
    set({ isHamburgerMenuOpen: true })
  },
  closeHamburgerMenu: () => {
    set({ isHamburgerMenuOpen: false })
  },
  toggleHamburgerMenu: () => {
    set(state => ({ isHamburgerMenuOpen: !state.isHamburgerMenuOpen }))
  },
  refreshingToken: false,
  clipboardValue: "",
  setClipboardValue: value => {
    set({ clipboardValue: value })
  },
  clearCache: false,
  setClearCache: value => {
    set({ clearCache: value })
  },
  pageLoaded: false,
  setPageLoaded: value => {
    set({ pageLoaded: value })
  },
  correlationId: null,
  setCorrelationId: value => {
    set({ correlationId: value })
  },
}))

export default useStore

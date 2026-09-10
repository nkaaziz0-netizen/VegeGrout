// Any component anywhere in the tree can call these to open the modals that
// live in <SiteChrome/>, without prop-drilling or a Context provider —
// this is the direct equivalent of the original vanilla-JS
// document.querySelectorAll('[data-open-modal]') pattern.

export const OPEN_QUOTE_EVENT = "vg-open-quote";
export const OPEN_AUTH_EVENT = "vg-open-auth";

export function openQuoteModal() {
  window.dispatchEvent(new Event(OPEN_QUOTE_EVENT));
}

export function openAuthModal() {
  window.dispatchEvent(new Event(OPEN_AUTH_EVENT));
}

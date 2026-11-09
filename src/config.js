// Site-wide settings. Edit values here only.

// Link for the "I support the Manifesto" button (e.g. a Google Form).
// While it is still the placeholder, the button is shown as "Link coming soon"
// and does not link anywhere. Paste the full https:// URL to activate it.
export const SUPPORT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd7PDpYrFhpiouSOBtabILGXmQduD4bR-vr7vRdH1KTmju09g/viewform';

export const isSupportFormReady = () => /^https:\/\//.test(SUPPORT_FORM_URL);

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmParams = Record<(typeof UTM_KEYS)[number], string>;

const STORAGE_KEY = "dt_fellowship_utm";

function emptyUtm(): UtmParams {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  };
}

/** Persist UTM params from the current URL so they survive navigation. */
export function captureUtmFromUrl() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const next = emptyUtm();
  let found = false;

  UTM_KEYS.forEach((key) => {
    const value = params.get(key)?.trim() || "";
    if (value) {
      next[key] = value;
      found = true;
    }
  });

  if (!found) return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage failures
  }
}

export function getUtmParams(): UtmParams {
  const fromUrl = emptyUtm();
  if (typeof window === "undefined") return fromUrl;

  const params = new URLSearchParams(window.location.search);
  let hasUrlUtm = false;
  UTM_KEYS.forEach((key) => {
    const value = params.get(key)?.trim() || "";
    if (value) {
      fromUrl[key] = value;
      hasUrlUtm = true;
    }
  });
  if (hasUrlUtm) return fromUrl;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return fromUrl;
    const parsed = JSON.parse(raw) as Partial<UtmParams>;
    return {
      utm_source: parsed.utm_source || "",
      utm_medium: parsed.utm_medium || "",
      utm_campaign: parsed.utm_campaign || "",
      utm_term: parsed.utm_term || "",
      utm_content: parsed.utm_content || "",
    };
  } catch {
    return fromUrl;
  }
}

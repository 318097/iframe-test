import { getServerURL } from "@codedrops/lib";

console.log("CONFIG:", __TYPE__, __ENV__);

const { MIXPANEL_TRACKING_ID, SENTRY_URL, MIXPANEL_TRACKING_ID_STAGING } =
  process.env;

const isProd = __ENV__ === "production";

const config = {
  SERVER_URL: getServerURL({ isProd }),
  IS_LOCAL_STORAGE: __TYPE__ === "app",
  DEFAULT_STATE: __TYPE__ === "app",
  STATE_KEY: "quick-switch",
  isExtension: __TYPE__ === "ext",
  isApp: __TYPE__ === "app",
  NODE_ENV: __ENV__,
  APP_NAME: "QUICK SWITCH".split(""),
  SENTRY_URL,
  // SENTRY_RELEASE,
  MIXPANEL_TRACKING_ID: isProd
    ? MIXPANEL_TRACKING_ID
    : MIXPANEL_TRACKING_ID_STAGING,
  RESERVED_KEYS: ["Escape", "N"],
};

export default config;

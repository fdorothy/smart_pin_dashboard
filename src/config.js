const API_KEY_KEY = "hl.api.api_key";
const BASE_URL_KEY = "hl.api.base_url";

const ConfigDefaults = {
  API_KEY: "",
  BASE_URL: ""
}

class Config {
  static fetch() {
    return {
      api_key: localStorage.getItem(API_KEY_KEY) || ConfigDefaults["API_KEY"],
      base_url: localStorage.getItem(BASE_URL_KEY) || ConfigDefaults["BASE_URL"]
    }
  }

  static setApiKey(value) {
    localStorage.setItem(API_KEY_KEY, value);
  }

  static setBaseUrl(value) {
    localStorage.setItem(BASE_URL_KEY, value);
  }

  static reset() {
    localStorage.removeItem(API_KEY_KEY);
    localStorage.removeItem(BASE_URL_KEY);
  }
}

export default Config;

const PAT_KEY = "hl.pat";
const ACCESS_TOKEN_KEY = "hl.access.token";
const ACCESS_REFRESH_TOKEN_KEY = "hl.access.refresh";
const ENTERPRISE_TOKEN_KEY = "hl.enterprise.token";

class Auth {
  static loggedIn() {
    return this.getAccessToken() !== null;
  }

  static setPat(pat) {
    localStorage.setItem(PAT_KEY, pat);
  }

  static getPat() {
    return localStorage.getItem(PAT_KEY);
  }

  static getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static getAccessRefreshToken() {
    return localStorage.getItem(ACCESS_REFRESH_TOKEN_KEY);
  }

  static setAccessRefreshToken(token) {
    localStorage.setItem(ACCESS_REFRESH_TOKEN_KEY, token);
  }

  static getEnterpriseToken() {
    return localStorage.getItem(ENTERPRISE_TOKEN_KEY);
  }

  static setEnterpriseToken(token) {
    localStorage.setItem(ENTERPRISE_TOKEN_KEY, token);
  }

  static logout() {
    localStorage.removeItem(PAT_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_REFRESH_TOKEN_KEY);
    localStorage.removeItem(ENTERPRISE_TOKEN_KEY);
  }
}

export default Auth;

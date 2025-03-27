import Config from './config';
import Auth from './auth';

export default class Api {
  static sendRequest(method, path, body = null, authToken = null, init = {}) {
    const config = Config.fetch();
    const url = `${config.base_url}/${path}`;
    return fetch(url, {
      method,
      ...(body && { body: JSON.stringify(body) }),
      ...init,
      headers: {
        "Content-Type": "application/json",
        "x-helplightning-api-key": config.api_key,
        ...(authToken && { Authorization: `${authToken}` }),
        ...init?.headers
      }
    }).then((response) => {
      if (response.status >= 400)
        throw response;
      return response.json();
    });
  }

  static sendUserRequest(method, path, body = null, init = {}) {
    const authToken = Auth.getAccessToken();
    if (!authToken) {
      throw new Error("No auth token found");
    }
    return this.sendRequest(method, path, body, authToken, init);
  }

  static sendEnterpriseRequest(method, path, body = null, init = {}) {
    const authToken = Auth.getEnterpriseToken();
    if (!authToken) {
      throw new Error("No auth token found");
    }
    return this.sendRequest(method, path, body, authToken, init);
  }

  static login() {
    return this.sendRequest("POST", "api/v1r1/auth/pat", { token: Auth.getPat() }).then(data => {
      Auth.setAccessToken(data.token);
    });
  }

  static get_enterprise_token() {
    return this.sendUserRequest("GET", "api/v1/enterprises").then(data => {
      Auth.setEnterpriseToken(data.entries[0].token)
    });
  }

  static get_areas() {
    return this.sendEnterpriseRequest("GET", "api/v1/enterprise/areas");
  }

  static create_area(params) {
    return this.sendEnterpriseRequest("POST", "api/v1/enterprise/areas", params);
  }

  static edit_area(area_id, params) {
    return this.sendEnterpriseRequest("PUT", `api/v1/enterprise/areas/${area_id}`, params);
  }

  static get_area(area_id) {
    return this.sendEnterpriseRequest("GET", `api/v1/enterprise/areas/${area_id}`);
  }

  static get_assets(area_id) {
    return this.sendEnterpriseRequest("GET", `api/v1/enterprise/areas/${area_id}/assets`);
  }

  static create_asset(area_id, params) {
    return this.sendEnterpriseRequest("POST", `api/v1/enterprise/areas/${area_id}/assets`, params);
  }
}

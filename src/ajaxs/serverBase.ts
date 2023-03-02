import type { AxiosResponse,CreateAxiosDefaults } from "axios";
import $ajax from "./index";
export default class Server {
  error?: any;

  ERROR_MSG: String;

  ERROR_CODE: Number;

  constructor() {
    // this.error = null;
    this.ERROR_CODE = 500;
    this.ERROR_MSG = "服务异常，请联系管理员";
  }

  _customError() {
    return {
      data: [],
      msg: this.error.message || this.error.response.data.message || this.ERROR_MSG,
      code: this.ERROR_CODE,
    };
  }

  _ajaxPost(url: string, param = {}, headers = {}) {
    return new Promise((resolve) => {
      $ajax
        .post(url, param, headers)
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          this.error = error;
          resolve(this._customError());
        });
    });
  }

  _ajaxGet(url:string, param = {}) {
    return new Promise((resolve) => {
      $ajax
        .get(url:string, param={})
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          this.error = error;
          resolve(this._customError());
        });
    });
  }
}

import axios from "axios";

export default class Connector {
  constructor({ signRequests = false } = {}) {
    this.signRequests = signRequests;
  }

  request(path, object, config) {
    let requestObjcet = this.customRequest(path, object, config);

    this.defaultEntry(requestObjcet.request, path, object);

    return requestObjcet;
  }

  straightRequest(path, object, config) {
    return this.defaultEntry(this.customRequest(path, object, config).request, path, object)
  }

  defaultEntry(promise, path, object) {
    return promise
      .then((result) => {
        return Promise.resolve(result);
      }, ({ error, result }) => {
        return Promise.resolve(this.ErrorHandler(path, object, error, result));
      }).catch((error) => {
        console.error(error);
      });
  }

  customRequest(path, object, config = {}) {
    ({
      method: config.method = "post"
    } = config);

    if (this.signRequests && localStorage.getItem('dynamicToken'))
      object.dynamicToken = localStorage.getItem('dynamicToken');

    let source = axios.CancelToken.source(),
      request = axios[config.method.toLowerCase()](path, object, {
        cancelToken: source.token
      })
        .then(({ data } = {}) => {
          if (data.error)
            throw data;

          return data.result;
        }, (error) => {
          if (axios.isCancel(error)) {
            throw { error: 'Request canceled' };
          } else {
            console.error(error);
          }
        });

    return {
      cancel: source.cancel,
      request
    };
  }

  ErrorHandler(path, object, error, result) {
    if (!error.code)
      return Promise.reject(error);

    switch (error.code) {
      default:
        return Promise.reject(error);
        break;
    }
  }
}
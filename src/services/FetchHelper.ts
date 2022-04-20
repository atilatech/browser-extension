/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object} The parsed JSON, status from the response
 * @see https://github.com/github/fetch/issues/203#issuecomment-266034180
 */
 function parseJSON(response: any) {
    return new Promise((resolve) => response.json()
      .then((json: any) => resolve({
        status: response.status,
        ok: response.ok,
        json,
      })));
  }
  
  /**
   * Requests a URL, returning a promise
   *
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   *
   * @return {Promise}           The request promise
   */
  export default function fetchHelper(url: string, options: RequestInit) {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(parseJSON)
        .then((response: any) => {
          if (response.ok) {
            return resolve(response.json);
          }
          // extract the error from the server's json
          return reject(response.json);
        })
        .catch((error: any) => reject({
          networkError: error.message,
        }));
    });
  }
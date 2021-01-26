interface Init {
  method?: string,
  headers?: any,
  body?: string,
  mode?: string,
  credentials?: string,
  cache?: string,
  redirect?: string,
  referrer?: string,
  referrerPolicy?: string,
  integrity?: string,
  keepalive?: string,
  signal?: string
}

const XHR_READY_STATE_DONE = 4

export function myFetch(
  url: string,
  {
    method = 'GET', // *GET, POST, PUT, DELETE, etc.
    headers = {
      // 'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body = '', // body data type must match "Content-Type" header
    mode = 'cors', // no-cors, *cors, same-origin
    credentials = 'same-origin', // include, *same-origin, omit
    cache = 'default', // *default, no-cache, reload, force-cache, only-if-cached
    redirect = 'follow', // manual, *follow, error
    referrer,
    referrerPolicy = 'no-referrer-when-downgrade',
    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin,
    // same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    integrity,
    keepalive,
    signal
  }: Init = {}
) {
  return new Promise((resolve: Function, reject: Function) => {
    try {
      const request = new XMLHttpRequest()

      request.onreadystatechange = () => {
        // only handle when state is 'DONE'
        if (request.readyState !== XHR_READY_STATE_DONE) return

        resolve(request.response)
      }

      // setup request
      request.open(method, url)

      // set headers
      for (const header in headers) {
        request.setRequestHeader(header, headers[header])
      }

      // send the request
      request.send(body)
    } catch (error) {
      reject(error)
    }
  })
}

export async function myFetchGET(url: string, query: object = {}) {
  // make query-string
  if (Object.keys(query).length) {
    url += '?' + objectToQueryString(query)
  }

  // return fetched data
  return JSON.parse(String(await myFetch(url)))
}

export async function myFetchPOST(url: string, body: object = {}) {
  // make body and header
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }

  // return fetched data
  return JSON.parse(String(await myFetch(url, options)))
}

// convert object to query-string
// only support simple object: no array or object as a property
function objectToQueryString(obj: any) {
  return Object
    .keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
}
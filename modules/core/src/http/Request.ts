import { stringify } from "querystring";

type Headers = { [index: string]: string };

const GET = "GET";
const POST = "POST";
const HEADER_CONTENT_TYPE = "Content-Type";
const HEADER_CONTENT_TYPE_JSON = "application/json";
const HEADER_CONTENT_TYPE_X_WWW_FORM_URLENCODED =
  "application/x-www-form-urlencoded";
const BASE_HEADER = {
  [HEADER_CONTENT_TYPE]: HEADER_CONTENT_TYPE_JSON,
};

export {
  HEADER_CONTENT_TYPE,
  HEADER_CONTENT_TYPE_JSON,
  HEADER_CONTENT_TYPE_X_WWW_FORM_URLENCODED,
};

export class Request {
  public static async get<T>(
    url: string,
    headers: Headers = {},
  ): Promise<T> {
    const response = await fetch(url, {
      method: GET,
      headers: Request.buildHeaders(headers),
    });

    return response.json();
  }

  public static async post<T>(
    url: string,
    body: { [key: string]: unknown },
    headers: Headers = {},
  ): Promise<T> {
    let bodyString = "";

    headers = Request.buildHeaders(headers);
    switch (headers[HEADER_CONTENT_TYPE]) {
      case HEADER_CONTENT_TYPE_JSON:
        bodyString = JSON.stringify(body);
        break;
      case HEADER_CONTENT_TYPE_X_WWW_FORM_URLENCODED:
        bodyString = stringify(body);
        break;
      default:
        return Promise.reject({
          error: "invalid-header",
          message: "Unsupported header Content-Type",
        });
    }

    const response = await fetch(url, {
      method: POST,
      body: bodyString,
      headers,
    });

    return response.json();
  }

  private static buildHeaders(headers: Headers = {}): Headers {
    return { ...BASE_HEADER, ...headers };
  }
}

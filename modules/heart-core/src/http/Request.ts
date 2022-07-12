import { stringify } from "querystring";

type Headers = { [index: string]: string };

export class Request {
  private static GET = "GET";
  private static POST = "POST";
  public static HEADER_CONTENT_TYPE = "Content-Type";
  public static HEADER_CONTENT_TYPE_JSON = "application/json";
  public static HEADER_CONTENT_TYPE_X_WWW_FORM_URLENCODED =
    "application/x-www-form-urlencoded";
  private static BASE_HEADER = {
    [Request.HEADER_CONTENT_TYPE]: Request.HEADER_CONTENT_TYPE_JSON,
  };

  public static async get<T>(
    url: string,
    headers: Headers = {},
  ): Promise<T> {
    const response = await fetch(url, {
      method: Request.GET,
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
    switch (headers[Request.HEADER_CONTENT_TYPE]) {
      case Request.HEADER_CONTENT_TYPE_JSON:
        bodyString = JSON.stringify(body);
        break;
      case Request.HEADER_CONTENT_TYPE_X_WWW_FORM_URLENCODED:
        bodyString = stringify(body);
        break;
      default:
        return Promise.reject({
          error: "invalid-header",
          message: "Unsupported header Content-Type",
        });
    }

    const response = await fetch(url, {
      method: Request.POST,
      body: bodyString,
      headers,
    });

    return response.json();
  }

  private static buildHeaders(headers: Headers = {}): Headers {
    return { ...Request.BASE_HEADER, ...headers };
  }
}

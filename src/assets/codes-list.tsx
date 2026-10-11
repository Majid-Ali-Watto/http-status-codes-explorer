
import { StatusCodeDetails } from "@/types";
const statusCodes: StatusCodeDetails[] = [
    // Informational responses (100-199)
    {
        code: 100,
        title: "Continue",
        description: "The server has received the request headers and the client should proceed to send the request body.",
        example: "Client sends initial headers, server responds with 100 Continue to proceed with the request.",
        payload: `{
  "name": "quarterly-report",
  "rows": 250000
}`,
        headers: {}
    },
    {
        code: 101,
        title: "Switching Protocols",
        description: "The requester has asked the server to switch protocols and the server has agreed to do so.",
        example: "Client requests an upgrade to WebSocket, server responds with 101 Switching Protocols.",
        headers: {
            "Upgrade": "websocket",
            "Connection": "Upgrade",
            "Sec-WebSocket-Accept": "s3pPLMBiTxaQ9kYGzzhZRbK+xOo="
        }
    },
    {
        code: 102,
        title: "Processing",
        description: "The server has received and is processing the request, but no response is available yet.",
        example: "Used in WebDAV requests indicating a long-running process.",
        payload: `<?xml version="1.0" encoding="utf-8"?>
<D:propfind xmlns:D="DAV:">
  <D:allprop/>
</D:propfind>`,
        headers: {}
    },
    {
        code: 103,
        title: "Early Hints",
        description: "The server sends preliminary response headers so the client can start preloading resources while the final response is still being prepared.",
        example: "Server sends 103 with Link headers for CSS and JS files, then the full 200 OK response once the page is ready.",
        headers: {
            "Link": "</style.css>; rel=preload; as=style, </app.js>; rel=preload; as=script"
        }
    },

    // Successful responses (200-299)
    {
        code: 200,
        title: "OK",
        description: "The request was successful.",
        example: "A GET request to /users returns a list of users with 200 OK.",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        response: `[
  {
    "id": 1,
    "name": "Ada Lovelace"
  },
  {
    "id": 2,
    "name": "Alan Turing"
  }
]`
    },
    {
        code: 201,
        title: "Created",
        description: "The request was successful and a new resource was created.",
        example: "A POST request to /users creates a new user and returns 201 Created.",
        payload: `{
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}`,
        headers: {
            "Content-Type": "application/json",
            "Location": "/users/124"
        },
        response: `{
  "id": 124,
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}`
    },
    {
        code: 202,
        title: "Accepted",
        description: "The request has been accepted for processing, but the processing is not complete.",
        example: "A PUT request returns 202 Accepted, indicating the server has accepted the request for later processing.",
        payload: `{
  "report": "monthly-sales"
}`,
        headers: {
            "Content-Type": "application/json",
            "Location": "/jobs/789"
        },
        response: `{
  "jobId": "789",
  "status": "queued"
}`
    },
    {
        code: 203,
        title: "Non-Authoritative Information",
        description: "The server successfully processed the request but returned information from another source.",
        example: "Proxy returns 203 Non-Authoritative Information when forwarding data.",
        headers: {
            "Content-Type": "application/json",
            "Via": "1.1 proxy.example.com"
        },
        response: `{
  "price": 19.99,
  "currency": "USD"
}`
    },
    {
        code: 204,
        title: "No Content",
        description: "The server successfully processed the request but is not returning any content.",
        example: "A DELETE request to /users/123 returns 204 No Content.",
        headers: {}
    },
    {
        code: 205,
        title: "Reset Content",
        description: "The server successfully processed the request, but the user agent should reset the document view.",
        example: "Server returns 205 Reset Content after completing a form submission.",
        payload: `name=Ada&message=Hello`,
        headers: {
            "Content-Length": "0"
        }
    },
    {
        code: 206,
        title: "Partial Content",
        description: "The server is delivering only part of the resource due to a range header sent by the client.",
        example: "A download request for a file range returns 206 Partial Content.",
        headers: {
            "Content-Type": "video/mp4",
            "Content-Range": "bytes 0-1023/146515",
            "Content-Length": "1024",
            "Accept-Ranges": "bytes"
        },
        response: `(first 1024 bytes of the file)`
    },
    {
        code: 207,
        title: "Multi-Status",
        description: "The message body contains information about multiple resources.",
        example: "Used in WebDAV requests to convey status for multiple operations.",
        payload: `<?xml version="1.0" encoding="utf-8"?>
<D:propfind xmlns:D="DAV:">
  <D:allprop/>
</D:propfind>`,
        headers: {
            "Content-Type": "application/xml; charset=\"utf-8\""
        },
        response: `<?xml version="1.0" encoding="utf-8"?>
<D:multistatus xmlns:D="DAV:">
  <D:response>
    <D:href>/docs/a.txt</D:href>
    <D:status>HTTP/1.1 200 OK</D:status>
  </D:response>
  <D:response>
    <D:href>/docs/b.txt</D:href>
    <D:status>HTTP/1.1 403 Forbidden</D:status>
  </D:response>
</D:multistatus>`
    },
    {
        code: 208,
        title: "Already Reported",
        description: "The members of a DAV binding have already been reported in a preceding part of the response.",
        example: "Used in WebDAV requests to avoid repeatedly listing the same internal member.",
        payload: `<?xml version="1.0" encoding="utf-8"?>
<D:propfind xmlns:D="DAV:">
  <D:allprop/>
</D:propfind>`,
        headers: {
            "Content-Type": "application/xml; charset=\"utf-8\""
        },
        response: `<?xml version="1.0" encoding="utf-8"?>
<D:multistatus xmlns:D="DAV:">
  <D:response>
    <D:href>/docs/shared/</D:href>
    <D:status>HTTP/1.1 208 Already Reported</D:status>
  </D:response>
</D:multistatus>`
    },
    {
        code: 226,
        title: "IM Used",
        description: "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
        example: "Server returns 226 IM Used when a delta encoding is applied to the resource.",
        headers: {
            "IM": "vcdiff",
            "ETag": "\"v2\"",
            "Content-Type": "text/html"
        },
        response: `(delta-encoded changes since version v1)`
    },

    // Redirection messages (300-399)
    {
        code: 300,
        title: "Multiple Choices",
        description: "Indicates multiple options for the resource that the client may follow.",
        example: "Server returns 300 Multiple Choices when there are multiple files available for download.",
        headers: {
            "Content-Type": "application/json",
            "Location": "/downloads/app.zip"
        },
        response: `{
  "choices": [
    {
      "url": "/downloads/app.zip",
      "type": "application/zip"
    },
    {
      "url": "/downloads/app.tar.gz",
      "type": "application/gzip"
    }
  ]
}`
    },
    {
        code: 301,
        title: "Moved Permanently",
        description: "This and all future requests should be directed to the given URI.",
        example: "A webpage has been permanently moved to a new URL, returning 301 Moved Permanently.",
        headers: {
            "Location": "https://example.com/new-page",
            "Cache-Control": "max-age=31536000"
        }
    },
    {
        code: 302,
        title: "Found",
        description: "The URI of the requested resource has been changed temporarily.",
        example: "Server redirects to a temporary URL with 302 Found.",
        headers: {
            "Location": "/login?next=/dashboard"
        }
    },
    {
        code: 303,
        title: "See Other",
        description: "The response to the request can be found under another URI using the GET method.",
        example: "A POST request to /submit redirects to a status page with 303 See Other.",
        payload: `{
  "form": "contact",
  "message": "Hello"
}`,
        headers: {
            "Location": "/status/42"
        }
    },
    {
        code: 304,
        title: "Not Modified",
        description: "Indicates that the resource has not been modified since the last request.",
        example: "Browser cache returns 304 Not Modified for unchanged resources.",
        headers: {
            "ETag": "\"33a64df5\"",
            "Cache-Control": "max-age=3600"
        }
    },
    {
        code: 305,
        title: "Use Proxy",
        description: "The requested resource is available only through a proxy, the address for which is provided in the response.",
        example: "Server requires requests to pass through a proxy, returning 305 Use Proxy.",
        headers: {
            "Location": "http://proxy.example.com:8080"
        }
    },
    {
        code: 306,
        title: "Switch Proxy",
        description: "No longer used. Originally meant that subsequent requests should use a specified proxy.",
        example: "Deprecated code, typically unused.",
        headers: {}
    },
    {
        code: 307,
        title: "Temporary Redirect",
        description: "The request should be repeated with another URI; however, future requests should still use the original URI.",
        example: "Server returns 307 Temporary Redirect for temporary resource movement.",
        payload: `{
  "name": "Ada"
}`,
        headers: {
            "Location": "/v2/submit"
        }
    },
    {
        code: 308,
        title: "Permanent Redirect",
        description: "The request and all future requests should be repeated using another URI.",
        example: "Server returns 308 Permanent Redirect for resource moved permanently.",
        payload: `{
  "name": "Ada"
}`,
        headers: {
            "Location": "https://api.example.com/v2/users"
        }
    },

    // Client error responses (400-499)
    {
        code: 400,
        title: "Bad Request",
        description: "The server could not understand the request due to invalid syntax.",
        example: "Client sends malformed JSON, server returns 400 Bad Request.",
        payload: `{"name": "Ada",}`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Bad Request",
  "message": "Malformed JSON: unexpected token } at position 15"
}`
    },
    {
        code: 401,
        title: "Unauthorized",
        description: "The client must authenticate itself to get the requested response.",
        example: "Client accesses a protected resource without a valid token, server returns 401 Unauthorized.",
        headers: {
            "Content-Type": "application/json",
            "WWW-Authenticate": "Bearer realm=\"api\""
        },
        response: `{
  "error": "Unauthorized",
  "message": "Missing or invalid access token"
}`
    },
    {
        code: 402,
        title: "Payment Required",
        description: "This status code is reserved for future use.",
        example: "Used for digital payment systems, returning 402 Payment Required when a payment is necessary.",
        payload: `{
  "plan": "pro"
}`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Payment Required",
  "message": "Upgrade to a paid plan to use this feature"
}`
    },
    {
        code: 403,
        title: "Forbidden",
        description: "The client does not have access rights to the content.",
        example: "Client tries to access restricted content, server returns 403 Forbidden.",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Forbidden",
  "message": "You do not have permission to access this resource"
}`
    },
    {
        code: 404,
        title: "Not Found",
        description: "The server can not find the requested resource.",
        example: "A GET request for /nonexistent returns 404 Not Found.",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Not Found",
  "message": "No resource exists at /nonexistent"
}`
    },
    {
        code: 405,
        title: "Method Not Allowed",
        description: "The request method is known by the server but is not supported by the target resource.",
        example: "A POST request to /users/123 when only GET is allowed returns 405 Method Not Allowed.",
        payload: `{
  "name": "Ada"
}`,
        headers: {
            "Content-Type": "application/json",
            "Allow": "GET, HEAD, OPTIONS"
        },
        response: `{
  "error": "Method Not Allowed",
  "message": "POST is not supported on /users/123"
}`
    },
    {
        code: 406,
        title: "Not Acceptable",
        description: "The server cannot produce a response matching the list of acceptable values defined in the request's headers.",
        example: "Client requests a format that the server cannot provide, server returns 406 Not Acceptable.",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Not Acceptable",
  "message": "Supported formats: application/json, text/csv"
}`
    },
    {
        code: 407,
        title: "Proxy Authentication Required",
        description: "The client must authenticate itself with the proxy.",
        example: "A proxy server returns 407 Proxy Authentication Required when credentials are missing.",
        headers: {
            "Proxy-Authenticate": "Basic realm=\"Corporate Proxy\""
        }
    },
    {
        code: 408,
        title: "Request Timeout",
        description: "The server would like to shut down this unused connection.",
        example: "A client takes too long to send a request, server returns 408 Request Timeout.",
        headers: {
            "Connection": "close"
        }
    },

    {
        code: 409,
        title: "Conflict",
        description: "The request could not be completed due to a conflict with the current state of the target resource.",
        example: "POST /users with a username that already exists",
        payload: `{
  "username": "ada",
  "email": "ada@example.com"
}`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Conflict",
  "message": "Username 'ada' already exists"
}`
    },
    {
        code: 410,
        title: "Gone",
        description: "The resource requested is no longer available and will not be available again.",
        example: "GET /old-page that has been permanently removed",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Gone",
  "message": "This page was permanently removed"
}`
    },
    {
        code: 411,
        title: "Length Required",
        description: "The server refuses to accept the request without a defined Content-Length header.",
        example: "POST /upload without Content-Length header",
        payload: `(file bytes sent without a Content-Length header)`,
        headers: {
            "Content-Type": "application/json",
            "Connection": "close"
        },
        response: `{
  "error": "Length Required",
  "message": "A Content-Length header is required"
}`
    },
    {
        code: 412,
        title: "Precondition Failed",
        description: "The server does not meet one of the preconditions that the requester put on the request.",
        example: "GET /resource with a precondition that fails",
        headers: {
            "Content-Type": "application/json",
            "ETag": "\"v7\""
        },
        response: `{
  "error": "Precondition Failed",
  "message": "The ETag does not match the If-Match header"
}`
    },
    {
        code: 413,
        title: "Payload Too Large",
        description: "The request is larger than the server is willing or able to process.",
        example: "POST /upload with a file that exceeds size limits",
        payload: `(file larger than 10 MB)`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Payload Too Large",
  "message": "Maximum upload size is 10 MB"
}`
    },
    {
        code: 414,
        title: "URI Too Long",
        description: "The URI provided was too long for the server to process.",
        example: "GET /search with a query string that exceeds server limits",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "URI Too Long",
  "message": "The query string exceeds 8192 characters"
}`
    },
    {
        code: 415,
        title: "Unsupported Media Type",
        description: "The media type of the requested data is not supported by the server for the HTTP method.",
        example: "POST /upload with an unsupported file type",
        payload: `(an .exe file)`,
        headers: {
            "Content-Type": "application/json",
            "Accept-Post": "image/png, image/jpeg"
        },
        response: `{
  "error": "Unsupported Media Type",
  "message": "Supported types: image/png, image/jpeg"
}`
    },
    {
        code: 416,
        title: "Range Not Satisfiable",
        description: "The server cannot supply the requested range for the resource.",
        example: "GET /video with a range request that is outside the file's size",
        headers: {
            "Content-Type": "application/json",
            "Content-Range": "bytes */146515"
        },
        response: `{
  "error": "Range Not Satisfiable",
  "message": "The file is 146515 bytes long"
}`
    },
    {
        code: 417,
        title: "Expectation Failed",
        description: "The server cannot meet the requirements of the Expect request-header field.",
        example: "GET /resource with an invalid Expect header",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Expectation Failed",
  "message": "Unsupported Expect value: 200-ok"
}`
    },
    {
        code: 418,
        title: "I'm a teapot",
        description: "This is an April Fools' joke defined by RFC 2324. It indicates that the server is a teapot and cannot brew coffee.",
        example: "GET /brew-coffee on a teapot server",
        headers: {
            "Content-Type": "text/plain"
        },
        response: `I'm a teapot. I cannot brew coffee.`
    },
    {
        code: 421,
        title: "Misdirected Request",
        description: "The request was directed at a server that is not able to produce a response.",
        example: "GET /resource on a server that is not handling that request",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Misdirected Request",
  "message": "This server cannot respond for host api.example.org"
}`
    },
    {
        code: 422,
        title: "Unprocessable Entity",
        description: "The request was well-formed, but the server was unable to process it due to semantic errors.",
        example: "POST /users with invalid or incomplete form data",
        payload: `{
  "name": "",
  "email": "not-an-email"
}`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Unprocessable Entity",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}`
    },
    {
        code: 423,
        title: "Locked",
        description: "The resource that is being accessed is locked.",
        example: "GET /document that is locked for editing",
        payload: `{
  "title": "Draft v2"
}`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Locked",
  "message": "The document is locked by another user"
}`
    },
    {
        code: 424,
        title: "Failed Dependency",
        description: "The request failed due to the failure of a previous request (e.g., in a multi-step process).",
        example: "POST /order which failed due to payment failure",
        payload: `{
  "items": [
    {
      "sku": "A-100",
      "qty": 2
    }
  ]
}`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Failed Dependency",
  "message": "Order not created because payment authorization failed"
}`
    },
    {
        code: 425,
        title: "Too Early",
        description: "The server is unwilling to risk processing a request that might be replayed.",
        example: "POST /request that could potentially be replayed",
        payload: `{
  "transfer": 100
}`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Too Early",
  "message": "Retry after the TLS handshake completes"
}`
    },
    {
        code: 426,
        title: "Upgrade Required",
        description: "The client should switch to a different protocol, such as TLS/1.0.",
        example: "GET /resource that requires upgrading to a secure connection",
        headers: {
            "Content-Type": "application/json",
            "Upgrade": "TLS/1.2, HTTP/1.1",
            "Connection": "Upgrade"
        },
        response: `{
  "error": "Upgrade Required",
  "message": "Use HTTPS to access this resource"
}`
    },
    {
        code: 428,
        title: "Precondition Required",
        description: "The server requires the request to be conditional.",
        example: "GET /resource without the proper condition headers",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Precondition Required",
  "message": "This request must include an If-Match header"
}`
    },
    {
        code: 429,
        title: "Too Many Requests",
        description: "The user has sent too many requests in a given amount of time.",
        example: "API requests rate-limited due to too many requests",
        headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": "100",
            "X-RateLimit-Remaining": "0"
        },
        response: `{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Try again in 60 seconds"
}`
    },
    {
        code: 431,
        title: "Request Header Fields Too Large",
        description: "The server is unwilling to process the request because its header fields are too large.",
        example: "GET /resource with excessively large headers",
        headers: {
            "Content-Type": "application/json",
            "Connection": "close"
        },
        response: `{
  "error": "Request Header Fields Too Large",
  "message": "The Cookie header exceeds 8 KB"
}`
    },
    {
        code: 451,
        title: "Unavailable For Legal Reasons",
        description: "The server is denying access to the resource due to legal reasons.",
        example: "GET /resource that is restricted by law",
        headers: {
            "Content-Type": "application/json",
            "Link": "<https://example.com/legal>; rel=\"blocked-by\""
        },
        response: `{
  "error": "Unavailable For Legal Reasons",
  "message": "Content blocked by court order in your region"
}`
    },
    {
        code: 500,
        title: "Internal Server Error",
        description: "The server encountered an unexpected condition that prevented it from fulfilling the request.",
        example: "GET /data where there is an issue in the server's processing",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "requestId": "req_8f3a2c"
}`
    },
    {
        code: 501,
        title: "Not Implemented",
        description: "The server does not support the functionality required to fulfill the request.",
        example: "POST /action on a server that doesn't support it",
        payload: `{
  "action": "archive"
}`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Not Implemented",
  "message": "The server does not support this action"
}`
    },
    {
        code: 502,
        title: "Bad Gateway",
        description: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server.",
        example: "A proxy server receives an invalid response from the upstream server",
        headers: {
            "Content-Type": "application/json",
            "Server": "nginx"
        },
        response: `{
  "error": "Bad Gateway",
  "message": "Received an invalid response from the upstream server"
}`
    },
    {
        code: 503,
        title: "Service Unavailable",
        description: "The server is not ready to handle the request, commonly due to being temporarily overloaded or down for maintenance.",
        example: "GET /service when the server is under maintenance",
        headers: {
            "Content-Type": "application/json",
            "Retry-After": "120"
        },
        response: `{
  "error": "Service Unavailable",
  "message": "The service is down for maintenance"
}`
    },
    {
        code: 504,
        title: "Gateway Timeout",
        description: "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.",
        example: "GET /resource where a proxy server times out",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Gateway Timeout",
  "message": "The upstream server did not respond in time"
}`
    },
    {
        code: 505,
        title: "HTTP Version Not Supported",
        description: "The server does not support the HTTP protocol version that was used in the request.",
        example: "GET /resource using an outdated HTTP version",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "HTTP Version Not Supported",
  "message": "This server supports HTTP/1.1 and HTTP/2"
}`
    },
    {
        code: 506,
        title: "Variant Also Negotiates",
        description: "The server encountered an error while negotiating content variants for the request.",
        example: "GET /resource when variant negotiation fails",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Variant Also Negotiates",
  "message": "Server misconfiguration: content negotiation is circular"
}`
    },
    {
        code: 507,
        title: "Insufficient Storage",
        description: "The server is unable to store the representation needed to complete the request.",
        example: "POST /upload when the server runs out of space",
        payload: `(large file upload)`,
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Insufficient Storage",
  "message": "Not enough storage space to complete the request"
}`
    },
    {
        code: 508,
        title: "Loop Detected",
        description: "The server detected an infinite loop while processing the request.",
        example: "GET /resource with circular redirects",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Loop Detected",
  "message": "An infinite loop was detected while processing the request"
}`
    },
    {
        code: 510,
        title: "Not Extended",
        description: "The server requires further extensions to fulfill the request.",
        example: "GET /resource with an incomplete set of request headers",
        headers: {
            "Content-Type": "application/json"
        },
        response: `{
  "error": "Not Extended",
  "message": "The request must include the extension declaration this resource requires"
}`
    },
    {
        code: 511,
        title: "Network Authentication Required",
        description: "The client needs to authenticate to gain network access.",
        example: "GET /resource when the user is not authenticated on the network",
        headers: {
            "Content-Type": "text/html"
        },
        response: `<html><body>Please sign in to the network: <a href="https://wifi.example.com/login">Sign in</a></body></html>`
    }
];
export default statusCodes
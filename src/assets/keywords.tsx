import statusCodes from "./codes-list"
const statusCodesFamous = '200 OK, 400 Bad Request, 404 Not Found, 500 Internal Server, 403 Forbidden, 204 No Content'
let keywords = statusCodesFamous + "What are HTTP status codes?,What are status codes 2xx, 3xx, 4xx, 5xx in API?,Hypertext Transfer Protocol (HTTP) Status Code,Hypertext Transfer Protocol (HTTP) Status Code List,HTTP, Status Codes, HTTP Codes, Developer Tools,HTTP status codes cheat sheet,HTTP status codes list"
keywords += statusCodes.map((code) => code.code + ' status code,' + code.code + ' ' + code.title + ',' + code.description + ' ' + code.example).join(',')
export { keywords }

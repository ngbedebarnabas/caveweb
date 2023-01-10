import type { RequestEvent } from "./$types"
import HttpProxy from "http-proxy"

export const OPTIONS = async ({ request }: RequestEvent) => enableCors(request)

export const GET = async ({ request, params }: RequestEvent) => {
  const url = new URL(request.url, `http://localhost/`)
  let target = params

  if (!target) {
    return new Response(
      "Request is formatted incorrectly. Please include __host in the query string.",
      { status: 400 }
    )
  }

  const proxy = HttpProxy.createProxyServer({
    followRedirects: true,
  })

  proxy.on("error", function (err, req, res) {
    sendError(res, err)
  })

  proxy.on("proxyRes", function (proxyRes, req, res) {
    enableCors(req)
  })

  const newHeaders = Object.fromEntries(JSON.parse(url.searchParams.get("__headers") || "{}"))
  newHeaders["user-agent"] = newHeaders["user-agent"] || request.headers["user-agent"]
  url.searchParams.delete("__headers")

  var opts = {
    changeOrigin: false,
    prependPath: false,
    target: target,
    headers: { ...newHeaders },
    secure: true,
  }
  const reader = request.body?.getReader()

  let response = new Response()
  try {
    return proxy.web(request, response, opts, (err) => {
      sendError(request, err)
    })
  } catch (err) {
    return proxy.emit("error", err, request, response)
  }

 
}

var enableCors = function (request) {
  return {
    status: 200,
    headers: new Headers({
      "Access-Control-Allow-Origin": request.get("origin") || "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-goog-visitor-id, x-origin, x-youtube-client-version, Accept-Language, Range, Referer",
      "Access-Control-Max-Age": "86400",
      "Access-Control-Allow-Credentials": "true",
    }),
  }
}

var sendError = function (res, err) {
  return {
    status: 200,
    error: err,
    message: "An error occured in the proxy",
  }
}

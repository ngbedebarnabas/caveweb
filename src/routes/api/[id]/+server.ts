import { Innertube } from "youtubei.js"
import http from "http"
import httpProxy from "http-proxy"
import type { RequestEvent } from "./$types"

export const GET = async (ev: RequestEvent) => {
  var proxy = httpProxy.createProxyServer({})
  const opts = {
    hostname: "www.google.com",
    port: 80,
    path: ev.request.url,
    method: ev.request.method,
    headers: ev.request.headers,
  }

  const res = new Response()
  proxy.web(ev.request, res, { target: "http://www.google.com" })
  return
}

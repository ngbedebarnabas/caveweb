import { Innertube } from "youtubei.js"

export const POST = async ({ request, params }) => {
  const yt = await Innertube.create()
  let credentials
  let success = false
  let updated = false
  yt.session.on("auth-pending", (data) => {
    credentials = data
    console.log(
      `Go to ${data.verification_url} in your browser and enter code ${data.user_code} to authenticate.`
    )
  })

  yt.session.on("auth", ({ credentials }) => {
    success = true
    console.log("Sign in successful:", credentials)
  })

  yt.session.on("update-credentials", ({ credentials }) => {
    updated = true
    console.log("Credentials updated:", credentials)
  })
     
//   await yt.session.signIn()
 console.log(request)
  if (success && updated && !!credentials) {
    return new Response(JSON.stringify({ success, credentials }), { status: 200 })
  }

  return new Response(null, { status: 401 })
}

// export const GET = async ({ request, params }) => {
//   console.log("credentials")

//   return new Response(JSON.stringify({ success: false }), { status: 200 })
// }

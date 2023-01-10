import { writable } from "svelte/store"
import messages from "$lib/lang/en.json"
import { browser } from "$app/environment"

export const auth = writable({ loggedIn: false, cred: {} })
export const userData = writable({ user: {}, users: [] })
export const _ = writable(messages)

let Oauth
if (browser) {
  Oauth = !!localStorage.Oauth2
    ? JSON.parse(localStorage.Oauth2)
    : {
        access_token: "",
        expires_in: 3599,
        refresh_token: "",
        scope: "",
        token_type: "",
        id_token: "",
      }
}
export const Oauth2 = writable(Oauth)
if (browser) Oauth2.subscribe((value) => (localStorage.Oauth2 = JSON.stringify(value)))

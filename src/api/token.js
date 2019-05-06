export function getToken() {
  return window.localStorage['fyJwtToken']
}

export function saveToken(token, username) {
  window.localStorage['fyJwtToken'] = token
  window.localStorage['fyUsername'] = username
}

export function destoryToken() {
  window.localStorage.removeItem('fyJwtToken')
  window.localStorage.removeItem('fyUsername')
}

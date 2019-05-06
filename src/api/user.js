import service from './index'
import { getToken, destoryToken } from './token'

export function login(username, password) {
  return service({
    url: 'api-token-auth/',
    method: 'post',
    data: {
      username,
      password
    },
    permit: true
  })
}

export function verifyToken() {
  const token = getToken()
  return service({
    url: 'api-token-verify/',
    method: 'post',
    data: {
      token
    },
    permit: true
  })
}

export function logout() {
  return destoryToken()
}

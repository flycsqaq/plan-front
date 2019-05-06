import service from './index'

export function getBook() {
  return service({
    url: 'api/book/book/',
    method: 'get'
  })
}
export function postBook(data) {
  return service({
    url: 'api/book/book/',
    method: 'post',
    data
  })
}
export function putBook(id, data) {
  return service({
    url: `api/book/book/${id}/`,
    method: 'put',
    data
  })
}
export function deleteBook(id) {
  return service({
    url: `api/book/book/${id}/`,
    method: 'delete'
  })
}

export function getArticle() {
  return service({
    url: 'api/book/article/',
    method: 'get'
  })
}
export function postArticle(data) {
  return service({
    url: 'api/book/article/',
    method: 'post',
    data
  })
}
export function putArticle(id, data) {
  return service({
    url: `api/book/article/${id}/`,
    method: 'put',
    data
  })
}
export function deleteArticle(id) {
  return service({
    url: `api/book/article/${id}/`,
    method: 'delete'
  })
}

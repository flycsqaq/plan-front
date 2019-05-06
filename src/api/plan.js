import service from './index'

export function getPlan() {
  return service({
    url: 'api/plan/',
    method: 'get'
  })
}

export function postPlan(data) {
  return service({
    url: 'api/plan/',
    method: 'post',
    data
  })
}

export function putPlan(id, data) {
  return service({
    url: `api/plan/${id}/`,
    method: 'put',
    data
  })
}

export function deletePlan(id) {
  return service({
    url: `api/plan/${id}/`,
    method: 'delete'
  })
}

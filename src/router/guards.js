import store from '@/store/index'
import { getToken } from '@/api/token'
import { verifyToken } from '@/api/user'

const first = {
  verify: true,
  plan: true,
  book: true,
  article: true
}

const promises = {
  user: () => {
    return new Promise((resolve, reject) => {
      if (first.verify) {
        if (getToken()) {
          verifyToken()
            .then(() => resolve())
            .catch(() => reject())
        } else {
          reject()
        }
      } else {
        resolve()
      }
    })
  },
  plan: () => {
    return new Promise((resolve, reject) => {
      if (first.plan) {
        store.dispatch('Plan/getPlan')
          .then(data => {
            first.plan = false
            resolve()
          })
          .catch(() => reject())
      } else {
        resolve()
      }
    })
  },
  book: () => {
    return new Promise((resolve, reject) => {
      if (first.book) {
        store.dispatch('Book/getBook')
          .then(() => {
            first.book = false
            resolve()
          })
          .catch(() => reject())
      } else {
        resolve()
      }
    })
  },
  article: () => {
    return new Promise((resolve, reject) => {
      if (first.article) {
        store.dispatch('Article/getArticle')
          .then(() => {
            first.article = false
            resolve()
          })
          .catch(() => reject())
      } else {
        resolve()
      }
    })
  }
}

const guards = {
  user: (to, from, next) => {
    promises.user()
      .then(() => next())
      .catch(() => {
        store.dispatch('User/logout')
        next()
      })
  },
  bookarticle: (to, from, next) => {
    Promise.all([promises.book(), promises.article()])
      .then(() => next())
      .catch(() => next())
  },
  plan: (to, from, next) => {
    promises.plan()
      .then(() => next())
      .catch(() => next())
  },
  verToken: (to, from, next) => {
    if (getToken()) {
      next()
    } else {
      next('/')
    }
  }
}

export default guards

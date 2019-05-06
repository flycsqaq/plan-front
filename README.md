# 计划表 and 阅读笔记
## 1. vue-router
### 1.1 自动生成导航
```
function createNav(router) {
  // judge args of router
  for (let item in router) {
    doSomething(item)
    if (router.children && router.children.length > 0) {
      dosomething(item.children)
    }
  }
  }
  return something
}
createNav($router.options.routes)
```
### 1.2 路由守卫(beforeEnter)
demo: 忽略需要传递的信息
```
const userPromise = new Promise((resolve, reject) => {
  if (getToken()) {
    verfityToken()
      .then(() => resolve())
      .catch(() => reject())
  } else {
    reject()
  }
})
const userGuard = (to, from, next) => {
  userPromise()
    .then(() => next())
    .catch(() => next('/))
}
```
Promise: js引擎(v8)调用其他模块的接口后, 接收信息后处理信息的通用容器。例如，委托网络发送http请求，网络将返回的信息交给js引擎，js引擎将信息交给Promise
## 2. vuex
### 2.1 state
定义数据对象
### 2.2 mutations
用于改变state
### 2.3 actions
调用mutations中的函数。
demo:
```
const state = {
  token: getToken()
}
const mutations = {
  LOGIN(state, token) {
    state.token = token
  }
}
const actions = {
  login( { commit }, userInfo) {
    const { username = '', password = '' } = userInfo
    return new Promise((resolve, reject) => {
      login(username, password)
        .then(res => {
          const token = res.data.token
          if (token) {
            commit('LOGIN', token)
            saveToken(token)
          }
          resolve(token)
        }).catch(error => reject(error))
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```
### 2.4 组件内调用
```
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'VuexDemo',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions({
      login: 'User/login'
    }),
    handleLogin() {
      // username, password
      this.login(username, password)
        .then()
        .catch()
    }
  }
}
```
## 3. axios
### 3.1 service
```
cosnt service = axios.create({
  baseURL: '',
  timeout: 5000
})
```
### 3.2 interceptors
1. request
```
service.interceptors.request.use(
  config => {
    if (config.method === 'get' || config.permit) {
      return config
    }
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```
2. response
```
service.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)
```
### 3.3 api
```
function login(username, password) {
  return service({
    url: 'api-token-auth/',
    method: 'post',
    data: {
      username,
      password
    },
    permit: true //无需添加token
  })
}
```
## 4. 样式与布局
### 4.1 满幅的背景，定宽的内容
```
header
  width 100%
  padding 0 calc(50% - x)
```
### 4.2 紧贴底部的页脚
```
body
  display flex
  flex-flow column
  min-height 100vh
```
### 4.3 颜色
需求：可变化颜色主题
主色: #303f9f
辅色：#f50057
运用遮罩层模拟颜色变化：background-image linear-gradient(rgba(255, 255, 255, .1))
字体颜色 alpha值 .85, .54, .27
### 4.4 button
1. 增大点击范围::after伪元素
### 4.5 dialog
```
[class$="dialog"]
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background rabg(0, 0, 0, .3)
  z-index 9999
```
### 4.6 paper
通过box-shadow在视觉上造成层级

## 5. 组件
1. 组件传递信息：props $emit
2. v-model绑定 
```
<input v-model="v">
props: {
  value // 接受value
},
data() {
  return {
    v: ''
  }
},
watch: {
  v() {
    this.$emit('input')
  }
},
created() {
  this.v = value
}
```
3. 事件传递
```
<button @click="handleClick()">
methods: {
  handleClick() {
    this.$emit('click')
  }
}
```
4. slot插槽
```
<div v-for="(v, k) in arr" :key="k">
  <slot :defaultData="v">
</div>
<component v-slot:default="defaultData" :arr="arr">
  {{ defaultData.defaultData }}
</component>
```
### 5.1 button
```
<button @click="handleClick()">
  <slot />
</button>
handleClick() {
  this.$emit('click')
}
```
### 5.2 connect
用于展示axios返回信息
demo:
```
<fy-connect-info ref="connect" type="post" />
handlePost() {
  const postArticle2 = this.postArticle.bind(null, { args }) // 通过bind绑定参数(也可以使用高阶函数)
  // const postArticle3 = ({ args }) => {
  //  return () => {
  //    return this.postArticle({ args })
  //  }
  // }
  this.$ref.connect.handleChange(postArticle2)
}
```
### 5.3 alert
```
<fy-rect-btn @click="dialog=true">打开</fy-rect-btn>
<fy-alert v-if="dialog" v-model="dialog" header="确定删除吗" @handleNext="handleConsole()" />
data: {
  return {
    dialog false
  }
}
methods: {
  handleConsole() {
    //doSomething
    this.dialog = false
  }
}
```
### 5.4 select
```
<fy-select 
  v-model="currentOption" 
  v-slot:default="defaultData" 
  :options="option" 
  label="每页项目数"
>
  {{ defaultData.defaultData }}
</fy-select>
data() {
  return {
    currentOption: 5,
    option: [5, 10, 25, 50]
  }
}
```
### 5.5 pagination
```
<fy-pagination v-slot:default="defaultData" :value="articleSort" :orders="['name']">
  {{ defaultData.defaultData.name) }}
</fy-pagination>
```
### 5.6 others
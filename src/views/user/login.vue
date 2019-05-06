<template>
  <div class="login">
    <fy-rect-btn :main="false" class="login-btn" @click="isShow=true">
      登录
    </fy-rect-btn>
    <fy-dialog v-if="isShow" width="300px" height="400px" @close="isShow=false">
      <form class="login-form flex-container" @submit.prevent>
        <fy-input v-model="username" label="username" />
        <fy-input v-model="password" type="password" label="password" />
        <fy-connect-info ref="connect" type="login" />
        <fy-circle-btn level="l2" @click="handleLogin()">登录</fy-circle-btn>
      </form>
    </fy-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      isShow: false,
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      login: 'User/login'
    }),
    handleLogin() {
      if (this.username && this.password) {
        const login = this.login.bind(null, { username: this.username, password: this.password })
        this.$refs.connect.handleShowInfo(login)
      }
    }
  }
}
</script>

<style lang="stylus">
  .login-form
    justify-content center
    align-items center
    margin auto
    margin-top 20px
    width 50%
    [fy-form]
      display block
</style>

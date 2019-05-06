<template>
  <div class="side">
    <div class="nav">
      <span />
      <span />
      <span />
    </div>
    <div class="side-content">
      <Login v-if="!token" />
      <logout v-else />
    </div>
  </div>
</template>
<script>
import Login from '../user/login.vue'
import Logout from '../user/logout.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  components: {
    Login,
    Logout
  },
  data() {
    return {
      isLogin: false
    }
  },
  computed: {
    ...mapGetters(['token'])
  }
}
</script>

<style lang="stylus">

</style>

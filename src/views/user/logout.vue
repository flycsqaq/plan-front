<template>
  <div class="logout">
    <div :class="['user-header', 'c20']" :style="{ backgroundColor: bgColor }">
      <div>{{ username }}</div>
    </div>
    <div class="user-content">
      <div
        :class="{ c30: !isHover }"
        :style="{ backgroundColor: bgColor }"
        @click="handleLogout()"
        @mouseenter="isHover=true"
        @mouseleave="isHover=false"
      >
        登出
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Logout',
  data() {
    return {
      isShow: false,
      isHover: false
    }
  },
  computed: {
    ...mapGetters(['color', 'username']),
    bgColor() {
      return this.color[1]
    }
  },
  methods: {
    ...mapActions({
      handleLogout: 'User/logout'
    })
  }
}
</script>

<style lang="stylus">
  .logout
    width 100px
    cursor pointer
    display inline-block
    text-align center
    .user-header
      div
        padding 10px
    .user-content
      width 100%
      height 0
      overflow hidden
      transition all 1s linear
      div
        padding 10px
        transition background 1s linear
        &:hover
          transition background 1s linear
    &:hover
      .user-content
        height 2.5rem
        transition all 1s linear
</style>

<template>
  <div class="simple-dialog">
    <div level="l3" paper class="dialog-conent" :style="{ padding: padding, width: width, height: height }">
      <svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" @click="handleClose()">
        <path d="M0 0 L 20 20 M0 20 L 20 0" stroke="rgba(0,0,0,0.32)" stroke-width="3" />
      </svg>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  props: {
    padding: {
      type: String,
      default: '10px'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus">
  .simple-dialog
    display flex
    justify-content center
    align-items center
  .dialog-conent
    position relative
    svg
      position absolute
      width 20px
      height @width
      position absolute
      border 1px solid rgba(0, 0, 0, .32)
      top 0
      right 0
</style>

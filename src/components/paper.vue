<template>
  <div
    class="paper"
    paper
    @click="handleClick()"
    @mouseenter="changeHidden(false, isHover)"
    @mouseleave="changeHidden(true, isHover)"
  >
    <div class="show">
      <slot name="show" />
    </div>
    <div v-if="!hidden" class="hidden">
      <slot name="hidden" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Paper',
  props: {
    isHover: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hidden: true
    }
  },
  methods: {
    changeHidden(hidden, hover = false) {
      if (hover) {
        this.hidden = hidden
      }
    },
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus">
  .paper[paper]
    margin 5px
    display flex
    height inherit
    .show, .hidden
      padding 10px
    .hidden
      position relative
    .hidden::after
      content: ''
      border-right 2px solid rgba(0, 0, 0, .5)
      position absolute
      top 0
      left 0
      height 100%
</style>

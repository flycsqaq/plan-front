<template>
  <span :style="{ backgroundColor: bgColor }" class="switch c20" @click="change()">
    <span :class="[ value? 'b-true': 'b-false' ]" circle />
  </span>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Switchd',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters(['color']),
    bgColor() {
      const { color } = this
      return this.value ? color[0] : color[1]
    }
  },
  methods: {
    change() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="stylus">
  .switch
    margin 5px
    width 50px
    height 20px
    border-radius 10px
    cursor pointer
    display inline-block !important
    transition .3s linear
    transition .3s linear
    span
      position relative
      &.b-true
        left 30px
        transition .3s linear
      &.b-false
        left 0px
        transition .3s linear
</style>

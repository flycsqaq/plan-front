<template>
  <button
    rect-btn
    :style="{ backgroundColor: bgColor }"
    :class="[hover ? '' : 'c20']"
    @click="handleClick()"
    @mouseenter="hover=true"
    @mouseleave="hover=false"
  >
    <slot />
  </button>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RectButton',
  props: {
    main: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    ...mapGetters(['color']),
    bgColor() {
      return this.main ? this.color[0] : this.color[1]
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus">
</style>

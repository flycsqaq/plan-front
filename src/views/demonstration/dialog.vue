<template>
  <div>
    <fy-rect-btn @click="handleChange(true)">打开</fy-rect-btn>
    <fy-dialog v-if="isShow" @close="handleChange(false)">
      <template v-slot>
        123
      </template>
    </fy-dialog>
  </div>
</template>
<script>
export default {
  name: 'DialogDemo',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    handleChange(boo) {
      this.isShow = boo
    }
  }
}
</script>

<style lang="stylus">

</style>

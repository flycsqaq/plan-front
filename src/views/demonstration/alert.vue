<template>
  <div>
    <fy-rect-btn @click="dialog=true">打开</fy-rect-btn>
    <fy-alert v-if="dialog" v-model="dialog" header="确定删除吗" @handleNext="handleConsole()" />
  </div>
</template>
<script>
export default {
  name: 'AlertDemo',
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    handleConsole() {
      this.dialog = false
    }
  }
}
</script>

<style lang="stylus">

</style>

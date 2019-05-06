<template>
  <div>
    <fy-connect-info :value="value" :info="info" />
    <div class="group-btn">
      <fy-rect-btn @click="handleShowInfo('connect')">connect</fy-rect-btn>
      <fy-rect-btn @click="handleShowInfo('error')">error</fy-rect-btn>
      <fy-rect-btn @click="handleShowInfo('success')">success</fy-rect-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConnectDemo',
  data() {
    return {
      value: {
        connect: '连接中',
        error: '出错',
        success: '成功'
      },
      info: ''
    }
  },
  methods: {
    handleShowInfo(info) {
      this.info = info
    }
  }
}
</script>

<style lang="stylus">

</style>

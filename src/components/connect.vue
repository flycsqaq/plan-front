<template>
  <div :style="{ color: textColor }">
    {{ dataShow }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Connect',
  props: {
    type: {
      type: String,
      default: 'post'
    }
  },
  data() {
    return {
      infoContainer: {
        login: {
          connect: '登录中',
          connectError: '登录失败,网络出错或者服务器出错',
          error: '登录失败,请检查账号密码是否正确',
          success: '登录成功'
        },
        post: {
          connect: '上传中',
          connectError: '上传失败,网络出错或者服务器出错',
          error: '上传失败,请检表单内容是否完整',
          success: '上传成功'
        },
        put: {
          connect: '修改中',
          connectError: '网络出错或者服务器出错',
          error: '修改失败,请检表单内容是否完整',
          success: '修改成功'
        },
        delete: {
          connect: '删除中',
          connectError: '删除失败,网络出错或者服务器出错',
          error: '删除失败,请检表单内容是否完整',
          success: '删除成功'
        }
      },
      info: ''
    }
  },
  computed: {
    ...mapGetters(['color']),
    dataShow() {
      return this.infoContainer[this.type][this.info]
    },
    textColor() {
      const { info, color } = this
      if (['error', 'connectError'].indexOf(info) > -1) {
        return color[1]
      } else if (info === 'success') {
        return color[0]
      }
      return ''
    }
  },
  methods: {
    handleShowInfo(fn) {
      this.info = 'connect'
      fn().then(() => {
        this.info = 'success'
      }).catch(error => {
        console.log(error)
        if (error.error === 'Network Error') {
          this.info = 'connectError'
        } else {
          this.info = 'error'
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  .info
    width 100%
</style>

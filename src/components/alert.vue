<template>
  <div class="sinmple-dialog">
    <div class="content">
      <fy-paper v-slot:show :is-hover="false">
        <h2>{{ header }}</h2>
        <p>
          <slot />
        </p>
      </fy-paper>
      <div class="group-btn">
        <fy-rect-btn class="no" :main="false" @click="handleCancel()">取消</fy-rect-btn>
        <fy-rect-btn class="ok" @click="handleConfirm()">确定</fy-rect-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Alert',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    header: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('handleNext')
    },
    handleCancel() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="stylus">
  .sinmple-dialog
    display flex
    justify-content center
    align-items center
    .content
      display block
      .group-btn
        margin-top 20px
        .ok
          position relative
          left 45px
        .no
          position relative
          left -45px

</style>

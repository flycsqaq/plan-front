<template>
  <fy-dialog width="400px" height="500px" padding="10px" @close="changeState()">
    <template v-slot>
      <form class="add-plan" @submit.prevent>
        <fy-input v-model="title" label="title" />
        <fy-textarea v-model="description" label="description" />
        <fy-input v-model="date" type="date" label="date" />
        <fy-input v-model="start" type="time" label="start" />
        <fy-input v-model="end" type="time" label="end" />
        <div fy-form>
          <div>isCompleted</div>
          <fy-switch v-model="isCompleted" />
        </div>
        <fy-connect-info ref="connect" type="post" />
        <fy-circle-btn circle-btn @click="handlePost()">上传</fy-circle-btn>
      </form>
    </template>
  </fy-dialog>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddPlan',
  data() {
    return {
      title: '',
      description: '',
      date: '',
      start: '',
      end: '',
      isCompleted: false
    }
  },
  methods: {
    ...mapActions({
      postPlan: 'Plan/postPlan'
    }),
    handlePost() {
      const { title, description, date, start, isCompleted = false, end } = this
      if (title && description && date && start && end) {
        const $time = `${date}T${start}`
        const $end = `${date}T${end}`
        const postPlan = this.postPlan.bind(null, { title, description, time: $time, end: $end, isCompleted })
        this.$refs.connect.handleShowInfo(postPlan)
      }
    },
    changeState() {
      this.$emit('changeState', 'show')
    }
  }
}
</script>

<style lang="stylus">
  .add-plan
    justify-content center
    width 50%
    margin auto
    [fy-form]
      display block
</style>

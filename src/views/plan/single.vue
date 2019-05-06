<template>
  <fy-paper ref="paper" class="single-plan" level="l1" :is-hover="false">
    <template v-slot:show>
      <fy-verify class="btn-group">
        <fy-rect-btn :main="true" @click="handleChangeState(false)">修改</fy-rect-btn>
        <fy-rect-btn class="delete" :main="false" @click="dialog=true">删除</fy-rect-btn>
      </fy-verify>
      <h2>{{ data.title }}</h2>
      <fy-switch :value="data.isCompleted" />
      <p>{{ data.start }}-{{ data.end }}</p>
      <P>{{ data.description }}</p>
    </template>
    <template v-slot:hidden>
      <form @submit.prevent>
        <div class="btn-group">
          <fy-rect-btn :main="true" @click="handlePut()">修改</fy-rect-btn>
          <fy-rect-btn :main="false" @click="handleChangeState(true)">取消</fy-rect-btn>
        </div>
        <fy-connect-info ref="putConnect" type="put" />
        <fy-input v-model="title" label="title" />
        <fy-textarea v-model="description" label="description" />
        <fy-input v-model="date" type="date" label="date" />
        <fy-input v-model="start" type="time" label="start" />
        <fy-input v-model="end" type="time" label="end" />
        <div fy-form>
          <div>isCompleted</div>
          <fy-switch v-model="isCompleted" />
        </div>
      </form>
    </template>
    <fy-alert v-if="dialog" v-model="dialog" v-slot header="确定删除吗" @handleNext="handleDelete()">
      <fy-connect-info ref="deleteConnect" type="delete" />
    </fy-alert>
  </fy-paper>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'SinglePlan',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id: -1,
      title: '',
      description: '',
      date: '',
      start: '',
      end: '',
      isCompleted: false,
      dialog: false
    }
  },
  created() {
    this.id = this.data.id
    this.title = this.data.title
    this.description = this.data.description
    this.date = this.data.date
    this.start = this.data.start
    this.end = this.data.end
    this.isCompleted = this.data.isCompleted
  },
  methods: {
    ...mapActions({
      putPlan: 'Plan/putPlan',
      deletePlan: 'Plan/deletePlan'
    }),
    handlePut() {
      const { id, title, description, date, start, isCompleted = false, end } = this
      if (id && title && description && date && start && end) {
        const $time = `${date}T${start}`
        const $end = `${date}T${end}`
        const putPlan = this.putPlan.bind(null, { id, title, description, time: $time, end: $end, isCompleted })
        this.$refs.putConnect.handleShowInfo(putPlan)
      }
    },
    handleDelete() {
      const deletePlan = this.deletePlan.bind(null, this.id)
      this.$refs.deleteConnect.handleShowInfo(deletePlan)
    },
    handleChangeState(boolean) {
      this.$refs.paper.changeHidden(boolean, true)
    }
  }
}
</script>

<style lang="stylus">
  .single-plan
    min-width 200px
</style>

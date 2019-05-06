<template>
  <div class="plan">
    <fy-verify>
      <fy-rect-btn @click="changeState('add')">
        添加
      </fy-rect-btn>
    </fy-verify>
    <ShowPlan />
    <AddPlan v-if="state==='add'" @changeState="changeState($event)" />
  </div>
</template>
<script>
import AddPlan from './add.vue'
import ShowPlan from './show.vue'

export default {
  name: 'Plan',
  components: {
    ShowPlan,
    AddPlan
  },
  data() {
    return {
      state: 'show'
    }
  },
  methods: {
    changeState(str) {
      this.state = str
    }
  }
}
</script>

<style lang="stylus">

</style>

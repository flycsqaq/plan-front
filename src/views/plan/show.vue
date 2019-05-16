<template>
  <fy-pagination
    v-slot:default="defaultData"
    order-init="date"
    :sequence-init="false"
    :value="plansSort"
    :orders="['date']"
  >
    <section>
      <h1>{{ defaultData.defaultData.date }}</h1>
      <div
        class="flex-container"
      >
        <SingleShow
          v-for="i in defaultData.defaultData.plans"
          :key="i.id"
          :data="i"
        />
      </div>
    </section>
  </fy-pagination>
</template>
<script>
import { mapGetters } from 'vuex'
import SingleShow from './single.vue'

export default {
  name: 'ShowPlan',
  components: {
    SingleShow
  },
  computed: {
    ...mapGetters(['plan']),
    plans() {
      if (this.plan.length === 0) {
        return []
      }
      return this.plan.map(p => {
        const { id, title, time, isCompleted, description, end } = p
        const pp = time.split('T')
        const date = pp[0]
        const $start = pp[1].substring(0, 5)
        const $end = end.split('T')[1].substring(0, 5)
        return {
          id,
          title,
          start: $start,
          end: $end,
          date,
          isCompleted,
          description
        }
      })
    },
    plansSort() {
      if (this.plans.length === 0) {
        return []
      }
      const plan = {}
      this.plans.forEach(x => {
        if (plan[x.date] === undefined) {
          plan[x.date] = []
        }
        plan[x.date].push(x)
      })
      const aa = []
      for (var i in plan) {
        aa.push({
          date: i,
          plans: plan[i].sort((l, r) => {
            if (l.start < r.start) {
              return -1
            }
            return 1
          })
        })
      }
      return aa
    }
  }
}
</script>

<style lang="stylus" scoped>
  .flex-container
    min-height 300px
</style>

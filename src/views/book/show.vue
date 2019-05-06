<template>
  <fy-pagination
    v-slot:default="defaultData"
    :flex-style="{ 'min-width': '300px', 'min-height': '200px' }"
    :value="book"
    :container="true"
  >
    <SingleBook :key="defaultData.defaultData.id" :value="defaultData.defaultData" />
  </fy-pagination>
</template>
<script>
import { mapGetters } from 'vuex'
import SingleBook from './single.vue'

export default {
  name: 'ShowBook',
  components: {
    SingleBook
  },
  computed: {
    ...mapGetters(['book'])
  }
}
</script>

<style lang="stylus">

</style>

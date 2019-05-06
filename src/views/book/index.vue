<template>
  <div class="book">
    <fy-verify>
      <fy-rect-btn @click="state='add'">添加</fy-rect-btn>
    </fy-verify>
    <AddBook v-if="state==='add'" @changeState="handleChangeState('show')" />
    <ShowBook />
  </div>
</template>
<script>
import AddBook from './add.vue'
import ShowBook from './show.vue'

export default {
  name: 'Book',
  components: {
    AddBook,
    ShowBook
  },
  data() {
    return {
      state: 'show'
    }
  },
  methods: {
    handleChangeState(str) {
      this.state = str
    }
  }
}
</script>

<style lang="stylus">

</style>

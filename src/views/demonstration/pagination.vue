<template>
  <div>
    <fy-pagination v-slot:default="defaultData" :value="arr" :orders="orders">
      {{ defaultData }}
    </fy-pagination>
  </div>
</template>
<script>
export default {
  name: 'PaginationDemo',
  data() {
    return {
      obj: {},
      arr: [],
      orders: ['name', 'body']
    }
  },
  created() {
    this.handleInitObj(100)
    this.handleInitArr(100)
  },
  methods: {
    handleInitObj(num) {
      for (var i = 0; i < num; i++) {
        this.obj[`test${i}`] = {
          name: `test${i}`,
          body: `你好，世界，你在哪儿啊${i}`
        }
      }
    },
    handleInitArr(num) {
      const arr = []
      for (var i = 0; i < num; i++) {
        arr.push({
          name: `test${i}`,
          body: `你好，世界，你在哪儿啊${i}`
        })
      }
      this.arr = arr
    }
  }
}
</script>

<style lang="stylus">

</style>

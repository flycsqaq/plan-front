<template>
  <div class="lazy-laod">
    <img v-for="(im, index) in imgs" :key="index" :lazy-load="im()">
  </div>
</template>
<script>
import Lazy from './lazyLoad.js'

let lazy = null
export default {
  name: 'LazySample',
  data() {
    return {
      imgs: [
        () => require('@/assets/img/Sylvanas1.jpg'),
        () => require('@/assets/img/Sylvanas2.jpg'),
        () => require('@/assets/img/Sylvanas3.jpg'),
        () => require('@/assets/img/Sylvanas4.jpg'),
        () => require('@/assets/img/Sylvanas5.jpg'),
        () => require('@/assets/img/Sylvanas6.jpg'),
        () => require('@/assets/img/Sylvanas7.jpg'),
        () => require('@/assets/img/Sylvanas8.jpg'),
        () => require('@/assets/img/Sylvanas9.jpg'),
        () => require('@/assets/img/Sylvanas10.jpg')
      ]
    }
  },
  mounted() {
    lazy = new Lazy({})
    lazy.addListener({})
      .addListener({ event: 'click' })
      .addJudgeEvent({ num: 1000 })
      .addJudgeEvent({ name: 'scrollY', fn: () => window.scrollY, num: 500 })
      .start()
  },
  destroyed() {
    lazy.destory()
  }
}
</script>

<style lang="stylus">
  .lazy-laod
    img
      width 400px
      height 300px
      display block
</style>

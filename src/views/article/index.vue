<template>
  <div class="article">
    <fy-rect-btn @click="router.push({ name: '文章添加' })">添加</fy-rect-btn>
    <ArticleShow v-if="state === 'show'" />
    <ArticleAdd />
  </div>
</template>
<script>
import ArticleAdd from './add.vue'
import ArticleShow from './show.vue'

export default {
  name: 'Article',
  components: {
    ArticleAdd,
    ArticleShow
  },
  data() {
    return {
      state: 'show'
    }
  }
}
</script>

<style lang="stylus">

</style>

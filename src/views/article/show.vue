<template>
  <div class="article">
    <fy-verify>
      <fy-rect-btn @click="handlePush()">添加</fy-rect-btn>
    </fy-verify>
    <fy-pagination v-slot:default="defaultData" :value="articleSort" :orders="['name']">
      <section>
        <h1>{{ handleFind(defaultData.defaultData.name) }}</h1>
        <div class="flex-container">
          <fy-paper
            v-for="i in defaultData.defaultData.articles"
            :key="i.id"
            v-slot:show
            :is-hover="false"
            class="cursor-pointer single-article"
            level="l1"
            @click="handleGo(i.id)"
          >
            <h2>{{ i.title }}</h2>
            <p>{{ i.time }}</p>
            <p>{{ i.description }}</p>
          </fy-paper>
        </div>
      </section>
    </fy-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ArticleShow',
  computed: {
    ...mapGetters(['article', 'book']),
    articleSort() {
      if (this.article.length === 0) {
        return []
      }
      const article = {}
      this.article.forEach(x => {
        if (article[x.book] === undefined) {
          article[x.book] = []
        }
        article[x.book].push(x)
      })
      const aa = []
      for (var i in article) {
        aa.push({
          name: i,
          articles: article[i].sort((l, r) => {
            if (l.time < r.time) {
              return -1
            }
            return 1
          })
        })
      }
      return aa
    }
  },
  methods: {
    handlePush() {
      this.$router.push({ name: '文章添加default' })
    },
    handleFind(num) {
      return this.book.find(x => {
        return x.id.toString() === num
      }).name
    },
    handleGo(num) {
      this.$router.push({ name: '文章展示', params: { id: String(num) }})
    }
  }
}
</script>

<style lang="stylus">
  .single-article
    flex-basis 200px
</style>

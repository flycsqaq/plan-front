<template>
  <fy-paper ref="paper" level="l1" :is-hover="false">
    <template v-slot:show>
      <fy-verify class="btn-group">
        <fy-rect-btn @click="handleChangeState(false)">修改</fy-rect-btn>
        <fy-rect-btn @click="handleGo(value.id)">添加文章</fy-rect-btn>
        <fy-rect-btn class="delete" :main="false" @click="dialog=true">删除</fy-rect-btn>
      </fy-verify>
      <p>{{ value.name }} - {{ value.author }}</p>
      <h3 v-for="article in selectArticle" :key="article.id" @click="handleGoShow(article.id)">
        {{ article.title }}
      </h3>
    </template>
    <template v-slot:hidden>
      <div class="btn-group">
        <fy-rect-btn @click="handlePut()">修改</fy-rect-btn>
        <fy-rect-btn :main="false" @click="handleChangeState(true)">取消</fy-rect-btn>
      </div>
      <fy-connect-info ref="putConnect" type="put" />
      <form>
        <fy-input v-model="name" label="name" />
        <fy-input v-model="author" label="author" />
        <fy-input v-model="picture" :required="false" label="picture" />
      </form>
    </template>
    <fy-alert v-if="dialog" v-model="dialog" header="确定删除吗" @handleNext="handleDelete()">
      <fy-connect-info ref="deleteConnect" type="delete" />
    </fy-alert>
  </fy-paper>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SingleBook',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id: -1,
      name: '',
      author: '',
      picture: '',
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['article']),
    selectArticle() {
      const id = this.id
      return this.article.filter(x => {
        return x.book === id
      })
    }
  },
  created() {
    this.handleInit()
  },
  methods: {
    ...mapActions({
      putBook: 'Book/putBook',
      deleteBook: 'Book/deleteBook'
    }),
    handleInit() {
      for (var i in this.value) {
        this[i] = this.value[i]
      }
    },
    handleDelete() {
      const deleteBook = this.deleteBook.bind(null, this.id)
      this.$refs.deleteConnect.handleShowInfo(deleteBook)
    },
    handlePut() {
      const { id, name, author, picture } = this
      if (name && author) {
        const putBook = this.putBook.bind(null, { id, name, author, picture })
        this.$refs.putConnect.handleShowInfo(putBook)
      }
    },
    handleGo(index) {
      this.$router.push({ name: '文章添加', params: { id: index.toString() }})
    },
    handleGoShow(index) {
      this.$router.push({ name: '文章展示', params: { id: index.toString() }})
    },
    handleChangeState(boolean) {
      this.$refs.paper.hidden = boolean
    }
  }
}
</script>

<style lang="stylus">
</style>

<template>
  <div class="single-article">
    <div v-if="state==='get'">
      <fy-verify>
        <fy-rect-btn rect-btn color="blue" @click="state='put'">修改</fy-rect-btn>
      </fy-verify>
      <h1>{{ article$.title }}</h1>
      <p>{{ article$.time }}</p>
      <p>{{ article$.description }}</p>
      <p>{{ bookName }}</p>
      <mavon-editor
        class="md"
        :value="article$.body"
        :subfield="tool.subfield"
        :default-open="tool.defaultOpen"
        :editable="tool.editable"
        :toolbars-flag="tool.toolbarsFlag"
        :scroll-style="tool.scrollStyle"
      />
    </div>
    <div v-if="state === 'put'">
      <div class="group-btn">
        <fy-rect-btn @click="handlePut()">上传</fy-rect-btn>
        <fy-rect-btn :main="false" @click="state = 'get'">取消</fy-rect-btn>
      </div>
      <fy-connect-info ref="putConnect" type="put" />
      <form>
        <fy-input v-model="title" label="title" />
        <fy-input v-model="time" type="date" label="date" />
        <fy-textarea v-model="description" label="description" />
        <fy-select v-model="book$" v-slot:default="defaultData" :options="book" option-value="id" label="书籍">
          {{ defaultData.defaultData.name }}
        </fy-select>
      </form>
      <mavon-editor v-model="body" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { getDate } from '@/tools/getDate'

export default {
  name: 'SingleArticle',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      state: 'get',
      article$: null,
      tool: {
        subfield: false,
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      },
      title: '',
      time: '',
      description: '',
      book$: '',
      body: '',
      bookName: ''
    }
  },
  computed: {
    ...mapGetters(['article', 'book'])
  },
  created() {
    this.handleInit()
  },
  methods: {
    ...mapActions({
      putArticle: 'Article/putArticle'
    }),
    handleInit() {
      this.article$ = this.article.find(x => x.id.toString() === this.id)
      const { title, time, description, book, body } = this.article$
      this.title = title
      this.time = time
      this.description = description
      this.body = body
      this.book$ = book
      this.bookName = this.book.find(x => x.id === book).name
    },
    handlePut() {
      const { id, title, time, description, book$, body } = this
      let time$ = time
      if (title && description && book$ && body) {
        if (!time) {
          time$ = getDate()
        }
        const putArticle = this.putArticle.bind(null, { id, title, description, book: book$, body, time: time$ })
        this.$refs.putConnect.handleShowInfo(putArticle)
      }
    }
  }
}
</script>

<style lang="stylus">

</style>

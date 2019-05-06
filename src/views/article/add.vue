<template>
  <div>
    <form>
      <fy-input v-model="title" label="title" />
      <fy-input v-model="time" type="date" label="time" />
      <fy-textarea v-model="description" label="description" />
      <fy-select v-model="bookId" v-slot:default="defaultData" :options="book" option-value="id" label="书籝">
        {{ defaultData.defaultData.name }}
      </fy-select>
    </form>
    <mavon-editor v-model="body" />
    <fy-connect-info ref="connect" type="post" />
    <fy-rect-btn @click="handlePost()">上传</fy-rect-btn>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { getDate } from '@/tools/getDate'

export default {
  name: 'ArticleAdd',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '',
      time: '',
      description: '',
      bookId: '',
      body: ''
    }
  },
  computed: {
    ...mapGetters(['book'])
  },
  created() {
    this.bookId = this.id
  },
  methods: {
    ...mapActions({
      postArticle: 'Article/postArticle'
    }),
    handlePost() {
      const { title, time, description, bookId, body } = this
      let time$ = time
      if (title && description && bookId && body) {
        if (!time) {
          time$ = getDate()
        }
        const postArticle = this.postArticle.bind(null, { title, description, book: bookId, body, time: time$ })
        this.$refs.connect.handleShowInfo(postArticle)
      }
    }
  }
}
</script>

<style lang="stylus">

</style>

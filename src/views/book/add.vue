<template>
  <fy-dialog width="400px" height="400px" padding="10px" @close="changeState()">
    <template v-slot>
      <form class="add-book" @submit.prevent>
        <fy-input v-model="name" label="name" />
        <fy-input v-model="author" label="author" />
        <fy-input v-model="picture" :required="false" label="picture" />
        <fy-connect-info ref="connect" type="post" />
        <fy-circle-btn @click="handlePost()">上传</fy-circle-btn>
      </form>
    </template>
  </fy-dialog>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddBook',
  data() {
    return {
      name: '',
      author: '',
      picture: ''
    }
  },
  methods: {
    ...mapActions({
      postBook: 'Book/postBook'
    }),
    handlePost() {
      const { name, author, picture } = this
      if (name && author) {
        const postBook = this.postBook.bind(null, { name, author, picture })
        this.$refs.connect.handleShowInfo(postBook)
      }
    },
    changeState() {
      this.$emit('changeState')
    }
  }
}
</script>

<style lang="stylus">
  .add-book
    justify-content center
    width 50%
    margin auto
    [fy-form]
      display block
</style>

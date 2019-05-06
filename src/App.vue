<template>
  <div id="app">
    <LayoutHeader :style="{ backgroundColor: bgColor }" />
    <div class="content-container">
      <main>
        <router-view />
      </main>
      <LayoutSidebar class="sidebar" />
    </div>
    <LayoutFooter :style="{ backgroundColor: bgColor }" />
  </div>
</template>
<script>
import LayoutHeader from '@/views/layout/header.vue'
import LayoutFooter from '@/views/layout/footer.vue'
import LayoutSidebar from '@/views/layout/sidebar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    LayoutHeader,
    LayoutFooter,
    LayoutSidebar
  },
  computed: {
    ...mapGetters(['color']),
    bgColor() {
      return this.color[0]
    }
  }
}
</script>

<style lang="stylus">
</style>

<template>
  <ul>
    <template v-for="(route, index) in tree">
      <li
        v-if="!route.hidden"
        :key="index"
        :class="[tag[index].show? 'c10': '']"
        :style="{ backgroundColor: bgColor }"
        @mouseenter="changeChildren(index)"
        @mouseleave="changeChildren(index, false)"
      >
        <router-link :to="{ name: route.name }">
          {{ route.name }}
        </router-link>
        <Tree v-if="route.children && tag[index].show" :tree="route.children" :class="['tree']" />
      </li>
    </template>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Tree',
  props: {
    tree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tag: []
    }
  },
  computed: {
    ...mapGetters(['color']),
    bgColor() {
      return this.color[0]
    }
  },
  created() {
    this.initTag()
  },
  methods: {
    changeChildren(index, boo = true) {
      this.tag[index].show = boo
    },
    initTag() {
      this.tag = this.tree.map(x => ({ show: false }))
    }
  }
}
</script>

<style lang="stylus">
</style>

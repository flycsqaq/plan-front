<template>
  <header>
    <nav>
      <Tree class="header" :tree="$router.options.routes" />
    </nav>
  </header>
</template>
<script>
import Tree from './tree.vue'

export default {
  name: 'LayoutHeader',
  components: {
    Tree
  },
  data() {
    return {
      tree: [
        {
          name: 'test1',
          child: [
            {
              name: 'test11',
              child: [
                {
                  name: 'test111'
                },
                {
                  name: 'test112'
                },
                {
                  name: 'test113'
                },
                {
                  name: 'test114'
                }
              ]
            },
            {
              name: 'test12',
              child: []
            },
            {
              name: 'test13',
              child: []
            },
            {
              name: 'test14',
              child: []
            }
          ]
        },
        {
          name: 'test2',
          child: []
        },
        {
          name: 'test3',
          child: []
        },
        {
          name: 'test4',
          child: []
        }
      ]
    }
  }
}
</script>

<style lang="stylus">

</style>

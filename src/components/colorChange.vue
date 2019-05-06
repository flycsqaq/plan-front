<template>
  <div class="color-change">
    <fy-input v-model="mainColor" type="color" label="主色" />
    <fy-input v-model="assistColor" type="color" label="辅色" />
    <fy-rect-btn @click="handleChangeColor()">change</fy-rect-btn>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ChangeColor',
  data() {
    return {
      mainColor: '#ffffff',
      assistColor: '#ffffff'
    }
  },
  computed: {
    ...mapGetters(['color'])
  },
  created() {
    this.mainColor = this.color[0]
    this.assistColor = this.color[1]
  },
  methods: {
    ...mapActions({
      changeColor: 'Color/changeColor'
    }),
    handleChangeColor() {
      this.changeColor({
        main: this.mainColor,
        assist: this.assistColor
      })
    }
  }
}
</script>

<style lang="stylus">

</style>

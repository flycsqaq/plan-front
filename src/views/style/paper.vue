<template>
  <div class="style">
    <div class="paper">
      <h1>纸片</h1>
      <div paper />
      <div paper level="l1" />
      <div paper level="l2" />
      <div paper level="l3" />
      <div paper level="l4" />
      <div paper level="l5" />
    </div>
    <div class="paper-overlay">
      <h1>纸片层叠</h1>
      <div paper level="l1" />
      <div paper level="l2" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Paper'
}
</script>

<style lang="stylus">
  .style
    padding 10px
    .paper
      &>div
        margin 15px
    .paper-overlay
      [level=l2]
        position relative
        left -50px
</style>

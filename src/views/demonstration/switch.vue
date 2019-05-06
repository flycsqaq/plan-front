<template>
  <div>
    <fy-switch v-model="test1" />
    <fy-switch v-model="test2" />
  </div>
</template>
<script>
export default {
  name: 'SwitchDemo',
  data() {
    return {
      test1: false,
      test2: true
    }
  }
}
</script>

<style lang="stylus">

</style>

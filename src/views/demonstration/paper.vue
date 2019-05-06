<template>
  <div>
    <div class="container">
      <fy-paper :is-hover="false">
        <template v-slot:show>
          123
        </template>
        <template v-slot:hidden>
          123
        </template>
      </fy-paper>
      <fy-paper>
        <template v-slot:show>
          123
        </template>
        <template v-slot:hidden>
          123
        </template>
      </fy-paper>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaperDemo'
}
</script>

<style lang="stylus">
  .container
    display flex
    justify-content flex-start
</style>

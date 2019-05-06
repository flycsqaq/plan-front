<template>
  <div v-if="token" class="verify">
    <slot />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Verify',
  computed: {
    ...mapGetters(['token'])
  }
}
</script>

<style lang="stylus">
  .verify
    display block
</style>

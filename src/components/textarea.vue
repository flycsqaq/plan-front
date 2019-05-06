<template>
  <div fy-form>
    <textarea
      v-model="v"
      :style="{ borderColor: borderColor }"
      :class="[v === '' ? 'gap' : '', state === 'top' ? 'top' : '', focus ? 'focus' : '']"
      @focus="focus = true"
      @blur="focus = false"
    />
    <label>{{ label }}</label>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TextInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    invalid: {
      type: String,
      default: 'required'
    }
  },
  data() {
    return {
      v: '',
      isInvalid: false,
      focus: false
    }
  },
  computed: {
    ...mapGetters(['color']),
    state() {
      if (this.v !== '') {
        return 'top'
      }
      return ''
    },
    borderColor() {
      return this.isInvalid ? this.color[0] : this.color[1]
    }
  },
  watch: {
    v() {
      this.$emit('input', this.v)
      if (this.invalid === 'required') {
        if (this.v !== '') {
          this.isInvalid = true
        } else {
          this.isInvalid = false
        }
      }
    }
  },
  created() {
    this.v = this.value
  }
}
</script>

<style lang="stylus">

</style>

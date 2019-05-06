<template>
  <div fy-form>
    <input
      v-model="v"
      :type="type"
      :style="{ borderColor: borderColor }"
      :class="[v === '' ? 'gap' : '', state === 'top' ? 'top' : '', focus ? 'focus' : '']"
      @focus="focus = true"
      @blur="focus = false"
    >
    <label>{{ label }}</label>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TextInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      v: '',
      isInvalid: !this.required,
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
      if (this.required) {
        if (this.v !== '') {
          this.isInvalid = true
        } else {
          this.isInvalid = false
        }
      } else {
        this.isInvalid = true
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

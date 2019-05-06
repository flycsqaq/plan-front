<template>
  <div fy-form>
    <select
      v-model="v"
      :style="{ borderColor: borderColor }"
      :class="[v === '' ? 'gap' : '', state === 'top' ? 'top' : '', focus ? 'focus' : '']"
    >
      <option v-for="(o, i) in options" :key="i" :value="o[optionValue] || o">
        <slot :defaultData="o" />
      </option>
    </select>
    <label>{{ label }}</label>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Select',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    optionValue: {
      type: String,
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

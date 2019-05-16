<template>
  <div class="content-paper">
    <div class="option">
      <form>
        <fy-select v-model="order" v-slot:default="defaultData" :options="orders" label="排序">
          {{ defaultData.defaultData }}
        </fy-select>
        <span class="arrow" :class="{ sequence: !sequence }" @click="sequence=!sequence">
          <svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5 L 10 0 L 15 5 M10 0 L 10 20" stroke="rgba(0,0,0,0.32)" stroke-width="2" fill="rgba(0,0,0,0.0)" />
          </svg>
        </span>
      </form>
    </div>
    <div class="show" :class="{ 'flex-container': container }">
      <div v-for="(defaultData, index) in showValue" :key="index" :style="flexStyle">
        <slot :defaultData="defaultData" />
      </div>
    </div>
    <div class="pagination" @mouseleave="hover=0">
      <template v-for="i in showIndex">
        <span
          :key="i"
          :class="['num']"
          :style="{ color: colorStyle[i-1] }"
          @click="currentIndex=i"
          @mouseenter="hover=i"
        >
          <i v-if="i===len.length-1 && Dot[1]">
            ...
          </i>
          {{ i }}
          <i v-if="i===2 && Dot[0]">
            ...
          </i>
        </span>
      </template>
      <fy-select v-model="currentOption" v-slot:default="defaultData" :options="option" label="每页项目数">
        {{ defaultData.defaultData }}
      </fy-select>
    </div>
  </div>
</template>
<script>
import { createArray } from '@/tools/array'
import { mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  props: {
    value: {
      type: Array,
      required: true
    },
    filters: {
      type: Array,
      default: () => []
    },
    orders: {
      type: Array,
      default: () => []
    },
    container: {
      type: Boolean,
      default: false
    },
    flexStyle: {
      type: Object,
      default: () => {}
    },
    orderInit: {
      type: String,
      default: ''
    },
    sequenceInit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      length: 0,
      currentIndex: 1,
      option: [5, 10, 25, 50, 100],
      currentOption: 5,
      order: this.orderInit || 'id',
      sequence: this.sequenceInit,
      hover: 0
    }
  },
  computed: {
    ...mapGetters(['color']),
    len() {
      return createArray(1, Math.ceil(this.length / this.currentOption))
    },
    colorStyle() {
      const color = this.color[0]
      const hover = this.hover
      const currentIndex = this.currentIndex
      return this.len.map(x => {
        if (x === hover || x === currentIndex) {
          return color
        }
        return ''
      })
    },
    showIndex() {
      const current = this.currentIndex
      let currentArr
      const len = this.len.length
      if (len < 6) {
        return this.len
      }
      if (current <= 3) {
        currentArr = [3, 4, 5]
      } else if (current >= len - 1) {
        currentArr = [len - 2, len - 1, len]
      } else {
        currentArr = [current - 1, current, current + 1]
      }
      return [...new Set([1, 2, len - 1, len].concat(currentArr).sort((a, b) => a - b))]
    },
    Dot() {
      const arr = this.showIndex
      if (arr.length < 4) {
        return [false, false]
      }
      return [arr.indexOf(3) === -1, arr.indexOf(this.len.length - 2) === -1]
    },
    sortValue() {
      const value = this.value
      if (value.length === 0) {
        return []
      }
      const sequence = this.sequence
      if (sequence) {
        return value.sort((l, r) => {
          const order = this.order
          if (l[order] < r[order]) {
            return -1
          } else {
            return 1
          }
        })
      } else {
        return value.sort((l, r) => {
          const order = this.order
          if (l[order] > r[order]) {
            return -1
          } else {
            return 1
          }
        })
      }
    },
    showValue() {
      if (this.value.length === 0) {
        return []
      }
      const start = (this.currentIndex - 1) * this.currentOption
      const end = start + this.currentOption
      return this.sortValue.slice(start, end)
    }
  },
  watch: {
    currentOption() {
      this.currentIndex = 1
    }
  },
  created() {
    this.handleInit()
  },
  methods: {
    handleInit() {
      if (this.value instanceof Array) {
        this.length = this.value.length
      }
    }
  }
}
</script>

<style lang="stylus">
  .content-paper
    padding 5px 0
    form
      position relative
      select
        width 100px
      .arrow
        display inline-block
        width 20px
        height 20px
        position absolute
        left 100px
        bottom 0
        svg
          background transparent
          border none
          cursor pointer
        &.sequence
          transform rotate(180deg)
    .pagination
      .num
        font-size 1.3rem
        font-weight bold
        cursor pointer
      [fy-form]
        display inline-block
        select
          width 80px
</style>

<template>
  <div>
    <h1>表单</h1>
    <form @submit.prevent>
      <fy-input v-model="text" label="name" />
      <fy-textarea v-model="text" label="number" type="number" />
      <fy-select v-model="select" v-slot:default="defaultData" :options="d" option-value="id" label="select">
        {{ defaultData.defaultData.name }}
      </fy-select>
      <button rect-btn level="l2">test</button>
      <TextareaInput v-model="text" label="name" />
    </form>
  </div>
</template>
<script>
export default {
  name: 'Form',
  data() {
    return {
      text: '',
      select: '',
      d: [
        {
          id: '1',
          name: 't1'
        },
        {
          id: '2',
          name: 't2'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
  input
    margin 5px
</style>

<template lang="pug">
div.setting
  div
    p Работа(сек)
    input(
      type='number',
      v-model.number='config.WORKTIME',
    )
  div
    p Отдых(сек)
    input(
      type='number',
      v-model.number='config.RELAXTIME',
    )
  div
    button.button(@click="save") Save
</template>

<script>
export default {
  name: 'settings',
  props: ['config'],
  data () {
    return {
    }
  },
  methods: {
    save () {
      localStorage.setItem('setting', JSON.stringify(this.config))
    }
  }
}
</script>

<style lang="scss">
.setting {
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;

  div {
    width: 100%;
    * {
      margin: .75rem;
      padding: .5rem;
    }
  }
}
</style>

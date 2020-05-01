<template lang="pug">
div.setting
  div.row
    p Работа(сек)
    input(
      type='number',
      v-model.number='config.WORKTIME',
    )
  div.row
    p Отдых(сек)
    input(
      type='number',
      v-model.number='config.RELAXTIME',
    )
  div.row
    button.button(@click="save") Сохранить
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
}

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  input, p {
    margin: 1rem;
    padding: .5rem;
  }
  button {
    margin-top: 2rem;
  }
}
</style>

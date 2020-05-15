<template lang="pug">
div.setting
  div.row
    p Работа (мин)
    input(
      type='number',
      v-model.number='workmin',
      @change = "save"
    )
  div.row
    p Отдых (мин)
    input(
      type='number',
      v-model.number='relaxmin',
      @change = "save"
    )
</template>

<script>
export default {
  name: 'settings',
  props: ['config'],
  data () {
    return {
      workmin: 0,
      relaxmin: 0
    }
  },
  mounted () {
    this.workmin = this.config.WORKTIME / 60
    this.relaxmin = this.config.RELAXTIME / 60
  },
  methods: {
    save () {
      this.config.WORKTIME = this.workmin * 60
      this.config.RELAXTIME = this.relaxmin * 60

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
  padding: .5rem;

  input, p {
    margin: 1rem;
    padding: .5rem;
  }
  button {
    margin-top: 2rem;
  }
}
</style>

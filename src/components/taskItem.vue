<template lang="pug">
li.tasks__item
  div(:class='className')
    span {{ task.title }}
    b {{ timeFormating (task.totalTime) }}
  button.tasks__item__remove.button.play.pull-right(@click.self="selectTask") P
  button.tasks__item__remove.button.alert.pull-right(@click="$emit('remove')")
    i.fa.fa-timeFormatings
</template>

<script>
export default {
  name: 'taskItem',
  props: ['task'],
  computed: {
    className () {
      let classes = ['tasks__item__toggle']
      if (this.task.completed) {
        classes.push('tasks__item__toggle--completed')
      }
      return classes.join(' ')
    }
  },
  methods: {
    selectTask () {
      if (!this.task.completed) {
        this.$emit('select')
      } else {
        this.task.completed = false
      }
    },
    timeFormating (sec) {
      const minutes = Math.floor(sec / 60 % 60)
      const hours = Math.floor(sec / 3600)
      let seconds = sec % 60
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style lang="scss" scope>
.tasks__item {
    display: flex;
    justify-content: space-between;
}
.tasks__item__toggle {
    // cursor: pointer;
    width: 100%;
    padding: 0.85em 1em;
    background-color: rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    font-size: .9rem;
}
.tasks__item__remove {
    height: 100%;
}
.button.alert {
    background-color: #ec5840;
    color: #fefefe;
}
.button.play {
    background-color: rgb(65, 184, 131);
    color: #fefefe;
}
.pull-right {
    float: right;
}
.fa-remove:before, .fa-close:before, .fa-timeFormatings:before {
    content: "X";
}
.tasks__item__toggle--completed {
    background-color: rgba(0,128,0,0.15);
    border-color: rgba(0,128,0,0.2);
}
</style>

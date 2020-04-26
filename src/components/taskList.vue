<template lang="pug">
transition(name='bounce')
  section.tasks
    .tasks__new.input-group
      input.input-group-field(
        type='text',
        placeholder='Новая задача',
        v-model='newTaskTitle',
        @keyup.enter='addTask'
      )
      span.input-group-button
        button.button(@click='addTask')
          i.fa.fa-plus Добавить
    ul.tasks__list.no-bullet
      taskItem(
        v-for='(task, index) in tasks',
        @remove='removeTask(index)',
        @select='selectTask(task)',
        :task='task',
        :key='task.id'
      )
</template>

<script>
import taskItem from '@/components/taskItem'
export default {
  name: 'taskList',
  components: {
    taskItem
  },
  props: {
    tasks: {default: []}
  },
  data () {
    return {
      newTaskTitle: ''
    }
  },
  methods: {
    addTask () {
      if (this.newTaskTitle) {
        this.tasks.push({
          title: this.newTaskTitle,
          completed: false,
          totalTime: 0
        })
        this.newTaskTitle = ''
      }
      this.$emit('taskListChanged')
    },
    selectTask (task) {
      this.$emit('selectTask', task)
    },
    removeTask (index) {
      this.tasks.splice(index, 1)
      this.$emit('taskListChanged')
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks{
  width: 100%;
  padding: 1em;
  margin: 1rem auto;
}
.input-group-field{
  text-align: center;
  background-color: rgba(0,0,0,0.05);
  border:none;
  border-bottom: 2px solid rgba(0,0,0,0.1);
  padding: .85em 1em;
  flex-grow: 1;
}
.input-group {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
}
.no-bullet {
    list-style: none;
}
</style>

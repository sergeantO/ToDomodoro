<template lang="pug">
transition(name='bounce')
  section.tasks
    .tasks__new.input-group
      input.input-group-field(
        type='text',
        placeholder='Новая задача',
        v-model='newTaskTitle',
        @keyup.enter="addTask('work')"
      )
      span.input-group-button
        button.button(@click="addTask('work')")
          i.fa.fa-plus Рабочая
      span.input-group-button
        button.button(@click="addTask('personal')")
          i.fa.fa-plus Личная
    div.row
      div.tasksTypes
        input(type='radio', value='personal', v-model='selectedTasksType')
        label Личные задачи
      div.tasksTypes
        input(type='radio', value='work', v-model='selectedTasksType')
        label Рабочие задачи
      div.tasksTypes
        input(type='radio', value='all', v-model='selectedTasksType')
        label Все
    ul.tasks__list.no-bullet
      taskItem(
        v-for='(task, index) in taskList',
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
      newTaskTitle: '',
      selectedTasksType: 'all'
    }
  },
  computed: {
    taskList () {
      if (this.selectedTasksType === 'all') {
        return this.tasks
      } else {
        return this.tasks
          .filter(task => task.category === this.selectedTasksType)
      }
    }
  },
  methods: {
    addTask (category) {
      if (this.newTaskTitle) {
        let lastTaskID = 0
        if (localStorage.getItem('lastTaskID')) {
          try {
            lastTaskID = JSON.parse(localStorage.getItem('lastTaskID'))
          } catch (e) {
            localStorage.removeItem('lastTaskID')
          }
        }

        this.tasks.push({
          id: lastTaskID++,
          title: this.newTaskTitle,
          completed: false,
          totalTime: 0,
          category
        })

        this.newTaskTitle = ''
        localStorage.setItem('lastTaskID', JSON.stringify(lastTaskID))
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
.tasksTypes {
  padding: 10px;
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

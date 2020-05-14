<template lang="pug">
transition(name='bounce')
  section.tasks
    div.row
      div.tasksTypes(v-for='cat in categories')
        input(type='radio', :value='cat.alias', v-model='selectedTasksType')
        label {{ cat.category }}
    .tasks__new.input-group
      input.input-group-field(
        type='text',
        placeholder='Новая задача',
        v-model='newTaskTitle',
        @keyup.enter='addTask'
      )
      input.input-group-field(
        type='text',
        placeholder='Новая категория',
        v-model='newCategory',
        @keyup.enter='addCategory'
      )
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
      newCategory: '',
      selectedTasksType: 'work',
      categories: [
        {
          category: 'Рабочие задачи',
          alias: 'work'
        },
        {
          category: 'Личные задачи',
          alias: 'personal'
        }
      ]
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
  mounted () {
    if (localStorage.getItem('categories')) {
      try {
        this.categories = JSON.parse(localStorage.getItem('categories'))
      } catch (e) {
        localStorage.removeItem('categories')
      }
    }
  },
  methods: {
    addCategory () {
      this.categories.push(
        {
          category: this.newCategory,
          alias: this.rus_to_latin(this.newCategory)
        })
      this.newCategory = ''
      localStorage.setItem('categories', JSON.stringify(this.categories))
    },
    addTask () {
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
          category: this.selectedTasksType
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
    },
    rus_to_latin (str) {
      let ru = {
        ' ': '_', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
      }

      return str
        .split('')
        .map(x => ru[x] || x)
        .join('')
    }
  }
}
</script>

<style lang="scss" scoped>
.tasks{
  width: 100%;
  padding: 0 1em;
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
  margin: 0 2px;
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

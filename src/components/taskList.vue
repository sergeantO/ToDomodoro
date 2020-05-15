<template lang="pug">
transition(name='bounce')
  section.tasks
    div.row.wrap
      div.tasksTypes(v-for='cat in categories')
        input(type='radio', :id='cat.alias', :value='cat.alias', v-model='selectedTasksType')
        label(:for='cat.alias') {{ cat.category }}
      div.tasksTypes
        input.input-group-field(
          type='text',
          placeholder='Новая категория',
          v-model='newCategory',
          @keyup.enter='addCategory'
        )
    .tasks__new.input-group
      input.input-group-field(
        v-if="selectedTasksType !== 'all'"
        type='text',
        placeholder='Новая задача в категории',
        v-model='newTaskTitle',
        @keyup.enter='addTask'
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
      selectedTasksType: 'all',
      categories: [
        {
          category: 'Все',
          alias: 'all'
        },
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

      return str.toLowerCase()
        .split('')
        .map(x => ru[x] || x)
        .join('')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  flex-wrap: wrap;
}
.tasks{
  width: 100%;
  padding: 0 1em;
}
.tasksTypes {
  label {
    display: inline-block;
    cursor: pointer;
    padding: 0px 15px;
    line-height: 34px;
    border: 2px solid #999;
    border-radius: 6px;
    user-select: none;
  }
  input[type=radio] {
    display: none;
  }

  input[type=radio]:checked + label {
    background: #2199e8;
    border: 2px solid #0954e0;
  }

  label:hover {
    color: #666;
  }

  input[type=radio]:disabled + label {
    background: #efefef;
    color: #666;
  }
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

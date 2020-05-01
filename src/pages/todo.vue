<template lang="pug">
  div
    timmer(
      v-if="taskStarted != null"
      :WORKTIME="config.WORKTIME - timeLeft",
      :RELAXTIME="config.RELAXTIME",
      :currTask='taskStarted',
      @currTaskClosed='currTaskClose',
      @addTask='addTask'
      @currTaskIsDone='currTaskDone')
    taskList(
      v-else,
      :tasks='tasks',
      @taskListChanged='saveTasks',
      @selectTask='taskStarted=$event'
    )

</template>

<script>
export default {
  name: 'todo',
  props: ['config'],
  components: {
    taskList: () => import('@/components/taskList'),
    timmer: () => import('@/components/timmer')
  },
  data () {
    return {
      timeLeft: 0,
      tasks: [],
      report: {},
      taskStarted: null
    }
  },
  mounted () {
    if (localStorage.getItem('tasks')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('tasks'))
      } catch (e) {
        localStorage.removeItem('tasks')
      }
    }
    if (localStorage.getItem('report')) {
      try {
        this.report = JSON.parse(localStorage.getItem('report'))
      } catch (e) {
        localStorage.removeItem('report')
      }
    }
  },
  methods: {
    saveTasks () {
      this.sortByComleted()
      localStorage.setItem('report', JSON.stringify(this.report))
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    sortByComleted () {
      this.tasks.sort((a, b) => {
        if (a.completed && !b.completed) {
          return 1
        }

        if (b.completed && !a.completed) {
          return -1
        }

        return 0
      })
    },
    addTask (e) {
      this.taskStarted.completed = true
      this.timeLeft += e
      this.taskStarted.totalTime += e
      this.addReport(e)
      this.taskStarted = null
      this.saveTasks()
    },
    currTaskDone () {
      this.taskStarted.completed = true
      this.currTaskClose()
    },
    currTaskClose () {
      let totalTimeToTask = this.config.WORKTIME - this.timeLeft + this.config.RELAXTIME
      this.taskStarted.totalTime += totalTimeToTask
      this.addReport(totalTimeToTask)
      this.taskStarted = null
      this.saveTasks()
      this.timeLeft = 0
    },
    addReport (totalTimeToTask) {
      let title = this.taskStarted.title
      let today = this.formatDate()
      if (this.report[today] === undefined) {
        this.report[today] = {}
        this.report[today][title] = totalTimeToTask
      } else {
        if (this.report[today][title] === undefined) {
          this.report[today][title] = totalTimeToTask
        } else {
          this.report[today][title] = this.report[today][title] + totalTimeToTask
        }
      }
    },
    formatDate () {
      let date = new Date()

      var dd = date.getDate()
      if (dd < 10) dd = '0' + dd

      var mm = date.getMonth() + 1
      if (mm < 10) mm = '0' + mm

      var yy = date.getFullYear() % 100
      if (yy < 10) yy = '0' + yy
      return dd + '.' + mm + '.' + yy
    }
  }
}
</script>

<style>
</style>

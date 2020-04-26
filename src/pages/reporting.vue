<template lang="pug">
table
  tr
    th(v-for="header in headers") {{ header }}
  tr(v-for="row in rows")
    td(v-for="col in row") {{ col }}
  tr
    th(v-for="i in info") {{ i }}
</template>

<script>
export default {
  name: 'Reporting',
  data () {
    return {
      report: {}
    }
  },
  mounted () {
    if (localStorage.getItem('report')) {
      try {
        this.report = JSON.parse(localStorage.getItem('report'))
      } catch (e) {
        localStorage.removeItem('report')
      }
    }
    console.log(this.timeFormating(600))
    console.log(this.timeFormating(1800))
    console.log(this.timeFormating(3600))
    console.log(this.timeFormating(3800))
  },
  methods: {
    timeFormating (sec) {
      const hours = Math.round(sec / 360) / 10
      return hours
    }
  },
  computed: {
    info () {
      let headers = []
      for (let key in this.report) {
        let totalForDay = 0
        for (let time in this.report[key]) {
          totalForDay += this.report[key][time]
        }
        headers.push(totalForDay)
      }
      return [
        '',
        'Итого',
        this.timeFormating(headers.reduce((ac, x) => ac + x, 0)),
        ...headers.map(x => this.timeFormating(x))
      ]
    },
    headers () {
      let headers = ['#', 'Задача', 'Общее время']
      for (let key in this.report) {
        headers.push(key)
      }
      return headers
    },
    rows () {
      let rows = []
      let tasks = []

      for (let day in this.report) {
        for (let taskName in this.report[day]) {
          if (!tasks.includes(taskName)) {
            tasks.push(taskName)
          }
        }
      }

      let index = 1
      for (let taskKey in tasks) {
        let taskName = tasks[taskKey]
        let totalForTask = 0

        let row = []
        for (let day in this.report) {
          if (this.report[day][taskName] === undefined) {
            row.push('')
          } else {
            row.push(this.report[day][taskName])
            totalForTask += this.report[day][taskName]
          }
        }

        rows.push([index++, taskName, this.timeFormating(totalForTask), ...row.map(x => this.timeFormating(x))])
      }

      return rows
    }
  }
}
</script>

<style lang="scss">
table {
  margin: 2rem;
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid black;
  padding: 5px 10px;
}
</style>

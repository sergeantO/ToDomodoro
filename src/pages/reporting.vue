<template lang="pug">
div.reporting
  div.row
    p С
    input(type="date" v-model="from")
    p ДО
    input(type="date" v-model="to")
    button(@click = "clearDate") Сброс дат
  table
    tr
      th #
      th Задача
      th Общее время
      th(v-for="header in headers") {{ header }}
    tr(v-for="row in rows")
      td(v-for="col in row") {{ col }}
    tr
      th(colspan="2") Итого
      th(v-for="i in tableFooter") {{ i }}
</template>

<script>
export default {
  name: 'Reporting',
  data () {
    return {
      from: '',
      to: '',
      rawReport: {}
    }
  },
  mounted () {
    if (localStorage.getItem('report')) {
      try {
        this.rawReport = JSON.parse(localStorage.getItem('report'))
      } catch (e) {
        localStorage.removeItem('report')
      }
    }
  },
  methods: {
    timeFormating (sec) {
      const hours = Math.round(sec / 360) / 10
      return hours
    },
    clearDate () {
      this.from = ''
      this.to = ''
    }
  },
  computed: {
    report () {
      if (this.from === '' && this.to === '') {
        return this.rawReport
      }

      let result = {}
      const from = new Date(this.from)
      const to = new Date(this.to)

      for (let key in this.rawReport) {
        let ddmmyy = key.split('.')
        let day = new Date('20' + ddmmyy[2], ddmmyy[1] - 1, ddmmyy[0])

        if (day < from || day > to) {
          continue
        }

        result[key] = this.rawReport[key]
      }

      return result
    },
    tableFooter () {
      let footer = []

      for (let key in this.report) {
        let totalForDay = 0
        for (let time in this.report[key]) {
          totalForDay += this.report[key][time]
        }
        footer.push(totalForDay)
      }

      return [
        this.timeFormating(footer.reduce((ac, x) => ac + x, 0)),
        ...footer.map(x => this.timeFormating(x))
      ]
    },
    headers () {
      let headers = []
      for (let key in this.report) {
        headers.push(key)
      }
      return headers
    },
    rows () {
      let rows = []
      let tasks = []
      let days = this.report

      for (let day in days) {
        for (let taskName in days[day]) {
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
        for (let day in days) {
          if (days[day][taskName] === undefined) {
            row.push('')
          } else {
            row.push(days[day][taskName])
            totalForTask += this.report[day][taskName]
          }
        }

        rows.push([
          index++,
          taskName,
          this.timeFormating(totalForTask),
          ...row.map(x => this.timeFormating(x))
        ])
      }

      return rows
    }
  }
}
</script>

<style lang="scss">
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
table {
  margin: 2rem;
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid black;
  padding: 5px 10px;
}
</style>

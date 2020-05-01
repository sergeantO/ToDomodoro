<template lang="pug">
transition(name='bounce')
  div.timer(v-if='this.currTask != null')
    .base-timer
      svg.base-timer__svg(viewBox='0 0 100 100', xmlns='http://www.w3.org/2000/svg')
        g.base-timer__circle
          circle.base-timer__path-elapsed(cx='50', cy='50', r='45')
          path#base-timer-path-remaining.base-timer__path-remaining(:stroke-dasharray='circleDasharray', d='\
            M 50, 50\
            m -45, 0\
            a 45,45 0 1,0 90,0\
            a 45,45 0 1,0 -90,0\
          ')
      p#base-timer-label.base-timer__label
        span  {{ currtime }}
        span.base-timer__label__small  / {{ alltime }}
    div.info(v-if='currTask')
      h2 {{currTask.title}}
      div(v-if='!timeIsOver')
        h3 {{ status }}
        button.taskdone(v-if="status=='Работаем'" @click="$emit('addTask', TIME_LIMIT-timeLeft)") Добавить задачу
      div(v-else)
        button.taskdone(@click="stopTask") Задача выполнена
        button.taskclose(@click="$emit('currTaskClosed')") Задача требует доработки
</template>

<script>
export default {
  name: 'timmer',
  props: ['currTask', 'WORKTIME', 'RELAXTIME'],
  data () {
    return {
      status: 'Работаем',
      timeIsOver: false,

      FULL_DASH_ARRAY: 283,
      timeLeft: 0,
      TIME_LIMIT: 0,
      timerInterval: null
    }
  },
  methods: {
    startTask () {
      this.status = 'Работаем'
      this.start(this.WORKTIME)
        .then(() => {
          this.status = 'Отдыхаем'
          return this.start(this.RELAXTIME)
        })
        .then(() => {
          this.timeIsOver = true
        })
    },
    stopTask () {
      clearInterval(this.timerInterval)
      this.$emit('currTaskIsDone')
    },
    start (limit) {
      this.timerInterval = null

      this.timeLeft = limit
      this.TIME_LIMIT = limit
      return new Promise((resolve) => {
        this.timerInterval = setInterval(() => {
          this.timeLeft -= 1
          if (this.timeLeft === 0) {
            clearInterval(this.timerInterval)
            resolve()
          }
        }, 1000)
      })
    },
    timeFormating (sec) {
      const minutes = Math.floor(sec / 60)
      let seconds = sec % 60
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${minutes}:${seconds}`
    }
  },
  computed: {
    currtime () {
      return this.timeFormating(this.timeLeft)
    },
    alltime () {
      return this.timeFormating(this.TIME_LIMIT)
    },
    circleDasharray () {
      let rawTimeFraction = this.timeLeft / this.TIME_LIMIT
      let timeFraction = rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction)
      return `${(timeFraction * this.FULL_DASH_ARRAY).toFixed(0)} 283`
    }
  },
  mounted () {
    this.startTask()
  }
}
</script>

<style lang="scss" scoped>
.timer{
  font-family: sans-serif;
  width: 95%;
  margin: 7rem auto;
}
.base-timer {
  position: relative;
  max-width: 25rem;
  max-height: 25rem;
  margin: 0 auto;
}
.base-timer__svg {
  transform: scaleX(-1);
}
.base-timer__circle {
  fill: none;
  stroke: none;
}
.base-timer__path-elapsed {
  stroke-width: 10px;
  stroke: grey;
}
.base-timer__path-remaining {
  stroke-width: 8px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
  color: rgb(65, 184, 131);
}
.base-timer__label {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 48px;
  transition: font-size 0.5s ease-out 0.1s;
}
.base-timer__label__small{
  font-size: 20px;
  color: gray;
}
@media (max-width: 195px) {
  .base-timer__label {
    font-size: 26px;
  }
}
.info{
  margin: 3rem;
}

button{
  margin: 1rem;
  padding: 1em 1.3em;
  border: 1px solid black;
  border-radius: 5px;
}

.taskclose{
  background-color: grey;
}

.taskdone{
  background-color: rgb(65, 184, 131);
}
</style>

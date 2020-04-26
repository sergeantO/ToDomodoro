<template>
  <div id="app">
    <navigation />
    <router-view :config="config" />
  </div>
</template>

<script>
import navigation from '@/components/navigation'
export default {
  name: 'App',
  components: {
    navigation
  },
  data () {
    return {
      config: {
        WORKTIME: 30,
        RELAXTIME: 6
      }
    }
  },
  mounted () {
    if (localStorage.getItem('setting')) {
      try {
        this.config = JSON.parse(localStorage.getItem('setting'))
      } catch (e) {
        localStorage.removeItem('setting')
      }
    }
  }
}
</script>

<style>
*, html, body{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  outline:none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.button {
    display: inline-block;
    text-align: center;
    line-height: 1;
    cursor: pointer;
    -webkit-appearance: none;
    -webkit-transition: background-color .25s ease-out,color .25s ease-out;
    transition: background-color .25s ease-out,color .25s ease-out;
    vertical-align: middle;
    border: 1px solid transparent;
    border-radius: 0;
    padding: .85em 1em;
    font-size: .9rem;
    background-color: #2199e8;
    color: #fefefe;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

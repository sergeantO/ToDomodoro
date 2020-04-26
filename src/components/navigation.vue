<template lang="pug">
div.nav
  router-link.route(:to="{ path: '/' }") Задачи
  router-link.route(:to="{ path: '/settings' }") Настройки
  router-link.route(:to="{ path: '/reporting' }") Отчеты
</template>

<script>
export default {
  name: 'navigations',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.nav {
    background-color: rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-around;
}
.route {
    text-decoration: none;
    flex-grow: 1;
    color: black;
    padding: 10px;
}
.router-link-exact-active {
    background-color: rgba(0,128,0,0.15);
    border-bottom: 2px solid rgba(0,128,0,0.2);
}
</style>

<template>
  <div id="app">
    <div class="header">
      中国翰园碑林管理平台
      <Button style="float: right; margin-right: 20px; margin-top: 10px;" type="warning" @click="logout">退出</Button>
    </div>
    <div class="left">
      <Navigation></Navigation>
    </div>
    <div class="con">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navigation from './components/menu.vue'
  export default {
    name: 'app',
    methods: {
      logout() {
        window.location.href = '/login'
      }
    },
    components: {Navigation:Navigation}
  }
</script>

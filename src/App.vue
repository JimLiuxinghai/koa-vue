<template>
  <div id="app">
   <!--  <div class="header">
      中国翰园碑林管理平台
    </div> -->
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
    components: {Navigation:Navigation}
  }
</script>

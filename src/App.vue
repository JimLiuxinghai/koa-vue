<template>
  <div>
    <div class="header"></div>
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

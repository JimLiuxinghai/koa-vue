<template>
  <Menu :theme="theme2" :active-name="activeIndex">
    <router-link to="/summary">
      <Menu-item name="1">
        <Icon type="ios-home"></Icon>
        首页
      </Menu-item>
    </router-link>
    <router-link to="/m-hotel">
      <Menu-item name="2">
        <Icon type="document-text"></Icon>
        酒店管理
      </Menu-item>
    </router-link>
    <Menu-group title="演示管理">
      <router-link to="/demo">
        <Menu-item name="3">
          <Icon type="monitor"></Icon>
          演示申请管理
        </Menu-item>
      </router-link>
    </Menu-group>
    <Menu-group title="项目管理">
      <router-link to="/overview">
        <Menu-item name="4">
          <Icon type="arrow-graph-up-right"></Icon>
          概览
        </Menu-item>
      </router-link>
      <router-link to="/hotel/new">
        <Menu-item name="5">
          <Icon type="ios-paper-outline"></Icon>
          实施酒店管理
        </Menu-item>
      </router-link>
      <router-link to="/group">
        <Menu-item name="6">
          <Icon type="soup-can-outline"></Icon>
          集团管理
        </Menu-item>
      </router-link>
      <router-link to="/task">
        <Menu-item name="7">
          <Icon type="clipboard"></Icon>
          任务管理
        </Menu-item>
      </router-link>
      <router-link to="/link">
        <Menu-item name="8">
          <Icon type="ios-glasses"></Icon>
          环节管理
        </Menu-item>
      </router-link>
      <router-link to="/pms">
        <Menu-item name="9">
          <Icon type="ios-settings-strong"></Icon>
          pms管理
        </Menu-item>
      </router-link>
    </Menu-group>
    <Menu-group title="用户行为">
      <router-link to="/analysis">
        <Menu-item name="10">
          <Icon type="stats-bars"></Icon>
          酒店登录次数统计
        </Menu-item>
      </router-link>
    </Menu-group>
    <Menu-group title="运营管理">
      <router-link to="/error">
        <Menu-item name="11">
          <Icon type="android-restaurant"></Icon>
          数据处理环节故障
        </Menu-item>
      </router-link>
      <router-link to="/data-com">
        <Menu-item name="12">
          <Icon type="ios-analytics-outline"></Icon>
          RMS与PMS数据核对
        </Menu-item>
      </router-link>
    </Menu-group>
  </Menu>
</template>
<script>
  import { menu } from '../data/data'
  export default {
    mounted (){
      this.activeIndex = this.$route.name;
      //this.getData()

    },
    methods: {
      async getData() {
        menu()
      }
    },
    data () {
      return {
        theme3: 'light',
        activeIndex: 1
      }
    }
  }
</script>

<style lang="less" scoped>
	.el-aside {
       background-color: #D3DCE6;
       color: #333;
       text-align: center;
       line-height: 200px;
     }
     
     .el-main {
       background-color: #E9EEF3;
       color: #333;
       text-align: center;
       line-height: 160px;
     }
</style>
<template>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
</template>
<script>
    export default {
        data () {
        	let height = window.innerHeight;
            return {
                height: height
            }
        },
        methods: {
            switchMenu (index) {
            	this.itemActive = index;
            }
        }
    }
</script>

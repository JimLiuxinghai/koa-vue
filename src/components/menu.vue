<style scoped lang="less">
  .menu-item span{
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width .2s ease .2s;
  }
  .menu-item i{
      transform: translateX(0px);
      transition: font-size .2s ease, transform .2s ease;
      vertical-align: middle;
      font-size: 16px;
  }
  .collapsed-menu span{
      width: 0px;
      transition: width .2s ease;
  }
  .collapsed-menu i{
      transform: translateX(5px);
      transition: font-size .2s ease .2s, transform .2s ease .2s;
      vertical-align: middle;
      font-size: 22px;
  }
</style>
<template>
  <div>
    
    <Menu theme="dark" width="auto" :class="menuitemClasses" :active-name="activeIndex">
      <router-link  v-for="(item, index) in menuList" :to="item.menuUrl">
        <MenuItem :name="item.menuUrl">
          <Icon :type="item.menuFont"></Icon>
          {{item.menuName}}
        </MenuItem>
      </router-link>
      
    </Menu>
  </div>
  
</template>
<script>
  import { menu } from '../data/data'
  export default {
    mounted (){
      this.activeIndex = this.$route.path;
      console.log(this.activeIndex, 'active')
      this.getData()
    },
    methods: {
      async getData() {
        let data = await menu()
        this.menuList = data.data.data
        console.log(this.menuList)
      }
    },
    data () {
      return {
        theme3: 'light',
        activeIndex: 1,
        menuList: []

      }
    }
  }
</script>

<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="person">

        <div class="inner">
            <div class="id">
                <span>编号:</span> {{user.id}}
            </div>
            <div class="name">
                 <span>名称:</span>{{user.name}}
            </div>
            <div class="phone">
                <span>电话:</span>{{user.phone}}
            </div>
            <div class="name">
                 <span>地址:</span>{{user.province}} {{user.city}} {{user.county}}
            </div>
            <div class="rate">
                <span>分成比例:</span>{{user.rate}}
            </div>
            <div class="img">
                <img id="img" src="" />
                <Button type="primary" @click="down">
                    点击下载推广二维码
                </Button>
            </div>
        </div>
    </div>
</template>
<script>
    import { userinfo } from '../../data/data'

    export default {
        beforeMount () {
            this.getData();
        },
        data () {
            return {
                user: {},
                url: ''

            }
        },
        methods: {
            async getData () {
                let data = await userinfo()
                if(data.status.code == 200) {
                    this.user = data.data 
                    
                    this.url = data.data.imgUrl
                     
                    $('#img').attr('src', data.data.imgUrl)
                }
            },
            async down () {
                window.open(this.user.img,"_blank"); 
            }
        }
    }
</script>

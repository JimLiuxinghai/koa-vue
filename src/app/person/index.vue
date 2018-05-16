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
                url: '',
                city: '',
                pro: '',
                country: ''

            }
        },
        methods: {
            async getData () {
                let data = await userinfo()
                if(data.status.code == 200) {
                    this.user = data.data 
                    
                    this.url = data.data.imgUrl
                     
                    $('#img').attr('src', data.data.imgUrl)
                    let pro = this.getCity({
                        type: 1,
                        code: data.data.province
                    }) 
                    let city = this.getCity({
                        type: 2,
                        code: data.data.city
                    })
                    let country = this.getCity({
                        type: 3,
                        code: data.data.country
                    })

                }
            },
            async getCity (params) {
                let config = {
                    type: params.type,
                    code: params.code
                }
                let data = await city(config)
                
                if(params.type == 1) {
                    this.pro = data
                }
                else if(params.type == 2) {
                    this.city = data
                }
                else if(params.type == 3) {
                    this.country = data
                }
            },
            async down () {
                window.open(this.user.img,"_blank"); 
            }
        }
    }
</script>

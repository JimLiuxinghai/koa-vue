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
            <div class="rate">
                <span>修改密码:</span>
                <Button type="primary" @click="edit">
                    点击修改密码
                </Button>
            </div>
            <div class="img">
                <img id="img" src="" />
                <div>
                    <Button type="primary" @click="down">
                      点击下载推广二维码
                    </Button>   
                </div>
                
            </div>
        </div>
        <Modal
            v-model="modal"
            title="修改密码"
            @on-ok="addData"
            @on-cancel="cancel"
            :loading = "modalLoading">
            <div class="add">
               <div class="item">
                   <span>旧密码:</span>
                   <Input v-model="add.old" type="password" placeholder="请输入旧密码" style="width: 300px"></Input>
               </div>
               <div class="item">
                   <span>新密码:</span>
                   <Input v-model="add.newPass" type="password" placeholder="请输入新密码" style="width: 300px"></Input>
               </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { userinfo, eidtPass } from '../../data/data'

    export default {
        beforeMount () {
            this.getData();
        },
        data () {
            return {
                user: {},
                url: '',
                modalLoading: false,
                modal: false,
                add: {
                    old: '',
                    newPass: ''
                }

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
            },
            cancel () {
                this.add = {
                    old: '',
                    newPass: ''
                }
            },
            edit () {
                this.modal = true
            },
            changeLoading() {
                this.modalLoading = false;
                this.$nextTick(() => {
                    this.modalLoading = true;
                })
             },
            async addData () {
                
               
                let param = this.add
                
                let data = await eidtPass(param)

                if(data.data.retCode == 0) {
                    setTimeout(() => {
                        this.changeLoading();
                        this.$Message.success('修改成功');
                        this.getData();
                        this.modal = false
                      }, 100);
                    
                }
                else {
                    
                    this.$Message.error(data.data.retMsg);
                    return this.changeLoading();
                    
                    
                }

               
            },
        }
    }
</script>

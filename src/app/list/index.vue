<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="top">
            <Input v-model="search.phone" placeholder="请输入手机号" style="width: 300px"></Input>
            <Button type="primary" @click="getData()">搜索</Button>
            <Button type="primary" @click="modal = true">新增</Button>
        </div>
        <div class="inner">
            <Table stripe :loading="!loading" border :columns="columns" :data="tableData"></Table>
            <Page :total="tableData.length" :change="change"></Page>
        </div>
         <Modal
             v-model="modal"
             title="新增经销商"
             @on-ok="addData"
             @on-cancel="cancel"
             :loading = "modalLoading"
             width="800">
             <div class="add">
                <div class="item">
                    <span>名称:</span>
                    <Input v-model="add.name" placeholder="请输入名称" style="width: 300px"></Input>
                </div>
                <div class="item">
                    <span>手机号:</span>
                    <Input v-model="add.phone" placeholder="请输入手机号" style="width: 300px"></Input>
                </div>
                <div class="item">
                    <span>密码:</span>
                    <Input v-model="add.password" placeholder="请输入密码" style="width: 300px"></Input>
                </div>
                <div class="item">
                    <span>地址:</span>
                    <Select v-model="add.provinceId" style="width:150px" @on-change="changePro">
                        <Option v-for="item in provinceList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>

                    <Select v-model="add.cityId" style="width:150px" @on-change="changeCity">
                        <Option v-for="item in cityList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
 
                    <Select v-model="add.countryId" style="width:150px" @on-change="changeCoun">
                        <Option v-for="item in countryList" :value="item.code"  :key="item.code">{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="item">
                    <span>分成:</span>
                    <Input v-model="add.rate" placeholder="请输入分成" style="width: 300px"></Input>%
                </div>
             </div>
         </Modal>
         <Down v-if="modal1" v-bind:list="list" v-on:closeListener="closeDown"></Down>
    </div>
</template>
<script>
    import { distributor, deldis, adddis, getRole, actdis, city } from '../../data/data'
    import Loading from '../common/loading.vue';
    import Down from './compoents/down.vue'
    export default {
        beforeMount () {
            this.getData();
            this.getRoles();
            this.getCity({
                type: 1,
                code: '000000'
            })
        },
        data () {
            return {
                columns: [{
                    title: '编号',
                    key: 'id'
                }, {
                    title: '分销商名称',
                    key: 'name'
                }, {
                    title: '手机号',
                    key: 'phone'
                }, {
                    title: '分销商等级',
                    key: 'controller'
                }, {
                    title: '分销商分成比例',
                    key: 'rate',
                    render: (h, params) => {
                        return h('div', params.row.rate + '%')
                    }
                }, {
                    title: '状态',
                    key: 'enable',
                    render: (h, params) => {
                        
                        let text = params.row.enable == '1' ? '已激活': '去激活';
                        if(params.row.enable == 1) {
                            return h('div', text);
                        }
                        else {
                            return h('div', [
                                 h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.active(params)
                                        }
                                    }
                                }, text)
                            ]);
                        }
                        
                    }
                }, {
                    title: '地址',
                    key: 'city',
                    align: 'center',
                    render: (h, params) => {
                        let text = [params.row.province, params.row.city, params.row.country]
                       
                        text = text.join('')
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, text)
                        ]);
                    }
                },{
                    title: '下级经销商',
                    key: 'down',
                    align: 'center',
                    render: (h, params) => {
                        let distrRole = params.row.distrRole
                        if(distrRole !== 12) {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.down(params)
                                        }
                                    }
                                }, '查看下级经销商')
                            ]);
                        }
                        else {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '无')
                            ]);
                        }
                    }
                }, {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            // h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'small'
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.edit(params)
                            //         }
                            //     }
                            // }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }],
                
                search: {
                    phone: ''
                },
                tableData: [],
                roleArr: [],
                loading: false,
                modalLoading: true,
                modal: false,
                isEdit: false,
                modal1: false,
                list: [],
                provinceList: [],
                cityList: [],
                countryList: [],
                add: {
                    name: '',
                    phone: '',
                    password: '',
                    distrRole: '',
                    rate: '',
                    province: '',
                    provinceId: '',
                    cityId: '',
                    city: '',
                    country: '',
                    countryId: ''
                }
                
            }
        },
        methods: {
            async getData (id, isDown) {
                
                let param = {
                    phone: this.search.phone,
                    page: 0
                }
                if(id) {
                    param.loginId = id
                }
                let data = await distributor(param)
                if(!isDown) {
                   this.loading = true
                   this.tableData = data.content 
                }
                else {
                    this.list = data.content
                }
                
                
            },
            async remove (params) {
                let param = {
                    id: params.row.id
                }
                let data = await deldis(param)
                if(data.data.retCode == 0) {
                    this.$Message.success('删除成功');
                    this.getData();
                }
                else {
                    this.$Message.error(data.data.retMsg);
                }
                
            },
            closeDown (data) {
                this.modal1 = false
            },
            async down (params) {
                //this.loading = false
                this.modal1 = true
                let id = params.row.id
                this.getData(id, true)
            },
            cancel() {
                this.modal = false
                this.add = {
                    name: '',
                    phone: '',
                    password: '',
                    distrRole: '',
                    rate: '',
                    province: '',
                    provinceId: '',
                    cityId: '',
                    city: '',
                    country: '',
                    countryId: ''
                }
            },
            edit (params) {
                let data = params.row
                this.add.name = data.name
                this.add.phone = data.phone,
                this.add.password = data.password
                this.add.rate = data.rate
                this.add.distrRole = data.distrRole
                this.add.province = data.province
                this.add.provinceId = data.provinceId
                this.add.city = data.city
                this.add.cityId = data.cityId
                this.add.country = data.country
                this.add.countryId = data.countryId
                this.modal = true
                this.edit = true
            },
            changeLoading() {
                this.modalLoading = false;
                this.$nextTick(() => {
                    this.modalLoading = true;
                })
             },
            async addData () {
                this.isEdit = false
                this.add.distrRole = this.roleArr[0].id
                let param = this.add
                
                let data = await adddis(param)

                if(data.data.retCode == 0) {
                    setTimeout(() => {
                        this.changeLoading();
                        this.$Message.success('添加成功');
                        this.getData();
                        this.modal = false
                      }, 100);
                    
                }
                else {
                    alert(data.data.retMsg)
                    this.$Message.error(data.data.retMsg);
                    return this.changeLoading();
                    
                    
                }

               
            },
            async getRoles() {
                let data = await getRole()
                this.roleArr = data.data.data
            },
            cancel() {
                this.modal = false
            },
            //激活
            async active (params) {
                if(params.row.enable !== 1) {
                   let param = {
                       id: params.row.id
                   }
                   let data = await actdis(param)
                   if(data.data.retCode == 0) {
                       this.$Message.success('激活成功');
                       this.getData();
                   }
                   else {
                       this.$Message.error(data.data.retMsg);
                   } 
                }
                
               
            },
            async getCity (params) {
                let config = {
                    type: params.type,
                    code: params.code
                }
                let data = await city(config)
                
                if(params.type == 1) {
                    this.provinceList = data
                }
                else if(params.type == 2) {
                    this.cityList = data
                }
                else if(params.type == 3) {
                    this.countryList = data
                }
            },
            changePro(val) {
                console.log(val, 'proval')
                let name = ''
                this.provinceList.forEach((item) => {
                    if(val == item.code) {
                        name = item.name
                    }
                })
                
                this.add.province = name
                //this.add.provinceId = val
                console.log(this.add)
                this.getCity({
                    type: 2,
                    code: val
                })
            },
            changeCity(val) {
                console.log(val, 'cityval')
                let name = ''
                this.cityList.forEach((item) => {
                    if(val == item.code) {
                        name = item.name
                    }
                })
                console.log(name)
                //this.add.cityId = val
                this.add.city = name
                console.log(this.add)
                this.getCity({
                    type: 3,
                    code: val
                })
            },
            changeCoun(val) {
               console.log(val, 'counval')
                let name = ''
                this.countryList.forEach((item) => {
                    if(val == item.code) {
                        name = item.name
                    }
                })

                this.add.country = name
                //this.add.countryId = val
                console.log(this.add)
            }
        },
        components: {
            Down: Down
        }
    }
</script>

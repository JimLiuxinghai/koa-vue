<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="top">
            <Button type="primary" @click="modal = true">新增</Button>
        </div>
        <div class="inner" v-if="loading">
            <Table stripe border :columns="columns" :data="tableData"></Table>
        </div>
         <Modal
             v-model="modal"
             title="新增经销商"
             @on-ok="addData"
             @on-cancel="modal = false">
             <div class="add">
                 
             </div>
         </Modal>
        <Loading v-if="!loading"></Loading>
    </div>
</template>
<script>
    import { distributor, deldis, adddis, getRole } from '../../data/data'
    import Loading from '../common/loading.vue';

    export default {
        beforeMount () {
            this.getData();
            this.getRoles();
        },
        data () {
            return {
                
                
            }
        },
        methods: {
            async getData () {
                let param = {
                    phone: '',
                    page: 0
                }
                let data = await distributor(param)
                this.loading = true
                this.tableData = data.content
                
            },
            async remove (params) {
                let param = {
                    id: params.row.id
                }
                
            },
            async addData () {

            },
            async getRoles() {
                let data = await getRole()
                console.log(data.data.data)
            },
            cancel() {
                this.modal = false
            }
        },
        components: {
            Loading: Loading
        }
    }
</script>

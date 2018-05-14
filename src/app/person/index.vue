<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div class="dis">
        <div class="inner">
            <div class="name"></div>
            <div class="phone"></div>
            <div class="role"></div>
        </div>
    </div>
</template>
<script>
    import { distributor } from '../../data/data'

    export default {
        beforeMount () {
            this.getData();
        },
        data () {
            return {
                   
            }
        },
        methods: {
            async getData () {
                let param = {
                    person: true
                }
                let data = await distributor(param)
                console.log(data)
                this.loading = true
                this.tableData = data.content
                this.total = data.totalElements
                
            },
            jump (param) {
                this.page = param - 1
                this.loading = false
                this.getData()
            },
            async addData () {

            }
        },
        components: {
            Loading: Loading
        }
    }
</script>

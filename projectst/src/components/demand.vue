<template>
    <div class="demand">查询</div>
</template>

<script>
    export default {
        data(){
            return {
                //汽车id
                car_id:'',
                //渲染数据
                data:{}
            }
        },
        methods:{
            init(){
                fetch('https://baojia.chelun.com/v2-dealer-alllist.html?carId='+this.car_id+'&cityId=2401')
                     .then(res=>{
                         res.json().then(json=>{
                             if(json.code==1){
                                 this.data=json.data
                             }else{
                                 alert(json.msg)
                             }
                         })
                     })
            }
        },
        mounted(){
            this.car_id=this.$route.query.carid
            this.init()
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/scss/details.scss'
</style>

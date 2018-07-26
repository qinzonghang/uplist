<template>
    <div class="detail">
        <div class="tail-miss">
            <div class="top">
                <p class="image" @click="ClickBigimg(id)" > <img :src="data.CoverPhoto">
                <span class="num">{{data.pic_group_count}}张照片</span>
                </p>
                <div class="textst">
                    <span class="left">
                        <b class="money">{{money}}</b>
                        <span class="j-money">指导价:{{j_money}}</span>
                    </span>
                    <span class="right">{{data.BottomEntranceTitle}}</span>
                </div>
                <div class="data-list">
                    <div class="child" v-for="(item,index) in data.list" :key="index">
                        <p class="year">
                            <span>{{item.market_attribute.year}}款</span>
                            <span>{{item.car_name}}</span>
                        </p>
                        <p class="nature">{{item.inhale_type}}</p>
                        <p class="money">
                            <span>指导价:{{item.market_attribute.official_refer_price}}</span>
                            <span>{{item.market_attribute.dealer_price_min}}起</span>
                        </p>
                        <div class="min-money">
                            <p @click="Click(item.car_id,item)">{{data.BottomEntranceTitle}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="buttext">{{data.BottomEntranceTitle}}</p>
    </div>
</template>

<script>
    export default {
        data(){
            return {
               id:"",
               //获得的第一数据
               data:{},
               //价格
               money:'',
               //建议价格
               j_money:''
            }
        },
        methods:{
            init(){
                fetch('https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID='+this.id)
                     .then(res=>{
                         res.json().then(json=>{
                             if(json.code==1){
                                 this.data=json.data
                                 this.money=this.data.market_attribute.dealer_price
                                 this.j_money=this.data.market_attribute.official_refer_price
                             }else{
                                 alert(json.msg)
                             }
                         })
                     })
            },
            Click(car_id,item){
                 //点击跳转查询页
                 this.$router.push({name:'Demand',query:{carid:car_id}})
            },
            //点击跳转图片详情页
            ClickBigimg(id){
                this.$router.push({name:'Gather',query:{gatherid:id}})
            }
        },
        mounted(){
            this.id=this.$route.query.Id
            this.init()
        },
        updated(){
            
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/scss/details.scss';
</style>


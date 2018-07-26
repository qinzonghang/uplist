<template>
    <div id="img">
        <!-- 第一显示面  分类-->
        <div class="img-gather" v-if="Oneface">
        <header>
            <p class="left"><span>全部颜色</span></p>
            <p class="right"><span>全部车款</span></p>
        </header>
        <section>
            <div class="classify" v-for="(item,index) in data" :key="index">
                <div class="imgChild" v-for="(value,key) in item.List" :key="key">
                    <div v-if="key==0" class="Child-box" @click="ClickType(item.Id)">
                        <div class="boxer">
                            {{item.Name}}
                            <p>{{item.Count}}张 ></p>
                        </div>
                    </div>
                    <img ref="imageGa" :data-src="value.Url" @click="UpSwiper(item.List,key)">
                </div>
            </div>
        </section>
        </div>
    <!-- 第二显示面  部位总图 -->
        <div class="type-all" v-if="Twoface">
            <div class="child" v-for="(item,index) in dataall" :key="index" @click="UpSwiper(dataall,index)">
                <img :src="item.Url">
            </div>
        </div>
        <!-- 轮播图显示面 -->
        <div class="upswiper" v-if="Swiperis">
            <div class="swiper-container imgswiper" @click="Wrapert()">
                <div class="swiper-wrapper wrapert">
                    <div class="swiper-slide slide" v-for="(item,index) in swiperdata" :key="index">
                        <img :src="item.Url" alt="">
                    </div>      
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper'; 
    //import 'swiper/dist/css/swiper.min.css';
    import '../../node_modules/swiper/dist/css/swiper.min.css'
    import Slow from  '../assets/js/Slowtoload.js'
    export default {
        data(){
            return {
              id:'',
              data:[],
              //判断哪个显示面显示
              Oneface:true,
              Twoface:false,
              //第二显示页id
              idtype:'',
              //第二显示页数据
              dataall:[],
              //swiper判断
              Swiperis:false,
              //swiper显示面渲染数据
              swiperdata:[],
              indexst:''
            }
        },
        methods:{
           init(){
             fetch('https://baojia.chelun.com/v2-car-getImageList.html?SerialID='+this.id)
                  .then(res=>{
                      res.json().then(json=>{
                          if(json.code==1){
                              this.data=json.data
                              //替换url
                              this.data.forEach((item,index)=>{
                                  item.List.forEach((value,key)=>{
                                      value.Url=value.Url.replace('{0}',value.LowSize);   
                                  })
                              })
                          }else{
                              alert(json.msg)
                          }

                            //----------图片加载Slow参数为需要加载的img元素
                            //页面初始时执行
                            setTimeout(()=>{Slow(this.$refs.imageGa)},10)
                            //页面滚动时触发
                            window.addEventListener('scroll',()=>{
                                setTimeout(()=>{Slow(this.$refs.imageGa)},10)
                            })
                      })
                  })
           },
           //点击第一显示面的分类
           ClickType(id){
               this.idtype=id;
               //修改判断条件
               this.Oneface=false;
               this.Twoface=true;
               //获取数据
               //https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=2593&ImageID=6&Page=7&PageSize=30&_1531192324456
               fetch('https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID='+this.id+'&ImageID='+this.idtype+'&Page=1&PageSize=30')
                    .then(res=>{
                        res.json().then(json=>{
                            console.log('-----2------',json)
                                if(json.code==1){
                                this.dataall=json.data.List
                                    //替换url
                                this.dataall.forEach((item,index)=>{
                                    item.Url=item.Url.replace('{0}',item.LowSize); 
                                })
                                
                                }else{
                                    alert(json.msg)
                                }
                        })
                    })
           },
           //点击Swiper显示面显示
           UpSwiper(data,index){
                //修改显示条件判断
                this.Oneface=false
                this.Twoface=false
                this.Swiperis=true
                this.swiperdata=data
                this.indexst=index
                //初始化swiper
                setTimeout(()=>{
                          let mySwiper = new Swiper('.imgswiper', {
                                 autoplay:true,
                                 //loop:true
                          })
                          mySwiper.slideTo(this.indexst, 0, false)
                        },0)
                },
            //点击回退
            Wrapert(){
                this.Twoface=true
                this.Swiperis=false
            }
        },
        mounted(){
           this.id=this.$route.query.gatherid
           this.init()
        }
    }
</script>

<style lang="sass" scoped>
@import '../assets/scss/imgGather.scss'
</style>

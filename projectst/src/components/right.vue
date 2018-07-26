<template>
    <div :class="message"
    @touchmove.stop="touchMove"
    @touchstart.stop="touchStart"
    @touchend="touchEnd"
    ref="element"
    ><ul v-for="(item,index) in data" :key="index" class="ul-right">
       <p class="names-car">{{item.GroupName}}</p>
       <div v-for="(value,key) in item.GroupList" :key="key" class="cars" @click="Click(value.SerialID)">
          <p class="left-p"><img ref="rightimg" :data-src="value.Picture" class="left-p-img"></p>
          <p class="right-p">
                <span class="name-car">{{value.AliasName}}</span>
                <span class="money-car">{{value.DealerPrice}}</span>
              </p>   
       </div>     
    </ul></div>
</template>

<script>
    import Slow from  '../assets/js/Slowtoload.js'
    export default {
       props:{
         action:{
             type:Function
         },
         message:{
             type:String
         },
         idto:{
             type:String
         }
       },
        data(){
           return {
               //点击开始
               start:'',
               //滑动过程
               move:'',
               //拼接接口的id
               id:'',
               //渲染数据
               data:[]
           }
       },
       methods:{
           //滑动过程
           touchStart(e){
                this.start=e.touches[0].pageX
           },
           touchMove(e){
              this.move=e.touches[0].pageX
              let distence=this.move-this.start;
              if(distence>0){
                  this.$refs.element.style=`transform: translate3d(${distence}px,0,0)`
              }
           },
           touchEnd(){
              console.log(this.move-this.start)
              this.$refs.element.style=``
              if(this.move-this.start<100){
                
              }else{
                   this.action()
              }
           },
           Click(index){
               this.$router.push({name:'Details',query: {Id: index }})
           }
       },
       mounted() {
         // this.upimage()
       },
       // 数据更新
       updated(){
            this.id=this._props.idto;
            fetch('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID='+this.id)
            .then(res=>{
                  res.json().then(json=>{
                      if(json.code==1){
                          this.data=json.data
                      }else{
                          alert(json.msg)
                      }
                  })

                    //----------图片加载Slow参数为需要加载的img元素
                    //页面初始时执行
                    setTimeout(()=>{Slow(this.$refs.rightimg)},10)
                    //页面滚动时触发
                    window.addEventListener('scroll',()=>{
                        setTimeout(()=>{Slow(this.$refs.rightimg)},10)
                    })
            })
       }
    }
</script>

<style lang="sass" scoped>
 @import '../assets/scss/right.scss'
</style>


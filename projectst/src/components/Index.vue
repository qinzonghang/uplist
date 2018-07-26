<template>
  <div id="index">
    <div>
      <div v-for="(item,index) in arr" :key="index">
      <p class="p">{{item.n}}</p>
      <ul v-for="(items,indexs) in item.arrs" :key="indexs" class="ul" :id="item.n" @click="Click(items.MasterID)">
        <li class="li">
          <div class="img-div"><img ref="image" class="img" :data-src="items.CoverPhoto"></div>
          <!-- <img src="../assets/image/loading-1.gif" alt=""> -->
          <span class="span">{{items.Name}}</span>
        </li>
      </ul>
    </div>
    <!-- 滚动 -->
    <ul class="letter">
      <a v-for="(item,index) in first" :key="index" class="let" :href='"#"+item'>{{item}}</a>
    </ul>
    <!-- 车系组件 -->
    <Right :action="action" v-bind:message="state" :idto="id"/>
    </div>
  </div>
</template>

<script>
    import Right from './right.vue'
    import $axios from 'axios'
    import Slow from  '../assets/js/Slowtoload.js'
    export default {
      data(){
        return {
           //首字母数据
           first:[],
           //渲染的数据
           arr:[],
           state:'right',
           //向子组件RIGHT传递id
           id:'',
           nodes:[]
        }
      },
      components:{
        Right
      },
      methods:{
         init(){
           $axios('https://baojia.chelun.com/v2-car-getMasterBrandList.html?_1531095545659')
           .then(res=>{
             console.log('----总数据-------',res.data.data)
             //A-Z数组
             res.data.data.forEach((item,index) => {
                let firstNum=item.Spelling.substr(0,1);
                 if(this.first.indexOf(firstNum)==-1){
                   this.first.push(firstNum)
                 }

             });
             //空对象数组重组
             this.first.forEach((item,index)=>{
               this.arr.push({
                 n:item,
                 arrs:[]
               })
             })
             //console.log(this.arr)
             //push完整渲染数据
             res.data.data.forEach((item,index)=>{
               //循环空对象数组
               this.arr.forEach((items,indexs)=>{
                 if(item.Spelling.substr(0,1)==items.n){
                   items.arrs.push(item)
                 }
               })
             })
             
             //----------图片加载Slow参数为需要加载的img元素
             //页面初始时执行
             setTimeout(()=>{Slow(this.$refs.image)},10)
             //页面滚动时触发
             window.addEventListener('scroll',()=>{
                   setTimeout(()=>{Slow(this.$refs.image)},10)
             })
             
           })
         },
         //获取并传递组件
         Click(id){
           this.id=id
           this.state="right action"
         },
         //滑动消除action
         action(){
            this.state="right";
            console.log(2222)
         }
      },
      //点击显示车系组件
      mounted() {
        this.init()
      }
    }
</script>

<style lang="sass" scoped>
   @import '../assets/scss/index.scss'
</style>

<template>
  <view class="my-search-container" :style="{'background-color':bgColor}" @click="jump">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <uni-icons type="contact" size="16"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    props:{
      bgColor:{
        type:String,
        default:'#C00000'
      },
      radius:{
        type:Number,
        default:15
      }
    },
    name:"my-search",
    data() {
      return {
      };
    },
    methods:{
      jump(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  // background-color: #c00000;
  height:50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:0 10px;
  .my-search-box{
    // border-radius: 16px;
    height:36px;
    width:100%;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    
    text{
      font-size: 16px;
      margin-left: 5px;
    }
  }
}
</style>

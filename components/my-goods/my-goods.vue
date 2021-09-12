<template>
  <view class="good-item">
    <view class="good-item-left">
      <radio :checked="good.goods_state" color="#C00000" v-if="showRadio" @click="radioChangeEvent"></radio>
      <image :src="good.goods_small_logo||defaultPic" class="good-pic"></image>
    </view>
    <view class="good-item-right">
      <view class="good-name">{{good.goods_name}}</view>
      <view class="good-info-box">
        <view class="good-price">
         ￥{{good.goods_price | tofixed}}
        </view>
        <uni-number-box :min="1" :value="good.goods_count" v-if="showNum" @change="numChange"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props:{
      good:{
        type:Object,
        default:''
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters:{
      tofixed(num){
       return Number(num).toFixed(2)
      }
    },
    methods:{
      numChange(e){
          this.$emit('num-change',{
            goods_id:this.good.goods_id,
            goods_count:e
          })
      },
      radioChangeEvent(){
        this.$emit('radio-change',{
          goods_id:this.good.goods_id,
          goods_state:!this.good.goods_state
        })
      }
    }
  }
</script>

<style lang="scss">
  .good-item {
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    padding: 5px;

    .good-item-left {
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

      .good-pic {
        width: 100px;
        height: 100px;
            display: block;
      }
    }

    .good-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex:1;
      .good-name {
        font-size: 14px;
      }

      .good-info-box {
        display: flex;
        justify-content: space-between;
            align-items: center;
        .good-price {
          font-size: 16px;
          color: #c00000
        }
      }
    }
  }
</style>

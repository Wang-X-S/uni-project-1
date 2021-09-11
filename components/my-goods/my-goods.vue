<template>
  <view class="good-item">
    <view class="good-item-left">
      <image :src="good.goods_big_logo||defaultPic" class="good-pic"></image>
    </view>
    <view class="good-item-right">
      <view class="good-name">{{good.goods_name}}</view>
      <view class="good-info-box">
        <view class="good-price">
         ￥{{good.goods_price | tofixed}}
        </view>
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

  }
</script>

<style lang="scss">
  .good-item {
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    padding: 5px;

    .good-item-left {
      margin-right: 5px;

      .good-pic {
        width: 100px;
        height: 100px;
      }
    }

    .good-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .good-name {
        font-size: 14px;
      }

      .good-info-box {
        .good-price {
          font-size: 16px;
          color: #c00000
        }
      }
    }
  }
</style>

<template>
  <view class="cart-container" v-if="cart.length !==0">
    <!-- 地址区域 -->
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <uni-swipe-action>
      <block v-for="(good,i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="removeGoods(good)">
          <my-goods :good="good" :show-radio="true" @radio-change="radioChangeHandle" :showNum="true"
            @num-change="numChangHandle"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <my-settle></my-settle>
  </view>
<view class="empty-cart" v-else @click="goToIndex">
    <image src="../../static/tab_icons/emptyCart.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        options:[{
          text:'删除',
          style:{
            backgroundColor: '#C00000'
          }
        }]
      }
    },
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    methods: {
      goToIndex(){
        uni.switchTab({
          url:'/pages/home/home'
        })
      },
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
      radioChangeHandle(e) {
        this.updateGoodsState(e)
      },
      numChangHandle(e) {
        this.updateGoodsCount(e)
      },
      removeGoods(goods){

         this.removeGoodsById(goods.goods_id)
        
      }
    }
  }
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  
    .empty-img {
      width: 120px;
      height: 120px;
    }
  
    .tip-text {
      font-size: 16px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>

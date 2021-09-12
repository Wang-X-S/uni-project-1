<template>
  <view class="goods-detail-container">
    <view v-if="goods_info.goods_name" class="goods_info">
      <!-- 轮播图 -->
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
        <swiper-item v-for="(item,i) in goods_info.pics" :key="i">
          <image :src="item.pics_big" @click="preview(i)"></image>
        </swiper-item>
      </swiper>
      <!-- 商品信息 -->
      <view class="goods-info">
        <view class="goods-price">
          ￥{{goods_info.goods_price}}
        </view>
        <view class="goods-body">
          <view class="gooods-name">
            {{goods_info.goods_name}}
          </view>
          <view class="favi">
            <uni-icons type="star" size="24"></uni-icons>
            <text>收藏</text>
          </view>
        </view>
        <view class="yf">
          快递:免运费{{cart.length}}
        </view>
      </view>
      <!-- 富文本 -->
      <rich-text :nodes="goods_info.goods_introduce"></rich-text>
      <!-- 商品导航 -->
      <view class="goods-nav">
        <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
          @buttonClick="buttonClick" />
      </view>
    </view>


  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
      // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
      ...mapState('m_cart', ['cart']),
      ...mapGetters('m_cart',['total'])
    },
    watch:{
      total:{
        handler(newVal){
          const findResult = this.options.find(x=>x.text === '购物车')
          if(findResult){
            findResult.info = newVal
          }
        },
        immediate:true

      }
    },
 data() {
      return {
        goods_info: {},
        options: [{
          icon: 'shop',
          text: '店铺',

          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      }
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods: {
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id: goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block"')
          .replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      onClick(e) {
        if (e.content.text === "购物车") {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
        console.log(e)
      },
      // 右侧按钮的点击事件处理函数
      buttonClick(e) {
        // 1. 判断是否点击了 加入购物车 按钮
        if (e.content.text === '加入购物车') {
          
          // 2. 组织一个商品的信息对象
          const goods = {
            goods_id: this.goods_info.goods_id, // 商品的Id
            goods_name: this.goods_info.goods_name, // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          }
          // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
          this.addToCart(goods)
          
        }
      },
      ...mapMutations('m_cart', ['addToCart']),

    }
  }
</script>

<style lang="scss">

  .goods-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods_info {
    margin: 10px;

    .goods-price {
      color: #c00000;
      font-size: 18px;
      margin: 8px 0;
    }

    .goods-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 14px;
        padding-right: 10px;
      }

      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }

  .goods-detail-container {
    padding-bottom: 50px;
  }
</style>

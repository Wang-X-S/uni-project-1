<template>
  <view>
    <my-search :bgColor="`#C00000`" :radius="16" @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh+'px'}">
        <block v-for="(item,i) in cateList">
          <view :class="['left-scroll-view-item',active ===i ?'active':'']" @click="changeActive(i)">{{item.cat_name}}
          </view>
        </block>
      </scroll-view>

      <scroll-view class="catelv2-item" scroll-y="true" :style="{height: wh+'px'}" :scroll-top="scrollTop">
        <view class="catelv2-title" v-for="(item2,i2) in catelv2" :key="i2">
          {{item2.cat_name}}
          <view class="catelv3">
            <view class="catelv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodList(item3)">
              <image :src="item3.cat_icon"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>

        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins:[badgeMix],
    data() {
      return {
        wh: 0,
        cateList: [],
        active: 0,
        catelv2: [],
        scrollTop:0
      }
    },
    onLoad() {
      const infoSync = uni.getSystemInfoSync()
      this.wh = infoSync.windowHeight - 50
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        this.cateList = res.message

        //二级标题
        this.catelv2 = res.message[0].children
      },
      changeActive(i) {
        this.active = i
        //二级标题
        this.catelv2 = this.cateList[i].children
        //点击时右侧为顶头出现在屏幕
        this.scrollTop= this.scrollTop===0?1:0
      },
      gotoGoodList(item3){
        uni.navigateTo({
         url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
        })
      },
      gotoSearch(){
        uni.navigateTo({
          url:'../../subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        text-align: center;
        line-height: 60px;
        background-color: #f7f7f7;
        font-size: 12px;

        &.active {
          background-color: #FFFFFF;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            height: 60px;
            width: 3px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }

    }

    .catelv2-item {
      .catelv2-title {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
      }
    }
    .catelv3{
            display:flex;
            flex-wrap: wrap;
      .catelv3-item{
       width:33.33%;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       margin:10px 0;
      image{
        width:60px;
        height:60px;
      }
      text{
        font-size: 12px;
        font-weight: normal;
      }
    }}
  }
</style>

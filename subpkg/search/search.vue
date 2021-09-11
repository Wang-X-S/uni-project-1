<template>
  <view class="search-box">
    <!-- 搜索框 -->
    <uni-search-bar radius="100" cancelButton="none" placeholder="搜索" @input="input"></uni-search-bar>
    <!-- 关键字内容 -->
    <view class="search-content"  v-if="searchResult.length !==0">
      <view class="search-list" v-for="(item,i) in searchResult" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goodName">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 历史记录 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <view class="history-name">
          历史记录
        </view>
        <uni-icons type="trash" size="16" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-content">
        <uni-tag :text="item" type="default" :circle="true" v-for="(item,i) in historyListReverse" :key="i" @click="gotoKwList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResult: [],
        historyList: [],
        
      };
    },
    computed:{
      historyListReverse(){
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchResult()
        }, 500)
      },
      async getSearchResult() {
        if (this.kw === '') {
          this.searchResult = []
          return
        }
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        this.searchResult = res.message
        this.saveHistoryList()
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      saveHistoryList(){
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clearHistory(){
        this.historyList = []
        uni.setStorageSync('kw',[])
      },
      gotoKwList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+kw
        })
      }
    }
  }
</script>

<style lang="scss">
  .uni-searchbar {}

  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .search-content {
    padding: 0 5px;

    .search-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border: 1px solid #F0F0F0;

      .goodName {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-content {
      display: flex;
      flex-wrap: wrap;

      uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>

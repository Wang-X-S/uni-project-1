<template>
  <view class="goods-list">
    <view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
      <my-goods :good="item"></my-goods>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false
      };
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb) {
        this.isLoading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        cb && cb()
        this.total = res.message.total
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.isLoading = false
      },
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
        })
      }
    },
    onReachBottom(cb) {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      if (this.isLoading === true) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh(){
      this.queryObj.pagenum = 1,
      this.goodsList = [],
      this.total = 0,
      this.isLoading=false
      this.getGoodsList(()=>{uni.stopPullDownRefresh()})
    },
  }
</script>

<style lang="scss">
</style>

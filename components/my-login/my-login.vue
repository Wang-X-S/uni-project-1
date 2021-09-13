<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      getUserProfile() {
        // 判断是否获取用户信息成功
        uni.getUserProfile({
          desc: '登录',
          success: (res) => {
            this.updateUserInfo(res.userInfo)

            this.getToken(res)
          },
          fail: (err) => {
            uni.$showMsg('您取消了登录授权！')
          }
        })
      },
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => err)
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 换取 token
        const {
          data: loginResult
        } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        this.updateToken(loginResult.message.token)
        this.navigateBack()
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
                  url: this.redirectInfo.from,
                  complete:()=>{
                     this.updateRedirectInfo(null)
                  }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F8F8F8;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      background-color: white;
      height: 40px;
      left: 0;
      bottom: 0;
      border-radius: 100%;
      transform: translateY(50%);

    }

    .btn-login {
      width: 90%;
      background-color: #c00000;
      border-radius: 100px;
      margin: 15px 0;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>

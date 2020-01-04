//app.js
App({
  onLaunch: function () {
    let _that = this;
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });

    // 获取系统状态条高度
    wx.getSystemInfo({
      success: function(res) {
        // 导航高度
        _that.globalData.navHeight = res.statusBarHeight + 46;
        _that.globalData.windowHeight = res.windowHeight - 3;

        // 判断手机是否是IPX
        let name = 'iPhone X'
        if (res.model.indexOf(name) > -1) {
          _that.globalData.isIpx = true
        } else {
          _that.globalData.isIpx = false
        }
      }, fail(res) {
        console.log(res)
      }
    });

    // 获取当前微信小程序的运行环境
    // 根据小程序的运行环境来判断是否用正式的请求url
    let version = __wxConfig.envVersion;
    if (version == 'develop') {
      _that.globalData.baseUrl = 'http://127.0.0.1:3000/api/v1/';
    } else {
      _that.globalData.baseUrl = 'https://www.youleshu.vip/api/v1'
    }
  },
  globalData: {
    userInfo: null,
    baseUrl: ''
  }
})
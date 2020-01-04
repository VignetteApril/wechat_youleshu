// pages/login/login.js
const fetch = require('../../utils/fetch.js');
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  /**
   * 用户点击开始学习按钮，调用后台获取用户的手机号
   */
  getPhoneNumber(e) {
    wx.login({
      success(res) {
        if (res.code) {
          fetch({
            url: 'wechats/wechat_auth',
            data: { code: res.code, 
                    iv: e.detail.iv, 
                    encryptedData: e.detail.encryptedData },
            method: 'get',
            isShowToast: true
          }).then((res) => {
            console.log(res.data);
            // 存贮token
            wx.setStorageSync('token', res.data.token);
            wx.setStorageSync('mixed_phone_number', res.data.mixed_phone_number);
            wx.setStorageSync('phone_number', res.data.phone_number);
            
            // 往回跳转
            wx.navigateBack({
              delta: 1
            })

            if (res.data.token == '' || res.data.token == null) {
              wx.showToast({
                title: '授权失败',
                icon: 'none'
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onClickRefuse: function () {
    wx.navigateBack();
  }
})
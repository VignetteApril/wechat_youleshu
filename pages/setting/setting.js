// pages/setting/setting.js
const fetch = require('../../utils/fetch.js')
const App = getApp();
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    paddingBottom: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (App.globalData.isIpx == true) {
      this.setData({
        paddingBottom: '30rpx'
      })
    }
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
   * 用户点击底部退出登录
   */
  onClickLogOut: function () {
    // 清除登录状态
    
    wx.clearStorageSync();

    wx.showToast({
      title: '退出登录成功',
      icon: 'none',
      duration: 3000,
      success () {
        wx.reLaunch({
          url: '/pages/my/my',
        })
      }
    })
  },

  /**
   * 用户点击用户协议
   */
  onClickUserAgreement: function () {
    wx.navigateTo({
      url: '/pages/userAgreement/userAgreement',
    })
  },

  /**
   * 用户点击隐私条款
   */
  onClickPrivacyPolicy: function () {
    wx.navigateTo({
      url: '/pages/privacyPolicy/privacyPolicy',
    })
  }
})
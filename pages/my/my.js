// pages/my/my.js
const app = getApp();
const fetch = require('../../utils/fetch.js');
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    avatarUrl: '../../assets/icons/my/my_head.png',
    mixed_phone_number: '',
    userPhone: '点击授权手机号',
    nickName: '小朋友',
    showInpurBookCode: false,
    bookValue: '',
    token: ''
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
    let _that     = this;
    let userInfo  = wx.getStorageSync('userInfo');
    let userPhone = wx.getStorageSync('mixed_phone_number');
    let token     = wx.getStorageSync('token');

    if (userInfo != '') {
      _that.setData({
        userInfo: userInfo,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
      });
    };

    if (userPhone != '') {
      _that.setData({
        userPhone: userPhone
      });
    };

    if (token != '') {
      _that.setData({
        token: token
      })
    };
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
   * 用户点击自己的头像
   */
  onClickUserHead: function() {
    let _that = this;
    // 当没有获取到用户的信息的时候点击自己的头像跳转到授权用户头像昵称信息页面
    if (_that.data.userInfo == '') {
      wx.navigateTo({
        url: '/pages/getUserInfo/getUserInfo'
      })
    };
  },

    /**
   * 用户点击输入学习码
   */
  showInpurBookCode: function () {
    let _that = this;
    _that.setData({
      showInpurBookCode: true
    })
  },

   /**
   * 用户输入学习码
   */
  onBookValueChange: function (e) {
    this.setData({
      bookValue: e.detail
    })
  },

  /**
   * 用户关闭弹出框
   */
  onClosePop: function () {
    this.setData({
      showInpurBookCode: false
    })
  },

  /**
   * 用户点击弹出框中的提交
   */
  onClickSubmitBookCode: function () {
    let _that = this;
    util.input_book_code(_that.data.bookValue, _that.data.token);
  },

  /**
   * 用户点击反馈与帮助
   */
  goToFeedback: function() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    })
  },

  /**
   * 用户点击未登录的手机号
   */
  onClickUsePhone:function() {
    if (this.data.mixed_phone_number == '') {
      wx.navigateTo({
        url: '/pages/getUserInfo/getUserPhone',
      })
    }
  },

  /**
   * 用户点击我的课程
   */
  onClickMySubjects: function () {
    wx.navigateTo({
      url: '/pages/mySubjects/mySubjects',
    })
  },

  /**
   * 用户点击设置
   */
  onClickSetting: function () {
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  }
})
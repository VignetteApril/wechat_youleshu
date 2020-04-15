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
    userPhone: '',
    nickName: '点击授权登录',
    showInpurBookCode: false,
    bookValue: '',
    token: '',
    hint: '',
    showUpdateButton: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;

    fetch({
      url: 'text_settings/book_code_comment',
      data: {},
      method: 'get'
    }).then((res) => {
      console.log(res.data);
      _that.setData({
        hint: res.data
      })
    })
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

    if (userInfo != '' && userPhone != '') {
      _that.setData({
        userInfo: userInfo,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        userPhone: userPhone
      });
    } else if (userInfo != '' && userPhone == '') {
      _that.setData({
        nickName: '点击授权登录',
      });
    } else if (userInfo == '' && userPhone != '') {
      _that.setData({
        nickName: userPhone,
        userPhone: '',
        showUpdateButton: true
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
    let userPhone = wx.getStorageSync('mixed_phone_number');
    if (userPhone == '') {
      wx.navigateTo({
        url: '/pages/getUserInfo/getUserPhone',
      })
    } else {
      wx.showToast({
        title: '已经登录',
        icon: 'none'
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
   * 用户点击扫码看课
   */
  onClickScanning: function () {
    wx.scanCode({
      success (res) {
        const path = res["path"]
        console.log(path)   
        wx.navigateTo({
          url: "/" + path
        })
      }
    })
  },

  /**
   * 用户点击我的订单
   */
  onClickMyOrders: function () {
    util.feature_not_open();
  },

  /**
   * 用户点击收货地址
   */
  onClickMyAddress: function () {
    util.feature_not_open();
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

  bindGetUserInfo(e) {
    wx.setStorageSync('userInfo', e.detail.userInfo);

    wx.reLaunch({
      url: '/pages/my/my',
    })
  }
})
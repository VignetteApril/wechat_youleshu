// pages/mySubjects/mySubjects.js
const app = getApp();
const fetch = require('../../utils/fetch.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: []
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
    let _that = this;
    let token = wx.getStorageSync('token');

    if (token == '') {
      wx.navigateTo({
        url: '/pages/getUserInfo/getUserPhone',
      })
    } else {
      fetch({
        url: 'subjects/my_subjects',
        data: {
          token: token
        },
        method: 'get'
      }).then((res) => {
        console.log(res.data);
        _that.setData({
          data: res.data
        })
      })
    }
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
   * 用户点击某个课程
   */
  onClickSubject: function (e) {
    let subject_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../subject/subject' + '?subject_id=' + subject_id,
    })
  }
})
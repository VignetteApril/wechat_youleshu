// pages/courses/courses.js
const app = getApp();
const fetch = require('../../utils/fetch.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    grade_data: [],
    banner_url: '',
    active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;

    // 顶部视频信息
    fetch({
      url: 'courses/data',
      data: {},
      method: 'get'
    }).then((res) => {
      console.log(res.data);
      _that.setData({
        grade_data: res.data.grades,
        banner_url: res.data.banner
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
  },

  /**
   * 用户点击顶部搜索框
   */
  onClickSearchBar: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})
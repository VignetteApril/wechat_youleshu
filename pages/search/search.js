// pages/search/search.js
const App = getApp();
const fetch = require('../../utils/fetch.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
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
   * 用户改变搜索框的内容
   */
  onChange: function (e) {
    console.log(e.detail)
    this.setData({
      value: e.detail
    })
  },

  /**
   * 用户点击搜索按钮
   */
  onSearch: function () {
    let _that = this;
    let key_words = _that.data.value;

    fetch({
      url: 'subjects/search',
      data: {
        key_words: key_words
      },
      method: 'get',
      isShowToast: true
    }).then((res) => {
      console.log(res.data);
      _that.setData({
        data: res.data
      })
    })
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
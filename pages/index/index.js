//index.js
//获取应用实例
const app = getApp();
const fetch = require('../../utils/fetch.js');

Page({
  data: {
    top_video_url: '',
    base_url: app.baseUrl,
    subjects: []
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo');
  },
  onLoad: function () {
    let _that = this;

    // 顶部视频信息
    fetch({
      url: 'main_page/top_video',
      data: {},
      method: 'get'
    }).then((res) => {
      console.log(res.data);
      _that.setData({
        top_video_url: res.data.video_url
      })
    })

    // 课程信息
    // 顶部视频信息
    fetch({
      url: 'main_page/subjects',
      data: {},
      method: 'get'
    }).then((res) => {
      console.log(res.data);
      _that.setData({
        subjects: res.data
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
    });
  }
})
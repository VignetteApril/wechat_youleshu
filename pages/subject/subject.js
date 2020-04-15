// pages/subject/subject.js
const fetch = require('../../utils/fetch.js')
const App = getApp();
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: '',
    subject_id: '',
    activeNames: [],
    is_playing: '',
    current_play_url: '',
    showInpurBookCode: false,
    bookValue: '',
    owner: false,
    paddingBottom: '',
    hint: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that      = this;
    let token      = wx.getStorageSync('token');
    let subject_id = options.subject_id;
    
    fetch({
      url: 'text_settings/book_code_comment',
      data: {},
      method: 'get'
    }).then((res) => {
      _that.setData({
        hint: res.data
      })
    })

    // 如果是扫描小程序进来的用户走scene这套逻辑
    const scene = decodeURIComponent(options.scene)
    console.log(scene)
    let subject_id_qr = scene.split('=')[1];
    if (typeof(subject_id_qr) != "undefined") {
      subject_id = subject_id_qr;
    }

    fetch({
      url: 'subjects/' + subject_id,
      data: {},
      method: 'get'
    }).then((res) => {
      _that.setData({
        subject: res.data,
        current_play_url: res.data.sample_video_url,
        subject_id: subject_id
      })

      wx.setNavigationBarTitle({
        title: res.data.name
      });

      let formal_video_url = res.data.courses[0].video_url;
      let formal_video_id  = res.data.courses[0].id;
      if (util.check_login_status()) {
        fetch({
          url: 'subjects/check_subject_owner',
          data: {
            token: token,
            subject_id: subject_id
          },
          method: 'get'
        }).then((res) => {
          _that.setData({
            owner: res.data.owner
          })
          
          if (res.data.owner == false) {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 3000
            })
          } else {
            _that.setData({
              current_play_url: formal_video_url,
              is_playing: formal_video_id
            })
          };
        })
      } else {
        wx.navigateTo({
          url: '/pages/getUserInfo/getUserPhone',
        })
      };
    })

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
    this.videoContext = wx.createVideoContext('courseVideo');
    this.dialog = this.selectComponent("#dialog");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
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
   * 用户点击课程目录、课程介绍cell group
   */
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
   
  /**
   * 用户点击某个课程
   * 该操作将会改变正在播放的视频
   */
  onChangeVideo(event) {
    let _that = this;
    if (_that.data.owner == false) {
      wx.showToast({
        title: '您还没有拥有当前课程的权限，请输入学习码获取.',
        icon: 'none'
      })
    } else {
     /**
      * 修改现在播放的课程的id
      * 修改正在播放的课程的视频url
      * 坑点：切换视频的时候不能够单纯的更换下video tag的src
      *      还需要先pause当前的视频，等待src更换完毕，在主动调
      *      调用play
      */
      _that.videoContext.pause();
      _that.setData({
        is_playing: event.target.dataset.id,
        current_play_url: event.target.dataset.videoUrl
      });
      _that.videoContext.play();
    }
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
    let token = wx.getStorageSync('token');
    let book_code = _that.data.bookValue;
    util.input_book_code(book_code, token, _that.data.subject_id);
  },

  /**
   * 图片加载监听
   */
  imageLoad: function () {
    this.setData({
      activeNames: ['1', '2']
    })
  }
})
// pages/myvault/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   maindata:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	console.log("onLoad:我的金库")
  	var that=this
  var openId =wx.getStorageSync("sessionKey")
   wx.request({
		url: app.globalData.serverAddr + "/weixin/clothing/distribution/homePageData",
		data: {
			appId: app.globalData.appId,
			openId:openId
			
		},
		success: function(res) {
			that.setData({maindata:res.data.data})
		}
	})
  
  },
  
  
  applyCrash: function () {
    wx.navigateTo({
      url: "/pages/apply-for-cash/index"
    })
  },
  searchTap: function (e) {
    wx.navigateTo({
      url: "/pages/searchList/index"
    })
  },
tomyfans:function(e){
	   wx.navigateTo({
      url: "/pages/myFans/index"
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
  
  }
})
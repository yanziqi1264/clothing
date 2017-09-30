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
  
  toapplyrecord:function(){
  	 wx.navigateTo({
      url: "/pages/myapply/index"
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
tohistoryrecord:function(e){
	   wx.navigateTo({
      url: "/pages/myhistory/index"
    })
},
tomoneyrecord:function(e){
	   wx.navigateTo({
      url: "/pages/myincome/index"
    })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  daiyantips:function(){
  	
  	wx.showModal({
  		title:"提示",
  		content:"只要你在店铺分享任何商品或者活动页面到微信，吸引到朋友点击并且进入店铺，TA即会成为你到一级粉丝，TA分享的一级粉丝会成为你的二级粉丝，一、二级粉丝支付购买的任何店铺内的商品，都会按照一定的计算方法算作你的奖金收益，如果没有获得收益，主要可能有以下原因：-你的朋友在之前已经成为其他人的粉丝；-系统判定该笔订单数据异常，收益取消；-自己点击了自己分享的商品链接",
  		showCancel:false
  		
  		
  	})

  	
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
     var openId =wx.getStorageSync("sessionKey")
    return {
      title: '时尚大衣',
      path: 'pages/wholesale/wholesale?shareOpenId='+openId,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
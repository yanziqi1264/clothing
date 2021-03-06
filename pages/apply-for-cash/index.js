// pages/apply-for-cash/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  advisableMoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	var that =this
  	var openId =wx.getStorageSync("sessionKey")
  	wx.request({
		url: app.globalData.serverAddr + "/weixin/clothing/cashwithdrawal/advisableMoney",
		data: {
			appId: app.globalData.appId,
			openId:openId
		},
		success: function(res) {
			if(res.data.success) {
				that.setData({advisableMoney:res.data.data})
			}

		}
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
  formSubmit:function(e){
  	console.log( e.detail.value)
  	var money= e.detail.value.money
  	if(money%100 !=0){
  		 wx.showModal({
        title: '提示',
        content: '提现金额必须是100的整数！',
        showCancel: false
      })
  		return
  	}
  	if(this.data.advisableMoney < money){
  		 wx.showModal({
        title: '提示',
        content: '提现金额必须超过可提现金额！',
        showCancel: false
      })
  		return
  	}
  	var weixinid= e.detail.value.weixinid	
  	var mobile= e.detail.value.mobile	
  	 var openId =wx.getStorageSync("sessionKey")
  	wx.request({
		url: app.globalData.serverAddr + "/weixin/clothing/cashwithdrawal/forApplay",
		data: {
			appId: app.globalData.appId,
			openId:openId,
			money:money,
			mobile:mobile,
			wxNo:weixinid
		},
		success: function(res) {
			if(res.data.success) {

				var detailPicsStr = res.data.data.attributes.commodityshowpics;
				var detailPicsArr = detailPicsStr.split(";");
				var picarrays = new Array();
				for(var i = 0; i < detailPicsArr.length; i++) {
					var pic = {};
					pic.image = detailPicsArr[i].split(",")[0];
					picarrays.push(pic);
				}
				
				var method = common.setIntervalTims(e,res.data.data.endTime,1000)
				console.log("method:"+method)
					e.setData({
					detailPics: picarrays,
					productInfo: res.data.data,
					inteverMethod:method
				});
			}

		}
	})
  	
  }
})
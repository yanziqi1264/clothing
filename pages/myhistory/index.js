var app = getApp()
Page({
  data: {
    statusType: ["一级粉丝", "二级粉丝"],
    currentTpye: 0,
    tabClass: ["", ""],
    levelOneFans:[],
    current1Page:1,
    pageSize:10,
     current2Page:1,
    levelTwoFans:[]
  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentTpye = curType
    this.setData({
      currentTpye: curType
    });
    this.onShow();
  },
  orderDetail: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  onLoad: function (options) {
  
 	this.getFans(1,this.data.current1Page,10)
   this.getFans(2,this.data.current1Page,10)

  },
  getFans:function(type,currentPage,pageSize){
  	console.log("fans")
  	 	var that=this
  	 var openId =wx.getStorageSync("sessionKey")
  	 wx.request({
		url: app.globalData.serverAddr + "/weixin/clothing/distribution/fans",
		data: {
			appId: app.globalData.appId,
			openId:openId,
			currentPage:currentPage,
			pageSize:pageSize,
			levelFlag:type
			
		},
		success: function(res) {
			
			if(type == 1){
				var levelOneFans=that.data.levelOneFans
				for(var i=0;i<res.data.data.length;i++){
				levelOneFans.push(res.data.data[i])
				}
				that.setData({levelOneFans:res.data.data,current1Page:currentPage+1})
			}else{
				var levelTwoFans=that.data.levelTwoFans
				for(var i=0;i<res.data.data.length;i++){
				levelTwoFans.push(res.data.data[i])
				}
				that.setData({levelTwoFans:res.data.data,current2Page:currentPage+1})
			}
			
			
		}
	})
  	
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  getOrderStatistics: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/statistics',
      data: { token: app.globalData.token },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 0) {
          var tabClass = that.data.tabClass;
          if (res.data.data.count_id_no_pay > 0) {
            tabClass[1] = "red-dot"
          }
          if (res.data.data.count_id_no_transfer > 0) {
            tabClass[2] = "red-dot"
          }
          if (res.data.data.count_id_no_confirm > 0) {
            tabClass[3] = "red-dot"
          }
          if (res.data.data.count_id_success > 0) {
            tabClass[4] = "red-dot"
          }

          that.setData({
            tabClass: tabClass,
          });
        }
      }
    })
  },
  onShow: function () {
    // 获取订单列表
    wx.showLoading();
    var that = this;
    var postData = {
      token: app.globalData.token
    };
    if (that.data.currentTpye == 1) {
      postData.status = 0
    }
    if (that.data.currentTpye == 2) {
      postData.status = 1
    }
    if (that.data.currentTpye == 3) {
      postData.status = 2
    }
    if (that.data.currentTpye == 4) {
      postData.status = 4
    }
    this.getOrderStatistics();
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/list',
      data: postData,
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 0) {
          that.setData({
            orderList: res.data.data.orderList,
            logisticsMap: res.data.data.logisticsMap,
            goodsMap: res.data.data.goodsMap
          });
        } else {
          this.setData({
            orderList: null,
            logisticsMap: {},
            goodsMap: {}
          });
        }
      }
    })

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  }
})
var app = getApp()
var common = require('../common.js')
Page({
	data: {
		list: [],
		totalPrice: ""

	},
	//事件处理函数
	bindViewTap: function() {},
	onLoad: function() {
		console.log("onLoad")
		app.getUserInfo(function(userinfo) {
			var openId = wx.getStorageSync("sessionKey")
			console.log("----0----" + openId + "," + userinfo)
		})
	},
	onShow: function() {
		console.log('onShow')

		this.handledata()
	},
	addToShoppingCart: function(e) {
		var that = this
		common.saveShoppingCartInfo(that, e.currentTarget.dataset.goodid, e.currentTarget.dataset.goodname, e.currentTarget.dataset.pic, e.currentTarget.dataset.goodprice, 1, 1);
		this.handledata()
	},
	reduceToShoppingCart: function(e) {
		var that = this
		common.saveShoppingCartInfo(that, e.currentTarget.dataset.goodid, e.currentTarget.dataset.goodname, e.currentTarget.dataset.pic, e.currentTarget.dataset.goodprice, -1, 1);
		this.handledata()
	},
	handledata: function(e) {
		var totalPrice = 0
		var that = this
		var shoppingcart = common.getShoppingCartInfo(that, app.globalData.appId);
		for(var i = 0; i < shoppingcart.length; i++) {
			totalPrice = parseFloat(totalPrice) + parseFloat(shoppingcart[i].totalprice)
		}
		totalPrice = parseFloat(totalPrice).toFixed(2)
		this.setData({
			list: shoppingcart,
			totalPrice: totalPrice
		});
	},
	toPayOrder: function() {
		console.log("toPayOrder" + this.data.list.length)
		if(this.data.list.length > 0) {
			wx.navigateTo({
				url: "/pages/order-details/index"
			})
		} else {
  wx.showModal({
      title: '购物车中没有任何商品！',
      content: '',
      showCancel:false,
      success: function (res) {
      }
    })
		}

	},
	toIndexPage:function(e){
		wx.navigateTo({
				url: "/pages/wholesale/wholesale"
			})
	}
})
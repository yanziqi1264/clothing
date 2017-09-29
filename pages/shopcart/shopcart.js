var app = getApp()
var common = require('../common.js')
Page({
	data: {
		list: [],
		totalPrice:0

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
		var goodid =e.currentTarget.dataset.goodid
		var id =e.currentTarget.dataset.id
		console.log("reduceToShoppingCart："+goodid+"；"+id)
		var key1 =app.globalData.appId+ '_item'+id
		var exitem =wx.getStorageSync(key1)
		exitem.count =exitem.count+1
		if(exitem.count<=0){
			wx.removeStorageSync(key1)
		}else{
		wx.setStorageSync(key1 ,exitem)
		}
		this.handledata()
	},
	reduceToShoppingCart: function(e) {
		var that = this
		var goodid =e.currentTarget.dataset.goodid
		var id =e.currentTarget.dataset.id
		console.log("reduceToShoppingCart："+goodid+"；"+id)
		var key1 =app.globalData.appId+ '_item'+id
		var exitem =wx.getStorageSync(key1)
		exitem.count =exitem.count-1
		if(exitem.count<=0){
			wx.removeStorageSync(key1)
		}else{
		wx.setStorageSync(key1 ,exitem)
		}
		this.handledata()
	},
	handledata: function(e) {
		var pplist = common.getShoppingCartInfo(this, app.globalData.appId)
		
		var productidList= wx.getStorageSync(app.globalData.appId+ '_productidList' )
		pplist =common.removeProduct(pplist)
		var totolprice =0
		for(var i=0;i<pplist.length;i++){
			var key1=app.globalData.appId+ '_productinfo'+ pplist[i].productid
			var productInfo = wx.getStorageSync(key1)
			if(!productInfo.count){
				productInfo.count=0
			}
			productInfo.count =productInfo.count+pplist[i].count
			totolprice=totolprice+this.countprice(productInfo)
			console.log("totalprice:"+totolprice)
		}
		
		this.setData({
			list: pplist,
			totalPrice:totolprice.toFixed(2)
		});
	},
	countprice:function(productInfo){
		var totalprice =0;
		var priceArray=productInfo.priceArray
		if(priceArray &&priceArray.length>0){
			for(var m=0;m<priceArray.length;m++){
			if(productInfo.count>=priceArray[m].start &&productInfo.count <= priceArray[m].end){
				totalprice=priceArray[m].price*productInfo.count
				break
			}
		}
		}else{
				totalprice=productInfo.attributes.commoditycurrentprice*productInfo.count
		}
		
		return totalprice
	
		
	},
	toPayOrder: function() {
		
		if(this.data.list.length > 0) {
			
			 var orderinfo={}
    var shoplist=this.data.list
 
    orderinfo.shoplist=shoplist
    orderinfo.money=this.data.totalPrice
  	wx.setStorageSync("orderinfo",orderinfo)
			wx.navigateTo({
				url: "/pages/order-details/index?ordertype=1&handleFlag=1",
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
		console.log("toIndexPage")
		
		wx.switchTab({
  	url: "/pages/wholesale/wholesale"
})
	}
})
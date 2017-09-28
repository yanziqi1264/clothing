var app = getApp()
var common = require('../common.js')
Page({
  data: {
  	userInfo:{},
  	shopInfo:{},
  	includepoints:[],
  	point:{},
  	markers:[]
  	
  },
  //事件处理函数
  bindViewTap: function () {
  },
  onLoad: function () {
    var that =this
    try{
    	if(!app.globalData.userInfo){
		app.getUserInfo(function(userInfo){
			that.setData({userInfo:userInfo});
		})
	}else{
		that.setData({userInfo:app.globalData.userInfo});
	}
	
	 	console.log('onLoad11111:')
	
    }catch(e){
    	console.log('onLoad:'+e)
    }
	
  },
  queryorderlist:function(option){
  	var typeId = option.currentTarget.dataset.typeid
  	wx.navigateTo({url:"../order-list/index?typeid="+typeId})
  },
  mySpell:function (e) {
    wx.navigateTo({
      url: "/pages/myspell/index"
    })
  },
  myVault: function (e) {
    wx.navigateTo({
      url: "/pages/myvault/index"
    })
  },
  myCoupon:function(e){
  	
  	 wx.navigateTo({
      url: "/pages/myyouhuiquan/index"
    })
  },
  
  toshopdetail:function(e){
  	 wx.navigateTo({
      url: "/pages/aboutBusiness/index"
    })
  },
  mypoints:function(e){
  	 wx.navigateTo({
      url: "/pages/mypoint/index"
    })
  },
  myAddress:function(e){
  	wx.chooseAddress({
  success: function (res) {
    console.log(res.userName)
    console.log(res.postalCode)
    console.log(res.provinceName)
    console.log(res.cityName)
    console.log(res.countyName)
    console.log(res.detailInfo)
    console.log(res.nationalCode)
    console.log(res.telNumber)
  }
})	
  }
})
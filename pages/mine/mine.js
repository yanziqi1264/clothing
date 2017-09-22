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
	common.getShopInfo(that,app.globalData.appId)
    }catch(e){
    	console.log('onLoad:'+e)
    }
	
  },
  queryorderlist:function(option){
  	var typeId = option.currentTarget.dataset.typeid
  	wx.navigateTo({url:"../order-list/index?typeid="+typeId})
  }
})
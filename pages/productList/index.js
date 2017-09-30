var app = getApp() // 获取入口文件app的应用实例
var common = require('../common.js')
Page({
  data: {
    statusType: [ "最新","价格"],
    currentTpye: 0,
    tabClass: ["","",""],
    fanslist: [],
    currentPage: 1,
    pageSize: 10,
    productlist:[],
    currentName:"",
	currentType:"",
	currentFlag:"",
	currentOrder:1,
	currentPamram:1
  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentTpye = curType
    this.setData({
      currentTpye: curType,
      currentPage: 1,
      productlist:[]
    });
   	if(this.data.currentFlag ==1){
  		this.getProductListByName(this, this.data.currentName,this.data.currentPage, 10,this.data.currentOrder,this.data.currentPamram)
  	}else{
  		this.getProductListByType(this,this.data.currentType,1,this.data.currentPage,this.data.pageSize,this.data.currentOrder,this.data.currentPamram)
  	}

    this.onShow();
  },
  onLoad: function (options) {
  
  var flag=options.flag
  this.setData({currentFlag:options.flag})
  	if(flag ==1){
  		console.log("options.name:"+options.name)
  		this.setData({currentName:options.name})
  		this.getProductListByName(this, options.name,1, 10,1,1)
  	}else{
  		var typeId =options.typeId
  		var flag =options.flag
  	if(!typeId){
  		typeId=0
  	}
  	this.setData({currentType:options.typeId})
  		this.getProductListByType(this,typeId,1,this.data.currentPage,this.data.pageSize,flag,name)
  	}
	

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  getOrderStatistics: function () {

  },
  onShow: function () {

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
  	console.log("onReachBottom:"+onReachBottom)
    // 页面上拉触底事件的处理函数
	if(this.data.flag ==1){
  		this.getProductListByName(this, this.data.currentName,this.data.currentPage+1, 10,this.data.currentOrder,this.data.currentPamram)
  	}else{
  		this.getProductListByType(this,this.data.currentType,1,this.data.currentPage+1,this.data.pageSize,this.data.currentOrder,this.data.currentPamram)
  	}
  },
  
 getProductListByName:function(e, name, currentPage, pageSize,orderType,orderParam) {
	
	wx.request({
		url: app.globalData.serverAddr + "/weixin/commodity/clothing/getCommodityList",
		data: {
			appId: app.globalData.appId,
			currentPage: currentPage,
			pageSize: pageSize,
			sellType:1,
			productName:name,
			orderType:orderType,
			orderParam:orderParam
		},
		success: function(res) {
 			
			var productlist = e.data.productlist
			
			var dataArray = res.data.data
			for(var i = 0; i < dataArray.length; i++) {
				dataArray[i].count =common.getProductCount(dataArray[i].id)
				var commoditycoverpic = dataArray[i].attributes.commoditycoverpic;
				if(commoditycoverpic) {
					commoditycoverpic = commoditycoverpic.split(",")[0]
					dataArray[i].attributes.commoditycoverpic = commoditycoverpic
				}
				productlist.push(dataArray[i])
			}
			
			e.setData({
				currentPage: currentPage,
				productlist: productlist,
				open: false
			});
		}

	})
},
  getProductListByType:function(e, type,sellType,currentPage,pageSize,orderType,orderParam) {
	var requsturl=app.globalData.serverAddr + app.globalData.productlistUrl
	wx.request({
		url: requsturl,
		data: {
			appId:  app.globalData.appId,
			typeId: type,
			currentPage: currentPage,
			pageSize: pageSize,
			sellType:sellType,
			name:name
		},
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8;'
		},
		method:"POST",
		success: function(res) {
			console.log(res.data)
			if(res.data.success) {
				var productlist=[]
				var dataArray = res.data.data
				for(var i = 0; i < dataArray.length; i++) {
					dataArray[i].count = common.getProductCount(dataArray[i].id)
					var commoditycoverpic = dataArray[i].attributes.commoditycoverpic;
					if(commoditycoverpic) {
						commoditycoverpic = commoditycoverpic.split(",")[0]
						dataArray[i].attributes.commoditycoverpic = commoditycoverpic
					}
					productlist.push(dataArray[i])
				}
					e.setData({
					productlist: productlist,
				})
				

			}

		}
	})
},
toDetailsTap: function(e) {
	
		var sellType = e.currentTarget.dataset.selltype
		var goodid = e.currentTarget.dataset.goodid
		if(sellType==1){
			wx.navigateTo({
				url: "../goods-detail/index?goodid=" + goodid
			})
		}else if(sellType==2){
				wx.navigateTo({
				url: "../goods-detail/index?goodid=" + goodid
			})
		}else if(sellType==3){
				wx.navigateTo({
				url: "../limit-goods/index?goodid=" + goodid
			})
		}
		
	
	},
	 searchTap: function (e) {
      wx.navigateTo({
        url: "/pages/searchList/index"
      })
  },
})
var app = getApp() // 获取入口文件app的应用实例
var common = require('../common.js')
Page({
  data: {
    statusType: ["销量", "最新","价格"],
    currentTpye: 0,
    tabClass: ["", "","",""],
    fanslist: [],
    currentPage: 1,
    pageSize: 10,
    productlist:[]

  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentTpye = curType
    this.setData({
      currentTpye: curType,
      currentPage: 1
    });
    this.onShow();
  },
  onLoad: function (options) {
  	var typeId =options.typeId
  	var flag =options.flag
  	var name =options.name
  	if(!typeId){
  		
  		typeId=0
  	}
	this.getProductListByType(this,typeId,1,this.data.currentPage,this.data.pageSize,flag,name)

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
    // 页面上拉触底事件的处理函数

  },
  getProductListByType:function(e, type,sellType,currentPage,pageSize,flag,name) {
	var requsturl=app.globalData.serverAddr + app.globalData.productlistUrl
	if(flag ==1){
		requsturl=app.globalData.serverAddr + app.globalData.productlistnameUrl
	}
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
var app = getApp() // 获取入口文件app的应用实例
var common = require('../common.js')
Page({
	data: {
		statusType: ["最新", "价格"],
		currentTpye: 0,
		tabClass: ["", "", ""],
		fanslist: [],
		currentPage: 1,
		pageSize: 10,
		productlist: [],
		currentName: "",
		currentType: "",
		currentFlag: "",
		currentOrder: 1,
		currentPamram: 1
	},
	statusTap: function(e) {
		var curType = e.currentTarget.dataset.index;
		this.data.currentTpye = curType
		this.setData({
			currentTpye: curType,
			currentPage: 1,
			productlist: []
		});
		this.onShow();
	},
	onLoad: function(options) {

		var flag = options.flag
		this.setData({
			currentFlag: options.flag
		})
		
		console.log("currentFlag.name:" + options.flag)
		if(flag == 1) {
			
			this.setData({
				currentName: options.name
			})
		} else if(flag == 2) {
			var typeId = options.typeId
			var flag = options.flag
			if(!typeId) {
				typeId = 0
			}
			console.log("flag:" + flag)
			this.setData({
				currentType: options.typeId
			})
		} else if(flag == 3) {
		} else {
		}

	},
	onReady: function() {
		// 生命周期函数--监听页面初次渲染完成

	},
	getOrderStatistics: function() {

	},
	onShow: function() {
		console.log("this.data.flag:"+this.data.currentFlag)
		if(this.data.currentFlag == 1) {
			this.getProductListByName(this, this.data.currentName, 1, 10, this.data.currentOrder, this.data.currentPamram)
		} else if(this.data.currentFlag == 2) {
			this.getProductListByType(this, this.data.currentType, 1, this.data.currentPage, this.data.pageSize, this.data.currentOrder, this.data.currentPamram)
		} else if(this.data.currentFlag == 3) {
			this.getProductListByName(this, null, 3, this.data.currentPage, 10, this.data.currentOrder, this.data.currentPamram)
		} else {
			this.getProductListByName(this, null, 2, this.data.currentPage, 10, this.data.currentOrder, this.data.currentPamram)
		}
	},
	onHide: function() {
		// 生命周期函数--监听页面隐藏

	},
	onUnload: function() {
		// 生命周期函数--监听页面卸载

	},
	onPullDownRefresh: function() {
		// 页面相关事件处理函数--监听用户下拉动作

	},
	onReachBottom: function() {
		this.setData({
			currentPage: this.data.currentPage + 1
		})
		// 页面上拉触底事件的处理函数
wx.showLoading({
  title: '加载中',
})
	this.onShow()
	},

	getProductListByName: function(e, name, sellType, currentPage, pageSize, orderType, orderParam) {

		var data = {}

		data.appId = app.globalData.appId
		data.currentPage = currentPage
		data.pageSize = pageSize
		data.sellType = sellType
		if(name) {
			data.productName = name
		}
		data.orderType = orderType
		console.log("orderParam:" + orderParam)
		data.orderParam = orderParam
		wx.request({
			url: app.globalData.serverAddr + "/weixin/commodity/clothing/getCommodityList",
			data: data,
			success: function(res) {
 				setTimeout(function(){
  wx.hideLoading()
},2000)
				var productlist = e.data.productlist

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
					open: false
				});
			}

		})
	},
	getProductListByType: function(e, type, sellType, currentPage, pageSize, orderType, orderParam) {
		var requsturl = app.globalData.serverAddr + app.globalData.productlistUrl
		wx.request({
			url: requsturl,
			data: {
				appId: app.globalData.appId,
				typeId: type,
				currentPage: currentPage,
				pageSize: pageSize,
				sellType: sellType,
				orderType:orderType,
				orderParam:orderParam
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded;charset=UTF-8;'
			},
			method: "POST",
			success: function(res) {
				  setTimeout(function(){
  wx.hideLoading()
},2000)
				console.log(res.data)
				if(res.data.success) {
					var productlist = e.data.productlist
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
		if(sellType == 1) {
			wx.navigateTo({
				url: "../goods-detail/index?goodid=" + goodid
			})
		} else if(sellType == 2) {
			wx.navigateTo({
				url: "../goods-detail/index?goodid=" + goodid
			})
		} else if(sellType == 3) {
			wx.navigateTo({
				url: "../limit-goods/index?goodid=" + goodid
			})
		}

	},
	searchTap: function(e) {
		wx.navigateTo({
			url: "/pages/searchList/index"
		})
	},
})
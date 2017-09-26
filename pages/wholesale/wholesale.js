var pagesize = 10
var currentpage = 1
var app = getApp() // 获取入口文件app的应用实例
var common = require('../common.js')
Page({
	data: {
		indicatorDots: true,
		vertical: false,
		autoplay: true,
		interval: 3000,
		duration: 1200,
		loadingHidden: false, // loading
		swiperCurrent: 0,
		selectCurrent: 0,
		scrollTop: "0",
		loadingMoreHidden: true,
		swipers: [{
			image: "/images/retail01.png",
			goodsId: "1"
		}, {
			image: "/images/retail01.png",
			goodsId: "2"
		}, {
			image: "/images/retail01.png",
			goodsId: "3"
		}, {
			image: "/images/retail01.png",
			goodsId: "4"
		}, {
			image: "/images/retail01.png",
			goodsId: "5"
		}],
		toplist: [],
		typelist: [],
		productlist: [],
		logos: [{
			id: "1",
			image: "/images/spring.png",
			title: "春装"
		}, {
			id: "1",
			image: "/images/summer.png",
			title: "夏装"
		}, {
			id: "1",
			image: "/images/autumn.png",
			title: "秋装"
		}, {
			id: "1",
			image: "/images/winter.png",
			title: "冬装"
		}],
		goods: [{
				image: '/images/retail_goods01.png',
				id: "1",
				name: "17秋冬新款女宽松大码休闲双面尼羊 绒大衣休闲双面尼羊绒大衣休闲",
				minPrice: "780"
			},
			{
				image: '/images/retail_goods02.png',
				id: "2",
				name: "17秋冬新款女宽松大码休闲双面尼羊 绒大衣休闲双面尼羊绒大衣休闲",
				minPrice: "780"
			},
			{
				image: '/images/retail_goods01.png',
				id: "3",
				name: "17秋冬新款女宽松大码休闲双面尼羊 绒大衣休闲双面尼羊绒大衣休闲",
				minPrice: "780"
			},
			{
				image: '/images/retail_goods02.png',
				id: "4",
				name: "17秋冬新款女宽松大码休闲双面尼羊 绒大衣休闲双面尼羊绒大衣休闲",
				minPrice: "780"
			},
			{
				image: '/images/retail_goods01.png',
				id: "5",
				name: "17秋冬新款女宽松大码休闲双面尼羊 绒大衣休闲双面尼羊绒大衣休闲",
				minPrice: "780"
			},
			{
				image: '/images/retail_goods02.png',
				id: "6",
				name: "17秋冬新款女宽松大码休闲双面尼羊 绒大衣休闲双面尼羊绒大衣休闲",
				minPrice: "780"
			}
		]

	},

	onLoad: function(e) {
		
		wx.showShareMenu({
  withShareTicket: true
})
		console.log('onLoad')
		var that = this
		common.getTopProductListByType(that, app.globalData.appId, app.globalData.toobarIds[0]);

		common.getTypeList(that, app.globalData.appId, app.globalData.toobarIds[0], 1, 4)
		common.getHotProductListByType(that, app.globalData.appId, app.globalData.toobarIds[0], currentpage, pagesize,2);
	},

  searchTap: function (e) {
      wx.navigateTo({
        url: "/pages/searchList/index"
      })
  },

	//进入产品列表
	gotogoods: function(e) {
		var typeid = e.currentTarget.dataset.typeid
		wx.navigateTo({
			url: "../classify/index?typeid=" + typeid
		})
	},

	toDetailsTap: function(e) {
		var goodid = e.currentTarget.dataset.goodid
		wx.navigateTo({
			url: "../goods-detail/index?goodid=" + goodid
		})
	},
	addToShoppingCart: function(e) {
		var that = this
		common.saveShoppingCartInfo(that, e.currentTarget.dataset.goodid, e.currentTarget.dataset.goodname, e.currentTarget.dataset.pic,e.currentTarget.dataset.goodprice, 1,1);

	},
	reduceToShoppingCart: function(e) {
		
		var that = this
		common.saveShoppingCartInfo(that, e.currentTarget.dataset.goodid, e.currentTarget.dataset.goodname,e.currentTarget.dataset.pic,e.currentTarget.dataset.goodprice,  -1,1);
	},

	swiperchange: function(e) {
		this.setData({
			swiperCurrent: e.detail.current
		})
	},
	tapBanner: function(e) {
		if(e.currentTarget.dataset.id != 0) {
			console.log("tapBanner###########打印当前的商品详情" + e.currentTarget.dataset.id);
			wx.navigateTo({
				url: "/pages/goods-detail/index"
			})
		}
	},

	changeIndicatorDots: function(e) {
		this.setData({
			indicatorDots: !this.data.indicatorDots
		})
	},
	changeVertical: function(e) {
		this.setData({
			vertical: !this.data.vertical
		})
	},
	changeAutoplay: function(e) {
		this.setData({
			autoplay: !this.data.autoplay
		})
	},
	intervalChange: function(e) {
		this.setData({
			interval: e.detail.value
		})
	},
	durationChange: function(e) {
		this.setData({
			duration: e.detail.value
		})
	},
		onReachBottom: function () {
		var that =this
		 wx.showLoading({
        title: '正在加载中，请稍候...',
        mask: true,
        complete:function(option){
        	console.log("获取产品"+that.data.currentPage)
        	common.getHotProductListByType(that, app.globalData.appId, app.globalData.toobarIds[0], currentpage+1, pagesize);
        					setTimeout(function() {
				wx.hideLoading();
			}, 1000);

        }
      })
	},
	onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '时尚大衣',
      path: 'pages/retail/retail',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
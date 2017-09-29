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
		typechildlist:[],
    
    logos: [{
      image: "../../images/logo7.png",
      title: "京东超市"
    }, {
      image: "../../images/logo8.png",
      title: "全球购"
    }, {
      image: "../../images/logo9.png",
      title: "服装城"
    }, {
      image: "../../images/logo10.png",
      title: "京东生鲜"
    }, {
      image: "../../images/logo7.png",
      title: "京东到家"
    }, {
      image: "../../images/logo8.png",
      title: "充值中心"
    }, {
      image: "../../images/logo9.png",
      title: "京东金融"
    }, {
      image: "../../images/logo10.png",
      title: "物流查询"
    }, {
      image: "../../images/logo7.png",
      title: "领券"
    }, {
      image: "../../images/logo8.png",
      title: "我的关注"
    }
    ],
    

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
		pifaList:[],
		linshouList:[],
		typechildlist2:[],
		pingtuanList:[],
		listcount:0
		

	},

	onLoad: function(e) {
		
		wx.showShareMenu({
  withShareTicket: true
})
		console.log('onLoad')
		var that = this
		common.getTopProductListByType(that, app.globalData.appId, 0)
		//common.getTypeChildList(that, app.globalData.appId, 41, 1, 4,1)
		//common.getTypeChildList(that, app.globalData.appId, 42, 1, 4,2)
		common.getHotProductListByType(that, app.globalData.appId,0, currentpage, pagesize,1)
		//this.getProductListByType(that,41,1,'pifa')
		//this.getProductListByType(that,42,1,'linshou')
		this.getProductListByType(that,0,3,'tuangou')
		
	},
  searchTap: function (e) {
      wx.navigateTo({
        url: "/pages/searchList/index"
      })
  },
//根据模块获取产品列表
 getProductListByType:function(e, type,sellType,flag) {
	
	wx.request({
		url: app.globalData.serverAddr + app.globalData.recommendproductlistUrl,
		data: {
			appId:  app.globalData.appId,
			rootTypeId: type,
			currentPage: 1,
			pageSize: 3,
			sellType:sellType
		},
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
				if(flag=='tuangou'){
					e.setData({
					pingtuanList: productlist,
				})
				}else if(flag=='xianshi'){
						e.setData({
					linshouList: productlist,
				})
				}
				

			}

		}
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
        	common.getHotProductListByType(that, app.globalData.appId, 0, currentpage+1, pagesize,1);
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
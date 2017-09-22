var app = getApp() // 获取入口文件app的应用实例
var common = require('../common.js')
Page({
  data: {
    navLeftItems: [{
      id: "1",
      tree: {
        desc: "热销"
      },
    },
    {
      id: "2",
      tree: {
        desc: "潮流"
      },
    }, {
      id: "3",
      tree: {
        desc: "复古"
      },
    }, {
      id: "4",
      tree: {
        desc: "经典"
      },
    },],
    navRightItems: [],
    curNav: 1,
    curIndex: 0,
    currentPage:1,
    pageSize:10,
    typelist:[],
	productlist:[],
	open:false,
	topload:false,
	scrollTop:0,
    goods: [
      {
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
  onLoad: function (e) {
 	console.log('onLoad'+e.typeid)
 	 var that = this
	common.getTypeList(that,app.globalData.appId,e.typeid,1,10,1)
  },
 onShow:function(e){
 		
 },

  //事件处理函数
  switchRightTab: function (e) {
  	var that =this
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index)
    this.setData({
      curNav: id,
      curIndex: index,
        productlist: []
    })
    common.getProductListByType(that,id,1,this.data.pageSize,1)
  
  },
  bindDownload:function(e){
  	console.log("开始下拉")
    var that = this
     this.setData({productlist:[]})
    wx.showLoading({
      title: '正在刷新，请稍候...',
      mask: true,
       complete:function(option){
       	common.getProductListByType(that,that.data.curNav,1,10,1)
       		setTimeout(function() {
				wx.hideLoading();
			}, 1000);
        }
    })
  },
  topload:function(e){
  	 console.log("正在上拉this.data.open："+this.data.open)
    var that = this;
    if (!this.data.open) {
     this.setData({open:true,topload:true});
      wx.showLoading({
        title: '正在加载中，请稍候...',
        mask: true,
        complete:function(option){
        	console.log("获取产品"+that.data.currentPage)
        		common.getProductListByType(that,that.data.curNav,that.data.currentPage+1,this.data.pageSize,2)
        					setTimeout(function() {
				wx.hideLoading();
			}, 1000);

        }
      })
       
    } else {
      console.log('no');
    }
  } ,
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
 toDetailsTap:function(e){
  	var goodid = e.currentTarget.dataset.id
		wx.navigateTo({
			url: "../goods-detail/index?goodid=" + goodid
		})
  	
 },
 	addToShoppingCart: function(e) {
		var that = this
		common.saveShoppingCartInfo(that, e.currentTarget.dataset.goodid, e.currentTarget.dataset.goodname,e.currentTarget.dataset.pic,e.currentTarget.dataset.goodprice, 1,1);

	},
	reduceToShoppingCart: function(e) {
		
		var that = this
		common.saveShoppingCartInfo(that, e.currentTarget.dataset.goodid, e.currentTarget.dataset.goodname,e.currentTarget.dataset.pic,e.currentTarget.dataset.goodprice,  -1,1);
	},
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
console.log("onReachBottom")
	 console.log("正在上拉this.data.open："+this.data.open)
    var that = this;
    if (!this.data.open) {
     this.setData({open:true,topload:true});
      wx.showLoading({
        title: '正在加载中，请稍候...',
        mask: true,
        complete:function(option){
        	console.log("获取产品"+that.data.currentPage)
        		common.getProductListByType(that,that.data.curNav,that.data.currentPage+1,10,2)
        					setTimeout(function() {
				wx.hideLoading();
			}, 1000);

        }
      })
       
    } else {
      console.log('no');
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
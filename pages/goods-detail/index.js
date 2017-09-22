var app = getApp()  // 获取入口文件app的应用实例
var common = require('../common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent:0,
    productInfo:{},
    detailPics:[
      {
        image: "/images/goods_detail_img01.png"
      },
      {
        image: "/images/goods_detail_img01.png"
      },
      {
        image: "/images/goods_detail_img01.png"
      },
      {
        image: "/images/goods_detail_img01.png"
      },
      {
        image: "/images/goods_detail_img01.png"
      }
    
    ]
  },
  swiperchange: function (e) {
     console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  toAddShopCar: function (e) {
  var that = this
 var pic = e.currentTarget.dataset.pic
 if(pic){
 	pic=pic.split(",")[0]
 }
  
		common.saveShoppingCartInfo(that, e.currentTarget.dataset.goodid, e.currentTarget.dataset.goodname,pic,e.currentTarget.dataset.goodprice,  1,2);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var goodid =options.goodid
  var that = this
  console.log('onLoad：goodid='+goodid)
  common.getProductInfo(that,goodid)
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  gotoshoppingcart:function(e){
  	console.log("gotoshoppingcart");
  	var that = this
 var pic = e.currentTarget.dataset.pic
 if(pic){
 	pic=pic.split(",")[0]
 }
	common.saveShoppingCartInfo(that, e.currentTarget.dataset.goodid, e.currentTarget.dataset.goodname,pic,e.currentTarget.dataset.goodprice,  1,3);
  	wx.switchTab({url:"../shopcart/shopcart"});
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

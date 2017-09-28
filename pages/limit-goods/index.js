var app = getApp()  // 获取入口文件app的应用实例
var common = require('../common.js')
// pages/goods-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent: 0,
    productInfo:{},
    endTime:"",
    endDay:0,
    endHour:0,
    endminute:0,
    endSeconds:0,
    inteverMethod:"",
    detailPics: [
    ],
    isFinished:false,
    parentOrderId:null
  },
  swiperchange: function (e) {
    console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  goShopCar: function () {
  },
  toAddShopCar: function () {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var goodid =options.goodid
 
 var flag =options.flag
 
 if(flag == 1){
 	//团购分享
 	var parentOrderId =options.goodid
 	if(null !=parentOrderId){
 	this.setData({parentOrderId:parentOrderId})
 }
 }console.log('onLoad：options.shareOpenId1='+app.globalData.shareOpenId)
 console.log('onLoad：options.shareOpenId2='+(app.globalData.shareOpenId==null))
  console.log('onLoad：options.shareOpenId3='+(options.shareOpenId!=null))
  if(app.globalData.shareOpenId == null &&options.shareOpenId!=null){
  	console.log('onLoad：options.shareOpenId4='+options.shareOpenId)
  		app.globalData.shareOpenId =options.shareOpenId
  }
  	
  var that = this
  console.log('onLoad：goodid='+goodid)
  this.getProductInfo(that,goodid)
  },
  onHide:function(){
  	console.log('onHide')
  	clearInterval(this.data.inteverMethod)
  	
  },
  onShow:function(){
  	
  },
 getProductInfo:function(e,id){
 	
 	wx.request({
		url: app.globalData.serverAddr + app.globalData.productUrl,
		data: {
			id: id
		},
		success: function(res) {
			if(res.data.success) {

				var detailPicsStr = res.data.data.attributes.commodityshowpics;
				var detailPicsArr = detailPicsStr.split(";");
				var picarrays = new Array();
				for(var i = 0; i < detailPicsArr.length; i++) {
					var pic = {};
					pic.image = detailPicsArr[i].split(",")[0];
					picarrays.push(pic);
				}
				var endDate = Date.parse(new Date(res.data.data.endTime.replace(/-/g,"/")))
				var nowDate= new Date()
				if(endDate-nowDate.getTime()>0){
					var method = common.setIntervalTims(e,res.data.data.endTime,1000)
				}	else{
					e.setData({isFinished:true})
				}
				console.log("method:"+method)
					e.setData({
					detailPics: picarrays,
					productInfo: res.data.data,
					inteverMethod:method,
					endTime:res.data.data.endTime
				});
			}

		}
	})
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


 

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
console.log("onUnload:")
  	clearInterval(this.data.inteverMethod)
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
  onShareAppMessage: function (res) {
  	  var openId =wx.getStorageSync("sessionKey")
  	  var that =this
 if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.productInfo.productName,
      path: '/pages/limit-goods/index?flag=2&shareOpenId='+openId+"&goodid="+that.data.productInfo.id,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
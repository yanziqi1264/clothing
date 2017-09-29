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
    detailPics: [],
    isFinished:false,
    parentOrderId:null,
    statusType: ["图文详情", "产品参数", "相关推荐"],
    currentTpye: 0,
    tabClass: ["", "", "", ""],
    productlist: [],
    graphiclist:[],
    currentTab: 0, 
    hasMoreSelect: false,
    selectSize: "选择：",
    selectSizePrice: 0,
    shopNum: 0,
    hideShopPopup: true,
    buyNumber: 0,
    buyMoney: 0,
    buyNumMin: 0,
    buyNumMax: 999999999,
    sizelist:[],
    colorlist:[],
    currentShopcalist:[],
    numberArray:[],
    priceArray:[]
    
  },
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
   statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentTpye = curType
    this.setData({
      currentTpye: curType
    });
    this.onShow();
  },
    swichNav: function (e) {
    var curType = e.currentTarget.dataset.current;
    this.data.currentTab = curType
    this.setData({
      currentTab: curType
    });
    this.onShow();
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
 var shareOpenId=options.shareOpenId
 var flag =options.flag
 if(flag == 1){
 	//团购分享
 	var parentOrderId =options.goodid
 	if(null !=parentOrderId){
 	this.setData({parentOrderId:parentOrderId})
 }
 }
  if(app.globalData.shareOpenId == null &&options.shareOpenId!=null){
  		app.globalData.shareOpenId =options.shareOpenId
  }
  	
  var that = this
  this.getProductInfo(that,goodid)
   common.getHotProductListByType(that, app.globalData.appId, 0,1, 4,1);
  },
  onHide:function(){
  	
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
				var colos = res.data.data.attributes.commoditycolor
				var colosArray
				if(colos){
					colosArray=colos.split(",")
				}
				var sizes = res.data.data.attributes.commoditysize
				var sizeArray
				if(sizes){
					sizeArray=sizes.split(",")
				}
				
				var priceStr=res.data.data.attributes.salesAmountprice
				var priceArray=[]
				if(priceStr){
					var priceStrs=priceStr.split(",")
					for(var m=0;m<priceStrs.length;m++){
						var priceStrs1=priceStrs[m].split("-")
						
						var numStr =priceStrs1[0].split("~")
						var prio={}
						prio.start =numStr[0]
						prio.end =numStr[1]
						prio.price=priceStrs1[1]
						priceArray.push(prio)
					}
					
				}
					
					e.setData({
					detailPics: picarrays,
					productInfo: res.data.data,
					endTime:res.data.data.endTime,
					colorlist:colosArray,
					sizelist:sizeArray,
					priceArray:priceArray
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
  	  console.log("openId:"+openId)
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
  },
  goShopCar: function () {
 
  },
  toAddShopCar: function () {
  ;
  },
  tobuy: function () {
    this.setData({
      shopType: "tobuy"
    });
    this.bindGuiGeTap();
   
  },
  /**
   * 规格选择弹出框
   */
  bindGuiGeTap: function () {
    this.setData({
      hideShopPopup: false
    })
  },
  /**
   * 规格选择弹出框隐藏
   */
  closePopupTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
  numJianTap: function (option) {
  	var index1=option.currentTarget.dataset.colorindex;
  	var index2=option.currentTarget.dataset.sizeindex;
  	var numberArray =this.data.numberArray
  	if(numberArray[index1]){
  		if(numberArray[index1][index2]){
  			numberArray[index1][index2]=numberArray[index1][index2]-1
  			
  		}else{
  			numberArray[index1][index2]=0
  		}
  		
  	}else{
  		numberArray[index1]=[]
  		numberArray[index1][index2]=0
  		
  	}
  	
  	if(numberArray[index1][index2]<0){
  		numberArray[index1][index2]=0
  	}
  		this.setData({numberArray:numberArray})
  		this.countNum()
  },
  numJiaTap: function (option) {
  	var index1=option.currentTarget.dataset.colorindex;
  	var index2=option.currentTarget.dataset.sizeindex;
  	var numberArray =this.data.numberArray
  	if(numberArray[index1]){
  		if(numberArray[index1][index2]){
  			numberArray[index1][index2]=numberArray[index1][index2]+1
  		}else{
  			numberArray[index1][index2]=1
  		}
  		
  	}else{
  		numberArray[index1]=[]
  		numberArray[index1][index2]=1
  		
  	}
  	this.setData({numberArray:numberArray})
  	this.countNum()
  },
  
  countNum:function(){
  	var numberArray =this.data.numberArray
  	var buyNumber =0
  	for(var i=0;i<numberArray.length;i++){
  		console.log("numberArray[i]:"+numberArray[i])
  		for(var j=0;j<numberArray[i].length;j++){
  			console.log("numberArray[i][j]:"+numberArray[i][j])
  			if(!numberArray[i][j]){
  				numberArray[i][j]=0
  			}
  			buyNumber=buyNumber+numberArray[i][j]
  		}
  	}
  	var priceArray=this.data.priceArray
  	var buyMoney=this.data.buyMoney
  	console.log("priceArray"+priceArray.length)
  	if(priceArray.length>0){
		for( var m=0;m<priceArray.length;m++){
			if(buyNumber>=priceArray[m].start &&buyNumber <= priceArray[m].end){
				buyMoney=priceArray[m].price*buyNumber
				break
			}
			
		}
  	}else{
  		buyMoney=this.data.productInfo.attributes.commoditycurrentprice*buyNumber
  	}
  	console.log("buyNumber:"+buyNumber+",buyMoney:"+buyMoney)
  	this.setData({buyNumber:buyNumber,buyMoney:buyMoney})
  },
  /**
  * 加入购物车
  */
  addShopCar: function () {
    if (this.data.buyNumber < 1) {
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel: false
      })
      return;
    }
  },
	/**
	  * 立即购买
	  */
  buyNow: function () {
    if (this.data.buyNumber < 1) {
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel: false
      })
      return;
    }

  }
})
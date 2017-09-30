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
    numberArray:[],
    priceArray:[],
    currentPrice:0,
    graphicinstructionarray:[],
    commodityparameters:[]
    
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
   var shop =common.getShoppingCartInfo(that,app.globalData.appId)
   this.setData({shopNum:shop.length})
  },
  onHide:function(){
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
			var commoditycoverpic = res.data.data.attributes.commoditycoverpic;
					if(commoditycoverpic) {
						commoditycoverpic = commoditycoverpic.split(",")[0]
						res.data.data.attributes.commoditycoverpic = commoditycoverpic
					}
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
				var graphicinstructionstr=res.data.data.attributes.graphicinstruction
				var graphicinstructionarray=[]
					if(graphicinstructionstr){
					var graphicinstruction=graphicinstructionstr.split(";")
					for(var n=0;n<graphicinstruction.length;n++){
						var grap=graphicinstruction[n].split(",")[0]
						graphicinstructionarray.push(grap)
					}
					
				}
					
					e.setData({
					detailPics: picarrays,
					productInfo: res.data.data,
					inteverMethod:method,
					endTime:res.data.data.endTime,
					colorlist:colosArray,
					sizelist:sizeArray,
					priceArray:priceArray,
					graphicinstructionarray:graphicinstructionarray,
					commodityparameters:JSON.parse(res.data.data.attributes.commodityparameters)
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
 this.setData({
      shopType: "addShopCar"
    });
    this.bindGuiGeTap();
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
  		if(numberArray[i]){
  			for(var j=0;j<numberArray[i].length;j++){
  			if(!numberArray[i][j]){
  				numberArray[i][j]=0
  			}
  			buyNumber=buyNumber+numberArray[i][j]
  		}
  			
  		}
  		
  	}
  	var priceArray=this.data.priceArray
  	var buyMoney=this.data.buyMoney
  	if(priceArray.length>0){
		for( var m=0;m<priceArray.length;m++){
			if(buyNumber>=priceArray[m].start &&buyNumber <= priceArray[m].end){
				buyMoney=priceArray[m].price*buyNumber
				this.setData({currentPrice:priceArray[m].price})
				break
			}
			
		}
  	}else{
  		buyMoney=this.data.productInfo.attributes.commoditycurrentprice*buyNumber
  		this.setData({currentPrice:this.data.productInfo.attributes.commoditycurrentprice})
  	}
  	this.setData({buyNumber:buyNumber,buyMoney:buyMoney})
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
    var orderinfo={}
    var shoplist=[]
    var numberArray =this.data.numberArray
    for(var i=0;i<numberArray.length;i++){
    var 	obj={}
    obj.id=i
    obj.counts=numberArray[i]
    obj.colors=this.data.colorlist
    obj.sizes=this.data.sizelist
    shoplist.push(obj)
    }
    orderinfo.productInfo=this.data.productInfo
    orderinfo.shoplist=shoplist
    orderinfo.buyNum=this.data.buyNumber
    orderinfo.buyMoney=this.data.buyMoney
    orderinfo.currentPrice=this.data.currentPrice
  wx.setStorageSync("immediatelyorderinfo",orderinfo)
	wx.navigateTo({
		url: "/pages/order-details/index?ordertype=1&handleFlag=2",
	})
  },
  addShopCar: function () {
  	console.log("addShopCar")
    if (this.data.buyNumber < 1) {
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel: false
      })
      return;
    }

	var colorlist=this.data.colorlist
	var sizelist=this.data.sizelist
	var numberArray=this.data.numberArray
	var productInfo=this.data.productInfo
	productInfo.priceArray=this.data.priceArray
	
	var shopInfo ={};
	
	shopInfo.itemlist=[]
  	for(var i=0;i<colorlist.length;i++){
  		for(var j=0;j<sizelist.length;j++){
  			var ab={}
  			ab.id=productInfo.id+"_"+i+"_"+j
  			ab.productid=productInfo.id
  			console.log("addShopCar4")
  			ab.name=productInfo.productName+",颜色："+colorlist[i]+"，尺寸："+sizelist[j]
  			if(numberArray[i]){
  				console.log("numberArray[i]:"+i+"-"+j+":"+numberArray[i].length)
  				if(numberArray[i][j]){
  					console.log("numberArray[i][j]:"+i+"-"+j+":"+numberArray[i][j])
  					ab.count=numberArray[i][j]
  				}else{
  					ab.count=0
  				}
  			}else{
  				ab.count=0
  			}
  			ab.totalprice=this.data.currentPrice*ab.count
  			ab.pic =productInfo.attributes.commoditycoverpic
  			if(ab.count>0){
  				shopInfo.itemlist.push(ab)
  			}
  		}
  	}
  	shopInfo.productInfo=productInfo
  	this.closePopupTap()
  	common.saveShoppingCartInfoNew(this,app.globalData.appId,shopInfo)
  	var shop =common.getShoppingCartInfo(this,app.globalData.appId)
   this.setData({shopNum:shop.length})
  }
  
})
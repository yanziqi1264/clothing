// /pages/order-details/index.js
var app = getApp()
var common = require('../common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  orderInfo:{},
  currentId:null,
  proudctlist:[],
  isSubmit:false,
  ordertype:1,
  parentOrderId:null,
  endTimeStr:null,
  minimumNum:0,
  handleFlag:1,
  contact:"",
  address:"",
  payUserName:""
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log("onLoad:"+options.id+";"+options.ordertype)
  var ordertype=options.ordertype
  this.setData({currentId:options.id,ordertype:ordertype,handleFlag:options.handleFlag})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
  	console.log("onShow:"+this.data.currentId)
  	var orderType=this.data.ordertype
  	var orderid =this.data.currentId
  	var handleFlag =this.data.handleFlag
  	if(orderid){
  			common.getOrderInfo(this,orderid);
  	}else{
  		var orderInfo={}
  		var totalPrice=0
  		this.setData({proudctlist:[]})
  		var proudctlist=[]
  		var that =this
   		 if(handleFlag ==1){
   		 var orderinfo2=wx.getStorageSync("orderinfo")
   		 orderInfo.money=orderinfo2.money*100
   		 this.setData({proudctlist:orderinfo2.shoplist,orderInfo:orderInfo,endTimeStr:'2017-09-28 00:00:00'})
   		 }else{
   		 	var orderinfo1=wx.getStorageSync("immediatelyorderinfo")
   		 	var shoplist =orderinfo1.shoplist
   		 	console.log("shoplist："+shoplist.length)
   		 	for(var i=0;i<shoplist.length;i++){
   		 		for(var j=0;j<shoplist[i].counts.length;j++){
   		 			var pro ={}
   		 			console.log(orderinfo1.productInfo.attributes.commoditycoverpic)
   		 		pro.pic=orderinfo1.productInfo.attributes.commoditycoverpic
   		 		pro.name=orderinfo1.productInfo.productName+",颜色："+shoplist[i].colors[i]+",尺寸："+shoplist[i].sizes[j]
   		 		pro.count=shoplist[i].counts[j]
   		 		pro.price=orderinfo1.productInfo.attributes.commoditycurrentprice
   		 		pro.totalprice=orderinfo1.currentPrice*shoplist[i].counts[j]
   		 		pro.productId=orderinfo1.productInfo.id
   		 		pro.productName=orderinfo1.productInfo.productName
   		 		proudctlist.push(pro)
   		 		}
   		 	}
   		 	orderInfo.money=orderinfo1.buyMoney*100
   		 	this.setData({proudctlist:proudctlist,parentOrderId:orderinfo1.parentOrderId,orderInfo:orderInfo,endTimeStr:orderinfo1.productInfo.endTime,minimumNum:orderinfo1.productInfo.minimumNum})
   		 }
  		
  	}
   
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
  payorder:function(option){
  
  	
  },
  formSubmit: function(e) {
  	console.log('form发生了submit事件，携带数据为：', e.detail.value)
  	var orderid =e.currentTarget.dataset.orderid
  	console.log('f'+orderid)
  	var that =this
  	//订单已经生成
  	if(this.data.isSubmit){
  		
  		return
  	}
  	if(orderid){
  			common.submitPayOrder(this,app.globalData.appId,orderid)
  	}else{
  	console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if( e.detail.value.name.length <1){
    	wx.showModal({title:"请填写收货人",content:"",showCancel:false})
    	return
    }
     if( e.detail.value.contact.length <1){
   	wx.showModal({title:"请填写联系方式",content:"",showCancel:false})
    	return
    }
      if( e.detail.value.address.length <1){
    	wx.showModal({title:"请填写收货地址",content:"",showCancel:false})
    	return
    }
     	var handleFlag =this.data.handleFlag
      
      if(handleFlag==1){
      	
      	wx.removeStorageSync("orderinfo")
      	common.emptyShoppingCart(app.globalData.appId)
      }else{
      	wx.removeStorageSync("immediatelyorderinfo")
      }
      var openId =wx.getStorageSync("sessionKey"); 
      if(openId){
      	
      	common.saveOrder(that, app.globalData.appId, openId, (that.data.orderInfo.money)/100, e.detail.value.address,   e.detail.value.remark,e.detail.value.contact,  e.detail.value.name,that.data.proudctlist,that.data.parentOrderId,that.data.ordertype,that.data.endTimeStr,that.data.minimumNum)
      }else{
      		app.getUserInfo(function(userInfo){
      				 	console.log("getUserInfo2")
      		openId =wx.getStorageSync("sessionKey"); 
      		common.saveOrder(that, app.globalData.appId, openId, (that.data.orderInfo.money)/100, e.detail.value.address,   e.detail.value.remark,e.detail.value.contact,  e.detail.value.name,that.data.proudctlist,that.data.parentOrderId,that.data.ordertype,that.data.endTimeStr,that.data.minimumNum)
		})
      }
  		
  	}
  	
    
    
  },
 onShareAppMessage: function (res) {
  	  var openId =wx.getStorageSync("sessionKey")
  	  var that =this
 if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
 	var goodid =0
 var goodName =""
 var goodpic=""
 var proudctlist=this.data.proudctlist
 for(var i =0;i<proudctlist.length;i++){
 	goodid=proudctlist[i].productId
 	goodName=proudctlist[i].productName
 	goodpic=proudctlist[i].pic
 	break
 }
 if(this.data.orderInfo.type==3){
 	console.log("parentOrderId"+this.data.orderInfo.orderId)
 
 	return {
      title: goodName,
      path: '/pages/limit-goods/index?flag=1&shareOpenId='+openId+"&goodid="+goodid+"&parentOrderId="+this.data.orderInfo.orderId,
      imageUrl:goodpic,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
 }else{
 	return {
      title: "时尚大衣",
      path: 'pages/wholesale/wholesale?flag=1&shareOpenId='+openId,
       imageUrl:goodpic,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }

 	
 }
    
  },
  
  chooseAddress:function(res){
  	var that =this
  	wx.chooseAddress({
  success: function (res) {
  	var orderInfo=that.data.orderInfo
  	var contact=res.telNumber
  	var address=res.provinceName+res.cityName+res.countyName+res.detailInfo
  	var payUserName=res.userName
  	that.setData({contact:contact,address:address,payUserName:payUserName})
  }
})
  }
})
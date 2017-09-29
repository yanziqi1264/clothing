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
  this.setData({currentId:options.id,ordertype:ordertype,parentOrderId:options.parentOrderId,handleFlag:options.handleFlag})
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
   		 	 var shoppingcart= common.getShoppingCartInfo(this,app.globalData.appId)
   		 	for(var i =0;i<shoppingcart.length;i++){
    			totalPrice=parseFloat(totalPrice)+parseFloat(shoppingcart[i].totalprice)
    			
    			proudctlist.push(shoppingcart[i])
    			}
   		 totalPrice=parseFloat(totalPrice).toFixed(2)
  		orderInfo.money=totalPrice*100
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
   		 		pro.totalprice=orderinfo1.currentPrice*shoplist[i].counts[j]
   		 		proudctlist.push(pro)
   		 		}
   		 	}
   		 	orderInfo.money=orderinfo1.buyMoney*100
   		 }
  		this.setData({proudctlist:proudctlist,orderInfo:orderInfo,endTimeStr:orderinfo1.productInfo.endTime,minimumNum:orderinfo1.productInfo.minimumNum})
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
  	console.log('f13')
      
      var openId =wx.getStorageSync("sessionKey"); 
      console.log("openId:"+openId)
      if(openId){
      	common.saveOrder(this, app.globalData.appId, openId, (this.data.orderInfo.money)/100, e.detail.value.address,   e.detail.value.remark,e.detail.value.contact,  e.detail.value.name,this.data.proudctlist,this.data.parentOrderId,this.data.ordertype,this.data.endTimeStr,this.data.minimumNum)
      }else{
      		app.getUserInfo(function(userInfo){
      		openId =wx.getStorageSync("sessionKey"); 
      		common.saveOrder(this, app.globalData.appId, openId,(this.data.orderInfo.money)/100, e.detail.value.address,  e.detail.value.remark,e.detail.value.contact,  e.detail.value.name,this.data.ordertype)
		})
      }
  		
  	}
  	
    
    
  },
  onShareAppMessage: function (res) {
  	 var openId =wx.getStorageSync("sessionKey"); 
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
       path: 'pages/retail/retail?type=1&shareOpenId='+openId,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
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
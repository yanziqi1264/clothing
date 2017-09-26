// /pages/order-details/index.js
var app = getApp()
var common = require('../common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  orderInfo:null,
  currentId:null,
  proudctlist:[],
  isSubmit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log("onLoad:"+options.id)
  this.setData({currentId:options.id})
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
  	var orderid =this.data.currentId
  	if(orderid){
  			common.getOrderInfo(this,orderid);
  	}else{
  		var orderInfo={}
  		var totalPrice=0
  		this.setData({proudctlist:[]})
  		var proudctlist=[]
  		var that =this
   		 var shoppingcart = common.getShoppingCartInfo(this,app.globalData.appId);
    		for(var i =0;i<shoppingcart.length;i++){
    			totalPrice=parseFloat(totalPrice)+parseFloat(shoppingcart[i].totalprice)
    			
    			proudctlist.push(shoppingcart[i])
    			}
   		 totalPrice=parseFloat(totalPrice).toFixed(2)
  		orderInfo.money=totalPrice*100
  		this.setData({proudctlist:proudctlist,orderInfo:orderInfo})
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
      if(openId){
      	
      	common.saveOrder(this, app.globalData.appId, openId, (this.data.orderInfo.money)/100, e.detail.value.address,   e.detail.value.remark,e.detail.value.contact,  e.detail.value.name)
      }else{
      		app.getUserInfo(function(userInfo){
      		openId =wx.getStorageSync("sessionKey"); 
      		common.saveOrder(this, app.globalData.appId, openId,(this.data.orderInfo.money)/100, e.detail.value.address,  e.detail.value.remark,e.detail.value.contact,  e.detail.value.name)
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
  	
  	
  }
})
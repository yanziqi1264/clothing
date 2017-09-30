var app = getApp()
var common = require('../common.js')
Page({
  data: {
    //statusType: ["全部", "待付款", "待发货", "待收货", "更多"],
    statusType: [ "待付款", "待收货", "已完成"],
    currentTpye: 0,
    tabClass: ["red-dot", "red-dot", "red-dot"],
    currentPage:1,
    pageSize:10,
    orderlist:[],
    point: [],
	includepoints: [],
	shopInfo:{},
	currentStatusType:1
  },
  statusTap: function (e) {
    var curStatusType = e.currentTarget.dataset.index+1;
    this.setData({
      currentStatusType: curStatusType
    });
    this.onShow();
  },
  orderDetail: function (e) {
    var orderId = e.currentTarget.dataset.id;
    console.log("orderDetail:"+orderId)
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  cancelOrderTap: function (e) {
  	 var orderId = e.currentTarget.dataset.id;
    var that = this;
   console.log(orderId)
  	
    wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
        common.cancelOrder(that,orderId,6)
        }
      }
    })
  },
  payorder:function(option){
  	console.log("payorder")
  	var orderid =option.currentTarget.dataset.id
  	//订单已经生成
  	if(orderid){
  			common.submitPayOrder(this,app.globalData.appId,orderid)
  	}else{
  		//common.saveOrder(this, app.globalData.appId, openId, totalMoney, address, remark, contact)
  	}
  
  	
  },
  finishOrderTap:function(e){
  	 var that = this;
    var orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确定要结束该订单吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
        common.cancelOrder(that,orderId,9)
        }
      }
    })
  	
  	
  },
  toPayTap: function (e) {
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
},
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var typeId = options.typeid
    console.log("typeId"+typeId)
    this.setData({
      currentTpye: typeId
    });
  

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
  	 common.getOrderListByType(this,this.data.currentStatusType,this.data.currentTpye,null,this.data.currentPage,this.data.pageSize)
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
console.log("onPullDownRefresh")
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
console.log("onReachBottom")
this.setData({currentPage:this.data.currentPage+1})
this.show()
  }
})
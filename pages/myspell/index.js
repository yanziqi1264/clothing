var app = getApp()
var common = require('../common.js')
Page({
  data: {
    statusType: ["全部拼团", "进行中", "拼团成功", "拼团失败"],
    currentTpye: 0,
    tabClass: ["", "", "", "", ""],
     currentPage:1,
    pageSize:10,
    orderlist:[],
  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentTpye = curType
    this.setData({
      currentTpye: curType,
      currentPage:1,
      orderlist:[]
    });
    this.onShow();
  },
  orderDetail: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  getOrderStatistics: function () {
    
  },
  onShow: function () {
    // 获取订单列表
    wx.showLoading();
    console.log("onShow")
 	common.getOrderListByType(this,2,3,this.data.currentTpye,this.data.currentPage,this.data.pageSize)
   

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
  	 wx.showLoading();
    // 页面上拉触底事件的处理函数
    var  curType= this.data.currentTpye 
    this.setData({currentPage:this.data.currentPage+1})
    common.getOrderListByType(this,3,3,curType,this.data.currentPage,this.data.pageSize)
  },
  
})
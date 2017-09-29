// pages/searchList/index.js
var WxSearch = require('../../wxSearch/wxSearch.js')
var common = require('../common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  currentPage:1,
  pageSize:10,
  wxSearchData:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,60, ['上衣', '外套', '羊绒', '棉衣']);
    WxSearch.initMindKeys(['上衣']);
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
     console.log('wxSearchFn:'+JSON.stringify(e))
    
    	wx.navigateTo({
			url: "/pages/productList/index"
		})
  },
  formSubmit:function(e){
  	  var that = this
    WxSearch.wxSearchAddHisKey(that);
     console.log('formSubmit:'+e.detail.value.searchdata)
    
    	wx.navigateTo({
			url: "/pages/productList/index?flag=1&name="+e.detail.value.searchdata
		})
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    console.log('wxSearchInput:'+JSON.stringify(e))
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
    console.log('wxSerchFocus:'+JSON.stringify(e))
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
    console.log('wxSearchBlur:'+JSON.stringify(this.data.wxSearchData))
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
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
  
  }
})
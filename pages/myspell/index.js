var app = getApp()
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
      currentTpye: curType
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
 common.getOrderListByType(this,1,1,this.data.currentPage,this.data.pageSize)
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  getOrderStatistics: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/statistics',
      data: { token: app.globalData.token },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 0) {
          var tabClass = that.data.tabClass;
          if (res.data.data.count_id_no_pay > 0) {
            tabClass[1] = "red-dot"
          }
          if (res.data.data.count_id_no_transfer > 0) {
            tabClass[2] = "red-dot"
          }
          if (res.data.data.count_id_no_confirm > 0) {
            tabClass[3] = "red-dot"
          }
          if (res.data.data.count_id_success > 0) {
            tabClass[4] = "red-dot"
          }

          that.setData({
            tabClass: tabClass,
          });
        }
      }
    })
  },
  onShow: function () {
    // 获取订单列表
    wx.showLoading();
    var that = this;
    var postData = {
      token: app.globalData.token
    };
    if (that.data.currentTpye == 1) {
      postData.status = 0
    }
    if (that.data.currentTpye == 2) {
      postData.status = 1
    }
    if (that.data.currentTpye == 3) {
      postData.status = 2
    }
    if (that.data.currentTpye == 4) {
      postData.status = 4
    }
    this.getOrderStatistics();
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/list',
      data: postData,
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 0) {
          that.setData({
            orderList: res.data.data.orderList,
            logisticsMap: res.data.data.logisticsMap,
            goodsMap: res.data.data.goodsMap
          });
        } else {
          this.setData({
            orderList: null,
            logisticsMap: {},
            goodsMap: {}
          });
        }
      }
    })

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
    // 页面上拉触底事件的处理函数

  }
})
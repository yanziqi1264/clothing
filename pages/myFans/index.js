var app = getApp()
Page({
  data: {
    statusType: ["一级粉丝", "二级粉丝"],
    currentTpye: 0,
    tabClass: ["", ""],
    fanslist:[],
    currentPage:1,
    pageSize:10,
    
    
  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentTpye = curType
    this.setData({
      currentTpye: curType,
      currentPage:1,
       fanslist:[],
    });
    if(curType==0){
    	this.getFans(1,this.data.currentPage,10)
    }else{
    	  	this.getFans(2,this.data.currentPage,10)
    }
    this.onShow();
  },
  onLoad: function (options) {
  
 	this.getFans(1,this.data.currentPage,10)

  },
  getFans:function(type,currentPage,pageSize){
  	console.log("fans")
  	 	var that=this
  	 var openId =wx.getStorageSync("sessionKey")
  	 wx.request({
		url: app.globalData.serverAddr + "/weixin/clothing/distribution/fans",
		data: {
			appId: app.globalData.appId,
			openId:openId,
			currentPage:currentPage,
			pageSize:pageSize,
			levelFlag:type
			
		},
		success: function(res) {
			
				var fanslist=that.data.fanslist
				for(var i=0;i<res.data.data.length;i++){
				fanslist.push(res.data.data[i])
				}
				that.setData({fanslist:res.data.data,currentPage:currentPage+1})
			
			
		}
	})
  	
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  getOrderStatistics: function () {
   
  },
  onShow: function () {
 
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
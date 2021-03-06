//app.js
App({
  onLaunch: function(options) {
  	
  	
  	if(options.query.shareOpenId){
  		console.log("onLaunch："+options.query.shareOpenId)
  		this.globalData.shareOpenId=options.query.shareOpenId
  	}
  	 this.getUserInfo(function(userInfo){
		})
  },

  getUserInfo: function(cb) {
    var that = this
    if(this.globalData.userInfo){//用户信息不为空
    	console.log("getUserInfo1")
      typeof cb == "function" && cb(this.globalData.userInfo)//如果参数cb的类型为函数，那么执行cb,获取用户信息；
    }else{//如果用户信息为空，也就是说第一次调用getUserInfo，会调用用户登录接口。
      wx.login({
        success: function (res1) {
      var code = res1.code
          if(code){
            wx.getUserInfo({
            success: function (res2) {
            		console.log("getUserInfo2")
　　　　　　　　var encryptedData = encodeURIComponent(res2.encryptedData)//一定要把加密串转成URI编码
               var iv = res2.iv
               that.globalData.userInfo =  res2.userInfo
               that.userLogin(res1.code,encryptedData,iv);
                typeof cb == "function" && cb(that.globalData.userInfo)//如果参数cb类型为函数，执行cb,获取用户信息
            },
            fail:function(res3){
			console.log("res3"+res3)
            }
          })

            }
        
        },
        fail:function(res4){
        	console.log("res4"+res4)
        }
      })
    }
  },
 
  userLogin:function(code,encryptedData,iv){
  	var sharedOpenId=null
  		console.log("this.globalData.shareOpenId:"+this.globalData.shareOpenId);
  	if(this.globalData.shareOpenId){
  		console.log("this.globalData.shareOpenId:"+this.globalData.shareOpenId);
  		sharedOpenId=this.globalData.shareOpenId
  	}
  	try{
  		var that =this
          //发起网络请求
          wx.request({
            url: this.globalData.serverAddr+this.globalData.loginUrl,
        // url: 'http://localhost:8081/tinyapp'+this.globalData.loginUrl,
          
          data: {
              code: code,
              appId:this.globalData.appId,
              encryptedData:encryptedData,
              iv:iv,
              sharedOpenId:sharedOpenId
            },
            success: function(res) {
 			wx.setStorageSync("sessionKey",res.data.data);   
          }
          })
  	}catch(e){
  		 console.log(e);
  	}
	

  },
  globalData: {
    userInfo: null,
    appId: "wx935d61464c3d9259", //昆山服饰
    //appId: "wx3d49404dd47da924", //杰咖斯
    serverAddr: "https://xcx.jacars.com/tinyapp",
    //serverAddr: "http://localhost:8081/tinyapp",
    loginUrl:"/user/login",
    updateUserUrl:"/user/login", 
    payUrl:"/weixin/pay/order/clothing/wechatpay",
    itemdetailUlr:"/weixin/commodity/clothing/getCommodityById",
    typelistUrl:"/weixin/commodityType/clothing/selectList",
    topproductlistUrl:"/weixin/commodity/clothing/homePagePics",
    recommendproductlistUrl:"/weixin/commodity/clothing/homePageRecommend",
    toobarIds:[41,42],
    sessionKey:null,
    productUrl:"/weixin/commodity/clothing/getCommodityById",
    shopUrl:"/weixin/storeMessage/getMessage",
    saveOrder:"/weixin/pay/order/clothing/placeOrder",
	productlistUrl:"/weixin/commodityType/clothing/getCommodityList",
	productlistnameUrl:"/weixin/commodity/clothing/getCommodityList",
	orderlistUrl:"/weixin/pay/order/clothing/getOrderList",
	orderinfoUrl:"/weixin/pay/order/clothing/getOrderById",
	cancelorderUrl:"/weixin/pay/order/clothing/cancelOrder",
	getListByName:"/weixin/commodityType/clothing/getList",
	shareOpenId:null
  }

})
var app = getApp()

//获取模块列表
function getTypeList(e, appId, typeId, currentPage, pageSize, type,callback) {
	wx.request({
		url: app.globalData.serverAddr + app.globalData.typelistUrl,
		data: {
			appId: appId,
			parentId: typeId,
			currentPage: currentPage,
			pageSize: pageSize
		},
		success: function(res) {
			console.log(res.data)
			if(res.data.success) {

				e.setData({
					typelist: res.data.data
				});
					//查询分类，并且查询第一个分类下的商品
					for(var i = 0; i < e.data.typelist.length; i++) {
						if(i == 0) {
							e.setData({
								curNav: e.data.typelist[i].id
							})
							break
						}
					}
					if( e.data.typelist.length ==0){
						e.data.curNav =typeId
					}
					//getProductListByType(e, e.data.curNav, currentPage, 10)
					if(typeof(callback)=="function"){
						callback(e, appId, typeId, currentPage, pageSize, type)
					}
					

			}

		}
	})
}

//获取模块列表
function getTypeChildList(e, appId, typeId, currentPage, pageSize,flag) {
	wx.request({
		url: app.globalData.serverAddr + app.globalData.typelistUrl,
		data: {
			appId: appId,
			parentId: typeId,
			currentPage: currentPage,
			pageSize: pageSize
		},
		success: function(res) {
			console.log(res.data)
			if(res.data.success) {
				if(flag ==2){
					e.setData({
					typechildlist2: res.data.data
				});
				}else{
					e.setData({
					typechildlist: res.data.data
				});
				}
				
				

			}

		}
	})
}
//根据模块获取产品列表
function getProductListByType(e, type, currentPage, pageSize,handtype,orderType,orderParam,name) {
	
	wx.request({
		url: app.globalData.serverAddr + app.globalData.productlistUrl,
		data: {
			appId: app.globalData.appId,
			typeId: type,
			currentPage: currentPage,
			pageSize: pageSize
		},
		success: function(res) {
 			
			if(handtype ==1){
 				currentPage=1
 			}
			var productlist = e.data.productlist
			if(type == 1){
				productlist=[]
			}
			
			var dataArray = res.data.data
			for(var i = 0; i < dataArray.length; i++) {
				dataArray[i].count = getProductCount(dataArray[i].id)
				var commoditycoverpic = dataArray[i].attributes.commoditycoverpic;
				if(commoditycoverpic) {
					commoditycoverpic = commoditycoverpic.split(",")[0]
					dataArray[i].attributes.commoditycoverpic = commoditycoverpic
				}
				productlist.push(dataArray[i])
			}
			
			e.setData({
				currentPage: currentPage,
				productlist: productlist,
				open: false
			});
		}

	})
}


/**
 * 根据销售类型
 * @param {Object} e
 * @param {Object} type
 * @param {Object} currentPage
 * @param {Object} pageSize
 * @param {Object} handtype
 */
function getProductListByClassify(e, classify, currentPage, pageSize,handtype) {
	
	wx.request({
		url: app.globalData.serverAddr + app.globalData.productlistUrl,
		data: {
			appId: app.globalData.appId,
			typeId: type,
			currentPage: currentPage,
			pageSize: pageSize
		},
		success: function(res) {
 			
			if(handtype ==1){
 				currentPage=1
 			}
			var productlist = e.data.productlist
			if(type == 1){
				productlist=[]
			}
			
			var dataArray = res.data.data
			for(var i = 0; i < dataArray.length; i++) {
				dataArray[i].count = getProductCount(dataArray[i].id)
				var commoditycoverpic = dataArray[i].attributes.commoditycoverpic;
				if(commoditycoverpic) {
					commoditycoverpic = commoditycoverpic.split(",")[0]
					dataArray[i].attributes.commoditycoverpic = commoditycoverpic
				}
				productlist.push(dataArray[i])
			}
			e.setData({
				currentPage: currentPage,
				productlist: productlist,
				open: false
			});
		}

	})
}
//获取顶部产品列表

function getTopProductListByType(e, appId, type) {
	wx.request({
		url: app.globalData.serverAddr + app.globalData.topproductlistUrl,
		data: {
			appId: appId,
			rootTypeId: type
		},
		success: function(res) {
			if(res.data.success) {
				var dataArray = res.data.data
				for(var i = 0; i < dataArray.length; i++) {

					var commoditycoverpic = dataArray[i].attributes.commoditycoverpic;
					if(commoditycoverpic) {
						commoditycoverpic = commoditycoverpic.split(",")[0]
						dataArray[i].attributes.commoditycoverpic = commoditycoverpic
					}
				}
				e.setData({
					toplist: dataArray
				});

			}
		}
	})
}
//获取热门产品列表

function getHotProductListByType(e, appId, type, currentPage, pagesize,sellType) {
	wx.request({
		url: app.globalData.serverAddr + app.globalData.recommendproductlistUrl,
		data: {
			appId: appId,
			rootTypeId: type,
			currentPage: currentPage,
			pageSize: pagesize,
			sellType:sellType
		},
		success: function(res) {
			console.log(res.data)
			if(res.data.success) {
				var productlist=e.data.productlist
				if(currentPage ==1){
					productlist=[]
				}
				var dataArray = res.data.data

				for(var i = 0; i < dataArray.length; i++) {
					dataArray[i].count = getProductCount(dataArray[i].id)
					var commoditycoverpic = dataArray[i].attributes.commoditycoverpic;
					if(commoditycoverpic) {
						commoditycoverpic = commoditycoverpic.split(",")[0]
						dataArray[i].attributes.commoditycoverpic = commoditycoverpic
					}
					productlist.push(dataArray[i])
				}
				e.setData({
					productlist: productlist,
					currentPage:currentPage,
					
				})

			}

		}
	})
}
//根据模块获取产品详情
function getProductInfo(e, id) {
console.log("getProductInfo")
	wx.request({
		url: app.globalData.serverAddr + app.globalData.productUrl,
		data: {
			id: id
		},
		success: function(res) {
			if(res.data.success) {

				var detailPicsStr = res.data.data.attributes.commodityshowpics;
				var picarrays = new Array();
				if(detailPicsStr){
					var detailPicsArr = detailPicsStr.split(";");
				
				for(var i = 0; i < detailPicsArr.length; i++) {
					var pic = {};
					pic.image = detailPicsArr[i].split(",")[0];
					picarrays.push(pic);
				}
				}else{
					var coverPic= res.data.data.attributes.commoditycoverpic;
					coverPic=coverPic.split(",")[0]
					console.log("coverPic:"+coverPic)
					var pic ={image:coverPic}
					picarrays.push(pic);
				}
				var graphiclist =res.data.data.attributes.graphicinstruction
				var graphiclistArray = []
				if(graphiclist){
					graphiclist =graphiclist.split(",")
					for(var i = 0; i < graphiclist.length; i++) {
					var pic = graphiclist[i].split(",")[0];
					graphiclistArray.push(pic);
				}
				}
				var sizes=res.data.data.attributes.commoditysize
				var sizeList =sizes.split(",")
				if(sizes){
					for(var i = 0; i < sizeList.length; i++) {
					
					sizeList.push(sizeList[i]);
					
				}
				}
				var colors=res.data.data.attributes.commoditycolor
				console.log("颜色1"+colors)
				var colorlist =colors.split(",")
				if(colorlist){
					for(var i = 0; i < colorlist.length; i++) {
						console.log("颜色2"+colorlist[i])
					colorlist.push(colorlist[i]);
					
				}
				}
				e.setData({
					detailPics: picarrays,
					productInfo: res.data.data,
					graphiclist:graphiclistArray,
					colorlist:colorlist,
					sizeList:sizeList
				});
			}

		}
	})

}

//获取购物车详情
function getShoppingCartInfo(e, appId) {
	
	var prolist = wx.getStorageSync(appId + '_shopidList')
	if(prolist==null ||prolist==''){
		prolist=[]
	}
	var pplist=[]
	console.log("prolist.length:"+prolist.length)
	for(var i =0;i<prolist.length;i++){
		var key1 =prolist[i]
		var item =	wx.getStorageSync(key1)
		if(item!=null &&item!=''){
			pplist.push(item)
		}
		
	}
	return pplist

}


function emptyShoppingCart(appId){
	var prolist = wx.getStorageSync(appId + '_shopidList')
	
	for(var i =0;i<prolist.length;i++){
		var key1 =prolist[i]
		console.log("emptyShoppingCart1:"+key1)
		var item =	wx.getStorageSync(key1)
		console.log("i:"+i)
		if(item!=null && item!=''){
		console.log("emptyShoppingCart2:"+JSON.stringify(item) )
		wx.removeStorage(
			{key:appId+'_produnct'+item.productid,
			  success: function(res) {
    					console.log(res.data)
 				} 
			}
			
		)
		console.log("emptyShoppingCart3")
		wx.removeStorage({key:key1,
			  success: function(res) {
    					console.log(res.data)
 				} 
			})
		}
		
		console.log("emptyShoppingCart4")
	}
	wx.removeStorage(
		{key:appId + '_shopidList',
			  success: function(res) {
    					console.log(res.data)
 				} 
			}
		
		)
}

function saveShoppingCartInfoNew(e,appId,addshopInfo) {
	//获取添加商品的
	var shopidList= wx.getStorageSync(appId+ '_shopidList' )
	if(shopidList==null ||shopidList==''){
		shopidList=[]
	}
	var productidList= wx.getStorageSync(appId+ '_productidList' )
	if(productidList==null ||productidList==''){
		productidList=[]
	}
	var productInfo = wx.getStorageSync(appId+ '_produnct'+ addshopInfo.productInfo.id)
	if(productInfo==null ||productInfo==''){
		productInfo=addshopInfo.productInfo
		productidList.push(productInfo.id)
		wx.setStorageSync(appId+ '_productinfo'+productInfo.id ,productInfo)
		wx.setStorageSync(appId+ '_productidList' ,productidList)
	}
	
	var itemlist =addshopInfo.itemlist
	for(var i=0;i<itemlist.length;i++){
			var key1 =appId+ '_item'+itemlist[i].id
		var exitem =wx.getStorageSync(key1)
		if(exitem==null ||exitem==''){
				shopidList.push(key1)
				exitem=itemlist[i]
		}else{
				exitem.count=exitem.count+itemlist[i].count
				productInfo.totalcount=productInfo.totalcount+exitem.count
		}
		wx.setStorageSync(key1 ,exitem)
	}
		wx.setStorageSync(appId+ '_shopidList' ,shopidList)
		
}


//保存购物车
function saveShoppingCartInfo(e, productId, productName, pic, price, count, type) {
	price = parseFloat(price)
	console.log(productId, productName, pic, price, count, type)
	try {

		var value = wx.getStorageSync(app.globalData.appId + '_productList')

		if(!value) {
			value = []
		}
		var isContains = false
		//判断购物车中是否存在该商品,修改	
		for(var i = 0; i < value.length; i++) {
			if(productId == value[i].id) {
				value[i].totalprice = parseFloat(value[i].totalprice) + price * count
				value[i].totalprice = parseFloat(value[i].totalprice).toFixed(2)
	
				value[i].count = value[i].count + count
				if(value[i].count <= 0) {
					value[i].count = 0
				}
				isContains = true;
			}
		}

		//如果不存在，加入购物车
		if(!isContains) {
			count = count > 0 ? count : 0
			var totalprice = price * count
			totalprice = parseFloat(totalprice).toFixed(2)
			var pObj = {
				id: productId,
				name: productName,
				count: count,
				pic: pic,
				totalprice: totalprice,
				price: price
			};
			value.push(pObj);

		}
		//清除数量为空的
		console.log("value:"+value.length)
		var newvalue =removeProduct(value)
		wx.setStorageSync(app.globalData.appId + '_productList', newvalue);
        
		if(type == 1) {
			var productList = e.data.productlist
			for(var j = 0; j < productList.length; j++) {
				if(productId == productList[j].id) {
					productList[j].count = productList[j].count + count
					if(productList[j].count < 0) {
						productList[j].count = 0
					}
					console.log("productList[j]" + productList[j].count)
					e.setData({
						productlist: productList
					})
					break
				}
			}
		} else if(type == 2) {
			wx.showToast({
				title: '添加成功',
				icon: 'success'
			})
		}
	} catch(e) {
		console.log("saveShoppingCartInfo2" + e)
	}

}

function removeProduct(array){
	var  arraylist =[]
	for(var i =0;i<array.length;i++){
		
		if(array[i].count > 0){
			console.log(JSON.stringify(array[i]))
			arraylist.push(array[i])
		}
	}
	return arraylist
}
//获取购订单详情
function getProductCount(productId) {
	var value = wx.getStorageSync(app.globalData.appId + '_productList')
	//判断购物车中是否存在该商品,修改
	var count = 0
	for(var i = 0; i < value.length; i++) {
		if(productId == value[i].id) {
			count = value[i].count
			break
		}
	}
	return count
}


//生成订单
function saveOrder(e, appId, openId, totalMoney, address, remark, contact,nickName,shoppingList,parentOrderId,orderType,endTimeStr,minimumNum) {
	
	console.log("saveOrder1"+shoppingList.length)
	if(minimumNum==null){
		minimumNum=0
	}
	
	totalMoney = parseInt(totalMoney * 100)
	if(shoppingList == null){
		shoppingList = getShoppingCartInfo(e, appId)
	}
	shoppingList=removeProduct(shoppingList)
	console.log("saveOrder2"+shoppingList.length)
	if(shoppingList.length <1){
		
		return
	}
	console.log("saveOrder2")
	wx.request({
		url: app.globalData.serverAddr + app.globalData.saveOrder,
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8;'
		},

		method: "post",
		data: {
			shoppingList: JSON.stringify(shoppingList),
			appId: appId,
			openId: openId,
			totalMoney: totalMoney,
			address: address,
			remark: remark,
			contact: contact,
			nickName: nickName,
			parentOrderId:parentOrderId,
			type:orderType,
			parentOrderId:parentOrderId,
			endTimeStr:endTimeStr,
			minimumNum:minimumNum
			
		},
		success: function(res) {
			console.log("saveOrder3")
			wx.removeStorageSync(appId + '_productList')
			if(res.data.success) {
				e.setData({isSubmit:false})
				submitPayOrder(e, appId, res.data.data,orderType)
			}

		}
	})
}
//支付订单
function submitPayOrder(e, appId, orderId,orderType) {

	wx.request({
		url: app.globalData.serverAddr + app.globalData.payUrl,
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8;'
		},
		method: "POST",
		data: {
			appId: appId,
			payId: orderId
		},
		success: function(res) {
			console.log(res.data)
			if(res.data.success) {
				payOrder(res.data.data,orderType)
			}else{
				wx.showToast({
					title:"服务器异常，请稍后再试"
					
				})
				
			}

		}
	})

}

function payOrder(payMap,orderType) {

	wx.requestPayment({
		'timeStamp': payMap.timeStamp,
		'nonceStr': payMap.nonceStr,
		'package': payMap.package,
		'signType': 'MD5',
		'paySign': payMap.paySign,
		'success': function(res) {
			wx.showToast({
				title:"支付成功",
				title:"success",
				complete:function(){
					if(orderType==3){
							wx.redirectTo({
				url: 'pages/myspell/index',
			})
					}else{
							wx.redirectTo({
				url: '../order-list/index?typeid=2',
			})
					}
				
				}
			}
			)

			
		},
		'fail': function(res) {

			if(res.errMsg == 'requestPayment:fail cancel') {
				if(orderType==3){
							wx.redirectTo({
				url: 'pages/myspell/index',
			})
					}else{
							wx.redirectTo({
				url: '../order-list/index?typeid=2',
			})
					}
			} else {
				wx.showToast({
				title:"支付失败",
				title:"success",
				complete:function(){
					wx.redirectTo({
				url: '../order-list/index?typeid=1',
			})
				}
			}
			)
			}
		}
	})
}

//获取店铺信息
function getShopInfo(e, appId,type) {
	var shop =wx.getStorageSync('shopInfo')
	
	if(shop){
			var coordinate = shop.coordinate
			var latitude = Number(coordinate.split(";")[0]);
			var longitude = Number(coordinate.split(";")[1]);
			var point = {
				latitude: latitude,
				longitude: longitude
			}
			var points = []
			points.push(point)
			e.setData({
				shopInfo: shop,
				point: point,
				includepoints: points
			})
		return
	}
	wx.request({
		url: app.globalData.serverAddr + app.globalData.shopUrl,
		data: {
			appId: appId

		},
		success: function(res) {
			console.log(e.data)
			wx.setStorage({key:"shopInfo",value:res.data.data})
			var coordinate = res.data.data.coordinate
			var latitude = Number(coordinate.split(";")[0]);
			var longitude = Number(coordinate.split(";")[1]);
			var point = {
				latitude: latitude,
				longitude: longitude
			}
			var marker = {
				latitude: latitude,
				longitude: longitude,
				iconPath:"/images/ooopic_1504253431.png",
				width:40,
				height:50
			}
			var points = []
			var  markers=[]
			points.push(point)
			markers.push(marker)
			e.setData({
				shopInfo: res.data.data,
				point: point,
				includepoints: points,
				markers:markers
				
			})
		}
	})

}

function getOrderListByType(e,status,type,ptStatus,currentPage,pageSize){
	var openId =wx.getStorageSync("sessionKey")
	
	var data ={	}
	data.appId=app.globalData.appId
	data.openId=openId
	data.status=status
	data.currentPage=currentPage
	data.pageSize=pageSize
	if(ptStatus >0){
		data.ptStatus=ptStatus
	}
	if(type){
		data.type=type
	}
	wx.request({
		url: app.globalData.serverAddr + app.globalData.orderlistUrl,
		data: data
		,
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8;'
		},
		method:"GET",
		success: function(res) {
			wx.hideLoading()
			var oldorderlist =e.data.orderlist
			if(currentPage == 1){
				
				oldorderlist=[]
			}
			if(res.data.success){
					
				var orderlist=res.data.data
				for(var i=0;i<orderlist.length;i++){
					var totalcout =0
					orderlist[i].shoppingList=JSON.parse(orderlist[i].shoppingList)
					if(orderlist[i].shoppingList.length>0){
						if(orderlist[i].shoppingList[0].pic){
						var pic =orderlist[i].shoppingList[0].pic
							orderlist[i].shoppingList[0].pic=pic.split(",")[0]
							console.log("pic:"+pic)
						}
						for (var j =0;j<orderlist[i].shoppingList.length;j++) {
							totalcout=totalcout+orderlist[i].shoppingList[j].count
						}
						console.log("totalcout"+totalcout)
						orderlist[i].totalcout=totalcout
					}
					oldorderlist.push(orderlist[i])
				}
				e.setData({orderlist:oldorderlist,currentPage:currentPage})
				
			}
		}
	})
	
}

function getOrderInfo(e,orderId){
	var openId =wx.getStorageSync("sessionKey")
	wx.request({
		url: app.globalData.serverAddr + app.globalData.orderinfoUrl,
		data: {
			appId: app.globalData.appId,
			payId:orderId,
			openId:openId

		},
		success: function(res) {
			if(res.data.success){
			
				var orderInfo=res.data.data
					orderInfo.shoppingList=JSON.parse(orderInfo.shoppingList)
					if(orderInfo.shoppingList.length>0){
						var pic =orderInfo.shoppingList[0].pic
						if(pic){
							orderInfo.shoppingList[0].pic=pic.split(",")[0]
						}
							
						}

						
				var shoppingList=res.data.data.shoppingList
				e.setData({orderInfo:orderInfo,proudctlist:shoppingList})
			}
		}
	})
}


function cancelOrder(e,payId,status){
	
	wx.request({
		url: app.globalData.serverAddr + app.globalData.cancelorderUrl,
		data: {
			appId: app.globalData.appId,
			payId:payId,
			status:status
		},
		success: function(res) {
			if(status == 6){
					wx.showToast({
				title:"订单取消成功",
				title:"success",
				complete:function(){
					
					wx.redirectTo({
						
				url: '../order-list/index?typeid=1',
			})
				}
			}
			)
			}else{
					wx.showToast({
				title:"订单确认收货成功",
				title:"success",
				complete:function(){
					
					wx.redirectTo({
						
				url: '../order-list/index?typeid=2',
			})
				}
			}
			)
			}
			
			
		}
	})
}

function setIntervalTims(e,stringTime,interval){
	return setInterval(function(){
		ShowCountDown(e,stringTime) 
		
	},interval)
}

function ShowCountDown(e,stringTime) 
{ 
var now = new Date(); 
console.log("stringTime:"+stringTime)
var endDate = Date.parse(new Date(stringTime.replace(/-/g,"/")))
console.log("endDate:"+endDate)
var leftTime=endDate-now.getTime(); 
console.log("leftTime:"+leftTime)
var leftsecond = parseInt(leftTime/1000); 
//var day1=parseInt(leftsecond/(24*60*60*6)); 
console.log("leftsecond:"+leftsecond)
var day1=Math.floor(leftsecond/(60*60*24)); 
console.log("day1:"+day1)
var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
console.log(day1+":"+hour)
if(day1<=0&&hour<=0&&minute<=0&&second<=0){
	e.setData({
	isFinished:true
})
}else{
	e.setData({
	endDay:day1,
	endHour:hour,
	endminute:minute,
	endSeconds:second
})
}



} 


function getSearchHistory(){
	
	
	return wx.getStorageSync("seachrList")
}

function addSearchHistory(name){
	var seachrList =getSearchHistory()
	if(null==seachrList){
		seachrList =[]
	}
	var isExists=false
	for(var i =0;i<seachrList.length;i++){
		if(name == seachrListp[i].name){
			seachrListp[i].time = new Date()
			isExists = true
		}
		
		
	}
	if(!isExists){
		var hist = {name:name,time:new Date()}
		seachrListp.push(hist)
	}else{
		 seachrListp.sort(function(a,b){
            return a.time-b.time});
	}
	
}

function getListByName(e,name,currentPage,pageSize){
	wx.request({
		url: app.globalData.serverAddr + app.globalData.getListByName,
		data: {
			appId:app.globalData.appId,
			name:name,
			currentPage:currentPage,
			pageSize:pageSize

		},
		success: function(res) {
			
			}
		
	})
	
}
module.exports = {
	getTopProductListByType: getTopProductListByType,
	getHotProductListByType: getHotProductListByType,
	getShopInfo: getShopInfo,
	payOrder: payOrder,
	getProductListByType: getProductListByType,
	getProductInfo: getProductInfo,
	getShoppingCartInfo: getShoppingCartInfo,
	getTypeList: getTypeList,
	saveShoppingCartInfo: saveShoppingCartInfo,
	saveOrder: saveOrder,
	getOrderListByType:getOrderListByType,
	getOrderInfo:getOrderInfo,
	submitPayOrder:submitPayOrder,
	cancelOrder:cancelOrder,
	getListByName:getListByName,
	getTypeChildList:getTypeChildList,
	getProductCount:getProductCount,
	ShowCountDown:ShowCountDown,
	setIntervalTims:setIntervalTims,
	saveShoppingCartInfoNew:saveShoppingCartInfoNew,
	removeProduct:removeProduct,
	emptyShoppingCart:emptyShoppingCart
}
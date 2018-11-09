var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../service/cart.js")), e = require("./../../utils/api.js"), a = require("./../../utils/store.js"), o = require("./../../utils/util.js"), i = require("../../service/location.js"), n = (require("./../../utils/promise/es6-promise.min.js"), 
getApp()), d = !1;

Page({
    data: {
        productActiveIndex:0,
        categorys:[]
    },
    tapHandler: function(t) {
        e.tapHandler({
            title: "luckin coffee",
            route: this.route,
            element: t
        });
    },
    goImgLink: function(t) {
        var e = t.currentTarget.dataset.clickurl;
        e.includes("https://m.luckincoffee.com") || e.includes("https://mkt.luckincoffee.com") || e.includes("https://mpre.luckincoffee.com") || e.includes("https://mktpre.luckincoffee.com") ? (n.globalData.imgClickUrl = e, 
        wx.navigateTo({
            url: "./imgwebview"
        })) : e.includes("pages/index/menu") || e.includes("pages/index/home") || e.includes("pages/order/list") || e.includes("pages/index/cart") || e.includes("pages/member/center") ? wx.switchTab({
            url: e
        }) : e.includes("pages/") ? wx.navigateTo({
            url: e
        }) : console.log("跳转链接不存在或不被包含在业务域名，请配置！，clickurl:", e);
    },
    alertDispathMsg: function(t) {
        this.tapHandler(t), wx.showModal({
            title: "慢必赔规则说明",
            content: "luckin coffee 向您承诺，制作完成后30分钟内，外送必达。如超时送达，您可申请索赔本单全部饮品消费。",
            showCancel: !1,
            confirmColor: "#7CA7D2",
            confirmText: "我知道了"
        });
    },
    gotoCitySelect: function(t) {
        t.targetUrl = "/pages/address/city?from=index", this.tapHandler(t), wx.navigateTo({
            url: t.targetUrl
        });
    },
    gotoSelectAddress: function(t) {
        var e = t.target.dataset.delivery;
        t.targetUrl = "/pages/address/select?delivery=" + (e || "pick"), this.tapHandler(t), 
        wx.navigateTo({
            url: t.targetUrl
        });
    },
    getLocation: function() {
        var t = this;
        t.setData({
            locationSuccess:true
        })
    },
    standardSwitchHandler: function(t) {
        this.tapHandler(t);
        var e = t.target.dataset.code, a = t.target.dataset.inventory;
        this.data.detailStandardCode !== e && 1 * a != 0 && (this.setData({
            detailStandardCode: e
        }), this.reCalculateProductPrice("standard"));
    },
    temperSwitchHandler: function(t) {
        this.tapHandler(t);
        var e = t.target.dataset.code, a = t.target.dataset.inventory;
        this.data.detailTemperCode !== e && 1 * a != 0 && (this.setData({
            detailTemperCode: e
        }), this.reCalculateProductPrice("temper"));
    },
    additionSwitchHandler: function(t) {
        this.tapHandler(t);
        var e = t.target.dataset.inventory, a = t.target.dataset.code, o = t.target.dataset.index;
        if (this.data.detailAdditionList[o].code !== a && 1 * e != 0) {
            var i = this.data.detailAdditionList;
            this.data.detailAdditionList[o].code = a, this.setData({
                detailAdditionList: i
            }), this.reCalculateProductPrice("addition", a);
        }
    },
    gotoWallet: function(t) {
        t.targetUrl = "/pages/coupon/walletbuy", this.tapHandler(t), wx.navigateTo({
            url: t.targetUrl
        });
    },
    incrementProductCountHandler: function(e) {
        this.tapHandler(e);
        var a = t.default.getCartItemsAmount(), o = n.globalData.dataset.cartCountLimit - a, i = this.data.detailProductCount;
        i < this.data.product.maxAmount && i < o ? this.setData({
            detailProductCount: ++i
        }) : wx.showModal({
            title: "",
            content: "该商品可购买数量已达上限",
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: n.globalData.modal.confirmColor
        });
    },
    hideProductDetailLayer: function(t) {
        if (t) {
            if ("true" !== (t.target ? t.target.dataset.close : t.currentTarget ? t.currentTarget.dataset.close : "")) return;
            this.tapHandler(t);
        }
        var e = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        e.scale(.2, .2).opacity(.7).step(), this.setData({
            detailLayerAnimateData: e.export(),
            detailProductCount: 1,
            detailStandardCode: null,
            detailTemperCode: null,
            detailAdditionList: []
        }), setTimeout(function() {
            this.setData({
                product: null,
                showDetailLayer: !1
            }), d = !1;
        }.bind(this), 280);
    },
    tapMenuItem: function(t) {
        this.tapHandler(t);
        var e = t.currentTarget.dataset.id;
        this.setData({
            currentScrollTop: this.data.productScrollTop[e],
            productActiveIndex: e
        });
    },

    productDetailMashTap: function(t) {
        return !1;
    },
    loadAdposData: function() {
        var that = this;
        e.ajax({
            url: "/banner/list",
            data: {
                type:2
            },
            options: {
                loading: !1
            }
        }).then(function(res) {
            if (res.code == 0){
                that.setData({
                    adPos: res.data
                })
            }
        });
    },
    loadProductList: function() {
        var that = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), e.ajax({
            url: "/shop/goods/list",
            options: {
                loading: !1,
                needOriginResult: !0
            }
        }).then(res=>{
            that.sortProducts(res.data);
        })
    },
    sortProducts:function(products){
      for (var item of products){
          for (var category of this.data.categorys) {
              if (category.id == item.categoryId) {
                  !category.products ? category.products = [] : null;
                  category.products.push(item)
              }
          }
      }
      var that = this;
      wx.hideLoading();
      this.setData({
          categorys:that.data.categorys
      })
    },
    loadcategory:function(){
        var that = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), e.ajax({
            url: "/shop/goods/category/all",
            options: {
                loading: !1,
                needOriginResult: !0
            }
        }).then(res=>{
            wx.hideLoading();
            that.data.categorys = res.data;
            that.loadProductList();
        })
    },
    onLoad: function(t) {
        this.loadAdposData();
        this.loadcategory();
        this.loadProductList();
    },
    onReady: function() {},
    onHide: function() {
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(),
            this.loadProductListData().then(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }).catch(function(t) {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return n.globalData.share;
    }
});
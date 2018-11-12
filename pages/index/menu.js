var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../service/cart.js")), e = require("./../../utils/api.js"), a = require("./../../utils/store.js"), o = require("./../../utils/util.js"), i = require("../../service/location.js"), n = (require("./../../utils/promise/es6-promise.min.js"), 
getApp()), d = !1;

Page({
    data: {
        delivery: null,
        locationSuccess: null,
        cityNoShop: !1,
        cityNoShopText: "",
        areaNoShop: !1,
        areaNoShopText: null,
        hasTakeoutKitchen: !1,
        hasTakeoutKitchenText: null,
        hasNoProductText: null,
        dispatchMsg: "",
        shopInfo: null,
        addressInfo: null,
        adPos: [],
        products: null,
        menuActiveIndex: 0,
        productActiveIndex: 0,
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        product: null,
        showDetailLayer: !1,
        detailLayerAnimateData: null,
        detailProductCount: 1,
        detailStandardCode: null,
        detailTemperCode: null,
        detailAdditionList: [],
        productScrollTop: [],
        currentScrollTop: 0,
        windowHeight: "",
        windowWidth: "",
        radio: "",
        calcHeight: "400rpx",
        addressSentHeight: 166,
        addressPickHeight: 128,
        bannerHeight: 240,
        bannerHeightDefault: 240,
        contentHeight: "",
        productItemHeight: ""
    },
    tapHandler: function(t) {
        // e.tapHandler({
        //     title: "luckin coffee",
        //     route: this.route,
        //     element: t
        // });
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
                products: null,
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
    productScrollHandler: function(t) {
        for (var e = t.detail.scrollTop, a = this.data.productScrollTop, o = this.data.productActiveIndex, i = -1, n = 0; n < a.length; n++)
            e + 15 > a[n] && e - 15 < a[n] && (i = n);
        -1 !== i && i !== o && (i > this.data.products.length && (i = this.data.products.length - 1),
            this.setData({
                productActiveIndex: i,
                bannerHeight: this.data.bannerHeightDefault - e > 0 ? this.data.bannerHeightDefault - e : 0
            }));
    },
    calcProductScrollTop: function() {
        var t = 188 * this.data.radio,
            e = this.data.products,
            a = [];
        a.push(0);
        for (var o = 0, i = 0; i < e.length; i++) {
            o += e[i].productList.length * t;
            a.push(o)
        };
        this.setData({
            productItemHeight: t,
            productScrollTop: a
        });
    },
    calcContentHeight: function() {
        var t = "pick" === this.data.delivery ? this.data.addressPickHeight : this.data.addressSentHeight;
        this.setData({
            contentHeight: this.data.windowHeight - this.data.bannerHeight - t
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
        for (var cIdx in this.data.products) {
            if (!this.data.products[cIdx].productList){
                this.data.products[cIdx].productList = [];
            }
            for (var iIdex in products){
                if (this.data.products[cIdx].id == products[iIdex].categoryId) {
                    this.data.products[cIdx].productList.push(products[iIdex])
                }
            }
      }
      var that = this;
      wx.hideLoading();
      this.setData({
          products:that.data.products
      });
        this.calcProductScrollTop();
        this.calcContentHeight();
    },
    addShoppingCartForIndex: function(a) {
        var i = this;
        if (this.tapHandler(a), !d) {
            d = !0;
            var s = a.target.dataset.pop ? a.target.dataset.pop : a.currentTarget.dataset.pop,
                r = a.target.dataset.product ? a.target.dataset.product : a.currentTarget.dataset.product;
            if (0 !== r.maxAmount) {
                var c = !r.temperAttributeItem || r.temperAttributeItem.length <= 1, l = !r.additionDefaultList || r.additionDefaultList.length < 1, u = !1;
                if (r.standardCodeItem) {
                    for (var h = 0, p = 0; p < r.standardCodeItem.length; p++) 1 === r.standardCodeItem[p].isInventory && h++;
                    u = !(h > 1);
                } else u = !0;
                if (!s && u && c && l) {
                    var g = null, f = null;
                    return r.standardCodeItem && r.standardCodeItem.length > 0 && (g = r.standardCodeItem[0].code),
                        f = r.temperAttributeItem && r.temperAttributeItem.length > 0 ? r.temperAttributeItem[0].code : r.temperAttributeCode,
                    t.default.add({
                        productId: r.productId,
                        temperAttributeCode: f,
                        standardCode: g,
                        amount: 1,
                        additionList: r.additionDefaultList,
                        eatway: r.eatway,
                        maxAmount: r.maxAmount
                    }) && o.toast("成功加入购物车", "success"), void (d = !1);
                }
                var m = r.promotionMsg;
                e.ajax({
                    url: "/shop/goods/detail",
                    data: {
                        id: r.id,
                        isHide: "NO",
                    }
                }).then(function(t) {
                    var e = t.data;
                    i.setData({
                        product: Object.assign({}, e, {
                            promotionMsg: m
                        })
                    }), i.reCalculateProductCheck(e);
                    var a = wx.createAnimation({
                        duration: 300,
                        timingFunction: "line"
                    });
                    i.animation = a, a.scale(.3, .3).step(), i.setData({
                        showDetailLayer: !0,
                        detailLayerAnimateData: a.export()
                    }), setTimeout(function() {
                        a.scale(1.05, 1.05).step(), this.setData({
                            detailLayerAnimateData: a.export()
                        });
                    }.bind(i), 100), setTimeout(function() {
                        var t = this;
                        a.scale(1, 1).step(), this.setData({
                            detailLayerAnimateData: a.export()
                        }), 0 === e.basicInfo.stores && wx.showModal({
                            title: "",
                            content: '"' + e.name + '"暂停售卖，请选购其他',
                            showCancel: !1,
                            confirmText: "选购其他",
                            confirmColor: n.globalData.modal.confirmColor,
                            success: function(e) {
                                t.hideProductDetailLayer(), t.loadProductList();
                            }
                        });
                    }.bind(i), 400);
                }).catch(function(t) {
                    d = !1;
                });
            } else d = !1;
        }
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
            that.data.products = res.data;
            that.loadProductList();
        })
    },
    loadSystemInfo: function() {
        var t = this, e = wx.getSystemInfoSync();
        if ("android" === e.platform) wx.createSelectorQuery().select("#fixed-helper").boundingClientRect(function(e) {
            var a = e.width / 750;
            t.setData({
                windowHeight: e.height,
                windowWidth: e.width,
                radio: a,
                addressSentHeight: t.data.addressSentHeight * a,
                addressPickHeight: t.data.addressPickHeight * a,
                bannerHeight: t.data.bannerHeight * a,
                bannerHeightDefault: t.data.bannerHeightDefault * a
            });
        }).exec(); else {
            var a = e.windowWidth / 750;
            this.setData({
                windowHeight: e.windowHeight,
                windowWidth: e.windowWidth,
                radio: a,
                addressSentHeight: this.data.addressSentHeight * a,
                addressPickHeight: this.data.addressPickHeight * a,
                bannerHeight: this.data.bannerHeight * a,
                bannerHeightDefault: this.data.bannerHeightDefault * a
            });
        }
    },
    onLoad: function(t) {
        this.loadSystemInfo()
        this.loadAdposData();
        this.loadcategory();
        // this.loadProductList();
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
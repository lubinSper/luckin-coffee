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
        e.tapHandler({
            title: "luckin coffee",
            route: this.route,
            element: t
        });
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
    clearGlobalDataCache: function() {
        this.setData({
            cityNoShop: !1,
            areaNoShop: !1,
            hasTakeoutKitchen: !1,
            menuActiveIndex: 0,
            productActiveIndex: 0,
            showDetailLayer: !1
        }), d = !1;
    },
    loadGlobalData: function() {
        this.setData({
            delivery: n.globalData.delivery,
            shopInfo: n.globalData.shopInfo,
            addressInfo: n.globalData.addressInfo,
            locationSuccess: n.globalData.location.success,
            dispatchMsg: n.globalData.dispatchMsg
        });
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
    wxLogin: function() {
        n.globalData.openid || wx.login({
            success: function(t) {
                var o = t.code;
                e.ajax({
                    url: "/resource/m/user/wxlogin",
                    data: {
                        code: o,
                        isAuthorization: !0
                    },
                    options: {
                        loading: !1
                    }
                }).then(function(t) {
                    t && t.content && t.content.openid && (n.globalData.openid = t.content.openid, n.globalData.sessionKey = t.content.sessionKey, 
                    a.setStore("openid", t.content.openid));
                });
            }
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
        this.data.shopInfo || (this.data.locationSuccess ? this.data.shopInfo || this.loadNearShop() : wx.getLocation({
            type: "gcj02",
            success: function(e) {
                Object.assign(n.globalData.location, e), n.globalData.location.success = !0, t.setData({
                    locationSuccess: !0
                }), i.locationToCityInfo(e.longitude, e.latitude).then(function(t) {
                    t && (n.globalData.locationCityInfo = {
                        cityId: t.cityId,
                        cityName: t.name
                    });
                }), t.loadNearShop();
            },
            fail: function(e) {
                n.globalData.location.success = !1, t.setData({
                    locationSuccess: !1
                });
            }
        }));
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
    loadSystemDataset: function() {
        e.ajax({
            url: "/resource/m/sys/sysDict",
            options: {
                loading: !1
            }
        }).then(function(t) {
            t && t.content && (n.globalData.dataset = t.content);
        });
    },
    loadNearShop: function() {
        var t = this, a = n.globalData.location;
        e.ajax({
            url: "/resource/m/sys/base/homeshop",
            data: {
                longitude: a.longitude,
                latitude: a.latitude,
                lonHere: a.longitude,
                latHere: a.latitude,
                channel: n.globalData.mapChannel,
                isExpress: 0,
                deptId: "",
                appVersion: n.globalData.appVersion,
                isSelfShop: 0
            },
            options: {
                needOriginResult: !0
            }
        }).then(function(e) {
            if (7 === e.code) t.setData({
                cityNoShop: !0,
                cityNoShopText: e.msg
            }); else if (e.content && e.content.nearShopAbnormalInfo && 1 === e.content.nearShopAbnormalInfo.abnormalType) t.setData({
                areaNoShop: !0,
                areaNoShopText: e.content.nearShopAbnormalInfo.abnormalDesc
            }); else if (e.content && e.content.nearShopAbnormalInfo && 2 === e.content.nearShopAbnormalInfo.abnormalType) t.setData({
                hasTakeoutKitchen: !0,
                hasTakeoutKitchenText: e.content.nearShopAbnormalInfo.abnormalDesc
            }); else {
                if (e.content && e.content.defaultAddressInfo) {
                    n.globalData.delivery = "sent";
                    var a = e.content.defaultAddressInfo;
                    n.globalData.addressInfo = a, t.setData({
                        delivery: "sent",
                        addressInfo: a
                    });
                }
                var o = i.shopDistanceConvert(e.content.nearShop);
                n.globalData.shopInfo = o, t.setData({
                    shopInfo: o
                }), n.globalData.location.cityId = e.content.cityId, n.globalData.location.cityName = e.content.cityName, 
                n.globalData.locationCityInfo = {
                    cityId: e.content.cityId,
                    cityName: e.content.cityName
                }, n.globalData.dispatchMsg = e.content.dispatchMsg, t.setData({
                    dispatchMsg: n.globalData.dispatchMsg
                }), t.loadProductList();
            }
        });
    },
    addShoppingCartForIndex: function(a) {
        var i = this;
        if (this.tapHandler(a), !d) {
            d = !0;
            var s = a.target.dataset.pop ? a.target.dataset.pop : a.currentTarget.dataset.pop, r = a.target.dataset.product ? a.target.dataset.product : a.currentTarget.dataset.product;
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
                    url: "/resource/m/product/detail2",
                    data: {
                        deptId: this.data.shopInfo.deptId,
                        productId: r.productId,
                        isHide: "NO",
                        tasteId: "",
                        paymentAccountType: 1,
                        supportTakeout: "sent" === this.data.delivery ? 1 : 0
                    }
                }).then(function(t) {
                    var e = t.content;
                    e.desc && (e.descAry = e.desc.split("\n")), i.setData({
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
                        }), 0 === e.maxAmount && wx.showModal({
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
    reCalculateProductCheck: function(t) {
        var e = t.standardCodeItem;
        if (e && e.length > 0) {
            for (var a in e) if (1 === e[a].checked) {
                this.setData({
                    detailStandardCode: e[a].code
                });
                break;
            }
        } else this.setData({
            detailStandardCode: t.standardCode
        });
        var o = t.temperAttributeItem;
        if (o && o.length > 0) {
            for (var i in o) if (1 === o[i].checked) {
                this.setData({
                    detailTemperCode: o[i].code
                });
                break;
            }
        } else this.setData({
            detailTemperCode: t.temperAttributeCode
        });
        var n = t.additionList, d = [];
        if (n) for (var s in n) if (n[s] && n[s].typeList) for (var r in n[s].typeList) if (n[s].typeList[r]) for (var c in n[s].typeList[r]) 1 === n[s].typeList[r][c].checked && d.push({
            amount: n[s].typeList[r][c].amount,
            code: n[s].typeList[r][c].code
        });
        this.setData({
            detailAdditionList: d
        });
    },
    addShoppingCartForDetail: function(e) {
        if (this.tapHandler(e), this.data.product) {
            if (null === this.data.detailStandardCode || null === this.data.detailTemperCode) return this.setData({
                detailProductCount: 1
            }), void this.hideProductDetailLayer();
            t.default.add({
                productId: this.data.product.productId,
                temperAttributeCode: this.data.detailTemperCode,
                standardCode: this.data.detailStandardCode,
                amount: this.data.detailProductCount,
                additionList: this.data.detailAdditionList,
                eatway: this.data.product.eatway,
                maxAmount: this.data.product.maxAmount
            }) && (this.setData({
                detailProductCount: 1
            }), o.toast("成功加入购物车", "success"), this.hideProductDetailLayer());
        }
    },
    gotoWallet: function(t) {
        t.targetUrl = "/pages/coupon/walletbuy", this.tapHandler(t), wx.navigateTo({
            url: t.targetUrl
        });
    },
    decrementProductCountHandler: function(t) {
        this.tapHandler(t);
        var e = this.data.detailProductCount;
        e > 1 && this.setData({
            detailProductCount: --e
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
    productScrollHandler: function(t) {
        for (var e = t.detail.scrollTop, a = this.data.productScrollTop, o = this.data.productActiveIndex, i = -1, n = 0; n < a.length; n++) e + 15 > a[n] && e - 15 < a[n] && (i = n);
        -1 !== i && i !== o && (i > this.data.products.length && (i = this.data.products.length - 1), 
        this.setData({
            productActiveIndex: i,
            bannerHeight: this.data.bannerHeightDefault - e > 0 ? this.data.bannerHeightDefault - e : 0
        }));
    },
    productScrollTopHandler: function() {},
    calcProductScrollTop: function() {
        this.data.radio;
        var t = 188 * this.data.radio, e = this.data.products, a = [];
        a.push(0);
        for (var o = 0, i = 0; i < e.length; i++) o += e[i].productList.length * t, a.push(o);
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
        var t = this, a = wx.getSystemInfoSync();
        e.ajax({
            url: "/resource/m/sys/app/adpos",
            data: {
                Width: a.pixelRatio * a.screenWidth,
                Height: a.pixelRatio * a.screenHeight,
                source: a.system.includes("Android") ? 1 : 2,
                displayLocation: 2,
                appVersion: n.globalData.appVersion
            },
            options: {
                loading: !1
            }
        }).then(function(e) {
            e && e.content && e.content.length > 0 ? (t.setData({
                adPos: e.content,
                bannerHeight: t.data.bannerHeightDefault
            }), e.content.length < 2 && t.setData({
                indicatorDots: !1,
                autoplay: !1
            })) : (t.setData({
                adPos: null,
                bannerHeight: 0
            }), t.calcContentHeight());
        });
    },
    loadProductList: function() {
        var t = this;
        if (!this.data.shopInfo) return !1;
        var a = wx.getSystemInfoSync();
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), e.ajax({
            url: "/resource/m/product/list",
            data: {
                deptId: this.data.shopInfo.deptId,
                supportTakeout: this.data.delivery,
                applyTerminal: a.model.indexOf("iPhone") ? 1 : 2
            },
            options: {
                loading: !1,
                needOriginResult: !0
            }
        }).then(function(e) {
            if (wx.hideLoading(), e && 7 === e.code) t.setData({
                hasNoProductText: e.msg,
                products: []
            }); else if (e && e.content) {
                var a = e.content.shopInfo;
                0 === a.isWork ? wx.showModal({
                    title: "",
                    content: "店铺已打烊ZzZ " + (a.workDesc ? a.workDesc : "") + "营业时间再来吧",
                    showCancel: !1,
                    confirmText: "我知道了",
                    confirmColor: n.globalData.modal.confirmColor
                }) : 2 === a.isWork && wx.showModal({
                    title: "",
                    content: a.workDesc ? a.workDesc : "",
                    showCancel: !1,
                    confirmText: "切换门店",
                    confirmColor: n.globalData.modal.confirmColor,
                    success: function() {
                        wx.navigateTo({
                            url: "/pages/address/select?from=menu&delivery=pick"
                        });
                    }
                });
                var o = e.content.commodityList.map(function(t) {
                    var e = Object.assign({}, t);
                    if (Object.prototype.hasOwnProperty.call(e, "kindDesc")) if (/[1-9]折/.test(e.kindDesc)) {
                        var a = e.kindDesc.split("/").map(function(t) {
                            return t.trim();
                        });
                        e = Object.assign({}, e, {
                            kindDescIsOnSale: !0,
                            kindDescOnSaleFirst: a.shift(),
                            kindDescOnSaleRest: a.join(" / ")
                        });
                    } else e = Object.assign({}, e, {
                        kindDescIsOnSale: !1
                    });
                    var o = "";
                    switch (e.kindIconDisplay) {
                      case 1:
                        o = "https://static.luckincoffeecdn.com/mini/images/menu/hot.png";
                        break;

                      case 2:
                        o = "https://static.luckincoffeecdn.com/mini/images/menu/sale.png";
                        break;

                      case 0:
                      default:
                        o = e.iconUrl;
                    }
                    return e = Object.assign({}, e, {
                        displayedIconUrl: o
                    });
                });
                t.setData({
                    products: o || [],
                    hasNoProductText: o.length ? null : "该门店暂无可售商品"
                }), t.calcContentHeight(), t.calcProductScrollTop();
            }
        });
    },
    reCalculateProductPrice: function(t, a) {
        var o = this, i = "standard" === t ? 1 : "temper" === t ? 2 : 3;
        e.ajax({
            url: "/resource/m/product/pricecalc2",
            data: {
                deptId: this.data.shopInfo.deptId,
                productId: this.data.product.productId,
                standardCode: this.data.detailStandardCode,
                temperAttributeCode: this.data.detailTemperCode,
                additionCode: a,
                additionList: this.data.detailAdditionList,
                clickSite: i,
                paymentAccountType: 1,
                supportTakeout: "sent" === this.data.delivery ? "1" : "0"
            },
            options: {
                needOriginResult: !0
            }
        }).then(function(t) {
            if ((!t || 7 !== t.code) && t && t.content) {
                var e = o.data.product;
                Object.assign(e, t.content), o.setData({
                    product: e
                }), o.reCalculateProductCheck(e);
            }
        });
    },
    onLoad: function(t) {
        this.loadSystemInfo(), this.wxLogin(), this.loadSystemDataset();
    },
    onReady: function() {},
    onShow: function() {
        e.scanHandler({
            title: "luckin coffee",
            route: this.route
        }), this.clearGlobalDataCache(), this.loadGlobalData(), n.globalData.hideTime && (Date.now() - n.globalData.hideTime) / 1e3 > n.globalData.dataset.locationRefreshTime && (n.globalData.delivery = "pick", 
        this.setData({
            delivery: "pick",
            shopInfo: null,
            locationSuccess: !1
        }), n.globalData.hideTime = ""), this.data.shopInfo ? this.loadProductList() : this.getLocation(), 
        this.loadAdposData();
    },
    onHide: function() {
        this.hideProductDetailLayer();
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.loadProductListData().then(function() {
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
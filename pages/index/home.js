function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../service/coupon.js")), o = t(require("../../service/share.js")), a = t(require("./../../service/login.js")), n = t(require("./../../utils/api.js")), i = require("../../service/location.js"), l = getApp();

Page({
    data: {
        sendTip: "",
        locationSuccess: null,
        location: {},
        delivery: null,
        shopInfo: {},
        isShowEnvelope: !1,
        isReceived: !1,
        systemInfo: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        adPics: [ {
            sourceUrl: "./../../resources/images/index/banner_default.png"
        } ],
        colseImg: !1
    },
    wxLogin: function() {
        l.globalData.openid || wx.login({
            success: function(t) {
                var e = t.code;
                n.default.ajax({
                    url: "/resource/m/user/wxlogin",
                    data: {
                        code: e,
                        isAuthorization: !0
                    },
                    options: {
                        loading: !1
                    }
                }).then(function(t) {
                    t && t.content && t.content.openid && (l.globalData.openid = t.content.openid, l.globalData.sessionKey = t.content.sessionKey);
                });
            }
        });
    },
    loadGlobalData: function() {
        this.setData({
            delivery: l.globalData.delivery,
            shopInfo: l.globalData.shopInfo,
            locationSuccess: l.globalData.location.success,
            location: l.globalData.location
        });
    },
    goImgLink: function(t) {
        var e = t.currentTarget.dataset.clickurl;
        e && (e.includes("https://m.luckincoffee.com") || e.includes("https://mkt.luckincoffee.com") || e.includes("https://mpre.luckincoffee.com") || e.includes("https://mktpre.luckincoffee.com") ? (l.globalData.imgClickUrl = e, 
        wx.navigateTo({
            url: "./imgwebview"
        })) : e.includes("pages/index/menu") || e.includes("pages/index/home") || e.includes("pages/order/list") || e.includes("pages/index/cart") || e.includes("pages/member/center") ? wx.switchTab({
            url: e
        }) : e.includes("pages/") && (1 != a.default.getLoginStatus() && e.includes("walletbuy") ? wx.navigateTo({
            url: "./login"
        }) : wx.navigateTo({
            url: e
        })));
    },
    getLocation: function() {
        var t = this;
        {
            if (!this.data.shopInfo) return this.data.locationSuccess ? (this.getTip(), void (this.data.shopInfo || this.loadNearShop())) : void wx.getLocation({
                type: "gcj02",
                success: function(e) {
                    Object.assign(l.globalData.location, e), l.globalData.location.success = !0, t.setData({
                        locationSuccess: !0,
                        location: l.globalData.location
                    }), i.locationToCityInfo(e.longitude, e.latitude).then(function(e) {
                        e && (l.globalData.locationCityInfo = {
                            cityId: e.cityId,
                            cityName: e.name
                        }), t.getTip();
                    }), t.loadNearShop();
                },
                fail: function(e) {
                    l.globalData.location.success = !1, t.setData({
                        locationSuccess: !1
                    });
                }
            });
            this.getTip();
        }
    },
    loadNearShop: function() {
        var t = this, e = l.globalData.location;
        n.default.ajax({
            url: "/resource/m/sys/base/homeshop",
            data: {
                longitude: e.longitude,
                latitude: e.latitude,
                lonHere: e.longitude,
                latHere: e.latitude,
                channel: l.globalData.mapChannel,
                isExpress: 0,
                deptId: "",
                appVersion: l.globalData.appVersion,
                isSelfShop: 0
            },
            options: {
                needOriginResult: !0
            }
        }).then(function(e) {
            if (7 === e.code) ; else if (e.content && e.content.nearShopAbnormalInfo && 1 === e.content.nearShopAbnormalInfo.abnormalType) ; else if (e.content && e.content.nearShopAbnormalInfo && 2 === e.content.nearShopAbnormalInfo.abnormalType) ; else {
                if (e.content && e.content.defaultAddressInfo) {
                    l.globalData.delivery = "sent";
                    var o = e.content.defaultAddressInfo;
                    l.globalData.addressInfo = o;
                }
                var a = i.shopDistanceConvert(e.content.nearShop);
                l.globalData.shopInfo = a, t.setData({
                    shopInfo: a
                }), l.globalData.location.cityId = e.content.cityId, l.globalData.location.cityName = e.content.cityName, 
                l.globalData.locationCityInfo = {
                    cityId: e.content.cityId,
                    cityName: e.content.cityName
                }, l.globalData.dispatchMsg = e.content.dispatchMsg;
            }
        });
    },
    tapHandler: function(t) {
        n.default.tapHandler({
            title: "luckin coffee",
            route: this.route,
            element: t
        });
    },
    receiveCoupon: function(t) {
        var o = this, a = this;
        this.tapHandler(t), this.data.isReceived ? (e.default.setShowEnvelope(!1), this.setData({
            isShowEnvelope: !1
        })) : n.default.ajax({
            url: "/resource/m/promotion/wechatCard/get",
            data: {
                openid: l.globalData.openid,
                formid: t.detail.formId || ""
            },
            options: {
                loading: !1,
                needOriginResult: !0
            }
        }).then(function(t) {
            1 === t.code ? (e.default.setCouponReceived(!0), o.setData({
                isReceived: !0
            })) : 7 === t.code ? (wx.showToast({
                title: t.msg || "活动未开始，敬请期待",
                icon: "none"
            }), "mini100" === t.busiCode && setTimeout(function() {
                e.default.setCouponReceived(!0), e.default.setShowEnvelope(!1), a.setData({
                    isShowEnvelope: !1
                });
            }, 1e3)) : wx.showToast({
                title: "活动未开始，敬请期待",
                icon: "none"
            });
        });
    },
    coupon: function() {
        wx.navigateTo({
            url: "./coupon"
        });
    },
    closeEnvelope: function(t) {
        this.tapHandler(t), this.setData({
            isShowEnvelope: !1,
            colseImg: !0
        }), this.data.isReceived && e.default.setShowEnvelope(!1);
    },
    getTip: function() {
        var t = {
            lon: this.data.location.longitude,
            lat: this.data.location.latitude,
            channel: l.globalData.mapChannel
        };
        l.globalData.selectedCityInfo ? Object.assign(t, {
            cityID: l.globalData.selectedCityInfo.cityId
        }) : l.globalData.locationCityInfo && Object.assign(t, {
            cityID: l.globalData.locationCityInfo.cityId
        });
        var e = this;
        n.default.ajax({
            url: "/resource/m/sys/base/miniHome",
            data: t,
            options: {
                loading: !1,
                needLogin: !1
            }
        }).then(function(t) {
            var o = t.content ? t.content.length > 10 ? t.content.slice(0, 10) + ".." : t.content : "";
            e.setData({
                sendTip: o
            });
        });
    },
    getAdImage: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    systemInfo: e
                }), n.default.ajax({
                    url: "/resource/m/sys/app/adpos",
                    data: {
                        Width: e.pixelRatio * e.screenWidth,
                        Height: e.pixelRatio * e.screenHeight,
                        source: e.system.includes("Android") ? 1 : 2,
                        displayLocation: 0,
                        appVersion: l.globalData.appVersion
                    },
                    options: {
                        loading: !1
                    }
                }).then(function(e) {
                    if (e && e.content) {
                        var o = e.content.length > 0 ? e.content : t.data.adPics;
                        t.setData({
                            adPics: o
                        });
                    }
                });
            }
        });
    },
    toMenu: function() {
        wx.switchTab({
            url: "./menu"
        });
    },
    toWallet: function() {
        1 != a.default.getLoginStatus() ? wx.navigateTo({
            url: "./login"
        }) : wx.navigateTo({
            url: "./../coupon/wallet"
        });
    },
    toACup: function() {
        1 != a.default.getLoginStatus() ? wx.navigateTo({
            url: "./login"
        }) : o.default.getUrl(1);
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.wxLogin(), this.loadGlobalData(), this.getLocation(), this.getAdImage();
        var t = e.default.getCouponReceived(), o = !this.data.colseImg && e.default.getShowEnvelope();
        this.setData({
            isShowEnvelope: o,
            isReceived: t
        });
    },
    onHide: function(t) {},
    onUnload: function(t) {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return l.globalData.share;
    }
});
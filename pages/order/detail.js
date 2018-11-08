function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = t(require("../../service/order.js")), r = (t(require("../../service/cart.js")), 
t(require("../../service/share.js"))), i = require("../../utils/util.js"), o = require("../../utils/qrcode.js"), s = require("../../utils/api.js"), n = getApp(), d = null, l = null;

Page({
    data: {
        isIpx: n.globalData.isIpx,
        orderId: "",
        dataLoaded: !0,
        orderDetail: null,
        remainSecond: "",
        statusArr: [ "", "", "" ],
        isOrderDone: !1,
        showSlowPayTips: !1,
        showDispatchTime: !1,
        showArrivalTime: !1,
        showDeliveryContact: !1,
        showEvaluate: !1,
        showPopup: !1,
        hasClosePopup: !1,
        pageErr: !1,
        inviteImgUrl: "",
        showShareTip: !1,
        shareConfig: {
            redirectUrl: "",
            title: "",
            imgUrl: "",
            desc: ""
        },
        sharePosition: 2,
        isDefaultShareType: !0,
        fissionImgUrl: "",
        isFirstGetOrderDetail: !0
    },
    tapHandler: function(t) {
        s.tapHandler({
            title: "订单详情",
            route: this.route,
            element: t
        });
    },
    getShareConfig: function(t) {
        var a = this;
        s.ajax({
            url: "/resource/m/fissionRedPacket/getShareUrl",
            options: {
                loading: !1
            },
            data: {
                orderNo: t.orderNo,
                channel: 1,
                position: a.data.sharePosition
            }
        }).then(function(t) {
            if (t.content.image && t.content.title && t.content.desc) {
                var r;
                a.setData((r = {}, e(r, "shareConfig.redirectUrl", t.content.shareUrl), e(r, "shareConfig.imgUrl", t.content.image), 
                e(r, "shareConfig.title", t.content.title), e(r, "shareConfig.desc", t.content.desc), 
                r));
            }
        });
    },
    getOrderDetail: function() {
        var t = this, e = this;
        s.ajax({
            url: "/resource/m/order/detail",
            options: {
                loading: !1
            },
            data: {
                orderId: this.data.orderId
            }
        }).then(function(a) {
            e.getShareConfig(a.content), wx.hideLoading(), e.setData({
                dataLoaded: !0,
                pageErr: !1,
                orderDetail: a.content
            }), t.data.isFirstGetOrderDetail && e.setData({
                isFirstGetOrderDetail: !1,
                fissionImgUrl: a.content.fissionImgUrl
            }), e.computeDisplay();
            var r = e.data.orderDetail.orderStatusCode;
            90 !== r && 91 !== r && 92 !== r && 93 !== r && 94 !== r && 95 !== r && 100 !== r || (e.setData({
                isOrderDone: !0
            }), clearInterval(d));
        }, function(e) {
            clearInterval(d), d = null, t.setData({
                pageErr: !0
            });
        });
    },
    setDetailType: function() {
        this.setData({
            isDefaultShareType: !1,
            sharePosition: 2,
            showShareTip: !0
        });
    },
    getPromoAdsense: function() {
        var t = this;
        s.ajax({
            url: "/resource/m/promo/adsense",
            options: {
                loading: !1
            },
            data: {
                locationType: 8
            }
        }).then(function(e) {
            wx.getSystemInfo({
                success: function(a) {
                    a.model.indexOf("iPhone") > -1 ? t.setData({
                        inviteImgUrl: e.content.iosImgUrl
                    }) : t.setData({
                        inviteImgUrl: e.content.androidImgUrl
                    });
                }
            });
        });
    },
    toInviter: function() {
        r.default.getUrl(8);
    },
    computeDisplay: function() {
        this.getOrderStatus(), this.showSlowPayTips(), this.showDispatchTime(), this.showArrivalTime(), 
        this.showDeliveryContact(), this.showEvaluate(), this.showQrcode(), this.showPopupWindow();
    },
    showPopupWindow: function() {
        var t = this;
        this.data.advertImage || 1 != this.data.orderDetail.isShowSuccessWindow || this.data.hasClosePopup || s.ajax({
            url: "/resource/m/promo/adsense",
            data: {
                locationType: 2
            },
            options: {
                needLogin: !1,
                loading: !1
            }
        }).then(function(e) {
            "BASE000" === e.busiCode && 1 === e.code && wx.getSystemInfo({
                success: function(a) {
                    var r = "";
                    r = a.model.indexOf("iPhone") > -1 ? e.content.iosImgUrl : e.content.androidImgUrl, 
                    t.setData({
                        advertImage: r,
                        showPopup: !!r,
                        adsenseType: e.content.adsenseType,
                        inviteUrl: e.content.url
                    });
                }
            });
        });
    },
    showSlowPayTips: function() {
        var t = this.data.orderDetail.isShowClaim, e = this.data.orderDetail.orderStatusCode, a = this.data.orderDetail.orderType, r = void 0;
        t ? (r = 1 === a && 20 === e || 30 === e || 40 === e || 50 === e || 51 === e, this.setData({
            showSlowPayTips: r
        })) : this.setData({
            showSlowPayTips: !1
        });
    },
    getOrderStatus: function() {
        var t = this.data.orderDetail.orderStatusDesc, a = [];
        a[0] = t.split("{")[0];
        if (this.setData(e({}, "statusArr[0]", t.split("{")[0])), void 0 !== this.data.orderDetail.remainSecond && "" !== this.data.orderDetail.remainSecond) this.setData({
            remainSecond: this.data.orderDetail.remainSecond
        }), this.updateTime(this), this._setCountDown(this); else {
            this.setData({
                remainSecond: ""
            });
            var r = t.match(/\{(.+)\}/);
            a[1] = r ? r[1] : "", a[1] && a[1].indexOf("{") > -1 && (a[1] = a[1].match(/\{(.+)\}/)[1]);
            this.setData(e({}, "statusArr[1]", a[1]));
        }
        var i = t.lastIndexOf("}");
        a[2] = i > -1 ? t.substr(i + 1) : "";
        this.setData(e({}, "statusArr[2]", a[2]));
    },
    updateTime: function(t) {
        var a;
        if ("number" == typeof t.data.remainSecond) {
            var r = t.data.remainSecond;
            if ("number" == typeof r && r <= 0) return t._ajaxTimeCancel(t), t.setData(e({}, "statusArr[1]", "")), 
            void clearInterval(l);
            var o = i.formatSeconds(r);
            r--;
            t.setData((a = {}, e(a, "statusArr[1]", o || ""), e(a, "remainSecond", r), a));
        }
    },
    _setCountDown: function(t) {
        l || (l = setInterval(function() {
            t.updateTime(t);
        }, 1e3));
    },
    _ajaxTimeCancel: function(t) {
        s.ajax({
            url: "/resource/m/order/timercancel",
            options: {
                loading: !1,
                needOriginResult: !0
            },
            data: {
                orderId: t.data.orderId
            }
        }).then(function(t) {
            t.status && "SUCCESS" == t.status.toUpperCase() && i.toast("订单已取消");
        });
    },
    getAdditionInfo: function(t) {
        var e = [];
        if (!1 == !t.standardCode && e.push(t.standardCode), t.additionList) for (var a = 0; a < t.additionList.length; a++) e.push(t.additionList[a].showStr);
        return !1 == !t.temperAttributeName && e.push(t.temperAttributeName), e.join("/");
    },
    showDispatchTime: function() {
        var t = this.data.orderDetail.orderStatusCode, e = 2 == this.data.orderDetail.orderType && (80 == t || 90 == t || 91 == t || 92 == t || 93 == t || 94 == t || 95 == t);
        this.setData({
            showDispatchTime: e
        });
    },
    showArrivalTime: function() {
        var t = this.data.orderDetail.orderStatusCode;
        if (!this.data.orderDetail.dispatchInfo.arriveTime) return !1;
        var e = 70 === t || 80 === t || 90 === t || 91 === t || 92 === t || 93 === t || 94 == t || 95 === t;
        this.setData({
            showArrivalTime: e
        });
    },
    showDeliveryContact: function() {
        this.data.orderDetail.orderStatusCode;
        var t = this.data.orderDetail.dispatchInfo.dispatcherName, e = this.data.orderDetail.dispatchInfo.dispatcherMobile, a = 1 == this.data.orderDetail.orderType && !!t && !!e;
        this.setData({
            showDeliveryContact: a
        });
    },
    showEvaluate: function() {
        this.data.orderDetail.refundStatus;
        var t = this.data.orderDetail.orderStatusCode, e = 90 == t || 91 == t || 92 == t || 93 == t || 94 == t || 95 == t;
        this.setData({
            showEvaluate: e
        });
    },
    showQrcode: function() {
        var t = o.createQrCodeImg(this.data.orderDetail.takeMealCodeInfo.takeOrderId, {
            size: 180
        });
        this.setData({
            imageData: t
        });
    },
    setCanvasSize: function(t) {
        var e = {};
        try {
            var a = t / (375 / wx.getSystemInfoSync().windowWidth), r = a;
            e.w = a, e.h = r;
        } catch (t) {}
        return e;
    },
    showTips: function(t) {
        this.tapHandler(t), wx.showModal({
            title: "慢必赔规则说明",
            content: "luckin coffee 向您承诺，制作完成后30分钟内，外送必达。如超时送达，您可以申请索赔本单全部饮品消费。",
            showCancel: !1,
            confirmColor: "#7CA7D2",
            confirmText: "我知道了",
            success: function(t) {}
        });
    },
    cancelOrder: function(t) {
        this.tapHandler(t);
        var e = this;
        wx.showModal({
            title: "",
            content: "是否确定取消订单？",
            cancelColor: "#999",
            cancelText: "再想想",
            confirmColor: "#7CA7D2",
            confirmText: "确认",
            success: function(t) {
                t.confirm ? s.ajax({
                    url: "/resource/m/order/cancel",
                    data: {
                        orderId: e.data.orderId
                    }
                }).then(function(t) {
                    t.status && "SUCCESS" == t.status.toUpperCase() && "SUCCESS" == t.content.toUpperCase() ? e.getOrderDetail() : wx.showModal({
                        title: "",
                        content: t.content && t.content.msg || t.msg,
                        showCancel: !1,
                        confirmColor: "#7CA7D2",
                        confirmText: "我知道了",
                        success: function(t) {}
                    });
                }) : t.cancel;
            }
        });
    },
    evaluate: function(t) {
        this.tapHandler(t);
        var e = this.data.orderDetail.orderType, a = this.data.orderDetail.eatWay, r = void 0;
        1 == e && 2 == a && (r = 1), 2 == e && 2 == a && (r = 2), 2 == e && 1 == a && (r = 3), 
        wx.navigateTo({
            url: "/pages/order/comment?orderId=" + this.data.orderId + "&type=" + r
        });
    },
    myEvaluate: function(t) {
        t.targetUrl = "/pages/order/mycomment", this.tapHandler(t), a.default.setOrderEvaluateList(this.data.orderDetail.evaluateList), 
        wx.navigateTo({
            url: t.targetUrl
        });
    },
    checkout: function(t) {
        this.tapHandler(t), a.default.payOrder(this.data.orderId);
    },
    takeMealCode: function(t) {
        var e = this.data.orderId;
        t.targetUrl = "/pages/order/qrcode?orderId=" + e, this.tapHandler(t), wx.navigateTo({
            url: t.targetUrl
        });
    },
    dialTel: function(t) {
        this.tapHandler(t);
        var e = t.target.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: e,
            success: function() {},
            fail: function() {},
            complete: function() {}
        });
    },
    customerServ: function(t) {
        this.tapHandler(t);
        var e = t.target.dataset.tel;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), s.ajax({
            url: "/resource/m/sys/sysDict",
            options: {
                loading: !1,
                needOriginResult: !0
            }
        }).then(function(t) {
            wx.hideLoading();
            var a = t.content.hotLineServer.isHotLine, r = t.content.hotLineServer.isMINIService;
            2 == a && 2 == r ? wx.navigateTo({
                url: "/pages/order/customerservice"
            }) : wx.makePhoneCall({
                phoneNumber: e,
                success: function() {},
                fail: function() {},
                complete: function() {}
            });
        });
    },
    closeSharePopup: function() {
        this.setData({
            showShareTip: !1
        });
    },
    popupAction: function(t) {
        this.closePopup(t), this.setData({
            isDefaultShareType: !1
        }), 1 == this.data.adsenseType ? r.default.getUrl(2) : 2 == this.data.adsenseType && this.setData({
            sharePosition: 1,
            showShareTip: !0
        });
    },
    closePopup: function(t) {
        this.tapHandler(t), this.setData({
            showPopup: !1,
            hasClosePopup: !0
        });
    },
    reload: function(t) {
        this.tapHandler(t), this.onShow();
    },
    onLoad: function(t) {
        this.setData({
            orderId: t.orderId
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        s.scanHandler({
            title: "订单详情",
            route: this.route
        }), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.getOrderDetail(), this.getPromoAdsense(), !d && !this.data.isOrderDone && (d = setInterval(function() {
            t.getOrderDetail();
        }, 3e3));
    },
    onHide: function() {
        clearInterval(d), d = null;
    },
    onUnload: function() {
        clearInterval(d), d = null, clearInterval(l), l = null;
    },
    onPullDownRefresh: function() {
        this.getOrderDetail();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var e = {};
        if (i.getUrlParam(this.data.shareConfig.redirectUrl, e), this.data.isDefaultShareType) return n.globalData.share;
        var a = this.data.shareConfig;
        return a.title && a.imgUrl && a.desc ? {
            title: a.title,
            imageUrl: a.imgUrl,
            path: "/pages/index/inviter?shareType=2&orderNo=" + e.orderNo + "&inviteCode=" + e.inviteCode + "&activityNo=" + e.activityNo,
            desc: a.desc
        } : n.globalData.share;
    }
});
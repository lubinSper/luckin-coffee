function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../service/order.js")), a = t(require("../../service/share.js")), r = require("../../utils/api.js"), o = (require("../../utils/store.js"), 
getApp());

Page({
    data: {
        offset: 0,
        pageSize: 10,
        listData: [],
        emptyData: null,
        refresh: !0,
        shareImg: "",
        scrollTop: 0,
        timer: !1
    },
    tapHandler: function(t) {
        r.tapHandler({
            title: "订单列表",
            route: this.route,
            element: t
        });
    },
    navigateToInviter: function() {
        a.default.getUrl(9);
    },
    getUrl: function() {
        var t = this;
        r.ajax({
            url: "/resource/m/promo/adsense",
            data: {
                locationType: 9
            }
        }).then(function(e) {
            e && e.content && t.setData({
                shareImg: e.content.iosImgUrl
            });
        });
    },
    navigateToOrderDetail: function(t) {
        t.targetUrl = "../order/detail?orderId=" + t.currentTarget.dataset.id, this.tapHandler(t), 
        wx.navigateTo({
            url: t.targetUrl
        });
    },
    handlerList: function(t) {
        this.setData({
            offset: this.data.offset + this.data.pageSize,
            listData: this.data.listData.concat(t.map(function(t, e) {
                var a, r, o, s, n;
                return 10 === t.orderStatusCode ? (a = "red", r = "Payment", s = "red", o = "去支付", 
                n = "pay_" + e) : t.orderStatusCode > 10 && t.orderStatusCode < 70 ? a = "blue" : 80 === t.orderStatusCode && (o = "去评价", 
                r = "Evaluate", n = "evaluate_" + e), {
                    orderId: t.orderId,
                    orderTypeCode: t.orderType,
                    orderNumber: t.orderNo,
                    orderTypeName: 2 === t.orderType ? "自提订单" : "外卖订单",
                    orderStatusCode: t.orderStatusCode,
                    orderStatusName: t.orderStatusName,
                    orderStatusClass: a || "orderStatus",
                    orderButtonClass: s || "gray",
                    orderButtonType: r || "QrCode",
                    orderButtonName: o || "取餐码",
                    orderBtnId: n || "eatCode_" + e,
                    shopName: t.shopName,
                    shopId: "(NO." + t.sequenceNumber + ")",
                    orderTime: t.orderTime,
                    goodsName: t.productList[0].name + "等",
                    goodsCount: t.productAmount,
                    orderAmount: t.orderAmount,
                    takeMealCodeInfo: t.takeMealCodeInfo,
                    takeCodeDesc: t.takeCodeDesc,
                    orderType: t.orderType,
                    eatWay: t.eatWay,
                    takeAddress: t.takeAddress
                };
            }))
        });
    },
    handlerEmptyList: function(t) {
        t && this.setData({
            emptyData: {
                class: "order",
                tips: "您还没有订单哦",
                btnText: "去喝一杯"
            }
        });
    },
    emptyEventBind: function() {
        wx.switchTab({
            url: "../index/menu"
        });
    },
    getListData: function(t, e) {
        var a = this;
        r.ajax({
            url: "/resource/m/order/list",
            options: {
                switchUrl: "/pages/index/menu",
                loading: !1
            },
            data: {
                orderStatus: 0,
                offset: a.data.offset,
                pageSize: a.data.pageSize
            }
        }).then(function(r) {
            a.setData({
                emptyData: null,
                refresh: !0
            }), "BASE000" === r.busiCode && 1 === r.code ? (r.content && r.content.length ? (a.data.offset || a.setData({
                listData: []
            }), a.handlerList(r.content)) : a.data.offset || a.handlerEmptyList(t), e && wx.stopPullDownRefresh()) : a.setData({
                offset: 0,
                listData: []
            });
        });
    },
    gotoPayment: function(t, a) {
        this.tapHandler(t), e.default.payOrder(a.orderId);
    },
    gotoQrCode: function(t, e) {
        t.targetUrl = "../order/qrcode?orderId=" + e.orderId, this.tapHandler(t), wx.navigateTo({
            url: t.targetUrl
        });
    },
    gotoEvaluate: function(t, e) {
        var a = e.orderType, r = e.eatWay, o = void 0;
        1 == a && 2 == r && (o = 1), 2 == a && 2 == r && (o = 2), 2 == a && 1 == r && (o = 3), 
        t.targetUrl = "/pages/order/comment?orderId=" + e.orderId + "&type=" + o, this.tapHandler(t), 
        wx.navigateTo({
            url: t.targetUrl
        });
    },
    handlerItemEvent: function(t) {
        return !!this.data.listData[t.currentTarget.dataset.id] && this["goto" + t.currentTarget.dataset.type](t, this.data.listData[t.currentTarget.dataset.id]);
    },
    onLoad: function() {},
    onReady: function() {
        this.animation = wx.createAnimation();
    },
    onShow: function() {
        r.scanHandler({
            title: "订单列表",
            route: this.route
        }), this.setData({
            offset: 0,
            refresh: !1
        }), this.getListData(!0), this.getUrl();
    },
    onPageScroll: function(t) {
        var e = this;
        t != this.data.scrollTop && t.scrollTop > 0 && (t.scrollTop > this.data.scrollTop && 1 != this.data.timer ? (this.data.timer = !0, 
        this.animation.translateX(120).opacity(.3).step({
            duration: 550,
            timingFunction: "ease"
        }), this.setData({
            animation: this.animation.export()
        }), setTimeout(function() {
            e.data.timer = !1;
        }, 500)) : 1 != this.data.timer && (this.data.timer = !0, this.animation.translateX(0).opacity(1).step({
            duration: 550,
            timingFunction: "ease"
        }), this.setData({
            animation: this.animation.export()
        }), setTimeout(function() {
            e.data.timer = !1;
        }, 500)), this.data.scrollTop = t.scrollTop);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.data.refresh && (this.setData({
            offset: 0,
            refresh: !1
        }), this.getListData(!0, "refresh"));
    },
    onReachBottom: function() {
        this.data.refresh && (this.setData({
            refresh: !1
        }), this.getListData());
    },
    onShareAppMessage: function() {
        return o.globalData.share;
    }
});
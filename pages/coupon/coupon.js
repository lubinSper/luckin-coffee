function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../service/order.js")), a = require("../../utils/api.js"), o = getApp();

Page({
    data: {
        radioDisplay: !1,
        couponAvailable: !1,
        couponNum: "",
        emptyData: null,
        comeFrom: "",
        isIpx: o.globalData.isIpx,
        offset: 0,
        pageSize: 10,
        couponList: []
    },
    tapHandler: function(t) {
        a.tapHandler({
            title: "可用优惠券",
            route: this.route,
            element: t
        });
    },
    getCoupon: function(t) {
        var e = this;
        a.ajax({
            url: "/resource/m/promotion/ticket/list",
            options: {
                loading: !1
            },
            data: {
                offset: e.data.offset,
                pageSize: e.data.pageSize
            }
        }).then(function(a) {
            a && a.content.length > 0 ? e.arrangeData(a.content) : e.data.offset || e.handlerEmptyList(t);
        });
    },
    getOrderCoupon: function(t) {
        var o = this, n = e.default.getConfirmOrderParam(), i = e.default.getConfirmOrderCoupon();
        a.ajax({
            url: "/resource/m/order/ticket/list",
            options: {
                loading: !1
            },
            data: n
        }).then(function(e) {
            var a = e.content.useList;
            if (e && a.length > 0) {
                for (var n = 0; n < a.length; n++) if (a[n].code === i[0]) {
                    a[n].radio = !0;
                    break;
                }
                o.arrangeData(a), o.setData({
                    couponNum: a.length
                });
            } else o.handlerEmptyList(t);
        });
    },
    handlerEmptyList: function(t) {
        t && this.setData({
            couponAvailable: !1,
            emptyData: {
                class: "order",
                tips: "暂无可用优惠券"
            }
        });
    },
    arrangeData: function(t) {
        var e = t;
        0 === this.data.offset && this.setData({
            couponList: []
        });
        for (var a = 0; a < e.length; a++) {
            if ("discount" === e[a].type) {
                var o = e[a].value;
                o.split(".").length > 1 ? (e[a].num1 = "." + o.split(".")[1], e[a].value = o.split(".")[0]) : e[a].num1 = ".0";
            }
            e[a].display = !0;
        }
        e = this.data.couponList.concat(e), this.setData({
            couponList: e,
            offset: this.data.offset + 10
        });
    },
    saveData: function(t) {
        var a = this, o = a.data.couponList, n = [], i = 0, r = "", s = e.default.getConfirmOrderParam();
        s.isFirst = 0, e.default.setConfirmOrderParam(s);
        for (var c = 0; c < o.length; c++) o[c].radio && (r = o[c], n.push(r.code));
        r ? ("face" === r.type && (i = Number(r.value)), 1 === r.activityMutex ? wx.showModal({
            content: "该优惠券与营销活动不能同时使用，您是否确认用券？",
            showCancel: !0,
            cancelText: "不用券了",
            cancelColor: "#7CA7D2",
            confirmText: "确认用券",
            confirmColor: "#7CA7D2",
            success: function(t) {
                if (t.confirm) a.deductibleMoney(n, i, o); else {
                    for (var e = 0; e < o.length; e++) if (o[e].code === n[0]) {
                        o[e].radio = !1;
                        break;
                    }
                    a.setData({
                        couponList: o
                    });
                }
            }
        }) : a.deductibleMoney(n, i, o)) : (e.default.setConfirmOrderCoupon([]), a.navigateBackFun()), 
        a.tapHandler(t);
    },
    deductibleMoney: function(t, o, n) {
        var i = this;
        a.ajax({
            url: "/resource/m/order/ticket/calculate",
            options: {
                loading: !1
            },
            data: {
                couponCode: t[0]
            }
        }).then(function(a) {
            a.content < o ? wx.showModal({
                content: "使用该优惠券只能抵扣" + a.content + "元，不设找零，是否确认使用？",
                showCancel: !0,
                cancelText: "不用券了",
                cancelColor: "#7CA7D2",
                confirmText: "确认用券",
                confirmColor: "#7CA7D2",
                success: function(a) {
                    if (a.confirm) e.default.setConfirmOrderCoupon(t), i.navigateBackFun(); else {
                        for (var o = 0; o < n.length; o++) if (n[o].code === t[0]) {
                            n[o].radio = !1;
                            break;
                        }
                        i.setData({
                            couponList: n
                        });
                    }
                }
            }) : (e.default.setConfirmOrderCoupon(t), i.navigateBackFun());
        });
    },
    navigateBackFun: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    radioIsChecked: function(e) {
        var a = this.data.couponList, o = e.currentTarget.dataset.radio, n = e.currentTarget.dataset.index, i = "couponList[" + n + "].radio";
        if ("ignore" !== e.target.dataset.ignore) {
            for (var r = 0; r < a.length; r++) r !== n && (a[r].radio = !1);
            this.setData(t({
                couponList: a
            }, i, !o)), this.tapHandler(e);
        }
    },
    toggle: function(e) {
        var a = e.currentTarget.dataset.index, o = e.currentTarget.dataset.close, n = "couponList[" + a + "].display";
        this.setData(t({}, n, !o));
    },
    onLoad: function(t) {
        this.setData({
            comeFrom: t.from || ""
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            offset: 0
        }), "confirm" === this.data.comeFrom ? (this.setData({
            radioDisplay: !0,
            couponAvailable: !0
        }), this.getOrderCoupon(!0)) : this.getCoupon(!0);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        this.setData({
            couponList: [],
            offset: 0
        }, function() {
            "list" === t.data.comeFrom ? t.getCoupon(!0) : t.getOrderCoupon(!0);
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        "list" === this.data.comeFrom && this.getCoupon(!0);
    },
    onShareAppMessage: function() {
        return o.globalData.share;
    }
});
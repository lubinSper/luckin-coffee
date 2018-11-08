function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../service/cart.js")), a = e(require("../../service/order.js")), r = require("../../utils/api.js");

Page({
    data: {
        payAgree: !0,
        useDiscount: !0,
        order: {},
        isIpx: getApp().globalData.isIpx
    },
    tapHandler: function(e) {
        r.tapHandler({
            title: "确认订单",
            route: this.route,
            element: e
        });
    },
    switchSentHandler: function(e) {
        e.targetUrl = "/pages/address/select?delivery=sent&from=confirmOrder", this.tapHandler(e), 
        wx.navigateTo({
            url: e.targetUrl
        });
    },
    switchPickHandler: function(e) {
        e.targetUrl = "/pages/address/select?delivery=pick&from=confirmOrder", this.tapHandler(e), 
        wx.navigateTo({
            url: e.targetUrl
        });
    },
    deliveryNavigatorHandler: function(e) {
        e.targetUrl = "/pages/address/select?delivery=" + this.data.delivery + "&from=confirmOrder", 
        this.tapHandler(e), wx.navigateTo({
            url: e.targetUrl
        });
    },
    discountSwitchChange: function(e) {
        var t = this;
        this.setData({
            useDiscount: e.detail.value
        }, function() {
            var r = a.default.getConfirmOrderParam();
            r.isFirst = 1, r.useDefaultCafeKu = 1, a.default.setConfirmOrderParam(r), t.showAgain = e.detail.value ? 1 : 0, 
            t.getConfirmOrder();
        });
    },
    chooseCoffeeBank: function(e) {
        this.data.order.hasCafeKu && wx.navigateTo({
            url: "/pages/order/usecoffeewallet"
        });
    },
    buyCafeKu: function(e) {
        wx.navigateTo({
            url: "/pages/coupon/walletbuy?from=order"
        });
    },
    chooseCoupon: function(e) {
        if (this.data.order.hasCoupon) {
            var t = this.data.order.priceList.filter(function(e) {
                return "dispatchFee" === e.type;
            }), a = t.length > 0 ? t[0].totalPrice : 0;
            (0 === this.data.order.discountPrice || this.data.order.discountPrice === a) && this.data.order.hasCafeKu && this.data.order.cafeKuDiscount === this.data.order.totalPrivilegeMoney ? wx.showModal({
                title: "",
                content: "商品金额已足够支付，如需修改请手动取消使用咖啡钱包",
                showCancel: !1,
                confirmText: "我知道了",
                confirmColor: "#7CA7D2"
            }) : this.data.order.couponSelectType ? wx.showModal({
                title: "",
                content: "同一商品优惠券与咖啡钱包不能同时使用，如需修改请手动取消使用咖啡钱包",
                showCancel: !1,
                confirmText: "我知道了",
                confirmColor: "#7CA7D2"
            }) : wx.navigateTo({
                url: "/pages/coupon/coupon?from=confirm"
            });
        }
    },
    remarkNavigatorHandler: function(e) {
        e.targetUrl = "/pages/order/remark", this.tapHandler(e), wx.navigateTo({
            url: e.targetUrl
        });
    },
    getConfirmOrder: function() {
        var e = this, o = t.default.getConfirmOrder(), n = a.default.getConfirmOrderParam(), i = a.default.getConfirmOrderCoupon(), c = n ? n.isFirst : 1, s = n ? n.useDefaultCafeKu : 1, d = n ? n.productList : [];
        if (0 === d.length) {
            var l = !0, u = !1, f = void 0;
            try {
                for (var h, m = o[Symbol.iterator](); !(l = (h = m.next()).done); l = !0) for (var g = h.value, p = 0; p < g.amount; p++) {
                    var w = Object.assign({}, g);
                    d.push(w);
                }
            } catch (e) {
                u = !0, f = e;
            } finally {
                try {
                    !l && m.return && m.return();
                } finally {
                    if (u) throw f;
                }
            }
            var C = 1, v = !0, x = !1, y = void 0;
            try {
                for (var k, A = d[Symbol.iterator](); !(v = (k = A.next()).done); v = !0) {
                    var T = k.value;
                    T.indexId = C, T.amount = 1, T.cafeKuId = "", C++;
                }
            } catch (e) {
                x = !0, y = e;
            } finally {
                try {
                    !v && A.return && A.return();
                } finally {
                    if (x) throw y;
                }
            }
        }
        var b = n ? n.useCoffeeStore : 1, D = o.filter(function(e) {
            return "eat" === e.eatway;
        }), I = D && D.length > 0 ? "eat" : "package", S = {
            deptId: this.data.shopInfo.deptId,
            addressId: "sent" === this.data.delivery ? this.data.addressInfo.addrId || "" : "",
            productList: d,
            delivery: this.data.delivery,
            eatway: "pick" === this.data.delivery ? I : null,
            useDiscount: this.data.useDiscount ? 1 : 0,
            useDefaultCafeKu: s,
            couponCodeList: i,
            isFirst: c,
            paymentAccountType: 1,
            useCoffeeStore: b
        };
        r.ajax({
            url: "/resource/m/order/preview",
            data: S,
            options: {
                needOriginResult: !0
            }
        }).then(function(t) {
            if (7 === t.code) {
                var r = {
                    title: "",
                    content: t.msg,
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "#999999",
                    confirmText: "确认",
                    confirmColor: "#7CA7D2"
                };
                switch (t.busiCode) {
                  case "BASE100":
                    r.showCancel = !1, r.confirmText = "我知道了", r.success = function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    };
                    break;

                  case "BASE200":
                    r.cancelText = "选择自提", r.confirmText = "继续选购", r.success = function(e) {
                        e.confirm ? wx.navigateBack({
                            delta: 1
                        }) : e.cancel && wx.navigateTo({
                            url: "/pages/address/select?delivery=pick&from=confirmOrder"
                        });
                    };
                    break;

                  case "BASE300":
                    r.showCancel = !1, r.confirmText = "OK", r.success = function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    };
                    break;

                  case "BASE400":
                    r.showCancel = !1, r.confirmText = "选购其他", r.success = function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    };
                    break;

                  default:
                    util.toast(t.msg || "业务处理错误");
                }
                wx.showModal(r);
            } else if (1 === t.code && t.content) {
                t.content.tipMsgInfo && t.content.tipMsgInfo.type && wx.showModal({
                    title: "",
                    content: t.content.tipMsgInfo.msg,
                    showCancel: !1,
                    confirmText: "我知道了",
                    confirmColor: "#7CA7D2"
                }), e.setData({
                    order: t.content,
                    eatway: I
                }), a.default.setConfirmOrderParam(S), a.default.setConfirmOrderCoupon(t.content.couponCodeList);
                var o = a.default.getConfirmOrderDefaultDiscount() || {};
                S.isFirst && (o.couponCodeList = t.content.couponCodeList), S.useDefaultCafeKu && (o.productList = t.content.productDetailList), 
                a.default.setConfirmOrderDefaultDiscount(o);
            } else util.toast(t.msg || "业务处理错误");
        });
    },
    showSlowTip: function(e) {
        this.tapHandler(e), wx.showModal({
            title: "慢必赔规则说明",
            content: "luckin coffee 向您承诺，制作完成后30分钟内，外送必达。如超时送达，您可申请索赔本单全部饮品消费。",
            showCancel: !1,
            confirmColor: "#7CA7D2",
            confirmText: "我知道了"
        });
    },
    getRemark: function() {
        this.remark = t.default.getOrderRemark();
        var e = this.remark ? this.remark.remarkStr || "" : "";
        this.setData({
            remark: e
        });
    },
    chooseEatway: function(e) {
        this.tapHandler(e);
        var t = e.currentTarget.dataset.way;
        this.setData({
            eatway: t
        });
    },
    checkPayAgree: function(e) {
        this.tapHandler(e), this.setData({
            payAgree: !this.data.payAgree
        });
    },
    checkout: function(e) {
        e && this.tapHandler(e);
        var o = this;
        if (!this.data.payAgree || !this.data.order.productDetailList) return !1;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var n = t.default.getRemarkNeeds(), i = a.default.getConfirmOrderCoupon(), c = a.default.getConfirmOrderParam(), s = [], d = !0, l = !1, u = void 0;
        try {
            for (var f, h = this.data.order.productDetailList[Symbol.iterator](); !(d = (f = h.next()).done); d = !0) {
                var m = f.value, g = !0, p = !1, w = void 0;
                try {
                    for (var C, v = c.productList[Symbol.iterator](); !(g = (C = v.next()).done); g = !0) {
                        var x = C.value;
                        x.indexId == m.indexId && x.productId == m.productId && s.push({
                            productId: x.productId,
                            standardCode: x.standardCode,
                            amount: x.amount,
                            additionList: x.additionList,
                            cafeKuId: m.cafeKuId,
                            indexId: x.indexId,
                            temperAttributeCode: x.temperAttributeCode
                        });
                    }
                } catch (e) {
                    p = !0, w = e;
                } finally {
                    try {
                        !g && v.return && v.return();
                    } finally {
                        if (p) throw w;
                    }
                }
            }
        } catch (e) {
            l = !0, u = e;
        } finally {
            try {
                !d && h.return && h.return();
            } finally {
                if (l) throw u;
            }
        }
        var y = {
            deptId: this.data.shopInfo.deptId,
            productList: s,
            delivery: this.data.delivery,
            addressId: "sent" === this.data.delivery ? this.data.addressInfo.addrId : "",
            eatway: "pick" === this.data.delivery ? this.data.eatway : null,
            couponCodeList: i,
            remark: this.remark ? this.remark.remarkMsg || "" : "",
            longitude: this.data.location.longitude,
            latitude: this.data.location.latitude,
            channel: this.data.mapChannel,
            submit: this.submit,
            submitOf600: this.submitOf600,
            joinPlan: this.data.order.joinPlan,
            needs: n,
            showAgain: this.showAgain,
            isPickAlertShow: this.isPickAlertShow,
            useCoffeeStore: c.useCoffeeStore,
            dispatchDistance: "sent" === this.data.delivery ? this.data.shopInfo.distance : "",
            paymentAccountType: 1
        };
        r.ajax({
            url: "/resource/m/order/create",
            data: y,
            options: {
                needOriginResult: !0,
                loading: !1
            }
        }).then(function(e) {
            if (7 === e.code) {
                var r = {
                    title: "",
                    content: e.msg,
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "#999999",
                    confirmText: "确认",
                    confirmColor: "#7CA7D2"
                };
                switch (e.busiCode) {
                  case "BASE100":
                    r.showCancel = !1, r.confirmText = "我知道了";
                    break;

                  case "BASE200":
                    r.showCancel = !1, r.confirmText = "选购其他", r.success = function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    };
                    break;

                  case "BASE300":
                    r.cancelText = "稍后再来", r.confirmText = "继续下单", r.success = function(e) {
                        e.confirm && (o.submit = 1, o.checkout());
                    };
                    break;

                  case "BASE400":
                    r.confirmText = "去支付", r.success = function(e) {
                        e.confirm && wx.switchTab({
                            url: "list"
                        });
                    };
                    break;

                  case "BASE500":
                    r.showCancel = !1, r.confirmText = "我知道了", r.success = function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    };
                    break;

                  case "BASE501":
                    r.showCancel = !1, r.confirmText = "马上去", r.success = function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    };
                    break;

                  case "BASE600":
                    r.cancelColor = "#7CA7D2", r.cancelText = "继续下单", r.confirmText = "选购其他", r.success = function(e) {
                        e.confirm ? wx.navigateBack({
                            delta: 1
                        }) : e.cancel && (o.submitOf600 = 1, o.checkout());
                    };
                    break;

                  case "BASE700":
                    r.cancelText = "不用了", r.confirmText = "马上去", r.success = function(e) {
                        e.confirm ? wx.navigateTo({
                            url: "/pages/coupon/walletbuy?from=order"
                        }) : e.cancel && (o.showAgain = 0, o.checkout());
                    };
                    break;

                  case "BASE800":
                    r.showCancel = !1, r.confirmText = "去选择";
                    break;

                  case "BASE801":
                    r.cancelColor = "#7CA7D2", r.cancelText = "重选商品", r.confirmText = "打包带走", r.success = function(e) {
                        e.confirm ? o.setData({
                            eatway: "package"
                        }, function() {
                            o.checkout();
                        }) : e.cancel && wx.navigateBack({
                            delta: 1
                        });
                    };
                    break;

                  case "BASE802":
                    r.cancelColor = "#7CA7D2", r.cancelText = "重选商品", r.confirmText = "店内用餐", r.success = function(e) {
                        e.confirm ? o.setData({
                            eatway: "eat"
                        }, function() {
                            o.checkout();
                        }) : e.cancel && wx.navigateBack({
                            delta: 1
                        });
                    };
                    break;

                  case "BASE900":
                    r.success = function(e) {
                        e.confirm && (o.isPickAlertShow = 0, o.checkout());
                    };
                    break;

                  case "BASE001":
                    r.showCancel = !1, r.confirmText = "我知道了";
                    break;

                  default:
                    util.toast(e.msg || "业务处理错误");
                }
                wx.hideLoading(), wx.showModal(r);
            } else if (1 === e.code && e.content) {
                t.default.removeCheckedCartItem();
                var n = e.content.orderId, i = "/pages/order/detail?orderId=" + e.content.orderId + "&from=confirmOrder";
                "pay" === e.content.forwardPage ? (o.hasOrder = !0, a.default.payOrder(n, i)) : "detail" === e.content.forwardPage && (wx.hideLoading(), 
                wx.redirectTo({
                    url: i
                }));
            } else wx.hideLoading(), util.toast(e.msg || "业务处理错误");
        });
    },
    init: function() {
        this.hasOrder = !1, this.showAgain = 1;
        var e = getApp();
        this.submit = 0, this.submitOf600 = 0, this.isPickAlertShow = 1, this.setData({
            delivery: e.globalData.delivery,
            shopInfo: e.globalData.shopInfo,
            addressInfo: e.globalData.addressInfo,
            location: e.globalData.location,
            mapChannel: e.globalData.mapChannel,
            eatway: "package"
        }), this.getConfirmOrder(), this.getRemark();
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        if (r.scanHandler({
            title: "确认订单",
            route: this.route
        }), this.hasOrder) return !1;
        this.init();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/store.js")), n = require("../utils/api.js"), u = function() {
    function u() {
        e(this, u);
    }
    return t(u, [ {
        key: "setOrderEvaluateList",
        value: function(e) {
            return r.default.setStore("ORDER_EVALUATE", e);
        }
    }, {
        key: "getOrderEvaluateList",
        value: function() {
            return r.default.getStore("ORDER_EVALUATE");
        }
    }, {
        key: "payOrder",
        value: function(e, t, r, u) {
            var o = this;
            void 0 === r && (r = 0);
            var a = getApp();
            if (this.loading) return !1;
            this.loading = !0;
            n.ajax({
                url: "/resource/m/order/topay",
                data: {
                    payType: 214,
                    busType: r,
                    orderId: e,
                    openid: a.globalData.openid
                },
                options: {
                    loading: !1
                }
            }).then(function(e) {
                if (e && e.content) if (2 === e.content.paypayStatus) wx.redirectTo({
                    url: u || t
                }); else if (e.content.needPay) {
                    var r = e.content.payParams;
                    r.success = function() {
                        t && wx.redirectTo({
                            url: t
                        });
                    }, r.fail = function() {
                        wx.redirectTo({
                            url: u || t
                        });
                    }, wx.hideLoading(), wx.requestPayment(r);
                } else wx.hideLoading(), t && wx.redirectTo({
                    url: t
                });
            }).finally(function() {
                o.loading = !1;
            });
        }
    }, {
        key: "getConfirmOrderCoupon",
        value: function() {
            return r.default.getStore("CONFIRMORDER_COUPON");
        }
    }, {
        key: "setConfirmOrderCoupon",
        value: function(e) {
            return r.default.setStore("CONFIRMORDER_COUPON", e);
        }
    }, {
        key: "getConfirmOrderParam",
        value: function() {
            return r.default.getStore("CONFIRMORDER_PARAM");
        }
    }, {
        key: "setConfirmOrderParam",
        value: function(e) {
            return r.default.setStore("CONFIRMORDER_PARAM", e);
        }
    }, {
        key: "setConfirmOrderIsUseCoffeeStore",
        value: function(e) {
            var t = this.getConfirmOrderParam();
            return t.useCoffeeStore = e, r.default.setStore("CONFIRMORDER_PARAM", t);
        }
    }, {
        key: "getSelectWalletParam",
        value: function() {
            return r.default.getStore("SELECTWALLET_PARAM");
        }
    }, {
        key: "setSelectWalletParam",
        value: function(e) {
            return r.default.setStore("SELECTWALLET_PARAM", e);
        }
    }, {
        key: "getConfirmOrderDefaultDiscount",
        value: function() {
            return r.default.getStore("CONFIRMORDER_DEFAULTDISCOUNT");
        }
    }, {
        key: "setConfirmOrderDefaultDiscount",
        value: function(e) {
            return r.default.setStore("CONFIRMORDER_DEFAULTDISCOUNT", e);
        }
    } ]), u;
}();

exports.default = new u();
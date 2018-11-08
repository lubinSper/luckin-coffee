function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    }
    return t;
}, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../service/order.js")), r = require("../../utils/api.js"), o = getApp();

Page({
    data: {
        orderParam: {},
        walletParam: {},
        isIpx: o.globalData.isIpx
    },
    getOrderParam: function() {
        for (var t = e.default.getConfirmOrderParam(), a = 0; a < t.productList.length; a++) t.productList[a].productIndex = a;
        if (this.setData({
            orderParam: t,
            walletParam: t
        }), 1 == t.useDefaultCafeKu) {
            var r = e.default.getConfirmOrderDefaultDiscount();
            r.productList = t.productList, e.default.setConfirmOrderDefaultDiscount(r);
        }
    },
    setOrderParam: function() {
        for (var t = this.data.walletParam, a = this.data.orderParam, r = 0; r < a.productList.length; r++) for (var o = a.productList[r], n = 0; n < t.productList.length; n++) {
            var u = t.productList[n];
            u.indexId === o.indexId && (o.cafeKuId = u.cafeKuId);
        }
        a.useDefaultCafeKu = t.useDefaultCafeKu, e.default.setConfirmOrderParam(a);
    },
    getWalletParam: function() {
        var t = e.default.getSelectWalletParam();
        this.setData({
            walletParam: t
        });
    },
    setWalletParam: function(t) {
        if (null !== t) {
            var r = a({}, this.data.orderParam);
            r.productList = this.data.walletParam.productList, r.totalDiscountMoney = this.data.walletParam.totalDiscountMoney, 
            e.default.setSelectWalletParam(r);
        } else e.default.setSelectWalletParam(t);
    },
    clickNotUseHandler: function() {
        var t = this.data.orderParam;
        t.useDefaultCafeKu = 0;
        for (var a = 0; a < t.productList.length; a++) t.productList[a].cafeKuId = "";
        this.setData({
            orderParam: t,
            walletParam: t
        }), this.setOrderParam(), e.default.setConfirmOrderIsUseCoffeeStore(0), this.setWalletParam(null), 
        wx.navigateBack();
    },
    syncDefaultParam: function() {
        var a, r = e.default.getConfirmOrderDefaultDiscount();
        this.setData((a = {}, t(a, "walletParam.productList", r.productList), t(a, "walletParam.totalDiscountMoney", r.totalDiscountMoney), 
        t(a, "walletParam.useDefaultCafeKu", 1), a));
    },
    clickRetDefaultHandler: function() {
        this.syncDefaultParam();
    },
    clickConfirmHandler: function() {
        this.setOrderParam(), this.setWalletParam(null), e.default.setConfirmOrderIsUseCoffeeStore(1), 
        wx.navigateBack();
    },
    selectProduct: function(a) {
        var e = a.currentTarget.dataset, r = this.data.walletParam.productList, o = !0, n = !1, u = void 0;
        try {
            for (var l, i = r[Symbol.iterator](); !(o = (l = i.next()).done); o = !0) {
                var s = l.value;
                s.indexId == e.item.indexId ? s.checked = 1 : s.checked = 0;
            }
        } catch (t) {
            n = !0, u = t;
        } finally {
            try {
                !o && i.return && i.return();
            } finally {
                if (n) throw u;
            }
        }
        this.setData(t({}, "walletParam.productList", r)), this.setWalletParam(), wx.navigateTo({
            url: "/pages/order/selectcoffeewallet?cafeKuId=" + e.item.cafeKuId + "&productIndex=" + e.index
        });
    },
    getProductList: function() {
        var a = this;
        r.ajax({
            url: "/resource/m/user/product/userCafeKu",
            options: {
                loading: !1
            }
        }).then(function(r) {
            if (wx.hideLoading(), r.content.productList) {
                for (var o, n = 0; n < r.content.productList.length; n++) r.content.productList[n].productIndex = n;
                if (a.setData((o = {}, t(o, "walletParam.productList", r.content.productList), t(o, "walletParam.totalDiscountMoney", r.content.totalDiscountMoney), 
                t(o, "walletParam.useDefaultCafeKu", a.data.orderParam.useDefaultCafeKu), o)), 1 == a.data.orderParam.useDefaultCafeKu) {
                    var u = e.default.getConfirmOrderDefaultDiscount();
                    u.productList = r.content.productList, u.totalDiscountMoney = r.content.totalDiscountMoney, 
                    e.default.setConfirmOrderDefaultDiscount(u);
                }
            }
        });
    },
    onLoad: function(t) {
        this.getOrderParam(), this.getProductList();
    },
    onReady: function() {},
    onShow: function() {
        this.getWalletParam();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
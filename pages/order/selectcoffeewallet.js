function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../service/order.js")), i = require("../../utils/api.js"), c = getApp();

Page({
    data: {
        cafeKuId: "",
        productIndex: "",
        walletParam: {},
        originSelectedTicket: {},
        usableList: [],
        unusableList: [],
        usableSize: 0,
        selectedTicket: {},
        showEndText: !1,
        isIpx: c.globalData.isIpx
    },
    getWalletParam: function() {
        var e = a.default.getSelectWalletParam();
        if (e.offset = 0, e.pageSize = 10, e.supportTakeout = "pick" == e.delivery ? 0 : 1, 
        e.applyTerminal = 1, !e) return null;
        this.setData({
            walletParam: e
        });
    },
    setWalletParam: function(e) {
        a.default.setSelectWalletParam(e);
    },
    calculateDiscount: function(e) {
        var t = this.data.walletParam.productList[this.data.productIndex];
        e.cafeKuDiscountMoney = this.data.selectedTicket.discountDegree >= t.productOriginPrice ? t.productOriginPrice : this.data.selectedTicket.discountDegree || "0", 
        e.cafeKuId = this.data.selectedTicket.cafeKuId || "", e.cafeKuName = this.data.selectedTicket.cafeKuName || "", 
        e.cafeKuTerm = this.data.selectedTicket.cafeKuTerm || "", e.coffeeStockTitle = this.data.selectedTicket.coffeeStockTitle || "", 
        e.couponNo = this.data.selectedTicket.couponNo || "";
    },
    setWalletParamCoupon: function() {
        if (this.data.originSelectedTicket.cafeKuId != this.data.selectedTicket.cafeKuId) {
            var e = this.data.walletParam;
            e.useDefaultCafeKu = 0;
            for (var t = 0, a = 0; a < e.productList.length; a++) {
                var i = e.productList[a];
                a == this.data.productIndex ? this.calculateDiscount(i) : i.cafeKuId == this.data.selectedTicket.cafeKuId && (i.cafeKuId = "", 
                i.cafeKuName = "", i.cafeKuTerm = "", i.coffeeStockTitle = "", i.couponNo = ""), 
                "" !== i.cafeKuId && (t += parseFloat(i.cafeKuDiscountMoney));
            }
            e.totalDiscountMoney = t, this.setWalletParam(e);
        }
    },
    getWalletList: function() {
        var e = this;
        i.ajax({
            url: "/resource/m/promotion/myself/chooseNew",
            data: this.data.walletParam,
            options: {
                loading: !1
            }
        }).then(function(t) {
            if (wx.hideLoading(), t.content) {
                var a = t.content.usableList, i = t.content.unusableList, c = !0, r = !1, o = void 0;
                try {
                    for (var n, l = a[Symbol.iterator](); !(c = (n = l.next()).done); c = !0) {
                        for (var s = n.value, u = 0; u < e.data.walletParam.productList.length; u++) if (u != e.data.productIndex) {
                            if (e.data.walletParam.productList[u].cafeKuId == s.cafeKuId) {
                                s.occupied = !0;
                                break;
                            }
                            s.occupied = !1;
                        }
                        s.cafeKuId === e.data.cafeKuId && (s.checked = !0, e.setData({
                            originSelectedTicket: s,
                            selectedTicket: s
                        }));
                    }
                } catch (e) {
                    r = !0, o = e;
                } finally {
                    try {
                        !c && l.return && l.return();
                    } finally {
                        if (r) throw o;
                    }
                }
                var d = !0, f = !1, h = void 0;
                try {
                    for (var m, p = i[Symbol.iterator](); !(d = (m = p.next()).done); d = !0) for (var g = m.value, k = 0; k < e.data.walletParam.productList.length; k++) k != e.data.productIndex && (e.data.walletParam.productList[k].cafeKuId == g.cafeKuId ? g.occupied = !0 : g.occupied = !1);
                } catch (e) {
                    f = !0, h = e;
                } finally {
                    try {
                        !d && p.return && p.return();
                    } finally {
                        if (f) throw h;
                    }
                }
                e.setData({
                    unusableList: i,
                    usableList: a,
                    usableSize: t.content.usableSize
                });
            }
        });
    },
    refresh: function() {
        var a, c = this.data.walletParam.pageSize, r = this.data.walletParam.offset += c;
        this.setData((a = {}, t(a, "walletParam.offset", r), t(a, "walletParam.pageSize", c), 
        a));
        var o = this;
        i.ajax({
            url: "/resource/m/promotion/myself/chooseNew",
            data: this.data.walletParam,
            options: {
                loading: !1
            }
        }).then(function(t) {
            if (wx.hideLoading(), t.content.usableList.length > 0) {
                var a = [].concat(e(o.data.usableList), e(t.content.usableList));
                o.setData({
                    usableList: a
                });
            } else o.setData({
                showEndText: !0
            });
        });
    },
    checkItemHandler: function(e) {
        var t = e.currentTarget.dataset;
        if (t.item.canCheck) {
            for (var a = this.data.usableList, i = 0; i < a.length; i++) t.index === i ? (a[i].checked = !a[i].checked, 
            this.setData({
                selectedTicket: a[i].checked ? t.item : {}
            })) : a[i].checked = !1;
            this.setData({
                usableList: a
            });
        }
    },
    confirmHandler: function() {
        this.setWalletParamCoupon(), wx.navigateBack();
    },
    onLoad: function(e) {
        this.setData({
            cafeKuId: e.cafeKuId,
            productIndex: e.productIndex
        }), this.getWalletParam(), this.getWalletList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.refresh();
    }
});
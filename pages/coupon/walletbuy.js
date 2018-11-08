function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var e = t(require("../../service/wallet.js")), o = t(require("../../service/order.js")), n = require("../../utils/api.js"), i = getApp(), r = null;

Page({
    data: {
        totalPrice: 0,
        paramFrom: "",
        ticketList: [],
        selectedList: [],
        checkoutEnabled: !1,
        orderParam: {},
        coffeeStoreDesc: "",
        showBubble: !1,
        tmpAmount: 0,
        isLongPress: !1,
        pressInitAmount: 0,
        pressCouponId: "",
        isIpx: i.globalData.isIpx,
        isDataLoading: !1
    },
    getWalletList: function() {
        var t = this, o = [].concat(a(this.data.selectedList)), r = !0, s = !1, c = void 0;
        try {
            for (var d, u = o[Symbol.iterator](); !(r = (d = u.next()).done); r = !0) {
                var l = d.value;
                l.amount < 0 && (l.amount = 0);
            }
        } catch (t) {
            s = !0, c = t;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (s) throw c;
            }
        }
        var m = {
            from: this.data.paramFrom,
            selectedList: o
        };
        if ("order" == this.data.paramFrom) {
            var f = this.data.orderParam;
            m.deptId = f.deptId, m.supportTakeout = "sent" == f.delivery ? 1 : 0, m.productList = f.productList;
        }
        i.globalData.selectedCityInfo && void 0 !== i.globalData.selectedCityInfo.cityId ? m.cityId = i.globalData.selectedCityInfo.cityId : i.globalData.locationCityInfo && void 0 !== i.globalData.locationCityInfo.cityId && (m.cityId = i.globalData.locationCityInfo.cityId), 
        this.setData({
            isDataLoading: !0
        }), n.ajax({
            url: "/resource/m/promo/combPlans",
            options: {
                loading: !1
            },
            data: m
        }).then(function(a) {
            wx.hideLoading(), 0 == a.content.money ? t.toggleCheckoutState(!1) : t.toggleCheckoutState(!0), 
            wx.setNavigationBarTitle({
                title: a.content.title
            }), t.setData({
                totalPrice: a.content.money,
                ticketList: a.content.resultList
            }), e.default.setWallet({
                ticketList: a.content.resultList,
                totalPrice: a.content.money
            }), t.setData({
                isDataLoading: !1
            });
        });
    },
    getOrderParam: function() {
        this.setData({
            orderParam: o.default.getConfirmOrderParam()
        });
    },
    quantify: function(t, a, e) {
        var o = this, n = !1, i = t.item, r = t.plan, s = this.data.selectedList;
        if (s.map(function(t, r) {
            t.couponId === i.couponId && (e ? "add" === a ? t.amount = o.data.pressInitAmount : o.data.pressInitAmount <= 0 ? (o.removeFromSelectedList(i.couponId), 
            t.amount = 0) : t.amount = o.data.pressInitAmount : "add" === a ? t.amount++ : t.amount--, 
            n = !0);
        }), !n) {
            var c = {
                activityId: r.activityId,
                planId: r.planId
            };
            c.couponId = i.couponId, c.amount = e ? this.data.pressInitAmount : ++i.amount, 
            c.isGift = i.isGift, s = s.concat(c);
        }
        this.setData({
            selectedList: s
        });
    },
    toggleCheckoutState: function(t) {
        this.setData({
            checkoutEnabled: t
        });
    },
    amountChangeLongTap: function(t) {
        if (!this.data.isDataLoading) {
            var a = t.target.dataset, e = a.action, o = a.item.amount - 1;
            o < 0 && (o = 0);
            var n = a.item.amount + 1;
            n > 999 && (n = 999), this.setData({
                isLongPress: !0,
                showBubble: !0,
                pressInitAmount: "add" === e ? n : o,
                pressCouponId: a.item.couponId
            });
            var i = this;
            r = setInterval(function() {
                var t = i.data.pressInitAmount - 1;
                t <= 0 && (t = 0);
                var a = i.data.pressInitAmount + 1;
                a >= 999 && (a = 999), i.setData({
                    pressInitAmount: "add" === e ? a : t
                });
            }, 100);
        }
    },
    touchEndHandler: function(t) {
        var a = t.target.dataset;
        if (!this.data.isDataLoading && this.data.isLongPress) {
            var e = a.action;
            clearInterval(r), this.quantify(a, e, !0), this.getWalletList(), this.setData({
                pressInitAmount: 0,
                showBubble: !1,
                isLongPress: !1
            });
        }
    },
    removeFromSelectedList: function(t) {
        var a = this.data.selectedList;
        a.map(function(e, o) {
            e.couponId === t && a.splice(o, 1);
        }), this.setData({
            selectedList: a
        });
    },
    amountChange: function(t) {
        if (!this.data.isDataLoading) {
            var a = t.target.dataset, e = a.action, o = a.item;
            if (!(o.amount < 0)) if ("add" === e) this.quantify(a, "add"), this.getWalletList(); else {
                if (0 == o.amount) return;
                1 == o.amount ? this.removeFromSelectedList(o.couponId) : o.amount > 1 && this.quantify(a, "minus"), 
                a.item.amount > 0 && this.getWalletList();
            }
        }
    },
    checkout: function() {
        var t = this;
        this.data.checkoutEnabled && n.ajax({
            url: "/resource/m/order/couponOrder/confirm",
            data: {
                totalPrice: e.default.getTotalPrice(),
                couponList: e.default.getWalletTickets()
            },
            options: {
                loading: !1
            }
        }).then(function(a) {
            wx.hideLoading(), a.content.virtualOrderIdStr && wx.navigateTo({
                url: "/pages/coupon/walletorderconfirm?virtualOrderId=" + a.content.virtualOrderIdStr + "&totalAmount=" + a.content.totalAmount + "&from=" + t.data.paramFrom
            });
        });
    },
    getCoffeeStoreDesc: function() {
        var t = this;
        n.ajax({
            url: "/resource/m/promotion/myself/coffeeStoreIntroduction",
            options: {
                loading: !1
            }
        }).then(function(a) {
            wx.hideLoading(), a.content && t.setData({
                coffeeStoreDesc: a.content
            });
        });
    },
    openDesc: function(t) {
        var a = "", e = t.currentTarget.dataset.item, o = t.currentTarget.dataset.plan, n = "使用规则";
        e && e.detailDesc ? a = e.detailDesc.replace(/\n/g, "\r\n") : o && o.activityDes ? (n = "活动描述", 
        a = o.activityDes.replace(/\n/g, "\r\n")) : a = this.data.coffeeStoreDesc.replace(/\n/g, "\r\n"), 
        wx.showModal({
            title: n,
            content: a,
            showCancel: !1,
            confirmColor: "#7CA7D2",
            confirmText: "我知道了",
            success: function(t) {}
        });
    },
    onLoad: function(t) {
        e.default.clearWallet(), "order" == t.from && this.getOrderParam(), this.setData({
            paramFrom: t.from || "mystock"
        }), this.getWalletList(), this.getCoffeeStoreDesc();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
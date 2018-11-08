function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../service/cart.js")), a = t(require("../../service/order.js")), r = require("../../utils/api.js"), i = require("../../utils/util.js");

Page({
    data: {
        cart: {},
        loading: "hidden",
        isCanConfirm: !1,
        confirmBtnText: "去结算"
    },
    tapHandler: function(t) {
        r.tapHandler({
            title: "购物车",
            route: this.route,
            element: t
        });
    },
    removeStart: function(t) {
        1 == t.touches.length && this.setData({
            removeTouch: {
                startX: t.touches[0].clientX,
                index: t.currentTarget.dataset.index
            },
            removeVibrate: 0
        });
    },
    recordMove: function(t) {
        var e = this.data.cart, a = this.data.removeTouch.index;
        if (void 0 === a) return !1;
        var r = t.touches[0].clientX, i = this.data.removeTouch.startX - r, n = "margin-left:0";
        i > 0 && (.8 * this.data.res.screenWidth <= i ? this.data.removeVibrate || (wx.vibrateShort(), 
        this.setData({
            removeVibrate: 1
        })) : this.data.removeVibrate && this.setData({
            removeVibrate: 0
        }), n = "margin-left:" + (0 - i) + "px"), e.productList.forEach(function(t, e) {
            t.itemStyle = a === e ? n : "margin-left:0";
        }), this.setData({
            cart: e
        });
    },
    removeEnd: function(t) {
        var e = this.data.removeTouch.index, a = this.data.cart;
        if (void 0 === e) return !1;
        if (1 == t.changedTouches.length) {
            var r = t.changedTouches[0].clientX, i = this.data.removeTouch.startX - r, n = "";
            if (i < 40) n = "margin-left:0", a.productList[e].itemStyle = n; else {
                if (!(.8 * this.data.res.screenWidth > i && i >= 40)) return this.removeItem(t), 
                !1;
                n = "margin-left:-175rpx", a.productList[e].itemStyle = n;
            }
            this.setData({
                cart: a
            });
        }
    },
    removeItem: function(t) {
        var a = t.currentTarget.dataset.item;
        a.amount = 0 - a.amount, a.additionList = a.additionDefaultList, e.default.add(a), 
        this.getCartInfo(0);
    },
    removeItemHandler: function(t) {
        this.tapHandler(t), this.removeItem(t);
    },
    amountChange: function(t) {
        if (this.loading) return !1;
        this.tapHandler(t), this.loading = !0;
        var a = this, r = (t.target.dataset.index, t.target.dataset.item), i = {
            productId: r.productId,
            temperAttributeCode: r.temperAttributeCode,
            standardCode: r.standardCode,
            additionList: r.additionDefaultList,
            eatway: r.eatway,
            checked: r.checked,
            maxAmount: r.maxAmount
        };
        if ("add" === t.target.dataset.action) {
            if (!r.canCheck) return this.loading = !1, !1;
            i.amount = 1;
        } else {
            if (!(r.amount > 1)) return this.loading = !1, wx.showModal({
                title: "",
                content: "确定不要了吗？",
                cancelColor: "#999999",
                confirmColor: "#7CA7D2",
                success: function(e) {
                    e.confirm && a.removeItem(t);
                }
            }), !1;
            i.amount = -1;
        }
        e.default.add(i), this.getCartInfo(0);
    },
    checkItemHandler: function(t) {
        var a = t.target.dataset.item, r = t.target.dataset.index;
        if (this.loading || !a.canCheck) return !1;
        this.loading = !0, this.tapHandler(t), a.checked = a.checked ? 0 : 1;
        var i = this.data.cart.productList;
        i[r] = a;
        var n = [], o = !0, d = !1, s = void 0;
        try {
            for (var c, u = i[Symbol.iterator](); !(o = (c = u.next()).done); o = !0) {
                var l = c.value;
                n.push({
                    productId: l.productId,
                    temperAttributeCode: l.temperAttributeCode,
                    standardCode: l.standardCode,
                    amount: l.amount,
                    additionList: l.additionDefaultList,
                    eatway: l.eatway,
                    checked: l.checked
                });
            }
        } catch (t) {
            d = !0, s = t;
        } finally {
            try {
                !o && u.return && u.return();
            } finally {
                if (d) throw s;
            }
        }
        e.default.setCart(n), this.getCartInfo(0);
    },
    confirmOrder: function(t) {
        if (this.data.isCanConfirm) {
            t.targetUrl = "/pages/order/confirm", this.tapHandler(t);
            var r = this.getCartStorage(), n = [], o = !0, d = !1, s = void 0;
            try {
                for (var c, u = r[Symbol.iterator](); !(o = (c = u.next()).done); o = !0) {
                    var l = c.value;
                    l.checked && n.push(l);
                }
            } catch (t) {
                d = !0, s = t;
            } finally {
                try {
                    !o && u.return && u.return();
                } finally {
                    if (d) throw s;
                }
            }
            e.default.setConfirmOrder(n), a.default.setConfirmOrderParam(null), a.default.setConfirmOrderCoupon(null), 
            i.navigate({
                url: t.targetUrl
            }, {
                needLogin: !0,
                needForward: !0
            });
        }
    },
    getCartStorage: function() {
        return e.default.getCart();
    },
    accSub: function(t, e) {
        var a, r, i, n;
        try {
            a = t.toString().split(".")[1].length;
        } catch (t) {
            a = 0;
        }
        try {
            r = e.toString().split(".")[1].length;
        } catch (t) {
            r = 0;
        }
        return i = Math.pow(10, Math.max(a, r)), n = a >= r ? a : r, ((t * i - e * i) / i).toFixed(n);
    },
    getCartInfo: function(t) {
        var a = this, i = this.getCartStorage();
        if (i && i.length > 0 && this.data.shopInfo && this.data.shopInfo.deptId) {
            var n = this.data.delivery;
            r.ajax({
                url: "/resource/m/product/cartRefresh",
                data: {
                    deptId: this.data.shopInfo.deptId,
                    productList: i,
                    isFirst: void 0 === t ? 1 : t,
                    delivery: this.data.delivery
                }
            }).then(function(t) {
                if (t && t.content) {
                    a.setData({
                        cart: t.content
                    }, function() {
                        a.loading = !1, wx.hideNavigationBarLoading();
                    });
                    var r = [], i = !0, o = !1, d = void 0;
                    try {
                        for (var s, c = t.content.productList[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                            var u = s.value;
                            r.push({
                                productId: u.productId,
                                temperAttributeCode: u.temperAttributeCode,
                                standardCode: u.standardCode,
                                amount: u.amount,
                                additionList: u.additionDefaultList,
                                eatway: u.eatway,
                                checked: u.checked
                            });
                        }
                    } catch (t) {
                        o = !0, d = t;
                    } finally {
                        try {
                            !i && c.return && c.return();
                        } finally {
                            if (o) throw d;
                        }
                    }
                    var l = r.filter(function(t) {
                        return t.checked;
                    }), h = a.accSub(t.content.dispatchStartPrice, t.content.discountPrice);
                    a.setData({
                        isCanConfirm: l && l.length > 0 && (h <= 0 || "pick" === n),
                        confirmBtnText: h > 0 && "sent" === n ? "还差¥" + h + "起送" : "去结算"
                    }), e.default.setCart(r);
                }
            }).catch(function() {
                a.loading = !1;
            });
        } else this.setData({
            cart: null
        }, function() {
            e.default.setTabBarCount(0), wx.hideLoading(), wx.hideNavigationBarLoading();
        });
    },
    initConfirmOrder: function() {
        e.default.empryConfirmOrder(), e.default.emptyOrderRemark();
    },
    init: function() {
        var t = getApp(), e = wx.getSystemInfoSync();
        this.setData({
            delivery: t.globalData.delivery,
            shopInfo: t.globalData.shopInfo,
            addressInfo: t.globalData.addressInfo,
            location: t.globalData.location,
            clearFlag: t.globalData.clearFlag,
            mapChannel: t.globalData.mapChannel,
            res: e
        }), this.getCartInfo(1), this.initConfirmOrder();
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        r.scanHandler({
            title: "购物车",
            route: this.route
        }), this.init();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), wx.showNavigationBarLoading(), this.getCartInfo(1);
    },
    onReachBottom: function() {}
});
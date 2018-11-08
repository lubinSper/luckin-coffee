var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../service/cart.js")), r = require("../../utils/api.js");

Page({
    data: {
        remarkPlaceholder: "输入其他备注特殊要求（可不填）"
    },
    tapHandler: function(t) {
        r.tapHandler({
            title: "订单备注",
            route: this.route,
            element: t
        });
    },
    getRemark: function() {
        var e = this, a = this, n = t.default.getOrderRemark();
        if (n) this.setData({
            remark: n.remark,
            remarkMsg: n.remarkMsg,
            remarkMsgCount: n.remarkMsg.length,
            remarkPlaceholder: n.remarkMsg.length > 0 ? "" : "输入其他备注特殊要求（可不填）"
        }); else {
            var o = t.default.getConfirmOrder(), i = 0, u = !0, s = !1, m = void 0;
            try {
                for (var l, c = o[Symbol.iterator](); !(u = (l = c.next()).done); u = !0) {
                    var d = l.value;
                    i += d.amount;
                }
            } catch (t) {
                s = !0, m = t;
            } finally {
                try {
                    !u && c.return && c.return();
                } finally {
                    if (s) throw m;
                }
            }
            r.ajax({
                url: "/resource/m/order/remark",
                data: {
                    productList: o
                }
            }).then(function(t) {
                if (t && t.content) {
                    var r = t.content.sort(e.compare("showOrder")), n = !0, o = !1, u = void 0;
                    try {
                        for (var s, m = r[Symbol.iterator](); !(n = (s = m.next()).done); n = !0) {
                            var l = s.value;
                            l.remarkList = l.remarkList.sort(a.compare("showOrder")), l.showAmount = 0, l.amount = 1;
                            var c = 0, d = !0, h = !1, f = void 0;
                            try {
                                for (var k, v = l.remarkList[Symbol.iterator](); !(d = (k = v.next()).done); d = !0) {
                                    var g = k.value;
                                    g.selected = g.isDefault, g.maxAmount = g.isSameCup && "0" !== g.isSameCup ? i : g.countLimit, 
                                    g.amount = 1, g.selected && (l.showAmount = g.status, l.currentOpt = c), c++;
                                }
                            } catch (t) {
                                h = !0, f = t;
                            } finally {
                                try {
                                    !d && v.return && v.return();
                                } finally {
                                    if (h) throw f;
                                }
                            }
                        }
                    } catch (t) {
                        o = !0, u = t;
                    } finally {
                        try {
                            !n && m.return && m.return();
                        } finally {
                            if (o) throw u;
                        }
                    }
                    e.setData({
                        remark: r,
                        remarkMsg: "",
                        remarkMsgCount: 0,
                        remarkPlaceholder: "输入其他备注特殊要求（可不填）"
                    });
                }
            });
        }
    },
    compare: function(t) {
        return function(r, e) {
            var a = r[t], n = e[t];
            return isNaN(Number(a)) || isNaN(Number(n)) || (a = Number(a), n = Number(n)), a < n ? -1 : a > n ? 1 : 0;
        };
    },
    chooseOpt: function(t) {
        this.tapHandler(t);
        var r = t.currentTarget.dataset.item, e = t.currentTarget.dataset.itemindex, a = (t.currentTarget.dataset.opt, 
        t.currentTarget.dataset.optindex);
        r.showAmount = 0;
        var n = 0, o = !0, i = !1, u = void 0;
        try {
            for (var s, m = r.remarkList[Symbol.iterator](); !(o = (s = m.next()).done); o = !0) {
                var l = s.value;
                l.selected = 0, n === a && (l.selected = 1, r.amount = l.amount, r.showAmount = l.status, 
                r.currentOpt = n), n++;
            }
        } catch (t) {
            i = !0, u = t;
        } finally {
            try {
                !o && m.return && m.return();
            } finally {
                if (i) throw u;
            }
        }
        var c = this.data.remark;
        c[e] = r, this.setData({
            remark: c
        });
    },
    amountChange: function(t) {
        this.tapHandler(t);
        var r = t.currentTarget.dataset.item, e = t.currentTarget.dataset.itemindex, a = r.remarkList[r.currentOpt], n = (r.currentOpt, 
        a.amount), o = t.currentTarget.dataset.action;
        if ("add" === o && n < a.maxAmount) a.amount++; else {
            if (!("minus" === o && n > 1)) return "add" === o && wx.showToast({
                title: "数量已达到上线",
                icon: "none",
                mask: !0
            }), !1;
            a.amount--;
        }
        r.amount = a.amount;
        var i = this.data.remark;
        i[e] = r, this.setData({
            remark: i
        });
    },
    inputRemarkMsg: function(t) {
        var r = t.detail.value, e = r.length;
        this.setData({
            remarkMsg: r,
            remarkMsgCount: e
        });
    },
    textareaFocus: function() {
        this.setData({
            remarkPlaceholder: ""
        });
    },
    textareaBlur: function() {
        this.data.remarkMsgCount ? this.setData({
            remarkPlaceholder: ""
        }) : this.setData({
            remarkPlaceholder: "输入其他备注特殊要求（可不填）"
        });
    },
    saveRemark: function(r) {
        this.tapHandler(r);
        var e = this.data.remark, a = this.data.remarkMsg, n = [], o = !0, i = !1, u = void 0;
        try {
            for (var s, m = e[Symbol.iterator](); !(o = (s = m.next()).done); o = !0) {
                var l = s.value, c = "", d = l.mRemarkName;
                c = l.showAmount ? l.remarkList[l.currentOpt].name + d + l.amount + "份" : l.remarkList[l.currentOpt].name + d, 
                n.push(c);
            }
        } catch (t) {
            i = !0, u = t;
        } finally {
            try {
                !o && m.return && m.return();
            } finally {
                if (i) throw u;
            }
        }
        a && n.push(a);
        var h = n.join(",");
        t.default.setOrderRemark({
            remark: e,
            remarkMsg: a,
            remarkStr: h
        }), wx.navigateBack();
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        r.scanHandler({
            title: "订单备注",
            route: this.route
        }), this.getRemark();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
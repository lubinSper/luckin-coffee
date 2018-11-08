function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, r, n) {
        return r && t(e.prototype, r), n && t(e, n), e;
    };
}(), r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../utils/store.js")), n = function() {
    function n() {
        t(this, n);
    }
    return e(n, [ {
        key: "setWallet",
        value: function(t) {
            return r.default.setStore("COFFEE_WALLET", t);
        }
    }, {
        key: "getWallet",
        value: function() {
            return r.default.getStore("COFFEE_WALLET");
        }
    }, {
        key: "getTicketsCount",
        value: function() {
            var t = 0, e = r.default.getStore("COFFEE_WALLET"), n = !0, u = !1, a = void 0;
            try {
                for (var o, l = e.ticketList[Symbol.iterator](); !(n = (o = l.next()).done); n = !0) {
                    var i = o.value, f = !0, c = !1, y = void 0;
                    try {
                        for (var v, d = i.couponList[Symbol.iterator](); !(f = (v = d.next()).done); f = !0) t += v.value.amount;
                    } catch (t) {
                        c = !0, y = t;
                    } finally {
                        try {
                            !f && d.return && d.return();
                        } finally {
                            if (c) throw y;
                        }
                    }
                }
            } catch (t) {
                u = !0, a = t;
            } finally {
                try {
                    !n && l.return && l.return();
                } finally {
                    if (u) throw a;
                }
            }
            return t;
        }
    }, {
        key: "getTotalPrice",
        value: function() {
            return r.default.getStore("COFFEE_WALLET").totalPrice;
        }
    }, {
        key: "getWalletTickets",
        value: function() {
            var t = [], e = r.default.getStore("COFFEE_WALLET"), n = !0, u = !1, a = void 0;
            try {
                for (var o, l = e.ticketList[Symbol.iterator](); !(n = (o = l.next()).done); n = !0) {
                    var i = o.value, f = !0, c = !1, y = void 0;
                    try {
                        for (var v, d = i.couponList[Symbol.iterator](); !(f = (v = d.next()).done); f = !0) {
                            var s = v.value;
                            s.activityId = i.activityId, s.planId = i.planId, 0 !== s.amount && t.push(s);
                        }
                    } catch (t) {
                        c = !0, y = t;
                    } finally {
                        try {
                            !f && d.return && d.return();
                        } finally {
                            if (c) throw y;
                        }
                    }
                }
            } catch (t) {
                u = !0, a = t;
            } finally {
                try {
                    !n && l.return && l.return();
                } finally {
                    if (u) throw a;
                }
            }
            return t.sort(function(t, e) {
                return t.isGift >= e.isGift;
            }), t;
        }
    }, {
        key: "clearWallet",
        value: function() {
            return r.default.removeStore("COFFEE_WALLET", null);
        }
    }, {
        key: "getVirtualOrder",
        value: function() {
            return r.default.getStore("COFFEE_VIRTUALORDER");
        }
    }, {
        key: "setVirtualOrder",
        value: function(t) {
            return r.default.setStore("COFFEE_VIRTUALORDER", t);
        }
    } ]), n;
}();

exports.default = new n();
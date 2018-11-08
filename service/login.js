function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/store.js")), o = function() {
    function o() {
        e(this, o);
    }
    return t(o, [ {
        key: "setLoginStatus",
        value: function(e) {
            return n.default.setStore("LOGIN_STATUS", e);
        }
    }, {
        key: "clearLoginStatus",
        value: function() {
            return n.default.removeStore("LOGIN_STATUS");
        }
    }, {
        key: "getLoginStatus",
        value: function() {
            return n.default.getStore("LOGIN_STATUS");
        }
    }, {
        key: "setLoginMobile",
        value: function(e) {
            return n.default.setStore("LOGIN_MOBILE", e);
        }
    }, {
        key: "clearLoginMobile",
        value: function() {
            return n.default.removeStore("LOGIN_MOBILE");
        }
    }, {
        key: "getLoginMobile",
        value: function() {
            return n.default.getStore("LOGIN_MOBILE");
        }
    }, {
        key: "clearLoginData",
        value: function(e, t) {
            this.setLoginStatus(!1), e.globalData.mobile = "", this.clearLoginMobile(), n.default.removeStore("userInfo"), 
            n.default.removeStore("uid"), e.globalData.uid = "", e.globalData.addressInfo = null, 
            e.globalData.shopInfo = null, e.globalData.delivery = "pick", e.globalData.clearFlag = !0, 
            wx.reLaunch({
                url: "../member/center",
                complete: function() {
                    t.emptyCart();
                }
            });
        }
    } ]), o;
}();

exports.default = new o();
function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/store.js")), r = function() {
    function r() {
        e(this, r);
    }
    return t(r, [ {
        key: "getCouponReceived",
        value: function() {
            return n.default.getStore("COUPON20181111_ISGET");
        }
    }, {
        key: "setCouponReceived",
        value: function(e) {
            return n.default.setStore("COUPON20181111_ISGET", e);
        }
    }, {
        key: "getShowEnvelope",
        value: function() {
            var e = n.default.getStore("COUPON20181111_SHOWIMAGE");
            return "" === e || e;
        }
    }, {
        key: "setShowEnvelope",
        value: function(e) {
            return n.default.setStore("COUPON20181111_SHOWIMAGE", e);
        }
    } ]), r;
}();

exports.default = new r();
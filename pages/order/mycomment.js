var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../service/order.js")), e = require("../../utils/api.js");

Page({
    data: {},
    getOrderEvaluate: function() {
        var e = t.default.getOrderEvaluateList(), n = !0, r = !1, a = void 0;
        try {
            for (var o, i = e[Symbol.iterator](); !(n = (o = i.next()).done); n = !0) {
                var u = o.value;
                u.evaluateImgList = u.evaluateImgs.split(",");
            }
        } catch (t) {
            r = !0, a = t;
        } finally {
            try {
                !n && i.return && i.return();
            } finally {
                if (r) throw a;
            }
        }
        this.setData({
            orderEvaluateList: e
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        e.scanHandler({
            title: "我的评价",
            route: this.route
        }), this.getOrderEvaluate();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../service/wallet.js")), e = t(require("../../service/order.js")), o = require("../../utils/api.js"), r = "/pages/coupon/walletorderresult", i = getApp();

Page({
    data: {
        paramFrom: "",
        payAgree: !0,
        priceList: [],
        totalCount: 0,
        totalPrice: 0,
        isIpx: i.globalData.isIpx
    },
    tapHandler: function(t) {
        o.tapHandler({
            title: "确认订单",
            route: this.route,
            element: t
        });
    },
    checkPayAgree: function(t) {
        this.tapHandler(t), this.setData({
            payAgree: !this.data.payAgree
        });
    },
    goCheckout: function() {
        var t = r + "?from=" + this.data.paramFrom + "&amount=" + this.data.totalAmount + "&status=success", a = r + "?from=" + this.data.paramFrom + "&amount=" + this.data.totalAmount + "&status=fail";
        this.data.virtualOrderId && e.default.payOrder(this.data.virtualOrderId, t, 1, a);
    },
    checkout: function() {
        this.data.payAgree && this.goCheckout();
    },
    onLoad: function(t) {
        this.setData({
            paramFrom: t.from || "mystock",
            virtualOrderId: t.virtualOrderId,
            totalAmount: t.totalAmount,
            ticketList: a.default.getWalletTickets(),
            totalPrice: a.default.getTotalPrice(),
            totalCount: a.default.getTicketsCount()
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
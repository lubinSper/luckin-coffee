var n = require("../../utils/api.js"), o = getApp();

Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        n.scanHandler({
            title: "支付协议",
            route: this.route
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return o.globalData.share;
    }
});
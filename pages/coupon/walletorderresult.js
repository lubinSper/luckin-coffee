Page({
    data: {
        orderStatus: "",
        amount: 0,
        paramFrom: ""
    },
    onLoad: function(n) {
        this.setData({
            orderStatus: n.status || "success",
            amount: n.amount,
            paramFrom: n.from
        });
    },
    naviBackConfirm: function() {
        wx.navigateBack();
    },
    naviBack: function() {
        wx.navigateBack({
            delta: 2
        });
    },
    jumpMenu: function() {
        wx.switchTab({
            url: "/pages/index/menu"
        });
    },
    jumpWallet: function() {
        wx.navigateTo({
            url: "/pages/coupon/wallet"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {}
});
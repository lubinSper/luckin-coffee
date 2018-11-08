var n = getApp();

Page({
    data: {
        imgClickUrl: ""
    },
    onLoad: function(o) {
        this.setData({
            imgClickUrl: n.globalData.imgClickUrl
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
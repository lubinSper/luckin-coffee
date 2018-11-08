Page({
    data: {
        invitationUrl: ""
    },
    onLoad: function(n) {
        this.setData({
            invitationUrl: decodeURIComponent(n.url)
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
var e = require("../../utils/api.js");

Page({
    data: {
        serviceUrl: ""
    },
    _ajaxGetSysService: function() {
        var n = this;
        e.ajax({
            url: "/resource/m/sys/sysDict",
            options: {
                loading: !1,
                needOriginResult: !0
            }
        }).then(function(e) {
            n.setData({
                serviceUrl: e.content.hotLineServer.hotLineUrl
            }), wx.setNavigationBarTitle({
                title: e.content.hotLineServer.hotLineTitle
            });
        });
    },
    onLoad: function(e) {
        this._ajaxGetSysService();
    },
    onReady: function() {},
    onShow: function() {
        e.scanHandler({
            title: "在线客服",
            route: this.route
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
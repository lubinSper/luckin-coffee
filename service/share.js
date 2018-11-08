!function(e) {
    e && e.__esModule;
}(require("./login.js"));

var e = require("../utils/api.js"), n = getApp();

module.exports = {
    getUrl: function(o) {
        e.ajax({
            url: "/resource/m/promo/adsense",
            data: {
                locationType: o
            },
            options: {
                needLogin: !1,
                loading: !1
            }
        }).then(function(e) {
            e && e.content && (e.content.url ? (n.globalData.inviterObj = e.content, wx.navigateTo({
                url: "/pages/index/inviter?locationType=" + o + "&shareType=1"
            })) : wx.navigateTo({
                url: "/pages/index/login"
            }));
        });
    }
};
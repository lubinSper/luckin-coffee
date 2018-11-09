function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../service/coupon.js")),
    o = t(require("../../service/share.js")),
    a = t(require("./../../service/login.js")),
    n = t(require("./../../utils/api.js")),
    i = require("../../service/location.js"),
    app = getApp();

Page({
    data: {
        sendTip: "",
        locationSuccess: null,
        location: {},
        delivery: null,
        shopInfo: {},
        isShowEnvelope: !1,
        isReceived: !1,
        systemInfo: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        adPics: [ {
            sourceUrl: "./../../resources/images/index/banner_default.png"
        } ],
        colseImg: !1
    },
    wxLogin: function() {
        app.globalData.openid || wx.login({
            success: function(t) {
                var e = t.code;
                n.default.ajax({
                    url: "/user/wxapp/login",
                    data: {
                        code: e,
                        isAuthorization: !0
                    },
                    options: {
                        loading: !1
                    }
                }).then(function(res) {
                    if (res.code == 0){
                        app.globalData.token = res.data.token;
                    }
                });
            }
        });
    },
    tapHandler: function(t) {
        n.default.tapHandler({
            title: "luckin coffee",
            route: this.route,
            element: t
        });
    },
    closeEnvelope: function(t) {
        this.setData({
            isShowEnvelope: !1,
            colseImg: !0
        });
    },
    getAdImage: function() {
        var that = this;
        n.default.ajax({
            url: "/banner/list",
            data: {
                type:1
            },
            options: {
                loading: !1
            }
        }).then(function(res) {
            if (res.code == 0){
                that.setData({
                    adPics: res.data
                })
            }
        });
    },
    toMenu: function() {
        wx.switchTab({
            url: "./menu"
        });
    },
    toWallet: function() {
        1 != a.default.getLoginStatus() ? wx.navigateTo({
            url: "./login"
        }) : wx.navigateTo({
            url: "./../coupon/wallet"
        });
    },
    toACup: function() {
        1 != a.default.getLoginStatus() ? wx.navigateTo({
            url: "./login"
        }) : o.default.getUrl(1);
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.wxLogin();
        this.getAdImage();
        var t = e.default.getCouponReceived(), o = !this.data.colseImg && e.default.getShowEnvelope();
        this.setData({
            isShowEnvelope: o,
            isReceived: t
        });
    },
    onHide: function(t) {},
    onUnload: function(t) {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return l.globalData.share;
    }
});
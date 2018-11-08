function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var i = e(require("./../../service/login.js")), a = e(require("../../service/share.js")), r = require("../../utils/api.js").ajax, n = require("../../utils/store.js"), o = require("../../utils/util.js"), s = require("../../utils/api.js"), l = getApp();

Page({
    data: {
        isLoginPageSuccess: !1,
        loginFail: !1,
        userAvatar: "",
        userName: "用户登录",
        invitationUrl: "",
        actionUrl: "../index/login",
        authorizationShow: !1,
        openCardList: null,
        navListFirst: [ {
            id: "getAddress",
            label: "收货地址"
        }, {
            id: "wallet",
            label: "咖啡钱包",
            extra: ""
        }, {
            id: "coupon",
            label: "优惠券",
            extra: ""
        }, {
            id: "receipt",
            label: "发票管理"
        }, {
            id: "customerService",
            label: "客户服务"
        } ]
    },
    tapHandler: function(e) {
        s.tapHandler({
            title: "个人中心",
            route: this.route,
            element: e
        });
    },
    onLoad: function() {},
    onReady: function() {},
    onShow: function() {
        s.scanHandler({
            title: "个人中心",
            route: this.route
        }), this.getUserInfoApi(), this.getAdvertApi();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onShareAppMessage: function() {
        return l.globalData.share;
    },
    urlList: {
        getAddress: "../member/addresslist",
        customerService: "../order/customerservice",
        wallet: "../coupon/wallet",
        coupon: "../coupon/coupon?from=list"
    },
    getUserInfoApi: function() {
        var e = this;
        r({
            url: "/resource/m/user/baseinfo/detail",
            data: {},
            options: {
                needLogin: !1,
                loading: !1,
                needOriginResult: !0
            }
        }).then(function(i) {
            if ("BASE000" === i.busiCode && 1 === i.code) {
                var a, r = i.content;
                n.setStore("userInfo", r), e.setData((a = {
                    isLoginPageSuccess: !0,
                    userAvatar: r.imgUrl,
                    userName: r.userName,
                    authorizationShow: !0
                }, t(a, "navListFirst[1].extra", r.coffeeNum + "杯"), t(a, "navListFirst[2].extra", r.ticketNum + "张"), 
                a));
            } else if ("BASE102" === i.busiCode) e.setData({
                loginFail: !0,
                errMsg: i.msg
            }); else if ("BASE000" === i.busiCode && 5 === i.code) {
                var o;
                e.setData((o = {
                    isLoginPageSuccess: !1,
                    loginFail: !1,
                    userAvatar: "",
                    userName: "用户登录"
                }, t(o, "navListFirst[1].extra", ""), t(o, "navListFirst[2].extra", ""), o));
            }
        });
    },
    getAdvertApi: function() {
        var e = this;
        r({
            url: "/resource/m/promo/adsense",
            data: {
                locationType: 1
            },
            options: {
                needLogin: !1,
                loading: !1
            }
        }).then(function(t) {
            if ("BASE000" === t.busiCode && 1 === t.code) {
                var i = t.content;
                e.setData({
                    advertImage: i.iosImgUrl,
                    invitationUrl: i.url
                });
            }
        });
    },
    handlerNavTap: function(e) {
        var t = this;
        "receipt" === e.currentTarget.dataset.id ? (this.tapHandler(e), wx.showModal({
            content: "请前往luckin coffee APP-发票管理中开具",
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: l.globalData.modal.confirmColor
        })) : (e.targetUrl = t.urlList[e.currentTarget.dataset.id], this.tapHandler(e), 
        o.navigate({
            url: e.targetUrl
        }, {
            needLogin: !0
        }));
    },
    handlerUserAreaTap: function(e) {
        this.tapHandler(e);
        var t = this;
        !0 === this.data.isLoginPageSuccess ? this.data.loginFail ? wx.navigateTo({
            url: "../member/info?loginFail=" + t.data.errMsg
        }) : wx.navigateTo({
            url: "../member/info"
        }) : wx.navigateTo({
            url: "../index/login"
        });
    },
    invitationPeople: function() {
        1 != i.default.getLoginStatus() ? wx.navigateTo({
            url: "../index/login"
        }) : a.default.getUrl(1);
    }
});
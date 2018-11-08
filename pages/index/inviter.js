function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./../../utils/api.js")), i = getApp();

Page({
    data: {
        redirectUrl: "",
        shareType: "",
        openId: "",
        locationType: null,
        fission: {},
        inviteObj: {},
        shareObj: {},
        firstObj: {}
    },
    getUrl: function() {
        if (1 == this.data.shareType) {
            var t = this.data.firstObj, e = t.url.includes("?") ? t.url + "&frommini=mini" : "?frommini=mini";
            this.setData({
                redirectUrl: e
            }), t.url ? this.getUrlParam(t.url, this.data.inviteObj) : console.log("接口返回url为空", t.url);
        }
        this.getShareContent();
    },
    getShareContent: function() {
        var i = this;
        e.default.ajax({
            url: "/resource/m/user/invite/shareContent",
            data: {
                target: i.data.inviteObj.target,
                activityNo: i.data.inviteObj.activityNo,
                openid: i.data.openId,
                from: i.data.locationType
            },
            options: {
                needLogin: !1,
                loading: !1
            }
        }).then(function(e) {
            if (e && e.content) {
                var a, n = 3 == i.data.shareType ? e.content.shareContents[0].shareLink + "&frommini=mini" : i.data.redirectUrl;
                i.setData((a = {}, t(a, "shareObj.shareTitle", e.content.shareContents[0].shareTitle), 
                t(a, "shareObj.shareIcon", e.content.shareContents[0].shareIcon), t(a, "shareObj.shareDesc", e.content.shareContents[0].shareDigest), 
                t(a, "redirectUrl", n), a));
            }
        });
    },
    getUrlParam: function(t, e) {
        t.split("?") && t.split("?")[1].split("&").map(function(t) {
            var i = t.split("=")[0], a = t.split("=")[1], n = {};
            n[i] = a, Object.assign(e, n);
        });
    },
    wxLogin: function() {
        var t = this;
        wx.login({
            success: function(i) {
                var a = i.code;
                e.default.ajax({
                    url: "/resource/m/user/wxlogin",
                    data: {
                        code: a,
                        isAuthorization: !0
                    },
                    options: {
                        loading: !1
                    }
                }).then(function(e) {
                    e && e.content && e.content.openid && (t.setData({
                        openId: e.content.openid
                    }), 2 != t.data.shareType ? t.getUrl() : t.getFisson());
                });
            }
        });
    },
    getFisson: function() {
        var i = this;
        e.default.ajax({
            url: "/resource/m/fissionRedPacket/detailInfo",
            options: {
                needLogin: !1,
                loading: !1
            },
            data: {
                orderNo: i.data.fission.orderNo,
                inviteCode: i.data.fission.inviteCode,
                activityNo: i.data.fission.activityNo,
                openId: i.data.openId
            }
        }).then(function(e) {
            if (e && e.content) {
                var a;
                i.setData((a = {}, t(a, "shareObj.shareTitle", e.content.shareContent.shareTitle), 
                t(a, "shareObj.shareIcon", e.content.shareContent.shareIcon), t(a, "shareObj.shareDesc", e.content.shareContent.shareDigest), 
                t(a, "redirectUrl", e.content.shareContent.shareLink + "&frommini=mini"), a));
            }
        });
    },
    onLoad: function(e) {
        if (e.locationType && "1" == e.shareType) this.setData({
            shareType: e.shareType,
            firstObj: i.globalData.inviterObj,
            locationType: e.locationType
        }); else if ("2" == e.shareType) {
            var a;
            this.setData((a = {
                shareType: "2"
            }, t(a, "fission.orderNo", e.orderNo), t(a, "fission.inviteCode", e.inviteCode), 
            t(a, "fission.activityNo", e.activityNo), a));
        } else if ("3" == e.shareType) {
            var n;
            this.setData((n = {
                shareType: "3",
                locationType: e.locationType
            }, t(n, "inviteObj.target", e.target), t(n, "inviteObj.activityNo", e.activityNo), 
            n));
        }
        this.wxLogin();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        if ("1" == this.data.shareType) t = "/pages/index/inviter?locationType=" + this.data.locationType + "&shareType=3&target=" + this.data.inviteObj.target + "&activityNo=" + this.data.inviteObj.activityNo; else if ("2" === this.data.shareType) var t = "/pages/index/inviter?orderNo=" + this.data.fission.orderNo + "&shareType=2&inviteCode=" + this.data.fission.inviteCode + "&activityNo=" + this.data.fission.activityNo;
        return {
            title: this.data.shareObj.shareTitle,
            imageUrl: this.data.shareObj.shareIcon,
            path: t,
            desc: this.data.shareObj.shareDesc ? this.data.shareObj.shareDesc : ""
        };
    }
});
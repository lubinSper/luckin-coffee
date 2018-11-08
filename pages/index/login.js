var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../service/login")), t = require("./../../utils/store.js"), a = require("../../utils/util.js"), n = require("../../utils/api.js"), o = getApp();

Page({
    data: {
        mobile: "",
        verifycode: "",
        sendText: "获取验证码",
        sendTextState: "disabled",
        sendTextDisabled: !0,
        sendClass: "unsend",
        remain: 0,
        deviceId: "",
        submitState: "disabled",
        clearBtnState: "hide"
    },
    tapHandler: function(e) {
        n.tapHandler({
            title: "账户登录",
            route: this.route,
            element: e
        });
    },
    wxLogin: function() {
        o.globalData.openid || wx.login({
            success: function(e) {
                var a = e.code;
                n.ajax({
                    url: "/resource/m/user/wxlogin",
                    data: {
                        code: a,
                        isAuthorization: !0
                    },
                    options: {
                        loading: !1
                    }
                }).then(function(e) {
                    e && e.content && e.content.openid && (o.globalData.openid = e.content.openid, o.globalData.sessionKey = e.content.sessionKey, 
                    t.setStore("openid", e.content.openid));
                });
            }
        });
    },
    mobileInput: function(e) {
        this.setData({
            mobile: e.detail.value,
            clearBtnState: "" == e.detail.value ? "hide" : "show"
        }), this.handleSubmitState();
    },
    clearMobileInput: function() {
        this.setData({
            mobile: "",
            clearBtnState: "hide"
        }), this.handleSubmitState();
    },
    memberAgreement: function(e) {
        e.targetUrl = "../agreement/member", this.tapHandler(e), wx.navigateTo({
            url: e.targetUrl
        });
    },
    verifycodeInput: function(e) {
        this.setData({
            verifycode: e.detail.value
        }), this.handleSubmitState();
    },
    handleSubmitState: function() {
        11 === this.data.mobile.length ? this.setData({
            sendTextState: "enable",
            sendTextDisabled: !1
        }) : this.setData({
            sendTextState: "disabled",
            sendTextDisabled: !0
        }), 11 === this.data.mobile.length && 6 === this.data.verifycode.length ? this.setData({
            submitState: "enable"
        }) : this.setData({
            submitState: "disabled"
        });
    },
    wxUserInfo: function(e) {
        this.tapHandler(e), this.setData({
            authStatus: "got",
            wxUserInfo: e.detail
        });
    },
    sendVerifycode: function(e) {
        var t = this;
        this.tapHandler(e);
        "disabled" !== this.data.sendTextState && (this.data.remain > 1 || n.ajax({
            url: "/resource/m/sys/base/validcode",
            options: {
                loading: !0
            },
            data: {
                mobile: this.data.mobile,
                deviceId: this.data.deviceId
            }
        }).then(function(e) {
            if (e.content.validate) wx.showModal({
                title: "",
                content: "设备号被拉入黑名单了，过30分钟再试试",
                showCancel: !1,
                confirmColor: "#7CA7D2",
                confirmText: "我知道了",
                success: function(e) {}
            }); else {
                a.toast("验证码已发送"), t.setData({
                    remain: e.content.remain,
                    sendText: e.content.remain + "s",
                    sendClass: "send"
                });
                var n = setInterval(function() {
                    1 === t.data.remain ? (t.setData({
                        sendText: "重发验证码",
                        sendClass: "unsend"
                    }), clearInterval(n)) : t.setData({
                        remain: --t.data.remain,
                        sendText: t.data.remain + "s"
                    });
                }, 1e3);
            }
        }));
    },
    login: function(e) {
        "disabled" !== this.data.submitState && (this.tapHandler(e), this._loginAjax(this.data.wxUserInfo));
    },
    _loginAjax: function(t) {
        var a = this, i = {
            mobile: this.data.mobile,
            validateCode: this.data.verifycode,
            sessionKey: o.globalData.sessionKey,
            openid: o.globalData.openid,
            type: 1
        };
        t && (i.encryptedData = t.encryptedData, i.iv = t.iv), n.ajax({
            url: "/resource/m/user/login",
            options: {
                needOriginResult: !0
            },
            data: i
        }).then(function(t) {
            if ("SUCCESS" === t.status.toUpperCase() && t.content && 1 == t.content.status) if (e.default.setLoginStatus(!0), 
            o.globalData.mobile = a.data.mobile, o.globalData.clearFlag = !1, e.default.setLoginMobile(a.data.mobile), 
            1 == t.content.perfect) a.options && a.options.type && a.options.returnUrl ? wx.navigateTo({
                url: "/pages/member/supplement?type=" + a.options.type + "&returnUrl=" + a.options.returnUrl
            }) : wx.navigateTo({
                url: "/pages/member/supplement"
            }); else if (a.options && a.options.returnUrl) {
                var n = decodeURIComponent(a.options.returnUrl);
                "switch" === a.options.type ? wx.switchTab({
                    url: n
                }) : wx.redirectTo({
                    url: n
                });
            } else wx.navigateBack({
                delta: 1
            }); else {
                var i = t.content && t.content.msg && t.content.msg.split("_").join("\r\n") || t.msg;
                wx.showModal({
                    title: "",
                    content: i,
                    showCancel: !1,
                    confirmColor: "#7CA7D2",
                    confirmText: "我知道了",
                    success: function(e) {}
                });
            }
        });
    },
    _doLogout: function() {
        n.ajax({
            url: "/resource/m/user/logout",
            options: {
                needLogin: !1,
                loading: !1
            },
            data: {}
        }).then(function(a) {
            "BASE000" === a.busiCode && 1 === a.code && (e.default.setLoginStatus(!1), o.globalData.mobile = "", 
            e.default.clearLoginMobile(), t.removeStore("userInfo"), t.removeStore("uid"), o.globalData.uid = "", 
            o.globalData.mobile = "");
        });
    },
    setDeviceId: function(e) {
        this.setData({
            deviceId: e
        });
    },
    onLoad: function(e) {
        var t = this;
        t.wxLogin(), wx.getSystemInfo({
            success: function(e) {
                e.model.indexOf("iPhone") > -1 ? t.setDeviceId(o.globalData.deviceNo.ios) : t.setDeviceId(o.globalData.deviceNo.android);
            }
        }), wx.getSetting ? wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        t.setData({
                            authStatus: "got",
                            wxUserInfo: e
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
            showCancel: !1
        });
    },
    onReady: function() {},
    onShow: function() {
        n.scanHandler({
            title: "账户登录",
            route: this.route
        }), o.globalData.mobile && this._doLogout();
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
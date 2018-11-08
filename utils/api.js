var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../service/login.js")), o = require("./promise/es6-promise.min.js"), i = require("./crypto.js"), n = require("../config/config.js"), a = require("./util.js"), r = require("./store.js"), s = getApp(), l = function(t) {
    return new o(function(o, a) {
        if (!t) return "";
        t.data || (t.data = {});
        var l = n.api.code + "" + n.api.version, u = n.api.key, c = n.api.replaceSpecial, d = "object" === e(t.data) ? JSON.stringify(t.data) : t.data, p = i.aes.en(d, u, c), g = [ "cid=" + l, "q=" + p ], f = s.globalData.uid || r.getStore("uid");
        f && f.length > 0 && g.push("uid=" + f), o(t.data);
    });
}, u = function(e) {
    return new o(function(o, u) {
        var c = n.api.domain + e.url;
        l(e).then(function(l) {
            e.options && !1 === e.options.loading || wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: c,
                data: l,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                success: function(l) {
                    e.options && !1 === e.options.loading || wx.hideLoading();
                    var c = l.data || null;
                    // 是否隐藏loading
                    // 储存uid，如果是注册接口，返回式储存uid
                    // 解析res
                    // 选择是否跳转页面
                    //
                    if (e.url.indexOf("login")) {
                    }
                    console.log(e);

                        if (1 === c.code && e.url.indexOf("/resource/m/user/logout") > -1 && (s.globalData.loginStatistic = {}),
                        5 === c.code) return t.default.setLoginStatus(!1), e.options && !1 === e.options.needLogin ? void o(c) : void (void 0 === s.globalData.loginStatistic[e.url] || 0 === s.globalData.loginStatistic[e.url] ? (s.globalData.loginStatistic[e.url] = 1, 
                        wx.navigateTo({
                            url: "/pages/index/login"
                        })) : (s.globalData.loginStatistic[e.url] = 0, e.options && e.options.switchUrl ? (o(c), 
                        wx.switchTab({
                            url: e.options.switchUrl
                        })) : e.options && e.options.redirectUrl ? wx.redirectTo({
                            url: e.options.switchUrl
                        }) : wx.navigateBack()));
                        if ("BASE101" !== c.BASE101) if (7 !== c.code) {
                            if (1 !== c.code) return e.options && !0 === e.options.needOriginResult ? o(c) : a.toast(c.msg), 
                            void u(c);
                            o && o(c);
                        } else {
                            if (e.options && !0 === e.options.needOriginResult) o(c); else {
                                var d = c.msg || "业务处理错误";
                                a.toast(d);
                            }
                            u(c);
                        } else wx.navigateTo({
                            url: "/pages/member/supplement"
                        });
                    } else o(null);
                },
                fail: function(t) {
                    e.options && !1 === e.options.loading || wx.hideLoading(), wx.showToast({
                        title: "网络连接失败",
                        icon: "none",
                        duration: 2e3
                    }), console.error(t), u("network timeout");
                },
                complete: function() {}
            });
        });
    });
};

module.exports = {
    ajax: u,
    upload: function(e) {
        return new o(function(o, u) {
            l(e).then(function(l) {
                var c = n.api.domain + e.url + "?", d = [];
                for (var p in l) d.push(p + "=" + l[p]);
                c += d.join("&"), e.options && !1 !== e.loading && wx.showLoading({
                    title: "加载中...",
                    mask: !0
                }), wx.uploadFile({
                    url: c,
                    filePath: e.filePath,
                    name: e.name,
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    success: function(l) {
                        e.options && !1 === e.options.loading || wx.hideLoading();
                        var u = null;
                        if (l.data && "string" == typeof l.data && (u = i.aes.de(l.data, n.api.key, n.api.replaceSpecial), 
                        u = JSON.parse(u)), n.api.debug, u && (s.globalData.uid = u.uid, r.setStore("uid", u.uid)), 
                        5 !== u.code) if ("BASE101" !== u.BASE101) if (7 !== u.code) 1 === u.code ? o && o(u) : a.toast(u.msg); else if (e.options && !0 === e.options.needOriginResult) o(u); else {
                            var c = u.msg || "业务处理错误";
                            a.toast(c);
                        } else wx.navigateTo({
                            url: "/pages/member/supplement"
                        }); else {
                            if (t.default.setLoginStatus(!1), e.options && !1 === e.options.needLogin) return;
                            wx.navigateTo({
                                url: "/pages/index/login"
                            });
                        }
                    },
                    fail: function(t) {
                        e.options && !1 === e.options.loading || wx.hideLoading(), wx.showToast({
                            title: "网络连接失败",
                            icon: "none",
                            duration: 2e3
                        }), console.error(t), u("network timeout");
                    }
                });
            });
        });
    },
    scanHandler: function(e) {
        var t = wx.getSystemInfoSync(), o = {
            title: e.title || "",
            urlPath: e.route,
            openid: s.globalData.openid,
            manufacturer: t.brand,
            model: t.model,
            os: t.platform,
            osVersion: t.system,
            screenHeight: t.screenHeight,
            screenWidth: t.screenWidth,
            browser: t.platform,
            browserVersion: t.SDKVersion
        };
        wx.getNetworkType({
            success: function(e) {
                switch (e.networkType) {
                  case "wifi":
                    o.networkType = 1;
                    break;

                  case "2g":
                    o.networkType = 2;
                    break;

                  case "3g":
                    o.networkType = 3;
                    break;

                  case "4g":
                    o.networkType = 4;
                }
            },
            complete: function() {
                u({
                    url: "/resource/m/shence/webscan",
                    data: o,
                    options: {
                        loading: !1,
                        needOriginResult: !0
                    }
                });
            }
        });
    },
    tapHandler: function(e) {
        var t = wx.getSystemInfoSync(), o = {
            elementId: e.element.currentTarget.id || "",
            elementTargetUrl: e.element.targetUrl || "",
            title: e.title || "",
            urlPath: e.route,
            openid: s.globalData.openid,
            manufacturer: t.brand,
            model: t.model,
            os: t.platform,
            osVersion: t.system,
            screenHeight: t.screenHeight,
            screenWidth: t.screenWidth,
            browser: t.platform,
            browserVersion: t.SDKVersion
        };
        wx.getNetworkType({
            success: function(e) {
                switch (e.networkType) {
                  case "wifi":
                    o.networkType = 1;
                    break;

                  case "2g":
                    o.networkType = 2;
                    break;

                  case "3g":
                    o.networkType = 3;
                    break;

                  case "4g":
                    o.networkType = 4;
                }
            },
            complete: function() {
                u({
                    url: "/resource/m/shence/webclick",
                    data: o,
                    options: {
                        loading: !1,
                        needOriginResult: !0
                    }
                });
            }
        });
    }
};
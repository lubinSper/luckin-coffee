var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../service/login.js")), t = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, i = e.getDate(), o = e.getHours(), a = e.getMinutes(), u = e.getSeconds();
        return [ n, r, i ].map(t).join("/") + " " + [ o, a, u ].map(t).join(":");
    },
    formatSeconds: function(e) {
        if (!e) return null;
        var t = parseInt(e), n = 0, r = 0;
        return t > 60 && (r = parseInt(t / 60), n = parseInt(t % 60)), r > 0 ? r + "分" + n + "秒" : t + "秒";
    },
    redirect: function(e) {
        wx.redirectTo({
            url: e
        });
    },
    toast: function(e, t, n) {
        wx.showToast({
            title: e,
            icon: t || "none",
            duration: 2e3,
            success: function() {
                n && n();
            }
        });
    },
    trim: function(e) {
        return !e || e.length < 1 ? null : e = e.replace(/(^\s*)|(\s*$)/g, "");
    },
    isMobile: function(e) {
        return /^1[3-9]\d{9}/.test(e);
    },
    navigate: function(t, n) {
        if (n && n.needLogin) {
            if (!e.default.getLoginStatus()) {
                var r = n.needForward ? "/pages/index/login?returnUrl=" + encodeURIComponent(t.url) + "&type=" + (n.navigateType || "redirect") : "/pages/index/login";
                return wx.navigateTo({
                    url: r
                }), !1;
            }
            wx.navigateTo(t);
        } else wx.navigateTo(t);
    },
    getUrlParam: function(e, t) {
        e.split(1) ? e.split("?")[1].split("&").map(function(e) {
            var n = e.split("=")[0], r = e.split("=")[1], i = {};
            i[n] = r, Object.assign(t, i);
        }) : wx.showToast({
            icon: "none",
            title: "url格式错误"
        });
    }
};
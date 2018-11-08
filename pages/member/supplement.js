var e = require("../../utils/util.js"), t = require("../../utils/api.js");

Page({
    data: {
        nickname: "",
        submitState: "disable",
        sex: 2,
        sexAry: [ {
            name: "先生",
            value: 1,
            className: ""
        }, {
            name: "女士",
            value: 2,
            className: "active",
            checked: !0
        } ]
    },
    tapHandler: function(e) {
        t.tapHandler({
            title: "完善资料",
            route: this.route,
            element: e
        });
    },
    nicknameInput: function(e) {
        this.setData({
            submitState: "" == e.detail.value.trim() ? "disable" : "",
            nickname: e.detail.value
        });
    },
    sexChange: function(e) {
        for (var t = this.data.sexAry, a = 0, n = t.length; a < n; ++a) t[a].value == e.detail.value ? t[a].className = "active" : t[a].className = "";
        this.setData({
            sex: e.detail.value,
            sexAry: this.data.sexAry
        });
    },
    submit: function(a) {
        var n = this;
        this.data.nickname.trim() && (this.tapHandler(a), t.ajax({
            url: "/resource/m/user/perfect",
            data: {
                name: this.data.nickname,
                sex: this.data.sex
            }
        }).then(function(t) {
            if ("success" === t.content) if (e.toast("更新成功"), n.options && n.options.returnUrl) {
                var a = decodeURIComponent(n.options.returnUrl);
                "switch" === n.options.type ? wx.switchTab({
                    url: a
                }) : wx.redirectTo({
                    url: a
                });
            } else {
                var i = 1, s = getCurrentPages();
                for (var o in s) s[o].route.indexOf("index/login") > -1 && (i = 2);
                wx.navigateBack({
                    delta: i
                });
            }
        }));
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        t.scanHandler({
            title: "完善资料",
            route: this.route
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return app.globalData.share;
    }
});
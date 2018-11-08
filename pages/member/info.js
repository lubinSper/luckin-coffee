function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = e(require("../../service/cart.js")), t = e(require("../../service/login.js")), a = require("../../utils/api.js").ajax, o = require("../../utils/store.js"), i = require("../../utils/api.js"), n = getApp();

Page({
    data: {
        userAvatar: "",
        userName: "",
        mobile: "",
        sexArray: [ "", "男", "女" ],
        objectSexArray: [ {
            id: 0,
            name: ""
        }, {
            id: 1,
            name: "男"
        }, {
            id: 2,
            name: "女"
        } ],
        sexIndex: 0
    },
    tapHandler: function(e) {
        i.tapHandler({
            title: "个人资料",
            route: this.route,
            element: e
        });
    },
    onLoad: function() {
        var e = o.getStore("userInfo");
        this.setData({
            userAvatar: e.imgUrl || "",
            userName: e.userName || "",
            mobile: e.mobile || "",
            sexIndex: e.sex || 0
        });
    },
    onShow: function() {
        i.scanHandler({
            title: "个人资料",
            route: this.route
        });
        var e = getCurrentPages(), r = e[e.length - 1].options;
        r.loginFail && wx.showModal({
            content: r.loginFail,
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: n.globalData.modal.confirmColor
        });
    },
    handlerLogout: function(e) {
        this.tapHandler(e);
        a({
            url: "/resource/m/user/logout",
            data: {}
        }).then(function(e) {
            "BASE000" === e.busiCode && 1 === e.code && t.default.clearLoginData(n, r.default);
        });
    }
});
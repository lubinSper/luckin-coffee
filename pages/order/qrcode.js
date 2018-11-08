!function(e) {
    e && e.__esModule;
}(require("../../service/order.js"));

var e = require("../../utils/qrcode.js"), a = require("../../utils/api.js"), o = getApp();

Page({
    data: {
        takeMealInfo: {},
        takeMealDesc: "",
        orderId: ""
    },
    ajaxLoad: function() {
        var e = this;
        a.ajax({
            url: "/resource/m/order/detail",
            data: {
                orderId: this.data.orderId
            }
        }).then(function(a) {
            e.setData({
                takeMealInfo: a.content.takeMealCodeInfo,
                takeMealDesc: a.content.takeCodeDesc
            }), e.showQrcode();
        });
    },
    onLoad: function(e) {
        this.setData({
            orderId: e.orderId
        }), e.orderId || console.error("订单码空"), this.ajaxLoad();
    },
    showQrcode: function() {
        var a = e.createQrCodeImg(this.data.takeMealInfo.takeOrderId, {
            size: 180
        });
        this.setData({
            imageData: a
        });
    },
    onReady: function() {},
    onShow: function() {
        a.scanHandler({
            title: "取餐码",
            route: this.route
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return o.globalData.share;
    }
});
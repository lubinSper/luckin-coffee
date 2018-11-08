var e = require("../../utils/api.js"), t = getApp();

Page({
    data: {
        ticketList: [],
        param: {},
        coffeeStoreDesc: "",
        isIpx: t.globalData.isIpx
    },
    getCoffeeStoreDesc: function() {
        var t = this;
        e.ajax({
            url: "/resource/m/promotion/myself/coffeeStoreIntroduction",
            options: {
                loading: !1
            }
        }).then(function(e) {
            wx.hideLoading(), e.content && t.setData({
                coffeeStoreDesc: e.content
            });
        });
    },
    getWalletList: function() {
        var t = this;
        e.ajax({
            url: "/resource/m/promotion/myself/list",
            options: {
                loading: !1
            },
            data: this.data.param
        }).then(function(e) {
            wx.hideLoading(), e.content && t.setData({
                ticketList: e.content
            });
        });
    },
    openDesc: function(e) {
        var t = "", o = "咖啡钱包说明", n = e.currentTarget.dataset.item;
        n && n.detailDesc ? (o = "使用规则", t = n.detailDesc.replace(/\n/g, "\r\n")) : t = this.data.coffeeStoreDesc.replace(/\n/g, "\r\n"), 
        wx.showModal({
            title: o,
            content: t,
            showCancel: !1,
            confirmColor: "#7CA7D2",
            confirmText: "我知道了",
            success: function(e) {}
        });
    },
    openModal: function() {
        wx.showModal({
            title: "",
            content: "请前往luckin coffee APP-咖啡钱包中操作",
            showCancel: !1,
            confirmColor: "#7CA7D2",
            confirmText: "我知道了",
            success: function(e) {}
        });
    },
    goBuyTicket: function() {
        wx.navigateTo({
            url: "/pages/coupon/walletbuy"
        });
    },
    onLoad: function(e) {
        this.setData({
            param: {
                coffeeStoreLevelId: e.coffeeStoreLevelId,
                typeDesc: e.typeDesc,
                price: e.price,
                isAll: e.isAll
            }
        }), this.getWalletList(), this.getCoffeeStoreDesc();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
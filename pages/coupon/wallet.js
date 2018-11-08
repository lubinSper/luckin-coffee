var e = require("../../utils/api.js"), t = getApp();

Page({
    data: {
        ticketList: [],
        coffeeStoreDesc: "",
        isIpx: t.globalData.isIpx
    },
    goBuyTicket: function() {
        wx.navigateTo({
            url: "/pages/coupon/walletbuy"
        });
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
            url: "/resource/m/promotion/myself/mainlist",
            options: {
                loading: !1
            }
        }).then(function(e) {
            wx.hideLoading(), e.content && t.setData({
                ticketList: e.content
            });
        });
    },
    selectItem: function(e) {
        var t = e.currentTarget.dataset.item;
        e.targetUrl = "./walletdetail?coffeeStoreLevelId=" + t.coffeeStoreLevelId + "&typeDesc=" + t.typeDesc + "&price=" + t.price + "&isAll=" + t.isAll, 
        wx.navigateTo({
            url: e.targetUrl
        });
    },
    openDesc: function() {
        var e = this.data.coffeeStoreDesc;
        e = e.replace(/\n/g, "\r\n"), wx.showModal({
            title: "咖啡钱包说明",
            content: e,
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
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        this.getWalletList(), this.getCoffeeStoreDesc();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
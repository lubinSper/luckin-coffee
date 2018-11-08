var t = require("../../utils/api.js"), a = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        noAddressDesc: !1,
        addressList: [],
        addressCountLimit: -1,
        isIpx: !1
    },
    tapHandler: function(a) {
        t.tapHandler({
            title: "收货地址",
            route: this.route,
            element: a
        });
    },
    clearGlobalData: function() {
        e.globalData.searchAddressInfo = null, e.globalData.nearbyAddressInfo = null, e.globalData.editAddressInfo = null;
    },
    addressEditClickHandler: function(t) {
        var a = t.target.dataset.address;
        a || (a = t.currentTarget.dataset.address), t.targetUrl = "/pages/member/addressedit?from=addresslist&addrid=" + a.addrId, 
        this.tapHandler(t), wx.navigateTo({
            url: t.targetUrl
        });
    },
    addAddressBtnClickHandler: function(t) {
        -1 !== this.data.addressCountLimit && (this.data.addressCountLimit <= this.data.addressList.length ? a.toast("您最多可添加" + this.data.addressCountLimit + "条地址") : (t.targetUrl = "/pages/member/addressedit?from=addressList", 
        this.tapHandler(t), wx.navigateTo({
            url: t.targetUrl
        })));
    },
    loadAddressList: function() {
        var a = this;
        t.ajax({
            url: "/resource/m/user/address/list"
        }).then(function(t) {
            if (t && t.content) {
                var e = t.content.addrList;
                a.setData({
                    noAddressDesc: !(e && e.length > 0),
                    addressCountLimit: t.content.countLimt,
                    addressList: e && e.length > 0 ? e : []
                });
            }
        });
    },
    onLoad: function(t) {
        this.setData({
            isIpx: e.globalData.isIpx
        });
    },
    onReady: function() {},
    onShow: function() {
        t.scanHandler({
            title: "收货地址",
            route: this.route
        }), this.clearGlobalData(), this.loadAddressList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return e.globalData.share;
    }
});
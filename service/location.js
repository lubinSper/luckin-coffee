var n = require("../utils/promise/es6-promise.min.js"), o = require("../utils/api.js"), e = getApp();

module.exports = {
    shopDistanceConvert: function(n) {
        if (!n) return null;
        if (n instanceof Array) for (var o in n) n[o].distance >= 1 ? n[o].distanceText = parseFloat(n[o].distance).toFixed(1) + "km" : n[o].distanceText = parseInt(1e3 * n[o].distance, 10) + "m"; else n.distance >= 1 ? n.distanceText = parseFloat(n.distance).toFixed(1) + "km" : n.distanceText = parseInt(1e3 * n.distance, 10) + "m";
        return n;
    },
    locationToCityInfo: function(a, t) {
        return new n(function(n, l) {
            o.ajax({
                url: "/resource/m/sys/base/location",
                data: {
                    lon: a,
                    lat: t,
                    channel: e.globalData.mapChannel
                }
            }).then(function(o) {
                o && o.content && n(o.content);
            });
        });
    },
    locationToShop: function(a, t, l) {
        var r = e.globalData.location;
        return new n(function(n, i) {
            null === a && n(null), o.ajax({
                url: "/resource/m/sys/base/homeshop",
                data: {
                    longitude: 1 * a.lon,
                    latitude: 1 * a.lat,
                    lonHere: r ? r.longitude : a.lon,
                    latHere: r ? r.latitude : a.lat,
                    channel: e.globalData.mapChannel,
                    isExpress: 1,
                    deptId: "confirmOrder" === l ? "" : t,
                    appVersion: e.globalData.appVersion,
                    isSelfShop: 0
                },
                options: {
                    needOriginResult: !0
                }
            }).then(function(o) {
                7 === o.code ? (wx.showModal({
                    content: o.msg,
                    showCancel: !1,
                    confirmText: "我知道了",
                    confirmColor: e.globalData.modal.confirmColor
                }), n(null)) : o.content && o.content.nearShopAbnormalInfo && 1 === o.content.nearShopAbnormalInfo.abnormalType ? (wx.showModal({
                    content: o.content.nearShopAbnormalInfo.abnormalDesc,
                    showCancel: !1,
                    confirmText: "我知道了",
                    confirmColor: e.globalData.modal.confirmColor
                }), resol) : o.content && o.content.nearShopAbnormalInfo && 2 === o.content.nearShopAbnormalInfo.abnormalType ? (wx.showModal({
                    content: o.content.nearShopAbnormalInfo.abnormalDesc,
                    showCancel: !1,
                    confirmText: "我知道了",
                    confirmColor: e.globalData.modal.confirmColor
                }), n(null)) : n(o);
            });
        });
    }
};
var t = getApp(), a = require("../../utils/api.js");

require("../../utils/util.js");

Page({
    data: {
        fromPage: "",
        selectedCityId: null,
        locationCityInfo: null,
        letterAry: [],
        quickLetter: "curr",
        cityAry: [],
        sourceCtiyAry: null
    },
    tapHandler: function(t) {
        a.tapHandler({
            title: "选择城市",
            route: this.route,
            element: t
        });
    },
    quickTapHandler: function(t) {
        this.tapHandler(t), this.setData({
            quickLetter: t.currentTarget.id
        });
    },
    locationCitySelectHandler: function(a) {
        this.tapHandler(a), t.globalData.selectedCityInfo = t.globalData.locationCityInfo, 
        wx.navigateBack();
    },
    citySelectHandler: function(a) {
        this.tapHandler(a);
        var e = a.target.dataset.city;
        e || (e = a.currentTarget.dataset.city), e && (t.globalData.selectedCityInfo = {
            cityId: e.cityId,
            cityName: e.showName
        }), "index" === this.data.fromPage ? wx.redirectTo({
            url: "/pages/address/select?from=citySelect&delivery=pick"
        }) : wx.navigateBack();
    },
    loadStoreInfo: function() {
        this.setData({
            selectedCityId: t.globalData.selectedCityInfo ? t.globalData.selectedCityInfo.cityId : t.globalData.locationCityInfo ? t.globalData.locationCityInfo.cityId : "",
            locationCityInfo: t.globalData.locationCityInfo ? t.globalData.locationCityInfo : null
        });
    },
    loadCityList: function() {
        var t = this;
        a.ajax({
            url: "/resource/m/sys/app/openingcitys"
        }).then(function(a) {
            if ("SUCCESS" === a.status) {
                var e = "", o = "", i = [], n = [];
                a.content.map(function(t) {
                    (e = t.citySpell.charAt(0).toUpperCase()) !== o && (o = e, i.push(o), n.push(o)), 
                    n.push(t);
                }), t.setData({
                    letterAry: i,
                    cityAry: n,
                    sourceCtiyAry: a.content
                });
            }
        });
    },
    onLoad: function(t) {
        t && t.from && this.setData({
            fromPage: t.from
        });
    },
    onReady: function() {},
    onShow: function() {
        a.scanHandler({
            title: "选择城市",
            route: this.route
        }), this.loadStoreInfo(), this.loadCityList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return t.globalData.share;
    }
});
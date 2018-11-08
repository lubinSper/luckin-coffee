var a = getApp(), t = require("../../utils/api.js"), e = require("../../utils/util.js"), o = require("../../service/location.js");

Page({
    data: {
        fromPage: "",
        delivery: null,
        selectedAddressId: null,
        cityInfo: null,
        showDistance: !0,
        shopList: [],
        shopSelectId: null,
        myAddressList: null,
        myAddressSelectId: 1,
        nearbyAddressList: [],
        addressListLoading: !1,
        noShopDesc: "",
        shopPageNo: 1,
        shopPageSize: 10,
        shopHasMore: !0,
        nearbyAddressPageNo: 1,
        nearbyAddressPageSize: 10,
        nearbyAddressLimit: 50
    },
    tapHandler: function(a) {
        t.tapHandler({
            title: "配送方式",
            route: this.route,
            element: a
        });
    },
    clearGlobalData: function() {
        a.globalData.nearbyAddressInfo = null, this.setData({
            shopPageNo: 1,
            shopList: [],
            shopHasMore: !0,
            nearbyAddressPageNo: 1,
            nearbyAddressList: [],
            addressListLoading: !1
        }), a.globalData.searchAddressInfo = null, a.globalData.nearbyAddressInfo = null, 
        a.globalData.editAddressInfo = null, a.globalData.loginStatistic["/resource/m/user/address/list"] = 0;
    },
    loadGlobalData: function() {
        this.setData({
            delivery: null === this.data.delivery ? a.globalData.delivery : this.data.delivery,
            shopSelectId: null !== a.globalData.shopInfo ? a.globalData.shopInfo.deptId : "",
            cityInfo: a.globalData.selectedCityInfo ? a.globalData.selectedCityInfo : a.globalData.locationCityInfo,
            selectedAddressId: a.globalData.addressInfo ? a.globalData.addressInfo.addrId : null,
            showDistance: null !== a.globalData.locationCityInfo && (null === a.globalData.selectedCityInfo || a.globalData.selectedCityInfo.cityId === a.globalData.locationCityInfo.cityId)
        });
    },
    tabClickHandler: function(a) {
        this.tapHandler(a);
        var t = a.target.dataset.delivery;
        this.setData({
            delivery: t
        });
    },
    shopSelectHandler: function(t) {
        var e = t.currentTarget.dataset.shop;
        if (0 === e.isClick) return !1;
        this.tapHandler(t), "confirmOrder" === this.data.fromPage && e.deptId !== this.data.shopSelectId ? wx.showModal({
            content: "服务门店变更，请重新确认商品",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: a.globalData.modal.cancelColor,
            confirmText: "去确认",
            confirmColor: a.globalData.modal.confirmColor,
            success: function(t) {
                t.confirm && (a.globalData.delivery = "pick", a.globalData.shopInfo = e, a.globalData.addressInfo = null, 
                wx.navigateBack({
                    delta: 2
                }));
            }
        }) : (a.globalData.delivery = "pick", a.globalData.shopInfo = e, a.globalData.addressInfo = null, 
        wx.navigateBack());
    },
    shopListScrollBottomHandler: function(a) {
        this.data.shopHasMore && (this.setData({
            shopPageNo: this.data.shopPageNo + 1
        }), this.loadCityShop());
    },
    myAddressScrollBottomHandler: function() {
        this.data.nearbyAddressPageNo * this.data.nearbyAddressPageSize >= this.data.nearbyAddressLimit || (this.setData({
            nearbyAddressPageNo: this.data.nearbyAddressPageNo + 1
        }), this.loadNearbyAddress());
    },
    myAddressSelectHandler: function(t) {
        var e = this;
        this.tapHandler(t);
        var s = t.currentTarget.dataset.address, n = "confirmOrder" === this.data.fromPage ? a.globalData.shopInfo.deptId : "";
        o.locationToShop(s, n, this.data.fromPage).then(function(t) {
            t && ("confirmOrder" !== e.data.fromPage || null === n || t.content.nearShop.deptId === n ? (a.globalData.delivery = "sent", 
            a.globalData.dispatchMsg = t.content.dispatchMsg, a.globalData.shopInfo = o.shopDistanceConvert(t.content.nearShop), 
            a.globalData.addressInfo = s, wx.navigateBack()) : wx.showModal({
                content: "服务门店变更，请重新确认商品",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: a.globalData.modal.cancelColor,
                confirmText: "去确认",
                confirmColor: a.globalData.modal.confirmColor,
                success: function(e) {
                    e.confirm && (a.globalData.delivery = "sent", a.globalData.dispatchMsg = t.content.dispatchMsg, 
                    a.globalData.shopInfo = o.shopDistanceConvert(t.content.nearShop), a.globalData.addressInfo = s, 
                    wx.navigateBack({
                        delta: 2
                    }));
                }
            }));
        });
    },
    nearbyAddressSelectHandler: function(s) {
        var n = this;
        this.tapHandler(s);
        var d = s.currentTarget.dataset.address;
        this.addressListLoading || (this.addressListLoading = !0, t.ajax({
            url: "/resource/m/user/address/list",
            options: {
                loading: !1,
                needLogin: !0
            }
        }).then(function(t) {
            t && t.content && (t.content.addrList && t.content.countLimt <= t.content.addrList.length ? (e.toast("您最多可添加" + t.content.countLimt + "条地址"), 
            n.addressListLoading = !1) : o.locationToShop(d, null, n.data.fromPage).then(function(t) {
                n.addressListLoading = !1, null !== t && (a.globalData.nearbyAddressInfo = d, e.navigate({
                    url: "/pages/member/addressedit?from=addressSelect"
                }, {
                    needLogin: !0
                }));
            }));
        }));
    },
    citySelectClickHandler: function(a) {
        a.targetUrl = "/pages/address/city?from=addressSelect", this.tapHandler(a), wx.navigateTo({
            url: a.targetUrl
        });
    },
    addAddressBtnHandler: function(a) {
        var o = this;
        this.addressListLoading || (this.tapHandler(a), this.addressListLoading = !0, t.ajax({
            url: "/resource/m/user/address/list",
            options: {
                loading: !1,
                needLogin: !0
            }
        }).then(function(a) {
            a && a.content && (a.content.addrList && a.content.countLimt <= a.content.addrList.length ? (e.toast("您最多可添加" + a.content.countLimt + "条地址"), 
            o.addressListLoading = !1) : (o.addressListLoading = !1, e.navigate({
                url: "/pages/member/addressedit?from=addressSelect"
            }, {
                needLogin: !0
            })));
        }));
    },
    relocationClickHandler: function(t) {
        var e = this;
        this.tapHandler(t), wx.showLoading({
            title: "正在重新定位..."
        }), wx.getLocation({
            success: function(t) {
                wx.showToast({
                    title: "定位成功"
                }), Object.assign(a.globalData.location, t), a.globalData.location.success = !0, 
                e.setData({
                    nearbyAddressPageNo: 1
                }), e.loadNearbyAddress();
            },
            fail: function(t) {
                a.globalData.location.success = !1, wx.showToast({
                    title: "定位失败"
                });
            },
            complete: function() {
                return wx.hideLoading();
            }
        });
    },
    loadCityShop: function() {
        var e = this, s = a.globalData.location || {};
        t.ajax({
            url: "/resource/m/shop/shopList",
            data: {
                longitude: s.longitude,
                latitude: s.latitude,
                channel: "GCJ-02",
                cityName: this.data.cityInfo ? this.data.cityInfo.cityName : "",
                offSet: (this.data.shopPageNo - 1) * this.data.shopPageSize,
                pageSize: this.data.shopPageSize,
                searchValue: ""
            }
        }).then(function(a) {
            if (a && a.content) {
                if (!(null !== a.content.commonShopList && 0 !== a.content.commonShopList.length || null !== a.content.otherShopList && 0 !== a.content.otherShopList.length || null !== e.data.shopList && 0 !== e.data.shopList)) return void e.setData({
                    shopHasMore: !1,
                    noShopDesc: "抱歉，暂无自提门店，敬请期待！"
                });
                var t = a.content.commonShopList || [], s = a.content.otherShopList || [], n = e.data.shopList || [];
                1 === e.data.shopPageNo && (n = n.concat(t)), n = n.concat(s), n = o.shopDistanceConvert(n), 
                e.setData({
                    shopList: n
                });
            }
        });
    },
    loadMyAddress: function() {
        var a = this;
        t.ajax({
            url: "/resource/m/user/address/list",
            options: {
                needLogin: !1
            }
        }).then(function(t) {
            if (t && t.content) {
                var e = t.content.addrList;
                a.setData({
                    myAddressList: e && e.length > 0 ? e : null
                });
            }
        });
    },
    loadNearbyAddress: function() {
        var e = this;
        "confirmOrder" !== this.data.fromPage && a.globalData.location.success && t.ajax({
            url: "/resource/m/user/address/search2",
            data: {
                lon: a.globalData.location.longitude,
                lat: a.globalData.location.latitude,
                offSet: (this.data.nearbyAddressPageNo - 1) * this.data.nearbyAddressPageSize,
                pageSize: this.data.nearbyAddressPageSize
            }
        }).then(function(a) {
            if (a && a.content) {
                var t = a.content.addrList;
                e.setData({
                    nearbyAddressList: e.data.nearbyAddressList.concat(t)
                });
            }
        });
    },
    onLoad: function(a) {
        a && a.delivery && this.setData({
            delivery: a.delivery
        }), a && a.from && this.setData({
            fromPage: a.from
        });
    },
    onReady: function() {},
    onShow: function() {
        t.scanHandler({
            title: "配送方式",
            route: this.route
        }), this.clearGlobalData(), this.loadGlobalData(), this.loadCityShop(), this.loadMyAddress(), 
        this.loadNearbyAddress(), this.addressListLoading = !1;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return a.globalData.share;
    }
});
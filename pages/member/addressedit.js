var a = require("../../utils/api.js"), t = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        fromPage: null,
        addressTagList: null,
        dulplication: !1,
        addressCountLimit: -1,
        allowAddAddress: !0,
        showUserNameClear: !1,
        showTelClear: !1,
        showAddrDetailCleaer: !1,
        saveBtnEnable: !1,
        addrId: null,
        userName: "",
        sex: "",
        tel: "",
        address: "",
        addrDetail: "",
        lon: "",
        lat: "",
        tag: "",
        isDefault: ""
    },
    tapHandler: function(t) {
        a.tapHandler({
            title: this.barTitle || "添加地址",
            route: this.route,
            element: t
        });
    },
    loadGlobalData: function() {
        this.data.tel || this.setData({
            tel: !this.data.addrId && e.globalData.mobile ? e.globalData.mobile : ""
        });
    },
    clearInputData: function() {
        this.setData({
            addrId: null,
            userName: "",
            sex: 2,
            tel: "",
            address: "",
            addrDetail: "",
            lon: "",
            lat: "",
            tag: "",
            isDefault: "",
            isIpx: !1
        }), e.globalData.nearbyAddressInfo = null, e.globalData.searchAddressInfo = null;
    },
    userNameInputHandler: function(a) {
        var e = t.trim(a.detail.value);
        this.setData({
            userName: e,
            showUserNameClear: null !== e
        }), this.toggleSubmitBtnStatus();
    },
    userNameFocusHandler: function() {
        null !== this.data.userName && this.data.userName.length > 0 ? this.setData({
            showUserNameClear: !0
        }) : this.setData({
            showUserNameClear: !1
        });
    },
    userNameBlurHandler: function() {
        this.setData({
            showUserNameClear: !1
        });
    },
    userNameClearHandler: function(a) {
        this.tapHandler(a), this.setData({
            userName: "",
            showUserNameClear: !1
        }), this.toggleSubmitBtnStatus();
    },
    telInputHandler: function(a) {
        var e = t.trim(a.detail.value);
        this.setData({
            tel: e,
            showTelClear: null !== e
        }), this.toggleSubmitBtnStatus();
    },
    telFocusHandler: function() {
        null !== this.data.tel && this.data.tel.length > 0 ? this.setData({
            showTelClear: !0
        }) : this.setData({
            showTelClear: !1
        });
    },
    telBlurHandler: function() {
        this.setData({
            showTelClear: !1
        });
    },
    telClearHandler: function(a) {
        this.tapHandler(a), this.setData({
            tel: "",
            showTelClear: !1
        }), this.toggleSubmitBtnStatus();
    },
    addrDetailInputHandler: function(a) {
        var e = t.trim(a.detail.value);
        this.setData({
            addrDetail: e,
            showAddrDetailClear: null !== e
        }), this.toggleSubmitBtnStatus();
    },
    addrDetailFocusHandler: function() {
        null !== this.data.addrDetail && this.data.addrDetail.length > 0 ? this.setData({
            showAddrDetailClear: !0
        }) : this.setData({
            showAddrDetailClear: !1
        });
    },
    addrDetailBlurHandler: function() {
        this.setData({
            showAddrDetailClear: !1
        });
    },
    addrDetailClearHandler: function(a) {
        this.tapHandler(a), this.setData({
            addrDetail: "",
            showaddrDetailClear: !1
        }), this.toggleSubmitBtnStatus();
    },
    addressTagClickHandler: function(a) {
        this.tapHandler(a);
        var t = a.target.dataset.tagid;
        this.setData({
            tag: t
        }), this.toggleSubmitBtnStatus();
    },
    sexClickHandler: function(a) {
        this.tapHandler(a);
        var t = a.currentTarget.dataset.sex;
        this.setData({
            sex: 1 * t
        }), this.toggleSubmitBtnStatus();
    },
    defaultClickHandler: function(a) {
        this.tapHandler(a), this.setData({
            isDefault: this.data.isDefault ? 0 : 1
        }), this.toggleSubmitBtnStatus();
    },
    gotoSelectAddress: function(a) {
        a.targetUrl = "/pages/member/addresssearch?from=addressedit", this.tapHandler(a), 
        wx.navigateTo({
            url: a.targetUrl
        });
    },
    addressDeleteClickHandler: function(s) {
        var d = this;
        wx.showModal({
            title: "",
            content: "删除后信息将无法恢复，是否确定删除？",
            showCancel: !0,
            confirmColor: e.globalData.modal.confirmColor,
            cancelColor: e.globalData.modal.cancelColor,
            success: function(e) {
                e.cancel || (d.tapHandler(s), a.ajax({
                    url: "/resource/m/user/address/del",
                    data: {
                        addrId: d.data.addrId
                    }
                }).then(function(a) {
                    a && "SUCCESS" === a.status && t.toast("删除成功", "success", function() {
                        wx.navigateBack();
                    });
                }));
            }
        });
    },
    addressSaveClickHandler: function(e) {
        var s = this;
        if (this.data.saveBtnEnable) if (this.tapHandler(e), this.data.allowAddAddress) {
            var d = null !== this.data.addrId ? "/resource/m/user/address/update" : "/resource/m/user/address/add";
            a.ajax({
                url: d,
                data: {
                    addrId: this.data.addrId,
                    userName: this.data.userName,
                    sex: this.data.sex,
                    tel: this.data.tel,
                    address: this.data.address,
                    addrDetail: this.data.addrDetail,
                    lon: this.data.lon,
                    lat: this.data.lat,
                    tag: this.data.tag,
                    isDefault: this.data.isDefault ? 1 : 0
                }
            }).then(function(a) {
                a && "SUCCESS" === a.status && t.toast("保存成功", "success", function() {
                    s.clearInputData(), wx.navigateBack();
                });
            });
        } else t.toast("您最多可添加" + this.data.addressCountLimit + "条地址");
    },
    loadAddressList: function() {
        var t = this;
        a.ajax({
            url: "/resource/m/user/address/list"
        }).then(function(a) {
            if (a && a.content) {
                t.setData({
                    addressCountLimit: a.content.countLimt
                });
                var e = a.content.addrList, s = null;
                if (e && e.length > 0 && null !== t.data.addrId) for (var d in e) if (e[d].addrId === t.data.addrId) {
                    s = e[d];
                    break;
                }
                s && t.setData({
                    dulplication: !0,
                    addrId: s.addrId,
                    userName: t.data.userName ? t.data.userName : s.userName,
                    sex: t.data.sex ? t.data.sex : s.sexInt,
                    tel: t.data.tel ? t.data.tel : s.tel,
                    address: t.data.address ? t.data.address : s.address,
                    addrDetail: t.data.addrDetail ? t.data.addrDetail : s.addrDetail,
                    lon: t.data.lon ? t.data.lon : s.lon,
                    lat: t.data.lat ? t.data.lat : s.lat,
                    tag: t.data.tag ? t.data.tag : 1 * s.tagId,
                    isDefault: "" === t.data.isDefault ? s.isDefault : t.data.isDefault
                }), null !== e && 0 !== e.length || null !== t.data.isDefault || t.setData({
                    isDefault: 1
                }), t.toggleSubmitBtnStatus();
            }
        });
    },
    loadNearbyAddressDetail: function() {
        var a = e.globalData.nearbyAddressInfo;
        a && this.setData({
            address: a.name,
            lon: a.lon,
            lat: a.lat
        });
    },
    loadSearchAddressDetail: function() {
        var a = e.globalData.searchAddressInfo;
        a && this.setData({
            address: a.name + " " + a.address,
            lon: a.lon,
            lat: a.lat
        });
    },
    loadAddressTag: function() {
        var t = this;
        a.ajax({
            url: "/resource/m/sys/base/dicts"
        }).then(function(a) {
            a && a.content && t.setData({
                addressTagList: a.content
            });
        });
    },
    toggleSubmitBtnStatus: function() {
        "" !== this.data.userName && "" !== this.data.sex && "" !== this.data.tel && t.isMobile(this.data.tel) && "" !== this.data.address ? this.setData({
            saveBtnEnable: !0
        }) : this.setData({
            saveBtnEnable: !1
        });
    },
    onLoad: function(a) {
        this.setData({
            isIpx: e.globalData.isIpx
        }), this.barTitle = "修改地址", a && a.from && this.setData({
            fromPage: a.from
        }), a && a.addrid ? this.setData({
            addrId: 1 * a.addrid
        }) : (this.barTitle = "添加地址", this.setData({
            sex: 2
        })), wx.setNavigationBarTitle({
            title: this.barTitle
        });
    },
    onReady: function() {},
    onShow: function() {
        a.scanHandler({
            title: this.barTitle || "添加地址",
            route: this.route
        }), this.loadGlobalData(), this.loadAddressList(), this.loadNearbyAddressDetail(), 
        this.loadSearchAddressDetail(), this.loadAddressTag(), this.toggleSubmitBtnStatus();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return e.globalData.share;
    }
});
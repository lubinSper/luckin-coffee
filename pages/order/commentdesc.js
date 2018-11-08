var t = require("../../utils/api.js"), n = require("../../utils/util.js");

Page({
    data: {
        commentMsg: "",
        commentMsgCount: 0,
        uploadBtn: {
            imgSrc: ""
        },
        uploadImgsCount: 0,
        disabledSaveBtn: !0
    },
    tapHandler: function(n) {
        t.tapHandler({
            title: "添加问题描述",
            route: this.route,
            element: n
        });
    },
    inputCommentMsg: function(t) {
        var n = this, a = t.detail.value, e = a.length;
        this.setData({
            commentMsg: a,
            commentMsgCount: e
        }, function() {
            return n.checkSaveBtn();
        });
    },
    uploadImg: function(t) {
        this.tapHandler(t);
        var n = this, a = this.data.uploadBtn;
        wx.chooseImage({
            count: 1,
            success: function(t) {
                var e = t.tempFilePaths[0];
                a.imgSrc = e, a.isActive = !1, n.setData({
                    uploadBtn: a,
                    uploadImgsCount: 1
                }, function() {
                    return n.checkSaveBtn();
                });
            }
        });
    },
    checkSaveBtn: function() {
        var t = this.data.uploadImgsCount > 0 || this.data.commentMsgCount > 0;
        this.setData({
            disabledSaveBtn: !t
        });
    },
    saveComment: function(t) {
        this.tapHandler(t);
        var n = this;
        if (this.data.disabledSaveBtn) return !1;
        var a = {};
        a.feel = 0, a.comment = this.data.commentMsg, a.isComplain = 0;
        var e = this.data.tag;
        a.isComplain = 0, e && (a.orderId = e.orderId, a.labelContent = e.labelContent, 
        a.tags = e.labelContent, a.isComplain = e.isComplain, a.complainType = e.complainType), 
        a.problemDesc = this.data.commentMsg || e.labelContent, a.isComplain ? wx.showModal({
            content: e.message || "我们会及时受理您的申诉，请耐心等待",
            confirmColor: "#7CA7D2",
            cancelColor: "#999",
            success: function(t) {
                t.confirm && n.submitComment(a);
            }
        }) : n.submitComment(a);
    },
    submitComment: function(n) {
        var a = this;
        a.data.uploadBtn.imgSrc ? t.upload({
            url: "/resource/m/order/comment/add",
            filePath: a.data.uploadBtn.imgSrc,
            name: "img1",
            data: n
        }).then(function(t) {
            if (t && t.content) {
                var n = t.content;
                a.saveCallback(n);
            }
        }) : t.ajax({
            url: "/resource/m/order/comment/add",
            data: n
        }).then(function(t) {
            if (t && t.content) {
                var n = t.content;
                a.saveCallback(n);
            }
        });
    },
    saveCallback: function(t) {
        n.toast(t.messages), setTimeout(function() {
            1 === t.status && wx.navigateBack({
                delta: 2
            });
        }, 2e3);
    },
    onLoad: function(t) {
        var n = t.tag, a = new RegExp("'", "g"), e = n.replace(a, '"'), o = JSON.parse(e);
        this.setData({
            tag: o
        });
    },
    onReady: function() {},
    onShow: function() {
        t.scanHandler({
            title: "添加问题描述",
            route: this.route
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
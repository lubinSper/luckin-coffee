var t = require("../../utils/api.js"), e = require("../../utils/util.js");

Page({
    data: {
        satisfiedMsg: "",
        satisfiedMsgCount: 0,
        satisfied: !0,
        dissatisfiedReason: ""
    },
    tapHandler: function(e) {
        t.tapHandler({
            title: "评价",
            route: this.route,
            element: e
        });
    },
    chooseEmoticon: function(t) {
        this.tapHandler(t);
        var e = t.currentTarget.dataset.emoticon;
        this.setData({
            satisfied: "satisfied" === e
        });
    },
    chooseReason: function(t) {
        this.tapHandler(t);
        var e = t.currentTarget.dataset.reason;
        this.setData({
            dissatisfiedReason: this.data.dissatisfiedReason && this.data.dissatisfiedReason.dictsId === e.dictsId ? "" : e
        });
    },
    showSlowTip: function(t) {
        this.tapHandler(t), wx.showModal({
            title: "慢必赔规则说明",
            content: "luckin coffee 向您承诺，制作完成后30分钟内，外送必达。如超时送达，您可申请索赔本单全部饮品消费。",
            showCancel: !1,
            confirmColor: "#7CA7D2",
            confirmText: "我知道了"
        });
    },
    inputCommentMsg: function(t) {
        var e = t.detail.value, a = e.length;
        this.setData({
            satisfiedMsg: e,
            satisfiedMsgCount: a
        });
    },
    getComment: function() {
        var e = this;
        t.ajax({
            url: "/resource/m/order/evaluate",
            data: this.data.params
        }).then(function(t) {
            if (t && t.content) {
                var a = t.content.evaluateList.filter(function(t) {
                    return !t.evaluationType;
                });
                e.setData({
                    evaluateList: a
                });
            }
        });
    },
    saveComment: function(t) {
        this.tapHandler(t);
        var e = this.data.params, a = this;
        if (this.data.satisfied) this.submitComment({
            orderId: e.orderId,
            feel: 1,
            comment: this.data.satisfiedMsg
        }); else {
            var i = this.data.dissatisfiedReason || {};
            if (i.orderId = e.orderId, i.isSub) {
                var s = JSON.stringify(i), n = new RegExp('"', "g"), o = s.replace(n, "'");
                return void wx.navigateTo({
                    url: "/pages/order/commentdesc?tag=" + o
                });
            }
            e.feel = 0, e.isComplain = 0, i && this.data.dissatisfiedReason && (e.labelContent = i.labelContent, 
            e.tags = i.labelContent, e.isComplain = i.isComplain, e.complainType = i.complainType), 
            e.problemDesc = this.data.satisfiedMsg || i.labelContent || "", e.isComplain ? wx.showModal({
                content: i.message || "我们会及时受理您的申诉，请耐心等待",
                confirmColor: "#7CA7D2",
                cancelColor: "#999",
                success: function(t) {
                    t.confirm && a.submitComment(e);
                }
            }) : this.submitComment(e);
        }
    },
    submitComment: function(a) {
        t.ajax({
            url: "/resource/m/order/comment/add",
            data: a
        }).then(function(t) {
            if (t && t.content) {
                var a = t.content;
                e.toast(a.messages), setTimeout(function() {
                    1 === a.status && wx.navigateBack({
                        delta: 1
                    });
                }, 2e3);
            }
        });
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            params: t
        }, function() {
            e.getComment();
        });
    },
    onReady: function() {},
    onShow: function() {
        t.scanHandler({
            title: "评价",
            route: this.route
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
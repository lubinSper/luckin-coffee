var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../service/coupon.js"));

Page({
    data: {},
    getMessage: function(n) {
        n.detail.data[0].alreadyReceived && (e.default.setCouponReceived(!0), e.default.setShowEnvelope(!1));
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "送你免费大师咖啡，还有鲜榨果汁和轻食~",
            imageUrl: "https://static.luckincoffeecdn.com/mini/images/index/shareImg.jpg",
            path: "/pages/index/coupon"
        };
    }
});
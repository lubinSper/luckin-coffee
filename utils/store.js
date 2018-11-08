module.exports = {
    getStore: function(e) {
        return e ? wx.getStorageSync(e) : null;
    },
    setStore: function(e, t) {
        e && wx.setStorageSync(e, t);
    },
    removeStore: function(e) {
        e && wx.removeStorageSync(e);
    }
};
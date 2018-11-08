var e = require("./cryptojs/cryptojs.js").Crypto, r = {
    keySize: 128,
    encoding: "utf8",
    algorithm: "aes-128-ecb",
    iv: "",
    cipherEncoding: "base64"
}, t = function(e) {
    for (var r, t, n = [], a = 0; a < e.length; a++) {
        r = e.charCodeAt(a), t = [];
        do {
            t.push(255 & r), r >>= 8;
        } while (r);
        n = n.concat(t.reverse());
    }
    return n;
}, n = function(e) {
    for (var n = t(e), a = new Array(), o = r.keySize / 8, s = 0; s < o; s++) n.length > s ? a.push(n[s]) : a.push(0);
    return a;
}, a = function(e, r) {
    return (255 & e[r]) << 24 | (255 & e[r + 1]) << 16 | (255 & e[r + 2]) << 8 | 255 & e[r + 3];
}, o = {
    en: function(r, t, a) {
        var o = new e.mode.ECB(e.pad.pkcs7), s = e.charenc.UTF8.stringToBytes(r), c = (e.charenc.UTF8.stringToBytes(t), 
        e.AES.encrypt(s, n(t), {
            iv: "",
            mode: o,
            asBpytes: !0
        }));
        return a && (c = c.replace(/\+/g, "-").replace(/\//g, "_")), c;
    },
    de: function(r, t, a) {
        a && (r = r.replace(/-/g, "+").replace(/_/g, "/"));
        var o = new e.mode.ECB(e.pad.pkcs7), s = e.util.base64ToBytes(r);
        e.charenc.UTF8.stringToBytes(t);
        return e.AES.decrypt(s, n(t), {
            asBpytes: !0,
            mode: o,
            iv: ""
        });
    }
};

module.exports = {
    aes: o,
    md5: function(r) {
        var t = e.MD5(r, {
            asBytes: !0
        });
        if (16 !== t.length) throw new Error("MD5加密结果字节数组错误");
        var n = Math.abs(a(t, 0)), o = Math.abs(a(t, 4)), s = Math.abs(a(t, 8)), c = Math.abs(a(t, 12));
        return n.toString() + o.toString() + s.toString() + c.toString();
    }
};
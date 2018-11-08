function r(t, e) {
    if (void 0 === t.length) throw new Error(t.length + "/" + e);
    var n = function() {
        for (var r = 0; r < t.length && 0 == t[r]; ) r += 1;
        for (var n = new Array(t.length - r + e), o = 0; o < t.length - r; o += 1) n[o] = t[o + r];
        return n;
    }(), o = {};
    return o.getAt = function(r) {
        return n[r];
    }, o.getLength = function() {
        return n.length;
    }, o.multiply = function(t) {
        for (var e = new Array(o.getLength() + t.getLength() - 1), n = 0; n < o.getLength(); n += 1) for (var a = 0; a < t.getLength(); a += 1) e[n + a] ^= i.gexp(i.glog(o.getAt(n)) + i.glog(t.getAt(a)));
        return r(e, 0);
    }, o.mod = function(t) {
        if (o.getLength() - t.getLength() < 0) return o;
        for (var e = i.glog(o.getAt(0)) - i.glog(t.getAt(0)), n = new Array(o.getLength()), a = 0; a < o.getLength(); a += 1) n[a] = o.getAt(a);
        for (a = 0; a < t.getLength(); a += 1) n[a] ^= i.gexp(i.glog(t.getAt(a)) + e);
        return r(n, 0).mod(t);
    }, o;
}

var t = function(t, e) {
    var o = t, i = n[e], c = null, h = 0, l = null, s = new Array(), w = {}, d = function(r, t) {
        c = function(r) {
            for (var t = new Array(r), e = 0; e < r; e += 1) {
                t[e] = new Array(r);
                for (var n = 0; n < r; n += 1) t[e][n] = null;
            }
            return t;
        }(h = 4 * o + 17), y(0, 0), y(h - 7, 0), y(0, h - 7), E(), B(), T(r, t), o >= 7 && p(r), 
        null == l && (l = D(o, i, s)), M(l, t);
    }, y = function(r, t) {
        for (var e = -1; e <= 7; e += 1) if (!(r + e <= -1 || h <= r + e)) for (var n = -1; n <= 7; n += 1) t + n <= -1 || h <= t + n || (c[r + e][t + n] = 0 <= e && e <= 6 && (0 == n || 6 == n) || 0 <= n && n <= 6 && (0 == e || 6 == e) || 2 <= e && e <= 4 && 2 <= n && n <= 4);
    }, A = function() {
        for (var r = 0, t = 0, e = 0; e < 8; e += 1) {
            d(!0, e);
            var n = a.getLostPoint(w);
            (0 == e || r > n) && (r = n, t = e);
        }
        return t;
    }, B = function() {
        for (var r = 8; r < h - 8; r += 1) null == c[r][6] && (c[r][6] = r % 2 == 0);
        for (var t = 8; t < h - 8; t += 1) null == c[6][t] && (c[6][t] = t % 2 == 0);
    }, E = function() {
        for (var r = a.getPatternPosition(o), t = 0; t < r.length; t += 1) for (var e = 0; e < r.length; e += 1) {
            var n = r[t], i = r[e];
            if (null == c[n][i]) for (var u = -2; u <= 2; u += 1) for (var f = -2; f <= 2; f += 1) c[n + u][i + f] = -2 == u || 2 == u || -2 == f || 2 == f || 0 == u && 0 == f;
        }
    }, p = function(r) {
        for (var t = a.getBCHTypeNumber(o), e = 0; e < 18; e += 1) {
            n = !r && 1 == (t >> e & 1);
            c[Math.floor(e / 3)][e % 3 + h - 8 - 3] = n;
        }
        for (e = 0; e < 18; e += 1) {
            var n = !r && 1 == (t >> e & 1);
            c[e % 3 + h - 8 - 3][Math.floor(e / 3)] = n;
        }
    }, T = function(r, t) {
        for (var e = i << 3 | t, n = a.getBCHTypeInfo(e), o = 0; o < 15; o += 1) {
            u = !r && 1 == (n >> o & 1);
            o < 6 ? c[o][8] = u : o < 8 ? c[o + 1][8] = u : c[h - 15 + o][8] = u;
        }
        for (o = 0; o < 15; o += 1) {
            var u = !r && 1 == (n >> o & 1);
            o < 8 ? c[8][h - o - 1] = u : o < 9 ? c[8][15 - o - 1 + 1] = u : c[8][15 - o - 1] = u;
        }
        c[h - 8][8] = !r;
    }, M = function(r, t) {
        for (var e = -1, n = h - 1, o = 7, i = 0, u = a.getMaskFunction(t), f = h - 1; f > 0; f -= 2) for (6 == f && (f -= 1); ;) {
            for (var g = 0; g < 2; g += 1) if (null == c[n][f - g]) {
                var l = !1;
                i < r.length && (l = 1 == (r[i] >>> o & 1)), u(n, f - g) && (l = !l), c[n][f - g] = l, 
                -1 == (o -= 1) && (i += 1, o = 7);
            }
            if ((n += e) < 0 || h <= n) {
                n -= e, e = -e;
                break;
            }
        }
    }, C = function(t, e) {
        for (var n = 0, o = 0, i = 0, u = new Array(e.length), f = new Array(e.length), g = 0; g < e.length; g += 1) {
            var c = e[g].dataCount, h = e[g].totalCount - c;
            o = Math.max(o, c), i = Math.max(i, h), u[g] = new Array(c);
            for (d = 0; d < u[g].length; d += 1) u[g][d] = 255 & t.getBuffer()[d + n];
            n += c;
            var l = a.getErrorCorrectPolynomial(h), s = r(u[g], l.getLength() - 1).mod(l);
            f[g] = new Array(l.getLength() - 1);
            for (d = 0; d < f[g].length; d += 1) {
                var v = d + s.getLength() - f[g].length;
                f[g][d] = v >= 0 ? s.getAt(v) : 0;
            }
        }
        for (var w = 0, d = 0; d < e.length; d += 1) w += e[d].totalCount;
        for (var y = new Array(w), A = 0, d = 0; d < o; d += 1) for (g = 0; g < e.length; g += 1) d < u[g].length && (y[A] = u[g][d], 
        A += 1);
        for (d = 0; d < i; d += 1) for (g = 0; g < e.length; g += 1) d < f[g].length && (y[A] = f[g][d], 
        A += 1);
        return y;
    }, D = function(r, t, e) {
        for (var n = u.getRSBlocks(r, t), o = f(), i = 0; i < e.length; i += 1) {
            var g = e[i];
            o.put(g.getMode(), 4), o.put(g.getLength(), a.getLengthInBits(g.getMode(), r)), 
            g.write(o);
        }
        for (var c = 0, i = 0; i < n.length; i += 1) c += n[i].dataCount;
        if (o.getLengthInBits() > 8 * c) throw new Error("code length overflow. (" + o.getLengthInBits() + ">" + 8 * c + ")");
        for (o.getLengthInBits() + 4 <= 8 * c && o.put(0, 4); o.getLengthInBits() % 8 != 0; ) o.putBit(!1);
        for (;;) {
            if (o.getLengthInBits() >= 8 * c) break;
            if (o.put(236, 8), o.getLengthInBits() >= 8 * c) break;
            o.put(17, 8);
        }
        return C(o, n);
    };
    return w.addData = function(r) {
        var t = g(r);
        s.push(t), l = null;
    }, w.isDark = function(r, t) {
        if (r < 0 || h <= r || t < 0 || h <= t) throw new Error(r + "," + t);
        return c[r][t];
    }, w.getModuleCount = function() {
        return h;
    }, w.make = function() {
        d(!1, A());
    }, w.createTableTag = function(r, t) {
        r = r || 2;
        var e = "";
        e += '<table style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", 
        e += " padding: 0px; margin: " + (t = void 0 === t ? 4 * r : t) + "px;", e += '">', 
        e += "<tbody>";
        for (var n = 0; n < w.getModuleCount(); n += 1) {
            e += "<tr>";
            for (var o = 0; o < w.getModuleCount(); o += 1) e += '<td style="', e += " border-width: 0px; border-style: none;", 
            e += " border-collapse: collapse;", e += " padding: 0px; margin: 0px;", e += " width: " + r + "px;", 
            e += " height: " + r + "px;", e += " background-color: ", e += w.isDark(n, o) ? "#000000" : "#ffffff", 
            e += ";", e += '"/>';
            e += "</tr>";
        }
        return e += "</tbody>", e += "</table>";
    }, w.createImgTag = function(r, t, e) {
        r = r || 2;
        var n = t = void 0 === t ? 4 * r : t, o = w.getModuleCount() * r + t;
        return v(e, e, function(t, e) {
            if (n <= t && t < o && n <= e && e < o) {
                var a = Math.floor((t - n) / r), i = Math.floor((e - n) / r);
                return w.isDark(i, a) ? 0 : 1;
            }
            return 1;
        });
    }, w;
};

t.stringToBytes = function(r) {
    for (var t = new Array(), e = 0; e < r.length; e += 1) {
        var n = r.charCodeAt(e);
        t.push(255 & n);
    }
    return t;
}, t.createStringToBytes = function(r, t) {
    var e = function() {
        for (var e = l(r), n = function() {
            var r = e.read();
            if (-1 == r) throw new Error();
            return r;
        }, o = 0, a = {}; ;) {
            var i = e.read();
            if (-1 == i) break;
            var u = n(), f = n() << 8 | n();
            a[String.fromCharCode(i << 8 | u)] = f, o += 1;
        }
        if (o != t) throw new Error(o + " != " + t);
        return a;
    }(), n = "?".charCodeAt(0);
    return function(r) {
        for (var t = new Array(), o = 0; o < r.length; o += 1) {
            var a = r.charCodeAt(o);
            if (a < 128) t.push(a); else {
                var i = e[r.charAt(o)];
                "number" == typeof i ? (255 & i) == i ? t.push(i) : (t.push(i >>> 8), t.push(255 & i)) : t.push(n);
            }
        }
        return t;
    };
};

var e = {
    MODE_NUMBER: 1,
    MODE_ALPHA_NUM: 2,
    MODE_8BIT_BYTE: 4,
    MODE_KANJI: 8
}, n = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
}, o = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
}, a = function() {
    var t = [ [], [ 6, 18 ], [ 6, 22 ], [ 6, 26 ], [ 6, 30 ], [ 6, 34 ], [ 6, 22, 38 ], [ 6, 24, 42 ], [ 6, 26, 46 ], [ 6, 28, 50 ], [ 6, 30, 54 ], [ 6, 32, 58 ], [ 6, 34, 62 ], [ 6, 26, 46, 66 ], [ 6, 26, 48, 70 ], [ 6, 26, 50, 74 ], [ 6, 30, 54, 78 ], [ 6, 30, 56, 82 ], [ 6, 30, 58, 86 ], [ 6, 34, 62, 90 ], [ 6, 28, 50, 72, 94 ], [ 6, 26, 50, 74, 98 ], [ 6, 30, 54, 78, 102 ], [ 6, 28, 54, 80, 106 ], [ 6, 32, 58, 84, 110 ], [ 6, 30, 58, 86, 114 ], [ 6, 34, 62, 90, 118 ], [ 6, 26, 50, 74, 98, 122 ], [ 6, 30, 54, 78, 102, 126 ], [ 6, 26, 52, 78, 104, 130 ], [ 6, 30, 56, 82, 108, 134 ], [ 6, 34, 60, 86, 112, 138 ], [ 6, 30, 58, 86, 114, 142 ], [ 6, 34, 62, 90, 118, 146 ], [ 6, 30, 54, 78, 102, 126, 150 ], [ 6, 24, 50, 76, 102, 128, 154 ], [ 6, 28, 54, 80, 106, 132, 158 ], [ 6, 32, 58, 84, 110, 136, 162 ], [ 6, 26, 54, 82, 110, 138, 166 ], [ 6, 30, 58, 86, 114, 142, 170 ] ], n = {}, a = function(r) {
        for (var t = 0; 0 != r; ) t += 1, r >>>= 1;
        return t;
    };
    return n.getBCHTypeInfo = function(r) {
        for (var t = r << 10; a(t) - a(1335) >= 0; ) t ^= 1335 << a(t) - a(1335);
        return 21522 ^ (r << 10 | t);
    }, n.getBCHTypeNumber = function(r) {
        for (var t = r << 12; a(t) - a(7973) >= 0; ) t ^= 7973 << a(t) - a(7973);
        return r << 12 | t;
    }, n.getPatternPosition = function(r) {
        return t[r - 1];
    }, n.getMaskFunction = function(r) {
        switch (r) {
          case o.PATTERN000:
            return function(r, t) {
                return (r + t) % 2 == 0;
            };

          case o.PATTERN001:
            return function(r, t) {
                return r % 2 == 0;
            };

          case o.PATTERN010:
            return function(r, t) {
                return t % 3 == 0;
            };

          case o.PATTERN011:
            return function(r, t) {
                return (r + t) % 3 == 0;
            };

          case o.PATTERN100:
            return function(r, t) {
                return (Math.floor(r / 2) + Math.floor(t / 3)) % 2 == 0;
            };

          case o.PATTERN101:
            return function(r, t) {
                return r * t % 2 + r * t % 3 == 0;
            };

          case o.PATTERN110:
            return function(r, t) {
                return (r * t % 2 + r * t % 3) % 2 == 0;
            };

          case o.PATTERN111:
            return function(r, t) {
                return (r * t % 3 + (r + t) % 2) % 2 == 0;
            };

          default:
            throw new Error("bad maskPattern:" + r);
        }
    }, n.getErrorCorrectPolynomial = function(t) {
        for (var e = r([ 1 ], 0), n = 0; n < t; n += 1) e = e.multiply(r([ 1, i.gexp(n) ], 0));
        return e;
    }, n.getLengthInBits = function(r, t) {
        if (1 <= t && t < 10) switch (r) {
          case e.MODE_NUMBER:
            return 10;

          case e.MODE_ALPHA_NUM:
            return 9;

          case e.MODE_8BIT_BYTE:
          case e.MODE_KANJI:
            return 8;

          default:
            throw new Error("mode:" + r);
        } else if (t < 27) switch (r) {
          case e.MODE_NUMBER:
            return 12;

          case e.MODE_ALPHA_NUM:
            return 11;

          case e.MODE_8BIT_BYTE:
            return 16;

          case e.MODE_KANJI:
            return 10;

          default:
            throw new Error("mode:" + r);
        } else {
            if (!(t < 41)) throw new Error("type:" + t);
            switch (r) {
              case e.MODE_NUMBER:
                return 14;

              case e.MODE_ALPHA_NUM:
                return 13;

              case e.MODE_8BIT_BYTE:
                return 16;

              case e.MODE_KANJI:
                return 12;

              default:
                throw new Error("mode:" + r);
            }
        }
    }, n.getLostPoint = function(r) {
        for (var t = r.getModuleCount(), e = 0, n = 0; n < t; n += 1) for (c = 0; c < t; c += 1) {
            for (var o = 0, a = r.isDark(n, c), i = -1; i <= 1; i += 1) if (!(n + i < 0 || t <= n + i)) for (var u = -1; u <= 1; u += 1) c + u < 0 || t <= c + u || 0 == i && 0 == u || a == r.isDark(n + i, c + u) && (o += 1);
            o > 5 && (e += 3 + o - 5);
        }
        for (n = 0; n < t - 1; n += 1) for (c = 0; c < t - 1; c += 1) {
            var f = 0;
            r.isDark(n, c) && (f += 1), r.isDark(n + 1, c) && (f += 1), r.isDark(n, c + 1) && (f += 1), 
            r.isDark(n + 1, c + 1) && (f += 1), 0 != f && 4 != f || (e += 3);
        }
        for (n = 0; n < t; n += 1) for (c = 0; c < t - 6; c += 1) r.isDark(n, c) && !r.isDark(n, c + 1) && r.isDark(n, c + 2) && r.isDark(n, c + 3) && r.isDark(n, c + 4) && !r.isDark(n, c + 5) && r.isDark(n, c + 6) && (e += 40);
        for (c = 0; c < t; c += 1) for (n = 0; n < t - 6; n += 1) r.isDark(n, c) && !r.isDark(n + 1, c) && r.isDark(n + 2, c) && r.isDark(n + 3, c) && r.isDark(n + 4, c) && !r.isDark(n + 5, c) && r.isDark(n + 6, c) && (e += 40);
        for (var g = 0, c = 0; c < t; c += 1) for (n = 0; n < t; n += 1) r.isDark(n, c) && (g += 1);
        return e += 10 * (Math.abs(100 * g / t / t - 50) / 5);
    }, n;
}(), i = function() {
    for (var r = new Array(256), t = new Array(256), e = 0; e < 8; e += 1) r[e] = 1 << e;
    for (e = 8; e < 256; e += 1) r[e] = r[e - 4] ^ r[e - 5] ^ r[e - 6] ^ r[e - 8];
    for (e = 0; e < 255; e += 1) t[r[e]] = e;
    var n = {};
    return n.glog = function(r) {
        if (r < 1) throw new Error("glog(" + r + ")");
        return t[r];
    }, n.gexp = function(t) {
        for (;t < 0; ) t += 255;
        for (;t >= 256; ) t -= 255;
        return r[t];
    }, n;
}(), u = function() {
    var r = [ [ 1, 26, 19 ], [ 1, 26, 16 ], [ 1, 26, 13 ], [ 1, 26, 9 ], [ 1, 44, 34 ], [ 1, 44, 28 ], [ 1, 44, 22 ], [ 1, 44, 16 ], [ 1, 70, 55 ], [ 1, 70, 44 ], [ 2, 35, 17 ], [ 2, 35, 13 ], [ 1, 100, 80 ], [ 2, 50, 32 ], [ 2, 50, 24 ], [ 4, 25, 9 ], [ 1, 134, 108 ], [ 2, 67, 43 ], [ 2, 33, 15, 2, 34, 16 ], [ 2, 33, 11, 2, 34, 12 ], [ 2, 86, 68 ], [ 4, 43, 27 ], [ 4, 43, 19 ], [ 4, 43, 15 ], [ 2, 98, 78 ], [ 4, 49, 31 ], [ 2, 32, 14, 4, 33, 15 ], [ 4, 39, 13, 1, 40, 14 ], [ 2, 121, 97 ], [ 2, 60, 38, 2, 61, 39 ], [ 4, 40, 18, 2, 41, 19 ], [ 4, 40, 14, 2, 41, 15 ], [ 2, 146, 116 ], [ 3, 58, 36, 2, 59, 37 ], [ 4, 36, 16, 4, 37, 17 ], [ 4, 36, 12, 4, 37, 13 ], [ 2, 86, 68, 2, 87, 69 ], [ 4, 69, 43, 1, 70, 44 ], [ 6, 43, 19, 2, 44, 20 ], [ 6, 43, 15, 2, 44, 16 ], [ 4, 101, 81 ], [ 1, 80, 50, 4, 81, 51 ], [ 4, 50, 22, 4, 51, 23 ], [ 3, 36, 12, 8, 37, 13 ], [ 2, 116, 92, 2, 117, 93 ], [ 6, 58, 36, 2, 59, 37 ], [ 4, 46, 20, 6, 47, 21 ], [ 7, 42, 14, 4, 43, 15 ], [ 4, 133, 107 ], [ 8, 59, 37, 1, 60, 38 ], [ 8, 44, 20, 4, 45, 21 ], [ 12, 33, 11, 4, 34, 12 ], [ 3, 145, 115, 1, 146, 116 ], [ 4, 64, 40, 5, 65, 41 ], [ 11, 36, 16, 5, 37, 17 ], [ 11, 36, 12, 5, 37, 13 ], [ 5, 109, 87, 1, 110, 88 ], [ 5, 65, 41, 5, 66, 42 ], [ 5, 54, 24, 7, 55, 25 ], [ 11, 36, 12 ], [ 5, 122, 98, 1, 123, 99 ], [ 7, 73, 45, 3, 74, 46 ], [ 15, 43, 19, 2, 44, 20 ], [ 3, 45, 15, 13, 46, 16 ], [ 1, 135, 107, 5, 136, 108 ], [ 10, 74, 46, 1, 75, 47 ], [ 1, 50, 22, 15, 51, 23 ], [ 2, 42, 14, 17, 43, 15 ], [ 5, 150, 120, 1, 151, 121 ], [ 9, 69, 43, 4, 70, 44 ], [ 17, 50, 22, 1, 51, 23 ], [ 2, 42, 14, 19, 43, 15 ], [ 3, 141, 113, 4, 142, 114 ], [ 3, 70, 44, 11, 71, 45 ], [ 17, 47, 21, 4, 48, 22 ], [ 9, 39, 13, 16, 40, 14 ], [ 3, 135, 107, 5, 136, 108 ], [ 3, 67, 41, 13, 68, 42 ], [ 15, 54, 24, 5, 55, 25 ], [ 15, 43, 15, 10, 44, 16 ], [ 4, 144, 116, 4, 145, 117 ], [ 17, 68, 42 ], [ 17, 50, 22, 6, 51, 23 ], [ 19, 46, 16, 6, 47, 17 ], [ 2, 139, 111, 7, 140, 112 ], [ 17, 74, 46 ], [ 7, 54, 24, 16, 55, 25 ], [ 34, 37, 13 ], [ 4, 151, 121, 5, 152, 122 ], [ 4, 75, 47, 14, 76, 48 ], [ 11, 54, 24, 14, 55, 25 ], [ 16, 45, 15, 14, 46, 16 ], [ 6, 147, 117, 4, 148, 118 ], [ 6, 73, 45, 14, 74, 46 ], [ 11, 54, 24, 16, 55, 25 ], [ 30, 46, 16, 2, 47, 17 ], [ 8, 132, 106, 4, 133, 107 ], [ 8, 75, 47, 13, 76, 48 ], [ 7, 54, 24, 22, 55, 25 ], [ 22, 45, 15, 13, 46, 16 ], [ 10, 142, 114, 2, 143, 115 ], [ 19, 74, 46, 4, 75, 47 ], [ 28, 50, 22, 6, 51, 23 ], [ 33, 46, 16, 4, 47, 17 ], [ 8, 152, 122, 4, 153, 123 ], [ 22, 73, 45, 3, 74, 46 ], [ 8, 53, 23, 26, 54, 24 ], [ 12, 45, 15, 28, 46, 16 ], [ 3, 147, 117, 10, 148, 118 ], [ 3, 73, 45, 23, 74, 46 ], [ 4, 54, 24, 31, 55, 25 ], [ 11, 45, 15, 31, 46, 16 ], [ 7, 146, 116, 7, 147, 117 ], [ 21, 73, 45, 7, 74, 46 ], [ 1, 53, 23, 37, 54, 24 ], [ 19, 45, 15, 26, 46, 16 ], [ 5, 145, 115, 10, 146, 116 ], [ 19, 75, 47, 10, 76, 48 ], [ 15, 54, 24, 25, 55, 25 ], [ 23, 45, 15, 25, 46, 16 ], [ 13, 145, 115, 3, 146, 116 ], [ 2, 74, 46, 29, 75, 47 ], [ 42, 54, 24, 1, 55, 25 ], [ 23, 45, 15, 28, 46, 16 ], [ 17, 145, 115 ], [ 10, 74, 46, 23, 75, 47 ], [ 10, 54, 24, 35, 55, 25 ], [ 19, 45, 15, 35, 46, 16 ], [ 17, 145, 115, 1, 146, 116 ], [ 14, 74, 46, 21, 75, 47 ], [ 29, 54, 24, 19, 55, 25 ], [ 11, 45, 15, 46, 46, 16 ], [ 13, 145, 115, 6, 146, 116 ], [ 14, 74, 46, 23, 75, 47 ], [ 44, 54, 24, 7, 55, 25 ], [ 59, 46, 16, 1, 47, 17 ], [ 12, 151, 121, 7, 152, 122 ], [ 12, 75, 47, 26, 76, 48 ], [ 39, 54, 24, 14, 55, 25 ], [ 22, 45, 15, 41, 46, 16 ], [ 6, 151, 121, 14, 152, 122 ], [ 6, 75, 47, 34, 76, 48 ], [ 46, 54, 24, 10, 55, 25 ], [ 2, 45, 15, 64, 46, 16 ], [ 17, 152, 122, 4, 153, 123 ], [ 29, 74, 46, 14, 75, 47 ], [ 49, 54, 24, 10, 55, 25 ], [ 24, 45, 15, 46, 46, 16 ], [ 4, 152, 122, 18, 153, 123 ], [ 13, 74, 46, 32, 75, 47 ], [ 48, 54, 24, 14, 55, 25 ], [ 42, 45, 15, 32, 46, 16 ], [ 20, 147, 117, 4, 148, 118 ], [ 40, 75, 47, 7, 76, 48 ], [ 43, 54, 24, 22, 55, 25 ], [ 10, 45, 15, 67, 46, 16 ], [ 19, 148, 118, 6, 149, 119 ], [ 18, 75, 47, 31, 76, 48 ], [ 34, 54, 24, 34, 55, 25 ], [ 20, 45, 15, 61, 46, 16 ] ], t = function(r, t) {
        var e = {};
        return e.totalCount = r, e.dataCount = t, e;
    }, e = {}, o = function(t, e) {
        switch (e) {
          case n.L:
            return r[4 * (t - 1) + 0];

          case n.M:
            return r[4 * (t - 1) + 1];

          case n.Q:
            return r[4 * (t - 1) + 2];

          case n.H:
            return r[4 * (t - 1) + 3];

          default:
            return;
        }
    };
    return e.getRSBlocks = function(r, e) {
        var n = o(r, e);
        if (void 0 === n) throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + e);
        for (var a = n.length / 3, i = new Array(), u = 0; u < a; u += 1) for (var f = n[3 * u + 0], g = n[3 * u + 1], c = n[3 * u + 2], h = 0; h < f; h += 1) i.push(t(g, c));
        return i;
    }, e;
}(), f = function() {
    var r = new Array(), t = 0, e = {};
    return e.getBuffer = function() {
        return r;
    }, e.getAt = function(t) {
        var e = Math.floor(t / 8);
        return 1 == (r[e] >>> 7 - t % 8 & 1);
    }, e.put = function(r, t) {
        for (var n = 0; n < t; n += 1) e.putBit(1 == (r >>> t - n - 1 & 1));
    }, e.getLengthInBits = function() {
        return t;
    }, e.putBit = function(e) {
        var n = Math.floor(t / 8);
        r.length <= n && r.push(0), e && (r[n] |= 128 >>> t % 8), t += 1;
    }, e;
}, g = function(r) {
    for (var t = e.MODE_8BIT_BYTE, n = r, o = [], a = {}, i = 0, u = n.length; i < u; i++) {
        var f = [], g = n.charCodeAt(i);
        g > 65536 ? (f[0] = 240 | (1835008 & g) >>> 18, f[1] = 128 | (258048 & g) >>> 12, 
        f[2] = 128 | (4032 & g) >>> 6, f[3] = 128 | 63 & g) : g > 2048 ? (f[0] = 224 | (61440 & g) >>> 12, 
        f[1] = 128 | (4032 & g) >>> 6, f[2] = 128 | 63 & g) : g > 128 ? (f[0] = 192 | (1984 & g) >>> 6, 
        f[1] = 128 | 63 & g) : f[0] = g, o.push(f);
    }
    (o = Array.prototype.concat.apply([], o)).length != n.length && (o.unshift(191), 
    o.unshift(187), o.unshift(239));
    var c = o;
    return a.getMode = function() {
        return t;
    }, a.getLength = function(r) {
        return c.length;
    }, a.write = function(r) {
        for (var t = 0; t < c.length; t += 1) r.put(c[t], 8);
    }, a;
}, c = function() {
    var r = new Array(), t = {};
    return t.writeByte = function(t) {
        r.push(255 & t);
    }, t.writeShort = function(r) {
        t.writeByte(r), t.writeByte(r >>> 8);
    }, t.writeBytes = function(r, e, n) {
        e = e || 0, n = n || r.length;
        for (var o = 0; o < n; o += 1) t.writeByte(r[o + e]);
    }, t.writeString = function(r) {
        for (var e = 0; e < r.length; e += 1) t.writeByte(r.charCodeAt(e));
    }, t.toByteArray = function() {
        return r;
    }, t.toString = function() {
        var t = "";
        t += "[";
        for (var e = 0; e < r.length; e += 1) e > 0 && (t += ","), t += r[e];
        return t += "]";
    }, t;
}, h = function() {
    var r = 0, t = 0, e = 0, n = "", o = {}, a = function(r) {
        n += String.fromCharCode(i(63 & r));
    }, i = function(r) {
        if (r < 0) ; else {
            if (r < 26) return 65 + r;
            if (r < 52) return r - 26 + 97;
            if (r < 62) return r - 52 + 48;
            if (62 == r) return 43;
            if (63 == r) return 47;
        }
        throw new Error("n:" + r);
    };
    return o.writeByte = function(n) {
        for (r = r << 8 | 255 & n, t += 8, e += 1; t >= 6; ) a(r >>> t - 6), t -= 6;
    }, o.flush = function() {
        if (t > 0 && (a(r << 6 - t), r = 0, t = 0), e % 3 != 0) for (var o = 3 - e % 3, i = 0; i < o; i += 1) n += "=";
    }, o.toString = function() {
        return n;
    }, o;
}, l = function(r) {
    var t = r, e = 0, n = 0, o = 0, a = {};
    a.read = function() {
        for (;o < 8; ) {
            if (e >= t.length) {
                if (0 == o) return -1;
                throw new Error("unexpected end of file./" + o);
            }
            var r = t.charAt(e);
            if (e += 1, "=" == r) return o = 0, -1;
            r.match(/^\s$/) || (n = n << 6 | i(r.charCodeAt(0)), o += 6);
        }
        var a = n >>> o - 8 & 255;
        return o -= 8, a;
    };
    var i = function(r) {
        if (65 <= r && r <= 90) return r - 65;
        if (97 <= r && r <= 122) return r - 97 + 26;
        if (48 <= r && r <= 57) return r - 48 + 52;
        if (43 == r) return 62;
        if (47 == r) return 63;
        throw new Error("c:" + r);
    };
    return a;
}, s = function(r, t) {
    var e = r, n = t, o = new Array(r * t), a = {};
    a.setPixel = function(r, t, n) {
        o[t * e + r] = n;
    }, a.write = function(r) {
        r.writeString("GIF87a"), r.writeShort(e), r.writeShort(n), r.writeByte(128), r.writeByte(0), 
        r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(255), 
        r.writeByte(255), r.writeByte(255), r.writeString(","), r.writeShort(0), r.writeShort(0), 
        r.writeShort(e), r.writeShort(n), r.writeByte(0);
        var t = u(2);
        r.writeByte(2);
        for (var o = 0; t.length - o > 255; ) r.writeByte(255), r.writeBytes(t, o, 255), 
        o += 255;
        r.writeByte(t.length - o), r.writeBytes(t, o, t.length - o), r.writeByte(0), r.writeString(";");
    };
    var i = function(r) {
        var t = r, e = 0, n = 0, o = {};
        return o.write = function(r, o) {
            if (r >>> o != 0) throw new Error("length over");
            for (;e + o >= 8; ) t.writeByte(255 & (r << e | n)), o -= 8 - e, r >>>= 8 - e, n = 0, 
            e = 0;
            n |= r << e, e += o;
        }, o.flush = function() {
            e > 0 && t.writeByte(n);
        }, o;
    }, u = function(r) {
        for (var t = 1 << r, e = 1 + (1 << r), n = r + 1, a = f(), u = 0; u < t; u += 1) a.add(String.fromCharCode(u));
        a.add(String.fromCharCode(t)), a.add(String.fromCharCode(e));
        var g = c(), h = i(g);
        h.write(t, n);
        var l = 0, s = String.fromCharCode(o[l]);
        for (l += 1; l < o.length; ) {
            var v = String.fromCharCode(o[l]);
            l += 1, a.contains(s + v) ? s += v : (h.write(a.indexOf(s), n), a.size() < 4095 && (a.size() == 1 << n && (n += 1), 
            a.add(s + v)), s = v);
        }
        return h.write(a.indexOf(s), n), h.write(e, n), h.flush(), g.toByteArray();
    }, f = function() {
        var r = {}, t = 0, e = {};
        return e.add = function(n) {
            if (e.contains(n)) throw new Error("dup key:" + n);
            r[n] = t, t += 1;
        }, e.size = function() {
            return t;
        }, e.indexOf = function(t) {
            return r[t];
        }, e.contains = function(t) {
            return void 0 !== r[t];
        }, e;
    };
    return a;
}, v = function(r, t, e, n) {
    for (var o = s(r, t), a = 0; a < t; a += 1) for (var i = 0; i < r; i += 1) o.setPixel(i, a, e(i, a));
    var u = c();
    o.write(u);
    for (var f = h(), g = u.toByteArray(), l = 0; l < g.length; l += 1) f.writeByte(g[l]);
    f.flush();
    var v = "";
    return v += "data:image/gif;base64,", v += f;
};

module.exports = {
    createQrCodeImg: function r(e, n) {
        var o, a = (n = n || {}).typeNumber || 4, i = n.errorCorrectLevel || "M", u = n.size || 500;
        try {
            (o = t(a, i || "M")).addData(e), o.make();
        } catch (t) {
            if (a >= 40) throw new Error("Text too long to encode");
            return r(e, {
                size: u,
                errorCorrectLevel: i,
                typeNumber: a + 1
            });
        }
        var f = parseInt(u / o.getModuleCount()), g = parseInt((u - o.getModuleCount() * f) / 2);
        return o.createImgTag(f, g, u);
    }
};
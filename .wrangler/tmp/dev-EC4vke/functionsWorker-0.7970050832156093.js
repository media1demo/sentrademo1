var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-J5JXoG/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// .wrangler/tmp/pages-2sjem2/functionsWorker-0.7970050832156093.mjs
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __esm = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
}, "__init"), "__esm");
var __commonJS = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, "__require"), "__commonJS");
var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
)), "__toESM");
function stripCfConnectingIPHeader2(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader2, "stripCfConnectingIPHeader");
var init_strip_cf_connecting_ip_header = __esm({
  "../.wrangler/tmp/bundle-L31jVR/strip-cf-connecting-ip-header.js"() {
    __name2(stripCfConnectingIPHeader2, "stripCfConnectingIPHeader");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        return Reflect.apply(target, thisArg, [
          stripCfConnectingIPHeader2.apply(null, argArray)
        ]);
      }
    });
  }
});
var require_timing_safe_equal = __commonJS({
  "../node_modules/standardwebhooks/dist/timing_safe_equal.js"(exports) {
    "use strict";
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timingSafeEqual = void 0;
    function assert(expr, msg = "") {
      if (!expr) {
        throw new Error(msg);
      }
    }
    __name(assert, "assert");
    __name2(assert, "assert");
    function timingSafeEqual(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      if (!(a instanceof DataView)) {
        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
      }
      if (!(b instanceof DataView)) {
        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
      }
      assert(a instanceof DataView);
      assert(b instanceof DataView);
      const length = a.byteLength;
      let out = 0;
      let i = -1;
      while (++i < length) {
        out |= a.getUint8(i) ^ b.getUint8(i);
      }
      return out === 0;
    }
    __name(timingSafeEqual, "timingSafeEqual");
    __name2(timingSafeEqual, "timingSafeEqual");
    exports.timingSafeEqual = timingSafeEqual;
  }
});
var require_base64 = __commonJS({
  "../node_modules/@stablelib/base64/lib/base64.js"(exports) {
    "use strict";
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = /* @__PURE__ */ __name2(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        __name2(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var INVALID_BYTE = 256;
    var Coder = (
      /** @class */
      function() {
        function Coder2(_paddingCharacter) {
          if (_paddingCharacter === void 0) {
            _paddingCharacter = "=";
          }
          this._paddingCharacter = _paddingCharacter;
        }
        __name(Coder2, "Coder2");
        __name2(Coder2, "Coder");
        Coder2.prototype.encodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
          }
          return (length + 2) / 3 * 4 | 0;
        };
        Coder2.prototype.encode = function(data) {
          var out = "";
          var i = 0;
          for (; i < data.length - 2; i += 3) {
            var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            out += this._encodeByte(c >>> 1 * 6 & 63);
            out += this._encodeByte(c >>> 0 * 6 & 63);
          }
          var left = data.length - i;
          if (left > 0) {
            var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            if (left === 2) {
              out += this._encodeByte(c >>> 1 * 6 & 63);
            } else {
              out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
          }
          return out;
        };
        Coder2.prototype.maxDecodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
          }
          return length / 4 * 3 | 0;
        };
        Coder2.prototype.decodedLength = function(s) {
          return this.maxDecodedLength(s.length - this._getPaddingLength(s));
        };
        Coder2.prototype.decode = function(s) {
          if (s.length === 0) {
            return new Uint8Array(0);
          }
          var paddingLength = this._getPaddingLength(s);
          var length = s.length - paddingLength;
          var out = new Uint8Array(this.maxDecodedLength(length));
          var op = 0;
          var i = 0;
          var haveBad = 0;
          var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
          for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v0 << 2 | v1 >>> 4;
            out[op++] = v1 << 4 | v2 >>> 2;
            out[op++] = v2 << 6 | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = v0 << 2 | v1 >>> 4;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
          }
          if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = v1 << 4 | v2 >>> 2;
            haveBad |= v2 & INVALID_BYTE;
          }
          if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v2 << 6 | v3;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
          }
          return out;
        };
        Coder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
          result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
          return String.fromCharCode(result);
        };
        Coder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
          result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        Coder2.prototype._getPaddingLength = function(s) {
          var paddingLength = 0;
          if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
              if (s[i] !== this._paddingCharacter) {
                break;
              }
              paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
              throw new Error("Base64Coder: incorrect padding");
            }
          }
          return paddingLength;
        };
        return Coder2;
      }()
    );
    exports.Coder = Coder;
    var stdCoder = new Coder();
    function encode(data) {
      return stdCoder.encode(data);
    }
    __name(encode, "encode");
    __name2(encode, "encode");
    exports.encode = encode;
    function decode(s) {
      return stdCoder.decode(s);
    }
    __name(decode, "decode");
    __name2(decode, "decode");
    exports.decode = decode;
    var URLSafeCoder = (
      /** @class */
      function(_super) {
        __extends(URLSafeCoder2, _super);
        function URLSafeCoder2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        __name(URLSafeCoder2, "URLSafeCoder2");
        __name2(URLSafeCoder2, "URLSafeCoder");
        URLSafeCoder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
          result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
          return String.fromCharCode(result);
        };
        URLSafeCoder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
          result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        return URLSafeCoder2;
      }(Coder)
    );
    exports.URLSafeCoder = URLSafeCoder;
    var urlSafeCoder = new URLSafeCoder();
    function encodeURLSafe(data) {
      return urlSafeCoder.encode(data);
    }
    __name(encodeURLSafe, "encodeURLSafe");
    __name2(encodeURLSafe, "encodeURLSafe");
    exports.encodeURLSafe = encodeURLSafe;
    function decodeURLSafe(s) {
      return urlSafeCoder.decode(s);
    }
    __name(decodeURLSafe, "decodeURLSafe");
    __name2(decodeURLSafe, "decodeURLSafe");
    exports.decodeURLSafe = decodeURLSafe;
    exports.encodedLength = function(length) {
      return stdCoder.encodedLength(length);
    };
    exports.maxDecodedLength = function(length) {
      return stdCoder.maxDecodedLength(length);
    };
    exports.decodedLength = function(s) {
      return stdCoder.decodedLength(s);
    };
  }
});
var require_sha256 = __commonJS({
  "../node_modules/fast-sha256/sha256.js"(exports, module) {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    (function(root, factory) {
      var exports2 = {};
      factory(exports2);
      var sha256 = exports2["default"];
      for (var k in exports2) {
        sha256[k] = exports2[k];
      }
      if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = sha256;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return sha256;
        });
      } else {
        root.sha256 = sha256;
      }
    })(exports, function(exports2) {
      "use strict";
      exports2.__esModule = true;
      exports2.digestLength = 32;
      exports2.blockSize = 64;
      var K = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      function hashBlocks(w, v, p, pos, len) {
        var a, b, c, d, e, f, g, h, u, i, j, t1, t2;
        while (len >= 64) {
          a = v[0];
          b = v[1];
          c = v[2];
          d = v[3];
          e = v[4];
          f = v[5];
          g = v[6];
          h = v[7];
          for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
          }
          for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
            u = w[i - 15];
            t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
          }
          for (i = 0; i < 64; i++) {
            t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          v[0] += a;
          v[1] += b;
          v[2] += c;
          v[3] += d;
          v[4] += e;
          v[5] += f;
          v[6] += g;
          v[7] += h;
          pos += 64;
          len -= 64;
        }
        return pos;
      }
      __name(hashBlocks, "hashBlocks");
      __name2(hashBlocks, "hashBlocks");
      var Hash = (
        /** @class */
        function() {
          function Hash2() {
            this.digestLength = exports2.digestLength;
            this.blockSize = exports2.blockSize;
            this.state = new Int32Array(8);
            this.temp = new Int32Array(64);
            this.buffer = new Uint8Array(128);
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            this.reset();
          }
          __name(Hash2, "Hash2");
          __name2(Hash2, "Hash");
          Hash2.prototype.reset = function() {
            this.state[0] = 1779033703;
            this.state[1] = 3144134277;
            this.state[2] = 1013904242;
            this.state[3] = 2773480762;
            this.state[4] = 1359893119;
            this.state[5] = 2600822924;
            this.state[6] = 528734635;
            this.state[7] = 1541459225;
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            return this;
          };
          Hash2.prototype.clean = function() {
            for (var i = 0; i < this.buffer.length; i++) {
              this.buffer[i] = 0;
            }
            for (var i = 0; i < this.temp.length; i++) {
              this.temp[i] = 0;
            }
            this.reset();
          };
          Hash2.prototype.update = function(data, dataLength) {
            if (dataLength === void 0) {
              dataLength = data.length;
            }
            if (this.finished) {
              throw new Error("SHA256: can't update because hash was finished.");
            }
            var dataPos = 0;
            this.bytesHashed += dataLength;
            if (this.bufferLength > 0) {
              while (this.bufferLength < 64 && dataLength > 0) {
                this.buffer[this.bufferLength++] = data[dataPos++];
                dataLength--;
              }
              if (this.bufferLength === 64) {
                hashBlocks(this.temp, this.state, this.buffer, 0, 64);
                this.bufferLength = 0;
              }
            }
            if (dataLength >= 64) {
              dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
              dataLength %= 64;
            }
            while (dataLength > 0) {
              this.buffer[this.bufferLength++] = data[dataPos++];
              dataLength--;
            }
            return this;
          };
          Hash2.prototype.finish = function(out) {
            if (!this.finished) {
              var bytesHashed = this.bytesHashed;
              var left = this.bufferLength;
              var bitLenHi = bytesHashed / 536870912 | 0;
              var bitLenLo = bytesHashed << 3;
              var padLength = bytesHashed % 64 < 56 ? 64 : 128;
              this.buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) {
                this.buffer[i] = 0;
              }
              this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
              this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
              this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
              this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
              this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
              this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
              this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
              this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
              hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
              this.finished = true;
            }
            for (var i = 0; i < 8; i++) {
              out[i * 4 + 0] = this.state[i] >>> 24 & 255;
              out[i * 4 + 1] = this.state[i] >>> 16 & 255;
              out[i * 4 + 2] = this.state[i] >>> 8 & 255;
              out[i * 4 + 3] = this.state[i] >>> 0 & 255;
            }
            return this;
          };
          Hash2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          Hash2.prototype._saveState = function(out) {
            for (var i = 0; i < this.state.length; i++) {
              out[i] = this.state[i];
            }
          };
          Hash2.prototype._restoreState = function(from, bytesHashed) {
            for (var i = 0; i < this.state.length; i++) {
              this.state[i] = from[i];
            }
            this.bytesHashed = bytesHashed;
            this.finished = false;
            this.bufferLength = 0;
          };
          return Hash2;
        }()
      );
      exports2.Hash = Hash;
      var HMAC = (
        /** @class */
        function() {
          function HMAC2(key) {
            this.inner = new Hash();
            this.outer = new Hash();
            this.blockSize = this.inner.blockSize;
            this.digestLength = this.inner.digestLength;
            var pad = new Uint8Array(this.blockSize);
            if (key.length > this.blockSize) {
              new Hash().update(key).finish(pad).clean();
            } else {
              for (var i = 0; i < key.length; i++) {
                pad[i] = key[i];
              }
            }
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54;
            }
            this.inner.update(pad);
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54 ^ 92;
            }
            this.outer.update(pad);
            this.istate = new Uint32Array(8);
            this.ostate = new Uint32Array(8);
            this.inner._saveState(this.istate);
            this.outer._saveState(this.ostate);
            for (var i = 0; i < pad.length; i++) {
              pad[i] = 0;
            }
          }
          __name(HMAC2, "HMAC2");
          __name2(HMAC2, "HMAC");
          HMAC2.prototype.reset = function() {
            this.inner._restoreState(this.istate, this.inner.blockSize);
            this.outer._restoreState(this.ostate, this.outer.blockSize);
            return this;
          };
          HMAC2.prototype.clean = function() {
            for (var i = 0; i < this.istate.length; i++) {
              this.ostate[i] = this.istate[i] = 0;
            }
            this.inner.clean();
            this.outer.clean();
          };
          HMAC2.prototype.update = function(data) {
            this.inner.update(data);
            return this;
          };
          HMAC2.prototype.finish = function(out) {
            if (this.outer.finished) {
              this.outer.finish(out);
            } else {
              this.inner.finish(out);
              this.outer.update(out, this.digestLength).finish(out);
            }
            return this;
          };
          HMAC2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          return HMAC2;
        }()
      );
      exports2.HMAC = HMAC;
      function hash(data) {
        var h = new Hash().update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      __name(hash, "hash");
      __name2(hash, "hash");
      exports2.hash = hash;
      exports2["default"] = hash;
      function hmac(key, data) {
        var h = new HMAC(key).update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      __name(hmac, "hmac");
      __name2(hmac, "hmac");
      exports2.hmac = hmac;
      function fillBuffer(buffer, hmac2, info, counter) {
        var num = counter[0];
        if (num === 0) {
          throw new Error("hkdf: cannot expand more");
        }
        hmac2.reset();
        if (num > 1) {
          hmac2.update(buffer);
        }
        if (info) {
          hmac2.update(info);
        }
        hmac2.update(counter);
        hmac2.finish(buffer);
        counter[0]++;
      }
      __name(fillBuffer, "fillBuffer");
      __name2(fillBuffer, "fillBuffer");
      var hkdfSalt = new Uint8Array(exports2.digestLength);
      function hkdf(key, salt, info, length) {
        if (salt === void 0) {
          salt = hkdfSalt;
        }
        if (length === void 0) {
          length = 32;
        }
        var counter = new Uint8Array([1]);
        var okm = hmac(salt, key);
        var hmac_ = new HMAC(okm);
        var buffer = new Uint8Array(hmac_.digestLength);
        var bufpos = buffer.length;
        var out = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
          if (bufpos === buffer.length) {
            fillBuffer(buffer, hmac_, info, counter);
            bufpos = 0;
          }
          out[i] = buffer[bufpos++];
        }
        hmac_.clean();
        buffer.fill(0);
        counter.fill(0);
        return out;
      }
      __name(hkdf, "hkdf");
      __name2(hkdf, "hkdf");
      exports2.hkdf = hkdf;
      function pbkdf2(password, salt, iterations, dkLen) {
        var prf = new HMAC(password);
        var len = prf.digestLength;
        var ctr = new Uint8Array(4);
        var t = new Uint8Array(len);
        var u = new Uint8Array(len);
        var dk = new Uint8Array(dkLen);
        for (var i = 0; i * len < dkLen; i++) {
          var c = i + 1;
          ctr[0] = c >>> 24 & 255;
          ctr[1] = c >>> 16 & 255;
          ctr[2] = c >>> 8 & 255;
          ctr[3] = c >>> 0 & 255;
          prf.reset();
          prf.update(salt);
          prf.update(ctr);
          prf.finish(u);
          for (var j = 0; j < len; j++) {
            t[j] = u[j];
          }
          for (var j = 2; j <= iterations; j++) {
            prf.reset();
            prf.update(u).finish(u);
            for (var k = 0; k < len; k++) {
              t[k] ^= u[k];
            }
          }
          for (var j = 0; j < len && i * len + j < dkLen; j++) {
            dk[i * len + j] = t[j];
          }
        }
        for (var i = 0; i < len; i++) {
          t[i] = u[i] = 0;
        }
        for (var i = 0; i < 4; i++) {
          ctr[i] = 0;
        }
        prf.clean();
        return dk;
      }
      __name(pbkdf2, "pbkdf2");
      __name2(pbkdf2, "pbkdf2");
      exports2.pbkdf2 = pbkdf2;
    });
  }
});
var require_dist = __commonJS({
  "../node_modules/standardwebhooks/dist/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Webhook = exports.WebhookVerificationError = void 0;
    var timing_safe_equal_1 = require_timing_safe_equal();
    var base64 = require_base64();
    var sha256 = require_sha256();
    var WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60;
    var ExtendableError = /* @__PURE__ */ __name(class extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ExtendableError.prototype);
        this.name = "ExtendableError";
        this.stack = new Error(message).stack;
      }
    }, "ExtendableError");
    __name2(ExtendableError, "ExtendableError");
    var WebhookVerificationError = /* @__PURE__ */ __name(class extends ExtendableError {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, WebhookVerificationError.prototype);
        this.name = "WebhookVerificationError";
      }
    }, "WebhookVerificationError");
    __name2(WebhookVerificationError, "WebhookVerificationError");
    exports.WebhookVerificationError = WebhookVerificationError;
    var Webhook2 = /* @__PURE__ */ __name(class {
      constructor(secret, options) {
        if (!secret) {
          throw new Error("Secret can't be empty.");
        }
        if ((options === null || options === void 0 ? void 0 : options.format) === "raw") {
          if (secret instanceof Uint8Array) {
            this.key = secret;
          } else {
            this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
          }
        } else {
          if (typeof secret !== "string") {
            throw new Error("Expected secret to be of type string");
          }
          if (secret.startsWith(Webhook2.prefix)) {
            secret = secret.substring(Webhook2.prefix.length);
          }
          this.key = base64.decode(secret);
        }
      }
      verify(payload, headers_) {
        const headers = {};
        for (const key of Object.keys(headers_)) {
          headers[key.toLowerCase()] = headers_[key];
        }
        const msgId = headers["webhook-id"];
        const msgSignature = headers["webhook-signature"];
        const msgTimestamp = headers["webhook-timestamp"];
        if (!msgSignature || !msgId || !msgTimestamp) {
          throw new WebhookVerificationError("Missing required headers");
        }
        const timestamp = this.verifyTimestamp(msgTimestamp);
        const computedSignature = this.sign(msgId, timestamp, payload);
        const expectedSignature = computedSignature.split(",")[1];
        const passedSignatures = msgSignature.split(" ");
        const encoder = new globalThis.TextEncoder();
        for (const versionedSignature of passedSignatures) {
          const [version, signature] = versionedSignature.split(",");
          if (version !== "v1") {
            continue;
          }
          if ((0, timing_safe_equal_1.timingSafeEqual)(encoder.encode(signature), encoder.encode(expectedSignature))) {
            return JSON.parse(payload.toString());
          }
        }
        throw new WebhookVerificationError("No matching signature found");
      }
      sign(msgId, timestamp, payload) {
        if (typeof payload === "string") {
        } else if (payload.constructor.name === "Buffer") {
          payload = payload.toString();
        } else {
          throw new Error("Expected payload to be of type string or Buffer.");
        }
        const encoder = new TextEncoder();
        const timestampNumber = Math.floor(timestamp.getTime() / 1e3);
        const toSign = encoder.encode(`${msgId}.${timestampNumber}.${payload}`);
        const expectedSignature = base64.encode(sha256.hmac(this.key, toSign));
        return `v1,${expectedSignature}`;
      }
      verifyTimestamp(timestampHeader) {
        const now = Math.floor(Date.now() / 1e3);
        const timestamp = parseInt(timestampHeader, 10);
        if (isNaN(timestamp)) {
          throw new WebhookVerificationError("Invalid Signature Headers");
        }
        if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too old");
        }
        if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too new");
        }
        return new Date(timestamp * 1e3);
      }
    }, "Webhook2");
    __name2(Webhook2, "Webhook");
    exports.Webhook = Webhook2;
    Webhook2.prefix = "whsec_";
  }
});
async function createUser(env, input) {
  const id = `u_${crypto.randomUUID()}`;
  const stmt = env.DB.prepare(
    `INSERT INTO users (id, email, phone, password_hash, salt, name)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(id, input.email.toLowerCase(), input.phone || null, input.password_hash, input.salt, input.name || null);
  const res = await stmt.run();
  if (!res.success) {
    throw new Error("Failed to create user");
  }
  const user = await getUserById(env, id);
  if (!user)
    throw new Error("User not found after insert");
  return user;
}
__name(createUser, "createUser");
async function getUserById(env, id) {
  return await env.DB.prepare(
    `SELECT id, email, phone, password_hash, salt, name, dodo_customer_id, created_at, updated_at
     FROM users WHERE id = ?`
  ).bind(id).first();
}
__name(getUserById, "getUserById");
async function getUserByEmailOrPhone(env, identifier) {
  const ident = identifier.trim().toLowerCase();
  const row = await env.DB.prepare(
    `SELECT id, email, phone, password_hash, salt, name, dodo_customer_id, created_at, updated_at
     FROM users
     WHERE lower(email) = ? OR phone = ?`
  ).bind(ident, identifier.trim()).first();
  return row || null;
}
__name(getUserByEmailOrPhone, "getUserByEmailOrPhone");
async function upsertSubscriptionForUser(env, user_id, fields) {
  const existing = await env.DB.prepare(
    `SELECT id, user_id, dodo_subscription_id, status, latest_payment_id, created_at, updated_at
     FROM subscriptions WHERE user_id = ?`
  ).bind(user_id).first();
  if (!existing) {
    const id = `s_${crypto.randomUUID()}`;
    const res = await env.DB.prepare(
      `INSERT INTO subscriptions (id, user_id, dodo_subscription_id, status, latest_payment_id)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(id, user_id, fields.dodo_subscription_id || null, fields.status, fields.latest_payment_id || null).run();
    if (!res.success)
      throw new Error("Failed to insert subscription");
    const created = await env.DB.prepare(
      `SELECT id, user_id, dodo_subscription_id, status, latest_payment_id, created_at, updated_at
       FROM subscriptions WHERE id = ?`
    ).bind(id).first();
    if (!created)
      throw new Error("Failed to read inserted subscription");
    return created;
  } else {
    const res = await env.DB.prepare(
      `UPDATE subscriptions
         SET status = ?, 
             dodo_subscription_id = COALESCE(?, dodo_subscription_id),
             latest_payment_id = COALESCE(?, latest_payment_id),
             updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
       WHERE id = ?`
    ).bind(fields.status, fields.dodo_subscription_id || null, fields.latest_payment_id || null, existing.id).run();
    if (!res.success)
      throw new Error("Failed to update subscription");
    const updated = await env.DB.prepare(
      `SELECT id, user_id, dodo_subscription_id, status, latest_payment_id, created_at, updated_at
       FROM subscriptions WHERE id = ?`
    ).bind(existing.id).first();
    if (!updated)
      throw new Error("Failed to read updated subscription");
    return updated;
  }
}
__name(upsertSubscriptionForUser, "upsertSubscriptionForUser");
async function getSubscriptionForUser(env, user_id) {
  return await env.DB.prepare(
    `SELECT id, user_id, dodo_subscription_id, status, latest_payment_id, created_at, updated_at
     FROM subscriptions WHERE user_id = ?`
  ).bind(user_id).first();
}
__name(getSubscriptionForUser, "getSubscriptionForUser");
var init_db = __esm({
  "_utils/db.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    __name2(createUser, "createUser");
    __name2(getUserById, "getUserById");
    __name2(getUserByEmailOrPhone, "getUserByEmailOrPhone");
    __name2(upsertSubscriptionForUser, "upsertSubscriptionForUser");
    __name2(getSubscriptionForUser, "getSubscriptionForUser");
  }
});
var import_standardwebhooks;
var onRequest;
var init_dodo = __esm({
  "api/webhooks/dodo.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    import_standardwebhooks = __toESM(require_dist(), 1);
    init_db();
    onRequest = /* @__PURE__ */ __name2(async ({ request, env }) => {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
      }
      if (!env.DODO_WEBHOOK_SECRET) {
        return new Response("Webhook secret not set", { status: 500 });
      }
      const rawBody = await request.text();
      const wh = new import_standardwebhooks.Webhook(env.DODO_WEBHOOK_SECRET);
      const headers = {
        "webhook-id": request.headers.get("webhook-id") || "",
        "webhook-signature": request.headers.get("webhook-signature") || "",
        "webhook-timestamp": request.headers.get("webhook-timestamp") || ""
      };
      let payload;
      try {
        payload = await wh.verify(rawBody, headers);
      } catch (err) {
        return new Response("Invalid webhook signature", { status: 400 });
      }
      const type = String(payload?.type || "");
      const data = payload?.data || {};
      const payloadType = (data?.payload_type || data?.object?.payload_type || "").toString();
      const object = data?.object ?? data;
      const metadata = object?.metadata || data?.metadata || {};
      const appUserId = metadata?.app_user_id || metadata?.appUserId || null;
      const customerEmail = object?.customer?.email || object?.customer_email || object?.email || null;
      const subscriptionId = object?.subscription_id || object?.subscriptionId || data?.subscription_id || null;
      const paymentId = object?.payment_id || object?.id || data?.payment_id || null;
      let userId = null;
      if (appUserId && typeof appUserId === "string") {
        userId = appUserId;
      } else if (customerEmail && typeof customerEmail === "string") {
        const user = await getUserByEmailOrPhone(env, customerEmail);
        if (user) {
          userId = user.id;
        }
      }
      if (!userId) {
        return new Response(JSON.stringify({ received: true, note: "user not resolved" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      try {
        switch (type) {
          case "subscription.active": {
            await upsertSubscriptionForUser(env, userId, {
              status: "active",
              dodo_subscription_id: subscriptionId || null,
              latest_payment_id: paymentId || null
            });
            break;
          }
          case "subscription.renewed": {
            await upsertSubscriptionForUser(env, userId, {
              status: "active",
              dodo_subscription_id: subscriptionId || null,
              latest_payment_id: paymentId || null
            });
            break;
          }
          case "subscription.on_hold": {
            await upsertSubscriptionForUser(env, userId, {
              status: "on_hold",
              dodo_subscription_id: subscriptionId || null
            });
            break;
          }
          case "subscription.cancelled": {
            await upsertSubscriptionForUser(env, userId, {
              status: "cancelled",
              dodo_subscription_id: subscriptionId || null
            });
            break;
          }
          case "subscription.failed": {
            await upsertSubscriptionForUser(env, userId, {
              status: "failed",
              dodo_subscription_id: subscriptionId || null
            });
            break;
          }
          case "subscription.expired": {
            await upsertSubscriptionForUser(env, userId, {
              status: "expired",
              dodo_subscription_id: subscriptionId || null
            });
            break;
          }
          case "payment.succeeded": {
            await upsertSubscriptionForUser(env, userId, {
              status: "active",
              // safe default; subscription will be active during trial/after payment
              dodo_subscription_id: subscriptionId || null,
              latest_payment_id: paymentId || null
            });
            break;
          }
          default:
            break;
        }
      } catch (err) {
        return new Response(`Error handling event: ${type}`, { status: 500 });
      }
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }, "onRequest");
  }
});
function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader)
    return out;
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [k, ...v] = part.trim().split("=");
    if (!k)
      continue;
    out[k] = decodeURIComponent(v.join("=") || "");
  }
  return out;
}
__name(parseCookies, "parseCookies");
function buildCookie(name, value, opts = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (opts.domain)
    parts.push(`Domain=${opts.domain}`);
  parts.push(`Path=${opts.path || "/"}`);
  if (typeof opts.maxAge === "number")
    parts.push(`Max-Age=${opts.maxAge}`);
  if (opts.httpOnly !== false)
    parts.push("HttpOnly");
  if (opts.secure)
    parts.push("Secure");
  parts.push(`SameSite=${opts.sameSite || "Lax"}`);
  return parts.join("; ");
}
__name(buildCookie, "buildCookie");
async function getSession(env, req) {
  const name = env.SESSION_COOKIE_NAME || "imaginea_session";
  const cookies = parseCookies(req.headers.get("Cookie"));
  const sid = cookies[name];
  if (!sid)
    return null;
  const val = await env.SESSIONS_KV.get(sid, { type: "json" });
  if (!val)
    return null;
  if (val.exp < Math.floor(Date.now() / 1e3)) {
    await env.SESSIONS_KV.delete(sid);
    return null;
  }
  return { id: sid, user_id: val.user_id, exp: val.exp };
}
__name(getSession, "getSession");
async function createSession(env, user_id) {
  const ttl = Number(env.SESSION_TTL_SECONDS || "2592000");
  const exp = Math.floor(Date.now() / 1e3) + ttl;
  const id = `s_${crypto.randomUUID()}`;
  const value = { user_id, exp };
  await env.SESSIONS_KV.put(id, JSON.stringify(value), { expirationTtl: ttl });
  const cookie = buildCookie(env.SESSION_COOKIE_NAME || "imaginea_session", id, {
    domain: env.COOKIE_DOMAIN,
    maxAge: ttl,
    httpOnly: true,
    secure: (env.COOKIE_SECURE || "true").toLowerCase() === "true",
    sameSite: env.COOKIE_SAMESITE || "Lax",
    path: "/"
  });
  return { id, exp, cookie };
}
__name(createSession, "createSession");
async function destroySession(env, req) {
  const name = env.SESSION_COOKIE_NAME || "imaginea_session";
  const cookies = parseCookies(req.headers.get("Cookie"));
  const sid = cookies[name];
  if (sid) {
    await env.SESSIONS_KV.delete(sid);
  }
  const expiredCookie = `${name}=; Path=/; Max-Age=0; HttpOnly; ${(env.COOKIE_SECURE || "true").toLowerCase() === "true" ? "Secure; " : ""}SameSite=${env.COOKIE_SAMESITE || "Lax"}${env.COOKIE_DOMAIN ? `; Domain=${env.COOKIE_DOMAIN}` : ""}`;
  return expiredCookie;
}
__name(destroySession, "destroySession");
var init_session = __esm({
  "_utils/session.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    __name2(parseCookies, "parseCookies");
    __name2(buildCookie, "buildCookie");
    __name2(getSession, "getSession");
    __name2(createSession, "createSession");
    __name2(destroySession, "destroySession");
  }
});
function safeJson(input) {
  try {
    return JSON.parse(input);
  } catch {
    return { raw: input };
  }
}
__name(safeJson, "safeJson");
var onRequest2;
var init_checkout_session = __esm({
  "api/checkout-session.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    init_db();
    init_session();
    onRequest2 = /* @__PURE__ */ __name2(async ({ request, env }) => {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
      }
      const session = await getSession(env, request);
      if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      const user = await getUserById(env, session.user_id);
      if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      if (!env.DODO_API_BASE || !env.DODO_API_KEY || !env.PRODUCT_ID) {
        return new Response(JSON.stringify({ error: "Server not configured (DODO_API_BASE/DODO_API_KEY/PRODUCT_ID missing)" }), { status: 500, headers: { "Content-Type": "application/json" } });
      }
      const payload = {
        product_cart: [
          {
            product_id: env.PRODUCT_ID,
            quantity: 1
          }
        ],
        customer: {
          email: user.email,
          name: user.name || void 0,
          phone_number: user.phone || void 0
        },
        allowed_payment_method_types: ["credit", "debit"],
        return_url: env.RETURN_URL || "https://demo.imaginea.store/track",
        metadata: {
          app_user_id: user.id
        }
      };
      const url = new URL("/checkouts", env.DODO_API_BASE).toString();
      try {
        const resp = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.DODO_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const text = await resp.text();
        if (!resp.ok) {
          return new Response(JSON.stringify({ error: "Dodo API error", status: resp.status, body: safeJson(text) }), {
            status: 502,
            headers: { "Content-Type": "application/json" }
          });
        }
        const sessionObj = safeJson(text);
        const checkout_url = sessionObj?.checkout_url || sessionObj?.url || null;
        if (!checkout_url) {
          return new Response(JSON.stringify({ error: "Missing checkout_url in response", raw: sessionObj }), {
            status: 502,
            headers: { "Content-Type": "application/json" }
          });
        }
        return new Response(JSON.stringify({ checkout_url, session: sessionObj }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to create checkout session", detail: err?.message || String(err) }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }, "onRequest");
    __name2(safeJson, "safeJson");
  }
});
function toHex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(toHex, "toHex");
function hexToBytes(hex) {
  if (hex.length % 2 !== 0)
    throw new Error("Invalid hex string");
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}
__name(hexToBytes, "hexToBytes");
function hexToArrayBuffer(hex) {
  const bytes = hexToBytes(hex);
  const buffer = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(buffer);
  view.set(bytes);
  return buffer;
}
__name(hexToArrayBuffer, "hexToArrayBuffer");
function generateSalt(bytes = 16) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  const buffer = new ArrayBuffer(arr.length);
  const view = new Uint8Array(buffer);
  view.set(arr);
  return toHex(buffer);
}
__name(generateSalt, "generateSalt");
async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: hexToArrayBuffer(saltHex),
      // Use the helper function
      iterations: ITERATIONS
    },
    key,
    KEY_LENGTH_BITS
  );
  return toHex(derivedBits);
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, saltHex, expectedHashHex) {
  const computed = await hashPassword(password, saltHex);
  if (computed.length !== expectedHashHex.length)
    return false;
  let out = 0;
  for (let i = 0; i < computed.length; i++) {
    out |= computed.charCodeAt(i) ^ expectedHashHex.charCodeAt(i);
  }
  return out === 0;
}
__name(verifyPassword, "verifyPassword");
var ITERATIONS;
var KEY_LENGTH_BITS;
var init_crypto = __esm({
  "_utils/crypto.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    ITERATIONS = 1e5;
    KEY_LENGTH_BITS = 256;
    __name2(toHex, "toHex");
    __name2(hexToBytes, "hexToBytes");
    __name2(hexToArrayBuffer, "hexToArrayBuffer");
    __name2(generateSalt, "generateSalt");
    __name2(hashPassword, "hashPassword");
    __name2(verifyPassword, "verifyPassword");
  }
});
var onRequest3;
var init_login = __esm({
  "api/login.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    init_crypto();
    init_db();
    init_session();
    onRequest3 = /* @__PURE__ */ __name2(async ({ request, env }) => {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
      }
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { "Content-Type": "application/json" } });
      }
      const identifier = (body.identifier || "").trim();
      const password = (body.password || "").trim();
      if (!identifier || !password) {
        return new Response(JSON.stringify({ error: "identifier and password are required" }), { status: 400, headers: { "Content-Type": "application/json" } });
      }
      const user = await getUserByEmailOrPhone(env, identifier);
      if (!user) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      const ok = await verifyPassword(password, user.salt, user.password_hash);
      if (!ok) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      const session = await createSession(env, user.id);
      const headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Set-Cookie", session.cookie);
      return new Response(
        JSON.stringify({
          user: { id: user.id, email: user.email, phone: user.phone, name: user.name }
        }),
        { status: 200, headers }
      );
    }, "onRequest");
  }
});
var onRequest4;
var init_logout = __esm({
  "api/logout.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    init_session();
    onRequest4 = /* @__PURE__ */ __name2(async ({ request, env }) => {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
      }
      const expired = await destroySession(env, request);
      const headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Set-Cookie", expired);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    }, "onRequest");
  }
});
var onRequest5;
var init_me = __esm({
  "api/me.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    init_session();
    init_db();
    onRequest5 = /* @__PURE__ */ __name2(async ({ request, env }) => {
      if (request.method !== "GET") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
      }
      const session = await getSession(env, request);
      if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      const user = await getUserById(env, session.user_id);
      if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
      const sub = await getSubscriptionForUser(env, user.id);
      return new Response(JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          name: user.name
        },
        subscription: sub ? {
          status: sub.status,
          dodo_subscription_id: sub.dodo_subscription_id,
          latest_payment_id: sub.latest_payment_id,
          updated_at: sub.updated_at
        } : null
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }, "onRequest");
  }
});
var onRequest6;
var init_signup = __esm({
  "api/signup.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    init_crypto();
    init_db();
    init_session();
    onRequest6 = /* @__PURE__ */ __name2(async ({ request, env }) => {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
      }
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { "Content-Type": "application/json" } });
      }
      const email = (body.email || "").trim().toLowerCase();
      const phone = (body.phone || "").trim() || null;
      const name = (body.name || "").trim() || null;
      const password = (body.password || "").trim();
      if (!email && !phone) {
        return new Response(JSON.stringify({ error: "email or phone is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
      }
      if (!password || password.length < 8) {
        return new Response(JSON.stringify({ error: "password must be at least 8 characters" }), { status: 400, headers: { "Content-Type": "application/json" } });
      }
      if (email) {
        const existing = await getUserByEmailOrPhone(env, email);
        if (existing) {
          return new Response(JSON.stringify({ error: "Account already exists for that email/phone" }), { status: 409, headers: { "Content-Type": "application/json" } });
        }
      }
      if (phone) {
        const existing = await getUserByEmailOrPhone(env, phone);
        if (existing) {
          return new Response(JSON.stringify({ error: "Account already exists for that email/phone" }), { status: 409, headers: { "Content-Type": "application/json" } });
        }
      }
      try {
        const salt = generateSalt(16);
        const password_hash = await hashPassword(password, salt);
        const user = await createUser(env, {
          email: email || `phone:${phone}`,
          phone,
          name,
          password_hash,
          salt
        });
        const session = await createSession(env, user.id);
        const headers = new Headers({ "Content-Type": "application/json" });
        headers.append("Set-Cookie", session.cookie);
        return new Response(
          JSON.stringify({
            user: { id: user.id, email: user.email, phone: user.phone, name: user.name },
            message: "Signup successful"
          }),
          { status: 201, headers }
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to create account", detail: err?.message || String(err) }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }, "onRequest");
  }
});
var onRequest7;
var init_verify_payment = __esm({
  "api/verify-payment.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    init_db();
    onRequest7 = /* @__PURE__ */ __name2(async ({ request, env }) => {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
          status: 405,
          headers: { "Content-Type": "application/json" }
        });
      }
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const email = (body.email || "").trim().toLowerCase();
      if (!email) {
        return new Response(JSON.stringify({ error: "email is required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const user = await getUserByEmailOrPhone(env, email);
      if (!user) {
        return new Response(JSON.stringify({ status: "unpaid" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      const sub = await getSubscriptionForUser(env, user.id);
      const isActive = sub?.status === "active";
      return new Response(JSON.stringify({ status: isActive ? "paid" : "unpaid" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }, "onRequest");
  }
});
var onRequest8;
var init_track = __esm({
  "track.ts"() {
    init_functionsRoutes_0_39528541517797966();
    init_strip_cf_connecting_ip_header();
    onRequest8 = /* @__PURE__ */ __name2(async ({ request }) => {
      const target = "https://demo.imaginea.store/track";
      return Response.redirect(target, 302);
    }, "onRequest");
  }
});
var routes;
var init_functionsRoutes_0_39528541517797966 = __esm({
  "../.wrangler/tmp/pages-2sjem2/functionsRoutes-0.39528541517797966.mjs"() {
    init_dodo();
    init_checkout_session();
    init_login();
    init_logout();
    init_me();
    init_signup();
    init_verify_payment();
    init_track();
    routes = [
      {
        routePath: "/api/webhooks/dodo",
        mountPath: "/api/webhooks",
        method: "",
        middlewares: [],
        modules: [onRequest]
      },
      {
        routePath: "/api/checkout-session",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest2]
      },
      {
        routePath: "/api/login",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest3]
      },
      {
        routePath: "/api/logout",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest4]
      },
      {
        routePath: "/api/me",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest5]
      },
      {
        routePath: "/api/signup",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest6]
      },
      {
        routePath: "/api/verify-payment",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest7]
      },
      {
        routePath: "/track",
        mountPath: "/",
        method: "",
        middlewares: [],
        modules: [onRequest8]
      }
    ];
  }
});
init_functionsRoutes_0_39528541517797966();
init_strip_cf_connecting_ip_header();
init_functionsRoutes_0_39528541517797966();
init_strip_cf_connecting_ip_header();
init_functionsRoutes_0_39528541517797966();
init_strip_cf_connecting_ip_header();
init_functionsRoutes_0_39528541517797966();
init_strip_cf_connecting_ip_header();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
init_functionsRoutes_0_39528541517797966();
init_strip_cf_connecting_ip_header();
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
init_functionsRoutes_0_39528541517797966();
init_strip_cf_connecting_ip_header();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
init_functionsRoutes_0_39528541517797966();
init_strip_cf_connecting_ip_header();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = /* @__PURE__ */ __name(class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
}, "__Facade_ScheduledController__");
__name2(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-J5JXoG/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-J5JXoG/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__2, "__Facade_ScheduledController__");
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.7970050832156093.js.map

import {Token} from 'token'
import {Config} from 'config'

class Base {
    constructor() {
        this.baseRestUrl = Config.restUrl;
        this.onPay = Config.onPay;
    }

    request(parms, noRefetch) {
        var that = this;
        if (parms.url.indexOf('/') == 0){
            parms.url = parms.url.slice(1)
        }
        var url = this.baseRestUrl + parms.url;
        if (!parms.type) {
            parms.type = 'GET';
        }
        /*不需要再次组装地址*/
        if (parms.setUrl) {
            url = parms.url;
        }
        var contenType = 'application/x-www-form-urlencoded;charset=utf-8';
        if (Array.isArray(parms.data)||parms.uploadConotenType=='json') {
            contenType = 'application/json';
        }
      var header = {
        'content-type': contenType,
        'cookie': 'wap_rid=' + wx.getStorageSync('wap_rId')
      }
      //         'x-requested-with':'XMLHttpRequest'

      if (parms.formId) {
        header.wap_formid = parms.formId;
      }
        wx.request({
            url: url,
            data: parms.data,
            method: parms.type,
            header:header,
            success: function (res) {
                var code = res.statusCode.toString();
                var startChar = code.charAt(0);
                if (startChar == '2') {
                  if(res.data.code == 4001){
                    // 授权过期
                    if (!noRefetch) {
                      that._refetch(parms)
                    }
                  }else{
                    parms.sCallBack && parms.sCallBack(res.data);
                    parms.sCallback && parms.sCallback(res.data);
                  }
                } else {
                    if (data == '401') {
                        if (!noRefetch) {
                            that._refetch(parms)
                        }
                    }
                    that._processError(res);
                    parms.eCallBack && parms.eCallBack(res.data)
                }
            },
            fail: function (err) {
                that._processError(err);
            }
        })
    }

    _processError(err) {
        console.log(err);
    }

    _refetch(param) {
        var token = new Token();
        token.getTokenFromServer(token => {
            this.request(param, true);
        })
    }

    // 获取元素上绑定的值
    getDataSet(event, key) {
        return event.currentTarget.dataset[key];
    }
    // 简单跳转到某个页面,事件里存在url
    navigatoTo(event,key='to') {
      var url = this.getDataSet(event,key);
      if (!url){
        url = this.getDataSet(event,'url')
      }
      wx.navigateTo({
        url: url,
      })
    }
    /**
     *  * 拉起微信支付
     * params:
     * norderNumber - {int} 订单id
     * 返回参数  1: 支付失败或者支付取消； 2:支付成功；
     */
    execPay(data,callback) {
        var timeStamp = data.timeStamp;
        if (timeStamp) { //可以支付
            wx.requestPayment({
                'timeStamp': timeStamp.toString(),
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': data.signType,
                'paySign': data.paySign,
                success: function () {
                    callback && callback(2);
                },
                fail: function () {
                    callback && callback(1);
                }
            });
        }
    }
}

export {Base}

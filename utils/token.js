import {Config} from 'config';
import {Base} from "./base";
var base = new Base();
class Token {
    constructor(){
        this.verifyUrl = 'https://www.keepbreath.com/customer/' + 'system/member/wap/login.do';
        this.tokenUrl = Config.restUrl + 'system/wechat/member/oauth/login/check.do';
    }
    login(){
      var token = wx.getStorageSync('wap_rId');
       if(!token){
         this.getTokenFromServer()
       }else {

       }
    }
    _veriryFromServer(token){
        var that = this;
        wx.request({
            url: that.verifyUrl,
            method: 'POST',
            success:function (res) {
                var valid = res.data.isValid;
                if (valid){
                    that.getTokenFromServer();
                }
            }
        })
    }
    getTokenFromServer(cb){
      var that = this;
      var userInfo = wx.getStorageSync('userInfo');
      if (userInfo.nickName) {
        userInfo.nickname = userInfo.nickName
      }
      if (userInfo.avatarUrl) {
        userInfo.headImageURL = userInfo.avatarUrl
      }
      wx.login({
        success:(res=>{
            userInfo.code = res.code;
            var param = {
                url : 'system/member/wap/login.do',
                type: "POST",
                data: userInfo
            }
            param.sCallBack = res1=>{
                wx.setStorageSync('wap_rId', res1.data.wap_rId);
                cb && cb(res1);
            }
            base.request(param);
        })
      })
    }

}
export {Token}

const axios = require('axios');
const queryString = require('querystring');

const LOGIN_URL = 'https://login.taobao.com/member/login.jhtml';
const navUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36';
const LOGIN_API = 'https://login.taobao.com/newlogin/login.do?appName=taobao&fromSite=0&_bx-v=2.0.31'

const tabaoLogin = (({username,password}) => {
    return new Promise((resolve,reject) => {
        //登录页面获取token
        const getCookie = axios({
            method: 'get',
            url: LOGIN_URL,
            headers: {
                'user-agent': navUserAgent
            }
        }).then(res => {
            let cookie = res.headers['set-cookie'].join(';');
            let _csrf_token = 'RNb2JQr9B3AYcr3SUw3Rh';
            if(cookie && _csrf_token) {
                return {cookie,_csrf_token};
            }
            reject(new Error('获取页面cookie失败'))
        }).catch(e => {
            reject(new Error(e));
        })
        
        getCookie.then(({cookie,_csrf_token}) => {
            axios({
                method: 'post',
                url: LOGIN_API,
                headers: {
                    'cookie': cookie,
                    'referer': 'https://login.taobao.com/member/login.jhtml?redirectURL=https%3A%2F%2Fmember1.taobao.com%2Fmember%2Ffresh%2Faccount_security.htm',
                    'origin': 'https://login.taobao.com',
                    'user-agent': navUserAgent,
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: queryString.stringify({
                    loginId: username,
                    password2: password,
                    _csrf_token,
                    'returnUrl': 'https://member1.taobao.com/member/fresh/account_security.htm'
                })
            }).then(res => {
                if(res.headers['set-cookie']) {
                    let cookie = res.headers['set-cookie'].join(';');
                    resolve(cookie);
                } else {
                    reject(new Error('no cookie'));
                }
            }).catch(e => {
                reject(e)
            })
        })
    })
})


module.exports = tabaoLogin;
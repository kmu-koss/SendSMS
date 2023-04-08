var express = require("express");
require("dotenv").config();
var CryptoJS = require("crypto-js");
const request = require('request');

const app = express();

function send_message_pass(phone, name) {
    var user_phone_number = phone; //수신 전화번호 기입
    var resultCode = 404;
    const date = Date.now().toString();
    const uri = process.env.SERVICE_ID; //서비스 ID
    const secretKey = process.env.NCP_SECRET_KEY; // Secret Key
    const accessKey = process.env.NCP_KEY; //Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    request(
        {
            method: method,
            json: true,
            uri: url,
            headers: {
                "Contenc-type": "application/json; charset=utf-8",
                "x-ncp-iam-access-key": accessKey,
                "x-ncp-apigw-timestamp": date,
                "x-ncp-apigw-signature-v2": signature,
            },
            body: {
                type: "LMS",
                countryCode: "82",
                from: "01041948536", //"발신번호기입",
                subject: "[KOSS 1차 서류 평가 결과]",
                content: 
`안녕하세요, ${name}님!
추가적인 내용
`, //문자내용 기입,
                messages: [{ to: `${user_phone_number}` }],
            },
        },
        function (err, res, html) {
            if (err) console.log(err);
            else {
                resultCode = 200;
                console.log(html);
            }
        }
    );
    return resultCode;
}

function send_message_nonpass(phone, name) {
    var user_phone_number = phone; //수신 전화번호 기입
    var resultCode = 404;
    const date = Date.now().toString();
    const uri = process.env.SERVICE_ID; //서비스 ID
    const secretKey = process.env.NCP_SECRET_KEY; // Secret Key
    const accessKey = process.env.NCP_KEY; //Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    request(
        {
            method: method,
            json: true,
            uri: url,
            headers: {
                "Contenc-type": "application/json; charset=utf-8",
                "x-ncp-iam-access-key": accessKey,
                "x-ncp-apigw-timestamp": date,
                "x-ncp-apigw-signature-v2": signature,
            },
            body: {
                type: "LMS",
                countryCode: "82",
                from: "01041948536", //"발신번호기입",
                subject: "[KOSS 1차 서류 평가 결과]",
                content: 
`안녕하세요, ${name}님!
추가적인 내용
`, //문자내용 기입,
                messages: [{ to: `${user_phone_number}` }],
            },
        },
        function (err, res, html) {
            if (err) console.log(err);
            else {
                resultCode = 200;
                console.log(html);
            }
        }
    );
    return resultCode;
}

app.get("/sms/:phone/name/:name/pn/:pn", (req, res) => {
    const paramObj = req.params;
    if (paramObj.pn == "p"){
        send_message_pass(paramObj.phone, paramObj.name);
    } else if (paramObj.pn =="n") {
        send_message_nonpass(paramObj.phone, paramObj.name);
    }
        
    res.send("complete!");
});

app.listen(3000, () => {
    console.log(`example app listening on port ${3000}`);
});

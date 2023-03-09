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
`안녕하세요, {}님! 국민대학교 소프트웨어융합대학 오픈소스소프트웨어 학술 동아리 KOSS입니다. 먼저 KOSS에 관심 가지고 지원해 주신 지원자 분들께 감사의 말씀 드립니다.
약 이틀 간 운영진이 지원서를 신중하게 검토하여 1차 합격자를 선발한 결과, 1차 서류 전형에 합격하셨습니다. 축하드립니다!
면접 일정은 3월 12일(일)부터 3월 15일(수) 학교에서 진행될 예정입니다. 예상보다 많은 지원자로 면접 일정이 늘어나게 된 점 양해 부탁드립니다. 상세한 면접 일정은 하단 링크를 통해 코스 서류 합격자 슬랙에서 확인하실 수 있습니다.
불가피하게 면접 시간을 변경해야 할 경우 금일(3월 10일) 22시까지 면접 시간 조율을 받을 예정이며, 조정된 면접 시간은 3월 11일 18시 이전까지 재공지할 예정입니다. 면접 시간 조정은 최대한 삼가주시길 바랍니다! 자세한 면접 조정 양식은 슬랙 공지사항을 통해 확인하실 수 있습니다.
코로나19 확진자의 경우에도 금일 22시까지 슬랙 내 [운영진] 김지윤에게 DM으로 보내주시길 바랍니다.
KOSS에 관심 가지고 지원해 주신 지원자 분들께 다시 한 번 감사의 말씀 드립니다. 국민대학교 소프트웨어융합대학 KOSS였습니다.
합격자 슬랙 링크: https://join.slack.com/t/kossrecruitting/shared_invite/zt-1qzm6ie0x-PIvXw~4ONhBGXjuO7~RxsA`, //문자내용 기입,
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
`안녕하세요, {}님! 국민대학교 소프트웨어융합대학 오픈소스소프트웨어 학술 동아리 KOSS입니다. 먼저 KOSS에 관심 가지고 지원해 주신 지원자 분들께 감사의 말씀 드립니다.
약 이틀 간 운영진이 지원서를 신중하게 검토하여 1차 합격자를 선발한 결과, 1차 서류에 불합격하셨습니다. 저희에게 과분한 인재들이 많이 지원해 주셔서 함께하지 못한 분들에게 대단히 죄송하다는 말씀 전합니다.
KOSS에 관심 가지고 지원해 주신 지원자 분들께 다시 한 번 감사의 말씀 드립니다. KOSS는 국민대학교 재학생을 항상 응원합니다. 앞으로도 많은 관심 부탁드립니다.`, //문자내용 기입,
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

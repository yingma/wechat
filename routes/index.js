var express = require('express');
var winston = require('winston');
var url = require('url');
var logger = new winston.Logger();
var router = express.Router();

var java = require('java');
java.classpath.push('commons-codec-1.9.jar');
java.classpath.push('wechat.jar');
var Test = java.import('com.qq.weixin.mp.aes.WXBizMsgCrypt');
//var wscpt = java.newInstanceSync('com.qq.weixin.mp.aes.WXBizMsgCrypt', 'ED5UjtD2R','i3ORasWeup2eBaYhBwz7RJCvedDOai8bG3oEmtV8AXW', "wx5823bf96d3bd56c7");
var wscpt = java.newInstanceSync('com.qq.weixin.mp.aes.WXBizMsgCrypt', 'ED5UjtD2R', 'i3ORasWeup2eBaYhBwz7RJCvedDOai8bG3oEmtV8AXW', 'wx1cfb006e6e922a84');



//console.log(wscpt.VerifyURLSync('5c45ff5e21c57e6ad56bac8758b79b1d9ac89fd3', '1409659589', '263014780', 'P9nAzCzyDtyTWESHep1vC5X9xho/qYX3Zpb4yKa9SKld1DsH3Iyt3tP3zNdtp+4RPcs8TgAE7OaBO+FZXvnaqQ=='));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {

  res.render('index', { title: 'Login'});

});

router.get('/wechat_callback', function(req, res, next) {


//    GET /login?msg_signature=6a297b61a9dc8d3dd6e56f6bddbee27a08ab2080&timestamp=1453647699&nonce=595096640&echostr=WeiGaJPCT0B4MtAv9cMvMXxseeXT%2F4WXH1AaWkq8Trcn204PuBOKRo2w2nDQYHLpZt%2FZSemsTAFL8XEJxmiBEw%3D%3D    

	//console.log(req.url);
	var queryData = url.parse(req.url, true).query;
		
	var response = wscpt.VerifyURLSync(queryData.msg_signature, queryData.timestamp, queryData.nonce, queryData.echostr);

	res.end(response); 

})
.post('/wechat_callback', function(req, res, next) {

	var queryData = url.parse(req.url, true).query;

	var body = '';

	req.on('data', function (data) {
		
		body += data;
		
	});
	
	req.on('end', function() {

		var text = wscpt.DecryptMsgSync(queryData.msg_signature, queryData.timestamp, queryData.nonce, body);	
	        console.log(text);
		res.end(wscpt.EncryptMsgSync(text, queryData.timestamp, queryData.nonce));	


		// request to send thank you receiver 
		
		
	
	});

})

;




module.exports = router;


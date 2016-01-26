var request = require('request');
var bodyParser = require('body-parser');



// login to wechat
request({
    url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken', //URL to hit
    qs: {corpid: 'wx1cfb006e6e922a84', corpsecret:'HLA5l8HE1Hy-j1cKjqBB_7oTlUL85cpxCXEuXDbmOUTR11D-bbgZ6IZjW7xWcYwg'}, //Query string data
    method: 'GET'
}, function(error, response, body){
    if(error) {
         console.log(error);
    } else {
         console.log(response.statusCode, body);
    }

    // create department
    var json = JSON.parse(body);

 /* send message
 *  touser => 'UserID1|UserID2|UserID3',
 *  toparty => 'PartyID1 | PartyID2 ',
 *  totag: 'TagID1 | TagID2 ',
 *  msgtype => 'image', 'text', 'news'
 *  agentid => 1,
 *
 *  text : {
 *    content => 'something'
 *  },
 *  image : {
 *  	media_id => 'MEDIA_ID'
 *  },
 *  voice : {
 *      media_id => 'MEDIA_ID'
 *  }
 *  video : {
 *      media_id => 'MEDIA_ID'
 *	title  => 'sometitle'
 *	description => 'Description'
 *  }
 *  file : {
 *      media_id => 'MEDIA_ID'
 *  }
 *  news : {
 *	articles : [
 *	    {
 *		title => 'title'
 *		description => 'Description',
 *		url => 'URL',
 *		picurl => 'PIC_URL'
 *	    }
 *	]	
 *
 *  }
 *  safe : 0
 *
 */

    request({
        url: 'https://qyapi.weixin.qq.com/cgi-bin/message/send',
        qs : {access_token: json.access_token},
        method: 'POST',
        json : {touser : 'Dragon', msgtype : 'text', agentid : 73, text : {content : 'thank you'}, safe : 0}
    }, function(error, response, body) {
                if (error) {
                        console.log(error);
                } else {
                        console.log(response.statusCode, body);
                }


    });



});




var request = require('request');
var bodyParser = require('body-parser');
var events = require('events');
var fs = require('fs');
var EventEmitter = events.EventEmitter;

var flowController = new EventEmitter();


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


    flowController.on('start', function() {


 /*
 * Create Department
 * name => 'Department' (required) 
 * parentid => '1' (required)
 * order = '1'
 * */
    	request({
		url: 'https://qyapi.weixin.qq.com/cgi-bin/department/create',
		qs : {access_token: json.access_token},
		method: 'POST',
		json : { name : 'test_department', parentid : 1, order : 1, id : 5 }
    	}, function(error, response, body) {
		
		console.log('------------create department---------------');

		if (error) {
			console.log(error);
			process.exit();
		} else {
			console.log(response.statusCode, body);
		}
    	});

	flowController.emit('1');

    });

    
    flowController.on('1', function() {


/*
 * Create user
 * name => 'testname'
 * department => [1,2] (required)
 * position => 'manager'
 * mobile => '111111111' (required)
 * tel => '1111111'
 * gender => 1 0 for male 1 for female
 * weixinid => 'maying' (required)
 * email => 'test@email.com'
 * */

    	request({
        	url: 'https://qyapi.weixin.qq.com/cgi-bin/user/create',
        	qs : {access_token: json.access_token},
        	method: 'POST',
        	json : { name : 'test user', userid : 'test_user', department : [5], position:'manager', mobile:'16463274559', email:'yngma@yahoo.com', weixinid:"ying_ma_cn1" }
    	}, function(error, response, body) {

		console.log('--------------create user-------------------');
                if (error) {
                        console.log(error);
			process.exit();
                } else {
                        console.log(response.statusCode, body);
                }


    	});

	flowController.emit('2');

    });


    flowController.on('2', function() {

/* send invite 
 * userid => 'testuser'
 * invite_tips => 'please follow .....'
 */

  	request({
        	url: 'https://qyapi.weixin.qq.com/cgi-bin/invite/send',
        	qs : {access_token: json.access_token},
        	method: 'POST',
        	json : {userid : 'test_user'}
    	}, function(error, response, body) {

		console.log('-------------send invite-----------------');

                if (error) {
                        console.log(error);
			process.exit();
                } else {
                        console.log(response.statusCode, body);
                }


    	});
	
	flowController.emit('3');

    });


    flowController.on('3', function() {


/* create tag
 * tagname1 => tagtest
 * tagid => 1
 */

    	request({
        	url: 'https://qyapi.weixin.qq.com/cgi-bin/tag/create',
        	qs : {access_token: json.access_token},
        	method: 'POST',
        	json : {tagname : 'tagtest', tagid : 2}
    	}, function(error, response, body) {

		console.log('-------------create tag-----------------------');
                if (error) {
                        console.log(error);
			process.exit();
                } else {
                        console.log(response.statusCode, body);
                }


    	});

	flowController.emit('4');

    });


    flowController.on('4', function() {
   

/*
 * add user to tag
 *
 *	tagid => 1
 *	userlist => ["user1", "user2"] 
 * 
 */

    	request({
        	url: 'https://qyapi.weixin.qq.com/cgi-bin/tag/addtagusers',
        	qs : {access_token: json.access_token},
        	method: 'POST',
        	json : {tagid : 2, userlist : ['test_user'], partylist : [5]}
    	}, function(error, response, body) {

		console.log('------------add user to tag ------------------');
                if (error) {
                        console.log(error);
			process.exit();
                } else {
                        console.log(response.statusCode, body);
                }


    	});

	flowController.emit('5');

    });


    flowController.on('5', function() {

 
/* get tag list
 */

    	request({
        	url: 'https://qyapi.weixin.qq.com/cgi-bin/tag/get',
        	qs : {access_token: json.access_token, tagid : 2},
        	method: 'GET',
    	}, function(error, response, body) {
                
                console.log('---------------list tag --------------------');
		if (error) {
                        console.log(error);
                } else {
                        console.log(response.statusCode, body);
                }


    	});

	flowController.emit('6');

     });


    
     flowController.on('6', function() {

	var formData = {		

		value: fs.createReadStream('./test.png'),
		filename: 'test.png',
		contentType : 'image/png'	

	}


     
/* set application
 *  *  */

        request({
                url: 'https://qyapi.weixin.qq.com/cgi-bin/material/add_material',
                qs : {access_token: json.access_token, agentid : 73, type : 'image'},
                method: 'POST',
		formData : formData		
			
        }, function(error, response, body) {
                if (error) {
                        console.log(error);
                } else {

			console.log('---------------upload photo-------------------');
			
                        console.log(response.statusCode, body);
		
			var photo = JSON.parse(body);

			
			
			/// set up image
			request({
                		url: 'https://qyapi.weixin.qq.com/cgi-bin/agent/set',
                		qs : {access_token: json.access_token},
                		method: 'POST',
                		json : {agentid : 73, logo_media : photo.media_id, report_location_flag : 0, name : 'test app', description : 'test agent', /*redirect_domain : 'compute-1.amazonaws.com',*/ isreportuser : 0, isreportenter : 0}

        		}, function(error, response, body) {

                		console.log('---------------set agent-------------------');
                		if (error) {
                        		console.log(error);
                		} else {
                        		console.log(response.statusCode, body);
                		}
        		});


                }
        });

	

     });


 /*  add one menu 
 *   
 *    
 **/

        request({
                url: 'https://qyapi.weixin.qq.com/cgi-bin/menu/create',
                qs : {access_token: json.access_token, agentid : 73},
                method: 'POST',
                json : {button: [{ type : 'pic_weixin', name : 'select photo', key : 'photo'}]}
        }, function(error, response, body) {

                console.log('------------add menu ------------------');
                if (error) {
                        console.log(error);
                        process.exit();
                } else {
                        console.log(response.statusCode, body);
                }


        });





     flowController.emit('start');


});


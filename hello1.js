var request = require('request');
request('https://graph.facebook.com/v2.6/1323249621067682?fields=first_name,last_name&access_token=EAAMZCuJeEMZBgBAO7tdtSO7ZCGTE8eZCTQTCEzycc3D2qzwDtSqhcqRLVgYQZC4ByZAi4oyJZApwZAfPpuxN7QzEVNmuZBoeKR7HVpTIIFTKWroDjnMfKfJWVaW1kmmLfY26LmDD9AVdMm9YGK8da5btQ1o4oy5ZAZBwXhZBVmjYVc8wXAZDZD', function (error, response, body) {

  if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);

    console.log(info.first_name+" "+info.last_name) // Show the HTML for the Google homepage.
  }
})

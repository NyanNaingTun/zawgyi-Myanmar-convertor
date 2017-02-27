'use strict'
const JsonDB = require('node-json-db')
const express=require('express')
const speakeasy = require('speakeasy')
const bodyParser=require('body-parser')
const request=require('request')
const app=express()


/*
	add page token number in token variable
*/

const token=""
/*
	add webhook  user token number in webtoken variable
*/


const fontcanger=require('./mm_proc.js')


let reply=""
app.set('port',(process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/',function(req,res){
	res.send("font Changer")
})
app.listen(app.get('port'),function(){
	console.log(app.get('port')+" port is running")
})
app.get('/webhook/',function(req,res)
{

	console.log(req.query['hub.verify_token'])
	if(req.query['hub.verify_token']==="flamelion")
	{
		console.log("success")
		res.send(req.query['hub.challenge'])
	}
	console.log("fail")
	res.send("Wrong Token")
})
app.post('/webhook/',function(req,res)
{


    let messaging_events=req.body.entry[0].messaging
    for(let i=0;i<messaging_events.length;i++)
    {
      let event =messaging_events[i]
			let sender=event.sender.id

        if(event.message && event.message.text)
        {
            if(event.message.is_echo!=true)
            {
              			let message=event.message.text;

										if(message.startsWith("#ws#"))
										{
												console.log("enter")
												var arr=fontcanger.splitUnicodeWord(message)
													reply=arr.toString()
										}
                    else if(fontcanger.detectFont(message)==="unicode")
                    {
                      reply=fontcanger.convert_Zaw_Gyi(message)

                    }

                    else {
                      reply=fontcanger.convert_MM_UNI(message)
                    }
										console.log(message)
										var strlenght=fontcanger.getUnicodeWordLength(message)
										var totalength="Total Word length="+strlenght+"\n"
										reply=totalength+reply
										var ii=1
										var start=0
											do{
													var end=+start+625
													var substring= reply.substring(start,end)
													substring="["+ii+"]>>"+substring
													ii=ii+1
													sendText(sender,substring)
													start=end
												}while(start<=reply.length)

            }
            else {
                	{reply=event.message.text
										  sendText(sender,reply)
									}
            }


        }
  }
  	res.sendStatus(200);
})
function sendText(sender,text)
{

	let messageData={text:text}
	request(
	{
		url:'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
	        method: 'POST',
		json:{
			recipient:{id:sender},
			message: messageData
		},function(error,response,body){
			if(error)
			{	console.log("sending errror")}
			else if(response.body.error)
			{
				console.log("response body error")
			}
		}

	})
}

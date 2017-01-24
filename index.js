'use strict'

const express=require('express')
const bodyParser=require('body-parser')
const request=require('request')
const app=express()
app.set('port',(process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
let token="EAAMZCuJeEMZBgBAO7tdtSO7ZCGTE8eZCTQTCEzycc3D2qzwDtSqhcqRLVgYQZC4ByZAi4oyJZApwZAfPpuxN7QzEVNmuZBoeKR7HVpTIIFTKWroDjnMfKfJWVaW1kmmLfY26LmDD9AVdMm9YGK8da5btQ1o4oy5ZAZBwXhZBVmjYVc8wXAZDZD"
app.get('/',function(req,res){
	res.send("Hi I am a chatbot")
})

app.get('/webhook/',function(req,res)
{
	if(req.query['hub.verify_token']==="flamelion")
	{
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong Token")
})
app.post('/webhook/',function(req,res)
{
	let messaging_events=req.body.entry[0].messaing_events
	for(let i=0;i<messaging_events.length;i++)
	{
		let event =messaging_events[i]
		let sender=event.sender.id
		if(event.message && event.message.text)
		{
		  let text=event.message.text
		  sendText(sender,text)
		}
	}
	res.sendStatus(200)
})
function sendText(sender,text)
{
	let messageData={text:text}
	request(
	{
		url:"https://graph.facebook.com/v2.6/me/messages",
		qs: {access_token,token},
	        method: "POST",
		json:{
			recept:{id:sender},
			message:messageData
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
app.listen(app.get('port'),function(){
	console.log("running: port")
})

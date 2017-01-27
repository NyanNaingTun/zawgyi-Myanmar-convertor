'use strict'
constJsonDB = require('node-json-db')
let db = new JsonDB("myDataBase", true, false);
const express=require('express')
const bodyParser=require('body-parser')
const request=require('request')
const pageid=726290937520808
const app=express()
let hello={}
app.set('port',(process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const token="EAAMZCuJeEMZBgBAO7tdtSO7ZCGTE8eZCTQTCEzycc3D2qzwDtSqhcqRLVgYQZC4ByZAi4oyJZApwZAfPpuxN7QzEVNmuZBoeKR7HVpTIIFTKWroDjnMfKfJWVaW1kmmLfY26LmDD9AVdMm9YGK8da5btQ1o4oy5ZAZBwXhZBVmjYVc8wXAZDZD"
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
	let messaging_events=req.body.entry[0].messaging
	for(let i=0;i<messaging_events.length;i++)
	{
		let event =messaging_events[i]
		console.log(event)
		console.log("ss----------")
	        if(event.message && event.message.text)
		{
			let message=event.message.text
			let reply=""
			                console.log(event)
                console.log("----------")
                console.log(event.sender)
                let sender=event.sender.id
                console.log(event.message)
                console.log("ee----------")
			message=message.toUpperCase()
			if(message.indexOf('COMMAND_LIST') >-1)
			{
				console.log(sender +"-"+"type help")		
				reply="Avaliable commandlines.\n================\n1. Register\n2. Pass_code {key_code}\n3. Add_Command {key_command}\n4. Remove_command {key_command}\n5. Command_List\n6. Show_IOT_URL {key_command}\n7. help\n8. About\n\n The word {word} will be your desired word that should not included special characters{-\"_,#$!...etc} and space."
			}
			else if(message.indexOf('   ')>-1)			{
//			 var fs = require('fs');
//			 let data = JSON.parse(fs.readFileSync('c.json', 'utf8'));

			
//				fs.writeFile('c.json', JSON.stringify({ "led":"on" }, null, 2));
			}
			else if(message.indexOf('HELP'.toUpperCase())>-1)
			{
				console.log(sender+"-"+"help")
				reply="First, You must be register in our system and then Pass_code for security reason.\n The system gives you API key and save your Passcode(Refer..1 and 2)\nAfter that, you  can add command further,you can request using it from your IOT(Ref:3).\n   In your IOT. you can use get request the following url:\n https://flamelion.herokuapp.com/action?api={api_key}&pc={pass_code}&com={key_command}\n In messager, To send command with value, you message to us like that {key_command} {value}. \n\n For Display List of Commands. Type \" Command_List \" " 
			}
			else if(message.indexOf('ABOUT'.toUpperCase())>-1)
			{
				console.log(sender+"-"+"About")
				reply="We purpose for IOT learner. Not for Commerical use. Owner.. flamelion Nyan"
			}
			else
			{
				console.log(sender+"-"+message)
				reply="Don't know Command. Type 'help'"
				
			}
			sendText(sender,reply)
		}
		
	}

	res.sendStatus(200)
})
function request_URL(sender,url,txt)
{
    let send=""
    request(url,function(error,response,body)
    {
	

                                                if (!error && response.statusCode == 200) {
                                                        let info = JSON.parse(body)
                                                        if(info.first_name || info.last_name)
                                                        {
                                                                let send=info.first_name+" "+info.last_name
                                                                console.log(send)
                                                                console.log('dan dan')
 								let text=send+"!\n I am bot. I am saying as you say:\n"+txt
						                sendText(sender,text)
                                                        }
                                                }

    })
console.log(send)
 return send
}

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
app.get('/action',function(req,res){
	let fs = require('fs')
       let config = JSON.parse(fs.readFileSync('c.json', 'utf8'));
	res.send(config)

})
app.listen(app.get('port'),function(){
	console.log("running: port")
})

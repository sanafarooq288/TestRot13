const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
const app = express()
app.use(cors());

app.use(bodyParser.json());
var redis =require('redis')
client = redis.createClient();
  
  
  app.route('/Encryption').post(function (req, res) {
    var obj = JSON.parse((req.body.user));
    console.log(obj.name);

    var response = "";
    var value="";
    for(var key in obj)
    {
        if (obj.hasOwnProperty(key))
        {
            console.log(key + " -> " + obj[key]);
            var str = obj[key] + "-0";
            await  client.get(str, function(err, msg)
            {
                if(msg == null)
                {
                    value = EncryptionR(obj[key]);
                    console.log(obj[key]);
                    console.log(value);
                    await client.set(str, value);
                  //  res.send(value);
                    response += (key + " : " + value + " , ");
                    console.log(response);
                }
                else
                {
                    response += (key + " : " + msg + " , ");
                    console.log(obj[key]);
                   // res.send(msg);    
                    console.log(msg);
                    console.log('All already present');
                }
        })
        }   
    }
    console.log(response);
    res.send(response);
  });

await function EncryptionR(text1)
{
//var text1="Ajmal";    
var i = 0;
var cipher = "";

for(i = 0; i < text1.length; i++) {
    var index = text1.charCodeAt(i);
  
      if((index >= 65) && (index <= 90))
      { var n = ((index - 65 + 3) % 26) +65; }
      if((index >= 97) && (index <= 122))
      { var n = ((index - 97 + 3) % 26) + 97; }
  
    cipher += String.fromCharCode(n);
    }
  
  console.log(cipher);
    return cipher;
}
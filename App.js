const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
const app = express()
app.use(cors());
app.use(bodyParser.json());

var redis =require('ioredis')
client = redis.createClient();

app.route('/Decryption').post( async function (req, res) {
    var obj = JSON.parse((req.body.user));
   

    var response = "{";
 
    for(var key in obj)
    {
        if (obj.hasOwnProperty(key))
        {
           
            const msg = await client.get( obj[key])
            {
                if(msg == null)
                {
                    var value = DecryptionR(obj[key]);
                    console.log(value);
                    await client.set(obj[key], value);
                     response += '"'+ (key + '":' + '"'+ value + '",');
                }
                else
                {
                    response += '"'+(key + '":'+ '"'+  msg + '",');
                   
                    console.log(msg);
                    console.log('All already present');
                }
        }
        }   
        
    }
    response = response.replace(response[(response.length-2)], "}");
    res.send(response);
    
  });

  app.route('/Encryption').post( async function (req, res) {
    var obj = JSON.parse((req.body.user));


    var response = "{";
    
    for(var key in obj)
    {
        if (obj.hasOwnProperty(key))
        {
           
            const msg = await client.get( obj[key])
            {
                if(msg == null)
                {
                  var value = EncryptionR(obj[key]);
                 
                    await client.set(obj[key], value);
                   
                    response += '"'+ (key + '":' + '"'+ value + '",');
                   
                   
                }
                else
                {
                    response += '"'+(key + '":'+ '"'+  msg + '",');
                   
                    console.log('All already present');
                }
        }
            }
    }


    var str2 = response.slice(0, -1) + '}';
   // response.replace(/.$/,"}")
 //  response.replace(response[(response.length-1)], "}");

    console.log(str2);
    res.send(str2);
  });

   




function EncryptionR(text1)
{
   
var i = 0;
var cipher = "";

  for(i=0; i<text1.length; i++)
  {      
    var index = text1.charCodeAt(i);

      
    if((index >= 65) && (index <= 90))
    {
    if((index +13) <=90)
    {
      var n = index + 13;

    }
   else
    {
        var n = index + 13 -90 +65-1;
       // var n= 65 + a -1;
      //  console.log(n);
    }

 
     }
     else
     {
     if((index >= 97) && (index <= 122))
     {
        if((index +13) <=122)
        {
          var n = index + 13;
    
        }
    
        else
        {
            var n = index +13 -122 +97-1;
          //  var n= a + 97-1;
        }
       
     }
    }

     cipher += String.fromCharCode(n);
    }
 
  
  console.log(cipher);
    return cipher;
}




function DecryptionR(text1)
{
   
var i = 0;
var cipher = "";
 console.log(text1);
 for(i=0; i<text1.length; i++)
 {      
   var index = text1.charCodeAt(i);
  
  

     
   if((index >= 65) && (index <= 90))
   {
   if((index -13) >=65)
   {
     var n = index -13;
    

   }
  else
   {
       var n = index -65 -13 +90 +1;
       
     
   }


    }
    else
    {
    if((index >= 97) && (index <= 122))
    {
       if((index -13) >=97)
       {
         var n = index -13;
   
       }
   
   
       else
       {
           var n = index -97 -13 +122 +1;

       }
      
    }

    }

  cipher += String.fromCharCode(n);
  }
  console.log(cipher);
    return cipher;
}





app.listen(4000)
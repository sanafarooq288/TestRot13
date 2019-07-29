var redis =require('redis')
client = redis.createClient();

var str = 'sana';

//var text1="sana";    
var i = 0;
var cipher = "";
console.log(str);
  for(i=0; i<str.length; i++)
  {
    var index = str.charCodeAt(i);

      
    if((index >= 65) && (index <= 90))
    {
    if((index -13) >=65)
    {
      var n = index -13;
      console.log(n);

    }
   else
    {
        var n = index -65 -13 +90 +1;
        
        console.log(n);
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

     cipher += String.fromCharCode(n);
    }
  }
  console.log(cipher);
    





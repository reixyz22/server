const Discord = require('discord.js');
const { prefix, token } = require ('./config.json')
const client = new Discord.Client();
var users= []
var ping= []
var count = 0
var countgame = 0
var index = null
var xrandomindex= []
var msg= 0


//copy/pasted shuffle array function, used to make one random index
function shuffle(array) {
    var currentIndexz = ping.length -1, temporaryValue, randomIndex
  
    // it is what it is
    array[0]=0
    while (0 !== currentIndexz) {
      array[currentIndexz] = currentIndexz;
      currentIndexz -= 1;
    }
   //copy/pasted shuffle array function, used to make one random index-- copy/paste starts here
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
      console.log(xrandomindex)
  }
// added 5/28, should make the bot fully functional | takes the randomized index and applies it to any array, can be reusused on multiple arrays deterministically
  function shuffle(array) {
    var currentIndex = array.length -1, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = xrandomindex[currentIndex];
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
   array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
}
return array;
}

client.once('ready', () => {
    console.log('Ready!')
})
//!q
client.on('message', message => {
     if(message.content.startsWith(`${prefix}q`))        
        if (ping.includes(message.author))
         message.channel.send("You are already in the queue!")
        else 
        { users[0 + count] = message.author.username
         ping[0 + count] = message.author
         count = count + 1
         message.channel.send("You have been added the the queue.") } 
// !r
     else if(message.content.startsWith(`${prefix}r`))
         if (ping.includes(message.author)) {
            index = ping.indexOf(message.author);
            if (index > -1) {
              users.splice(index, 1)
              ping.splice(index, 1);
            }
            message.channel.send("You have been removed from the queue.") 
            count = count - 1}
         else message.channel.send("You are not in the queue!")
// !n        
     else if(message.content.startsWith(`${prefix}n`))   
     //play game if more than two people 
        if (count > 1)
            {if (countgame == count -1 ) {
              message.channel.send("The queue is being shuffled.")
              shuffle(xrandomindex)
              shuffleassign(ping)
              shuffleassign(users)
              countgame = 0 } 
              var xrandomindex= []
          message.channel.send ((ping)[countgame] + " is currently asking " + (ping)[countgame + 1] )
          countgame = countgame +1
          msg = count - countgame 
        }
     else message.channel.send("Too few players to start the game.")

//!d
     else if(message.content.startsWith(`${prefix}d`))     
     {message.channel.send("**The current queue is:**")
      message.channel.send(users) 
      message.channel.send(count + " Players currently in queue.\n " + msg + "T/D Remaining untill next randomization.")
    }
//!bug
      else if(message.content.startsWith(`${prefix}bug`)) 
      {message.channel.send("!q")
        }
//!p       
      else if(message.content.startsWith(`${prefix}p`)) 
        {message.channel.send("**The queue has been purged.**")        
        users = []
        ping = [] 
        count = 0
        msg = 0
      }
})

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

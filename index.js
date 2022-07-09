const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Hello, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'Stranger'}`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('new_game', async(ctx) => {
    try {
        await ctx.replyWithHTML('<b> Make your choice </b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Rock 🪨', 'rockbtn'), Markup.button.callback('Scissors ✂️', 'scissorsbtn'), Markup.button.callback('Paper 📄️', 'paperbtn')]
            ]
        ) )
    } catch(e) {
        console.error(e)
    }

})
// // Make a bot choice
const getBotChoice = () => {
    const botChoice = Math.floor(Math.random() * 3);
    if (botChoice === 0) {
        return 'rock';
    } else if (botChoice === 1) {
        return 'paper';
    } else if (botChoice === 2) {
        return 'scissors';
    };
};



const determineWinner = (userChoice, botChoice) => {
    if (userChoice === 'bomb') {
        return 'User win!!!';
    } else if (userChoice === 'rockbtn' & botChoice === 'rock' || userChoice === 'scissorsbtn' & botChoice === 'scissors' || userChoice === 'paperbtn' & botChoice === 'paper') {
        return 'It is a draw! 👋'
    } else {
        if (userChoice === 'rockbtn') {
            if (botChoice === 'paper') {
                return  'User lose! 🙁';
            } else {
                return  'User win! 👏';
            };
        } else if (userChoice === 'paperbtn') {
            if (botChoice === 'rock') {
                return  'User win! 👏';
            } else {
                return  "User lose! 🙁";
            };
        } else if (userChoice === 'scissorsbtn') {
            if (botChoice === 'paper') {
                return 'User win! 👏';
            } else if (botChoice === 'rock') {
                return 'User lose! 🙁'
            }
        }
    }
}



function getUserChoice (userChoice) {
    bot.action(userChoice, async (ctx) => {
        try {
            let botChoice = getBotChoice();
            await ctx.answerCbQuery();
            if (userChoice === 'rockbtn') {
                await ctx.replyWithHTML(`<b> Your </b> choice is <b> rock </b>`)
                await ctx.replyWithHTML(`<b> Bot </b> choice is <b> ${botChoice} </b>`)
                await ctx.replyWithHTML(` The game result is: <b> ${determineWinner(userChoice, botChoice)} </b>`)
                // return userChoice;
            } else if (userChoice === 'scissorsbtn') {
                await ctx.replyWithHTML(`<b> Your </b> choice is <b> scissors </b>`)
                await ctx.replyWithHTML(`<b> Bot </b> choice is <b> ${botChoice} </b>`)
                await ctx.replyWithHTML(` The game result is: <b> ${determineWinner(userChoice, botChoice)} </b>`)

                // return userChoice;
            } else if (userChoice === 'paperbtn') {
                await ctx.replyWithHTML(`<b> Your </b> choice is <b> paper </b>`)
                await ctx.replyWithHTML(`<b> Bot </b> choice is <b> ${botChoice} </b>`)
                await ctx.replyWithHTML(` The game result is: <b> ${determineWinner(userChoice, botChoice)} </b>`)
                // return userChoice;
            }
            //await ctx.replyWithHTML(`<b> The result is ${determineWinner(userChoice, botChoice)} </b>`)

        } catch(e) {
            console.error(e)
        }
    })
}

getUserChoice('rockbtn')
getUserChoice('scissorsbtn')
getUserChoice('paperbtn')
















bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
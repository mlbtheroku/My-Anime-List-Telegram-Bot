import TelegramBot from 'node-telegram-bot-api';
import {cache} from './cache/cache.js'
import filter from './services/filterContent.js'

const token = "6356894716:AAFKniX_OeErKo3gUfS0pryfbrIo6lkxDRg"
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/anime_rank (.+)/, async function (msg , match){
    const id = msg.chat.id;
    let args = match[1].split(/[ ,]+/);
    let position = Number.isInteger(parseInt(args[1]))? parseInt(args[1]) : 10;
    
    let content = await filter(args[0]);
    if(!content){
        return bot.sendMessage(id, "Incorrect Word, read the documentation for more informations")
    };

    let result = await cache(content)
    let formatedResult = result.slice(0, position+1).join("\n")
    return bot.sendMessage(id, formatedResult, {parse_mode: 'Markdown', disable_web_page_preview: true});
})

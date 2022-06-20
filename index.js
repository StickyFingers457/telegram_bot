const {
    Telegraf,
    Markup
} = require('telegraf');
require("dotenv").config();
const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(
    `Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}! 👋 
    ${text.startText + text.commands}`)
);
bot.help((ctx) => ctx.replyWithHTML(`${text.helpText + text.commands}`));

bot.command('guide', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Справочник</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('🤠 Наше Руководство 🤠', 'btn_1')],
                [Markup.button.callback('💡 Наша Идеология 💡', 'btn_2')],
                [Markup.button.callback('🗓️ Режим Работы 🗓️', 'btn_3')],
                [Markup.button.callback('📌 Внутренние Нормативные Документы 📌', 'btn_4')],
                [Markup.button.callback('🕔 Учет и Оплата Рабочего Времени 💰', 'btn_5')],
                [Markup.button.callback('🎫 Правила Командирования Сотрудников 🎫', 'btn_6')],
                [Markup.button.callback('🏖️ Как Уйти в Отпуск 🏖️', 'btn_7')],
                [Markup.button.callback('✅ Корпоративные привилегии для сотрудников ✅', 'btn_8')],
                [Markup.button.callback('👽 FAQ о Жизни Компании 👽', 'btn_9')],
            ]
        ))
    } catch (e) {
        console.error(e)
    } 
});

function addAction(name) {
    bot.action(name, async ctx => {
        try {
            await ctx.answerCbQuery()

            if (name === 'btn_1') {
                await ctx.replyWithHTML(text.text1)
            }
            if (name === 'btn_2') {
                await ctx.replyWithHTML(text.text2)
            }
            
            if (name === 'btn_3') {
                await ctx.replyWithHTML(text.text3)
            }

            if (name === 'btn_4') {
                await ctx.replyWithHTML(text.text4)
            }

            if (name === 'btn_5') {
                await ctx.replyWithHTML(text.text5)
            }

            if (name === 'btn_6') {
                await ctx.replyWithHTML(text.text6)
            }

            if (name === 'btn_7') {
                await ctx.replyWithHTML(text.text7)
            }

            if (name === 'btn_8') {
                await ctx.replyWithHTML(text.text8,{
                    disable_web_page_preview: true
                })
            }

            if (name === 'btn_9') {
                await ctx.replyWithHTML(text.text9)
            }
        } catch (e) {
            console.error(e)
        }
    })
}

addAction('btn_1')
addAction('btn_2')
addAction('btn_3')
addAction('btn_4')
addAction('btn_5')
addAction('btn_6')
addAction('btn_7')
addAction('btn_8')
addAction('btn_9')

bot.on('message', async (ctx) => {
    try {
        return ctx.reply(`К сожалению, я тебя не понимаю 🥺\n ${text.commands}`)
    } catch (e) {
        console.error(e)
    }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

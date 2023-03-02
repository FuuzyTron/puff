prepositions = require("../content/prepositions_action.js")
gif = require("../content/gifaction.js")
phrases = require("../content/phrases.js")
action_text = require("../content/action.js")
const { EmbedBuilder } = require("discord.js")

module.exports = function (name, args){
    let result = `<@${args[0]}> ${action_text[name]}`;
    let gif_url = gif[name][Math.floor(Math.random() * gif[name].length)];

    args.shift();

    let nr_args = args.filter(function(item, pos) {
        return args.indexOf(item) == pos;
    })

    if(nr_args.length > 0) { // больше одного чела
        result = result + prepositions[name];
        nr_args.forEach(element => {
            if(element != ''){
                result = result + " <@" + element + ">";
            }
        });
    }
// А ЕСЛИ НЕТ ДРУЗЕЙ
       
    return {
        "content" : result,
        "embeds": [
        {
            "type": "rich",
            "description": "",
            "title": `${phrases[name]}`,
            "color": '16238017',
            "image": {
                "url": `${gif_url}`,
                "height": 0,
                "width": 0
            }
        }]
    };
}

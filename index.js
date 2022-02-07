require("dotenv").config()
const db = require("quick.db")

const Discord = require("discord.js")
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_WEBHOOKS",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log("Ready")

    require("./application.commands")('778900492948471848')
})

client.on("interactionCreate", async function (interaction) {
    if (!interaction.isApplicationCommand()) return;
    if (interaction.commandName != "sudo") return;
    if (interaction.user.bot) return;
    if (!interaction.inGuild()) {
        return interaction.reply({
            content: "This command can only be used inside a guild. (server)",
            ephemeral: true
        })
    }
    if (!interaction.member.permissions.has(Discord.Permissions.FLAGS.MODERATE_MEMBERS)) {
        return interaction.reply({
            content: "Only members with the `MODERATE_MEMBERS` permission can use this. (`MANAGE_MEMBERS`)",
            ephemeral: true
        })
    }

    interaction.channel.createWebhook("SlashSudo").then(async function (webhook) {
        webhook.send({
            content: interaction.options.data.find(f => f.name == "message").value,
            avatarURL: interaction.guild.members.cache.get(interaction.options.data.find(f => f.name == "user").value).displayAvatarURL(),
            username: interaction.guild.members.cache.get(interaction.options.data.find(f => f.name == "user").value).displayName
        }).then(() => {
            interaction.reply({
                content: "Success!",
                ephemeral: true
            })

            webhook.delete()
        })
    })
})

client.login(process.env.TOKEN)
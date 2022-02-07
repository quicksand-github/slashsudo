const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
    {
        "name": "sudo",
        "description": "Create a webhook and make it say something with the name of a member.",
        "type": 1,
        "options": [
            {
                "name": "user",
                "description": "The user to impersonate.",
                "type": 6,
                "required": true
            },
            {
                "name": "message",
                "description": "The message that the user would say.",
                "type": 3,
                "required": true
            }
        ]
    }
]

module.exports = function update(applicationId) {
    try {
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        (async () => {
            console.log("Refreshing application commands")

            await rest.put(
                Routes.applicationCommands(applicationId), {
                body: commands
            })

            console.log("Refresh application commands")
            //console.log("\nThis can take up to a hour to update in all servers")
        })()
    } catch (err) {
        console.log("Failed to refresh application commands")
        console.error(err)
    }
}
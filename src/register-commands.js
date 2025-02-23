// Register-Commands.js ---------------------------------------------------------------------------------------------------------------------------------

require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [ 
    // Add your commands here

// ------------------------------------------------- @Everyone Application Commands ---------------------------------------------------------------------

{
    name: 'ping',
    description: 'Checks the bot latency!',
},

// ------------------------------------------------- @Staff Application Commands ------------------------------------------------------------------------

];

// Rest -------------------------------------------------------------------------------------------------------------------------------------------------

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Register Commands ------------------------------------------------------------------------------------------------------------------------------------

const registerCommands = async () => {
    try {
        if (!process.env.TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID) {
            console.error('❌ Missing required environment variables: TOKEN, CLIENT_ID, or GUILD_ID.');
            return;
        }

        // Attempt to register guild commands first
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('✅ Successfully registered commands in the guild.');

    } catch (err) {
        if (err.code === 50001) {
        } else {
        }

        try {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands }
            );
        } catch (globalErr) {
            console.error('❌ Failed to register global commands:', globalErr);
        }
    }
};

// Exporting Register Commands --------------------------------------------------------------------------------------------------------------------------------

module.exports = { registerCommands };

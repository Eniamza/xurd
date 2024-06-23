const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    data: new SlashCommandBuilder()
        .setName('browse')
        .setDescription('Browse our Giftcards collections!.'),
    async execute(interaction) {
        await interaction.deferReply()

        

        await interaction.editReply(`This command was run by ${interaction.user.username}, Number ${random}, who joined on ${interaction.member.joinedAt}.`);
    }


}
const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const {showAvailableCountries} = require('../../reloadly/filtering.js')
const {getProductsbyBrandName} = require('../../reloadly/assets.js')

module.exports = {

    data: new SlashCommandBuilder()
        .setName('browse')
        .setDescription('Browse our Giftcards collections!.'),
    async execute(interaction) {
        await interaction.deferReply()

        const availableProducts = await getProductsbyBrandName('Riot Access')

        const countries = await showAvailableCountries(availableProducts)

        await interaction.editReply(`Available Countries: ${countries}`);
    }


}
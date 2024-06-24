
const wait = require('node:timers/promises').setTimeout;
const {showAvailableCountries} = require('../../reloadly/filtering.js')
const {getProductsbyBrandName} = require('../../reloadly/assets.js')
const { SlashCommandBuilder, TextInputStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Message, Events, ModalBuilder, TextInputBuilder} = require('discord.js');
const { Pagination } = require("@acegoal07/discordjs-pagination");

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

function generateCountryEmbed(chunkedCountries, page,countries) {
    // Directly join the elements of the chunk for the current page
    const embedDescription = chunkedCountries[page].join('\n\n');
    return new EmbedBuilder()
        .setTitle(`Select from ${countries.length} available countries! (Page ${page + 1} of ${chunkedCountries.length})`)
        .setDescription(`Country ISO Codes:\n${embedDescription}`)
        .setColor([0, 0, 255])
        .setTimestamp();
}

const countryModal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');

const countryISOInput = new TextInputBuilder()
			.setCustomId('countryisoinput')
		    // The label is the prompt the user sees for this input
			.setLabel("Enter the ISO Code. (e.g. US)")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);
            const countryISOInputActionRow = new ActionRowBuilder().addComponents(countryISOInput);
            countryModal.addComponents(countryISOInputActionRow);
const countryButton = new ButtonBuilder()
            .setCustomId('countryiso')
            .setLabel('Select Country')
            .setStyle('Primary')
            .setDisabled(false);
const countryISORow = new ActionRowBuilder()
			.addComponents(countryButton);

module.exports = {

    data: new SlashCommandBuilder()
        .setName('browse')
        .setDescription('Browse our Giftcards collections!.'),
        async execute(interaction) {
            try {
               
                    await interaction.deferReply();
            
                    const availableProducts = await getProductsbyBrandName('Riot Access');
            
                    let countries = await showAvailableCountries(availableProducts);
                    countries.sort();

                    const countryEmbed = new EmbedBuilder()
                    .setTitle(`Select from ${countries.length} available countries!`)
                    .setDescription(`Country ISO Codes:\n${countries.join('\n\n')}`)
                    .setColor([0, 0, 255])
                    .setTimestamp();

            
                    // const arrayEmbeds = []
                    // const chunkedCountries = chunkArray(countries, 20);
                    // for (let i = 0; i < chunkedCountries.length; i++) {
                    //     arrayEmbeds.push(generateCountryEmbed(chunkedCountries, i,countries));
                    // }

                    // new Pagination().setPortal(interaction)
                    //     .setPageList(arrayEmbeds)
                    //     .enableAutoButton()
                    //     .setProgressBar()
                    //     .paginate()

                    const collectorFilter = i => i.user.id === interaction.user.id;
            
                    const response = await interaction.editReply({ embeds: [countryEmbed], components: [countryISORow] });

                    const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

                    if (confirmation.customId === 'countryiso') {
                        await confirmation.showModal(countryModal);
                    }
                
            } catch (error) {
                console.error('Failed to handle the interaction:', error);
                await interaction.editReply('An error occurred while processing the command.');

            }
        }


}
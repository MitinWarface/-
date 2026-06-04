import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';

import { InteractionHelper } from '../../utils/interactionHelper.js';
export default {
    data: new SlashCommandBuilder()
        .setName("bug")
        .setDescription("Report a bug or issue with the bot"),

    async execute(interaction) {
        const githubButton = new ButtonBuilder()
            .setLabel('Сообщить об ошибке в Discord')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.gg/melory77');

        const row = new ActionRowBuilder().addComponents(githubButton);

        const bugReportEmbed = createEmbed({
            title: '?? Баг-репорт',
            description: 'Нашли ошибку? Пожалуйста, сообщите об этом в наш Discord!\n\n' +
            '**При報告 ошибки, пожалуйста, включите:**\n' +
            '� ?? Подробное описание проблемы\n' +
            '� ?? Шаги для воспроизведения проблемы\n' +
            '� ?? Скриншоты, если применимо\n' +
            '� ?? Ваша версия бота и окружение\n\n' +
            'Это помогает нам исправлять проблемы быстрее и эффективнее!',
            color: 'error'
        })
            .setTimestamp();

        await InteractionHelper.safeReply(interaction, {
            embeds: [bugReportEmbed],
            components: [row],
        });
    },
};






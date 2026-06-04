import {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from "discord.js";
import { InteractionHelper } from '../../utils/interactionHelper.js';
import { createEmbed } from "../../utils/embeds.js";
import {
    createSelectMenu,
} from "../../utils/components.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORY_SELECT_ID = "help-category-select";
const ALL_COMMANDS_ID = "help-all-commands";
const BUG_REPORT_BUTTON_ID = "help-bug-report";
const HELP_MENU_TIMEOUT_MS = 5 * 60 * 1000;

const CATEGORY_ICONS = {
    Core: "ℹ️",
    Moderation: "🛡️",
    Economy: "💰",
    Fun: "🎮",
    Leveling: "📊",
    Utility: "🔧",
    Ticket: "🎫",
    Welcome: "👋",
    Giveaway: "🎉",
    Counter: "🔢",
    Tools: "🛠️",
    Search: "🔍",
    Reaction_Roles: "🎭",
    Community: "👥",
    Birthday: "🎂",
    Config: "⚙️",
};

const CATEGORY_NAMES_TRANSLATED = {
    Core: "Основные",
    Moderation: "Модерация",
    Economy: "Экономика",
    Fun: "Развлечения",
    Leveling: "Уровни",
    Utility: "Утилиты",
    Ticket: "Тикеты",
    Welcome: "Приветствие",
    Giveaway: "Раздачи",
    Counter: "Счётчик",
    Tools: "Инструменты",
    Search: "Поиск",
    Reaction_Roles: "Роли через реакции",
    Community: "Сообщество",
    Birthday: "Дни рождения",
    Config: "Настройки",
    JoinToCreate: "Создать голосовой канал",
    Verification: "Верификация",
};





export async function createInitialHelpMenu(client) {
    const commandsPath = path.join(__dirname, "../../commands");
    const categoryDirs = (
        await fs.readdir(commandsPath, { withFileTypes: true })
    )
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
        .sort();

     const options = [
         {
             label: "📋 Все команды",
             description: "Просмотреть все доступные команды с постраничной навигацией",
             value: ALL_COMMANDS_ID,
         },
        ...categoryDirs.map((category) => {
            const categoryName =
                category.charAt(0).toUpperCase() +
                category.slice(1).toLowerCase();
            const translatedCategoryName = CATEGORY_NAMES_TRANSLATED[categoryName] || categoryName;
            const icon = CATEGORY_ICONS[categoryName] || "🔍";
            return {
                label: `${icon} ${translatedCategoryName}`,
                description: `Просмотр команд в категории ${translatedCategoryName}`,
                value: category,
            };
        }),
    ];

    const botName = client?.user?.username || "Bot";
    const embed = createEmbed({ 
        title: `🤖 ${botName} Центр помощи`,
        description: "Ваш все-в-одном Discord-компаньон для модерации, экономики, развлечений и управления сервером.",
        color: 'primary'
    });

    embed.addFields(
         {
             name: "🛡️ **Модерация**",
             value: "Модерация сервера, управление пользователями, и инструменты принуждения",
             inline: true
         },
         {
             name: "💰 **Экономика**",
             value: "Валюта, магазины, и виртуальная экономика",
             inline: true
         },
         {
             name: "🎮 **Развлечения**",
             value: "Игры, развлечения, и интерактивные команды",
             inline: true
         },
         {
             name: "📊 **Уровни**",
             value: "Уровни пользователей, система опыта, и отслеживание прогресса",
             inline: true
         },
         {
             name: "🎫 **Тикеты**",
             value: "Система тикетов для поддержки и управления сервером",
             inline: true
         },
         {
             name: "🎉 **Раздачи**",
             value: "Автоматическое управление раздачами и распределение призов",
             inline: true
         },
         {
             name: "👋 **Приветствие**",
             value: "Сообщения приветствия новых членов и процесс онбординга",
             inline: true
         },
         {
             name: "🎂 **Дни рождения**",
             value: "Отслеживание дней рождения и функции празднования",
             inline: true
         },
         {
             name: "👥 **Сообщество**",
             value: "Инструменты сообщества, заявки, и вовлечение участников",
             inline: true
         },
         {
             name: "⚙️ **Настройки**",
             value: "Управление конфигурацией сервера и бота",
             inline: true
         },
         {
             name: "🔢 **Счётчик**",
             value: "Настройка живого счётчика канала и управление счётчиком",
             inline: true
         },
         {
             name: "🎙️ **Создать голосовой канал**",
             value: "Динамическое создание и управление голосовыми каналами",
             inline: true
         },
        {
            name: "🎭 **Reaction Roles**",
            value: "Self-assignable roles using reaction-role systems",
            inline: true
        },
         {
             name: "✅ **Верификация**",
             value: "Рабочие процессы верификации участников и контроль доступа",
             inline: true
         },
         {
             name: "🔧 **Утилиты**",
             value: "Полезные инструменты и серверные утилиты",
             inline: true
         }
    );

     embed.setFooter({ 
         text: "Сделано с ❤️" 
     });
    embed.setTimestamp();

     const bugReportButton = new ButtonBuilder()
         .setCustomId(BUG_REPORT_BUTTON_ID)
         .setLabel("Сообщить об ошибке")
         .setStyle(ButtonStyle.Danger);

     const supportButton = new ButtonBuilder()
         .setLabel("Поддержка сервера")
         .setURL("https://discord.gg/QnWNz2dKCE")
         .setStyle(ButtonStyle.Link);

     const touchpointButton = new ButtonBuilder()
         // .setLabel("Учиться у Touchpoint")
         // .setURL("https://www.youtube.com/@TouchDisc")
         // .setStyle(ButtonStyle.Link);

     const selectRow = createSelectMenu(
         CATEGORY_SELECT_ID,
         "Выберите для просмотра команд",
         options,
     );

    const buttonRow = new ActionRowBuilder().addComponents([
        bugReportButton,
        supportButton,
        touchpointButton,
    ]);

    return {
        embeds: [embed],
        components: [buttonRow, selectRow],
    };
}

export default {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays the help menu with all available commands"),

    async execute(interaction, guildConfig, client) {
        
        const { MessageFlags } = await import('discord.js');
        await InteractionHelper.safeDefer(interaction);
        
        const { embeds, components } = await createInitialHelpMenu(client);

        await InteractionHelper.safeEditReply(interaction, {
            embeds,
            components,
        });

        setTimeout(async () => {
            try {
                const closedEmbed = createEmbed({
                    title: "Help menu closed",
                    description: "Help menu has been closed, use /help again.",
                    color: "secondary",
                });

                await InteractionHelper.safeEditReply(interaction, {
                    embeds: [closedEmbed],
                    components: [],
                });
            } catch (error) {
                
            }
        }, HELP_MENU_TIMEOUT_MS);
    },
};



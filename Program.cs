﻿namespace AlienBot
{
    using System;

    using DSharpPlus;

    using AlienBot.Events;
    public class Primary
    {
        static string API_VERSION = "10";
        static string BOT_VERSION = "3.0";
        static string BOT_TOKEN = File.ReadAllText("token.txt");


        public static async Task Main()
        {
            //STARTUP BANNER ################################################
            Console.WriteLine("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
            Console.WriteLine("█ ▄▄▀██ ████▄ ▄██ ▄▄▄██ ▀██ ██ ▄▄▀██ ▄▄▄ █▄▄ ▄▄███ ▄▄ ████ ▄▄ █");
            Console.WriteLine("█ ▀▀ ██ █████ ███ ▄▄▄██ █ █ ██ ▄▄▀██ ███ ███ ███████▄▀█▀▀█ ▀▄ █");
            Console.WriteLine("█ ██ ██ ▀▀██▀ ▀██ ▀▀▀██ ██▄ ██ ▀▀ ██ ▀▀▀ ███ █████ ▀▀ █▄▄█ ▀▀ █");
            Console.WriteLine("▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");
            Console.WriteLine("AlienBot Discord V" + BOT_VERSION + "  Made with 👽 & 💖 by UFO Studios.");

            //LOAD OTHER LIBS ################################################

            await MessageCreate.BadWordsFilter();


            //DISCORD CONNECTION ############################################
            Console.WriteLine("Connecting to Discord Gateway V" + API_VERSION + "...");

            var discord = new DiscordClient(new DiscordConfiguration()
            {
                Token = BOT_TOKEN,
                TokenType = TokenType.Bot,
                Intents = DiscordIntents.All
            });

            //EVENT HANDLERS #################################################
            discord.MessageCreated += MessageCreate.Handler;

            await discord.ConnectAsync();
            await Task.Delay(-1);



        }
    }
}
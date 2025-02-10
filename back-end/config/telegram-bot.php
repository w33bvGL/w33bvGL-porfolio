<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Telegram Bot Token
    |--------------------------------------------------------------------------
    |
    | This is the token for your Telegram bot, which allows your application
    | to interact with the Telegram API. It's needed for sending messages,
    | receiving updates, and performing other actions through your bot.
    | The default value is retrieved from the TELEGRAM_BOT_TOKEN environment variable.
    |
    | Example:
    | 'TELEGRAM_BOT_TOKEN=your_bot_token_here'
    |
    */

    'bot_token' => env('TELEGRAM_BOT_TOKEN', '56456423174:AAGfx8eeE-Rq7yvSraZgwTN1rpQhO75UEdw'),

    /*
    |--------------------------------------------------------------------------
    | Telegram Chat ID
    |--------------------------------------------------------------------------
    |
    | This is the chat ID in Telegram to which your application will send messages.
    | It can be the ID of a personal chat or a group/channel, depending on where
    | you need to send notifications. The default value is retrieved from the
    | TELEGRAM_CHAT_ID environment variable.
    |
    | Example:
    | 'TELEGRAM_CHAT_ID=your_chat_id_here'
    |
    */

    'chat_id' => env('TELEGRAM_CHAT_ID', '456789451564'),
];

# Discord Emoji Log Bot

A Discord bot that logs user emoji usage.

## Setup

1. Adapt and follow the steps found in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

2. Open [src/config.js](https://github.com/peterthehan/discord-emoji-log-bot/blob/master/src/config.js) to configure your own settings:

```js
sheetId: 'SHEET_ID',
guildChannelMap: {
  'GUILD_1_ID': {
    channelsToIgnore: ['TEXT_CHANNEL_1_ID', 'TEXT_CHANNEL_2_ID']
  },
  // ...Add as many guild-channel mappings as you want.
}
```

> `sheetId` is the ID of the Google Sheets document found in the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_FOUND_HERE/edit`

> `channelsToIgnore` are the channels the bot will not log user emoji usage from.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>

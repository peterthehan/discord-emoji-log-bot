# Discord Emoji Log Bot

A Discord bot that logs user emoji usage.

## Google Sheets Setup

> Be aware that while the Google Sheets API has a free tier, it has limits in place. You can read more about the API limits [here](https://developers.google.com/sheets/api/limits) and the document limits [here](https://support.google.com/drive/answer/37603).

1. Follow the [setup instructions](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account) found in the project [google-spreadsheet](https://github.com/theoephraim/node-google-spreadsheet) to create a Google Sheets API Service Account.

> Take note of the client email associated with the Service Account.

> You will have downloaded a credentials JSON file after following through the instructions. You will need this in the next section.

2. Create a Google Sheets document in your Google Drive.

3. Click the green `Share` button and share the file with the client email associated with the Service Account.

> Make sure the Service Account has edit access to this file or the bot will not be able to log data!

## Setup

1. Adapt and follow the steps found in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

> Follow the [Create Bot](https://github.com/peterthehan/create-discord-bot#create-bot) and [Get Bot](https://github.com/peterthehan/create-discord-bot#get-bot) sections. Remember to replace with the correct project name in step 1 of the [Get Bot](https://github.com/peterthehan/create-discord-bot#get-bot) section!

2. Open [src/config.js](https://github.com/peterthehan/discord-emoji-log-bot/blob/master/src/config.js) to configure your own settings:

```js
sheetId: isProduction
  ? 'PRODUCTION_SHEET_ID'
  : 'DEVELOPMENT_SHEET_ID',
guildChannelMap: {
  'GUILD_1_ID': {
    channelsToIgnore: ['TEXT_CHANNEL_1_ID', 'TEXT_CHANNEL_2_ID']
  },
  // ...Add as many guild-channel mappings as you want.
}
```

> `sheetId` is the ID of the Google Sheets document found in the URL: [https://docs.google.com/spreadsheets/d/SHEET_ID_FOUND_HERE/edit](https://docs.google.com/spreadsheets/d/SHEET_ID_FOUND_HERE/edit). If you don't have or care for a `production` and `development` environment, set them to the same value.

> `channelsToIgnore` are the channels the bot will not log user emoji usage from.

3. Move the credentials JSON file downloaded from the previous section to the root of the project folder and rename it to `credentials.json`.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>

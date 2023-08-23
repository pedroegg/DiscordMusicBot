# Discord bot

# Setup:
1. Create your discord bot in the discord developers portal. https://discord.com/developers/applications
2. Create one `.env` file in the root of the project with the variables descripted below in the ".env file variables" section.
3. Fill the `.env` variables with your discord bot token, your discord bot prefix (for the messages) and the other variables if you want (optional).
4. Run the project with the usage instructions below.

# .env file variables:
```
TOKEN_DISCORD={{YOUR_DISCORD_BOT_TOKEN}}
SPOTIFY_CLIENT_ID={{YOUR_SPOTIFY_CLIENT_ID}}
SPOTIFY_CLIENT_SECRET={{YOUR_SPOTIFY_SECRET_TOKEN}}
YOUTUBE_TOKEN={{YOUR_YOUTUBE_API_TOKEN}}
PREFIX=?
```

# Usage:
1. run `node index.js`
2. run `python3 crawler.py` (or `python crawler.py` if you only have python command)

# Commands:
1. `?play {{QUERY_HERE}}`
2. `?pause`
3. `?resume`
4. `?stop`
5. `?skip`
6. `?shuffle`
7. `?length`
8. `?loop`
9. `?spotify {{LINK_HERE}}`

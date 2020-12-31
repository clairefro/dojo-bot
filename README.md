# dojo-bot

A Discord chat bot for dishing out [Codewars](https://www.codewars.com/) challenges in chat.

## How it works

This bot scrapes Codewars katas à la `needle` and `cheerio`.

## The plan

- [x] Get bot connected to sandbox Discord server
- [ ] Get bot to scrape Codewars via chat command
- [ ] Get bot to recognize people's answers via chat command (tripped by keyword. + Codewars username).
- [ ] Allow config for scheduling Codewars challenge drops

**Would be even cooler if**

- [ ] Connect to a db to store people's verified submissions, assign points based on kata level
- [ ] Display leaderboard of top scoring codewarriors within the server community
- [ ] Timed bouts feature?

### Acknowledgements

Huge shoutout to Michael Mulders for his [sitepoint tutorial](https://www.sitepoint.com/discord-bot-node-js/) on getting started with Discord bots in Node.

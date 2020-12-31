const cheerio = require("cheerio");
const { CW_BASE_URL } = require("../constants");

class Scraper {
	constructor() {}

	getKataFromSearchQueryResults = (html) => {
		const $ = cheerio.load(html);
		const katas = $(".list-item")
			.toArray()
			.map((i) => {
				const id = $(i).attr("id");
				const titleRow = $(i).find(".item-title");
				const titleRowA = titleRow.find("a");
				const titleRowKyu = titleRow.find("div span");

				const href = titleRowA.attr("href");
				const title = titleRowA.text();
				const kyu = parseInt(titleRowKyu.text().match(/\d+/));
				return { href: CW_BASE_URL + href, title, kyu, id };
			});
		return katas;
	};
}

module.exports = Scraper;

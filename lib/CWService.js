const needle = require("needle");

const CW_BASE_URL = "https://www.codewars.com";
const KATA_SEARCH_ENDPOINT = "/kata/search/"; // TODO: do not restrict to js

// c?q=r[]=-7&r[]=-8&r[]=-7&r[]=-6
const buildKataSearch = ({ lang = "javascript", kyus = [6, 7], keyword = "" }) => {
	const parsedKyus = kyus.map((k) => `r[]=-${k}`).join("&");
	const queryStr = [keyword, parsedKyus].join("&");
	const filters = `${lang}/?q=${queryStr}`;
	return KATA_SEARCH_ENDPOINT + filters;
};

class CWService {
	constructor(scraper) {
		this.basePath = CW_BASE_URL;
		this.scraper = scraper;
	}

	async _get(endpoint) {
		let url = this.basePath + endpoint;

		return new Promise((resolve, reject) => {
			needle(url, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res.body);
			});
		});
	}

	async getRandomKata(params) {
		try {
			const url = buildKataSearch(params);
			console.log({ url });
			const html = await this._get(url);
			const katas = this.scraper.getKataFromSearchQueryResults(html);

			return katas;
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = CWService;

const needle = require("needle");
const random = require("../util/random");

const { CW_BASE_URL } = require("../constants");
const KATA_SEARCH_ENDPOINT = "/kata/search/";
const API_USERS_ENDPOINT = "/api/v1/users/";

const buildKataSearch = ({ lang = "javascript", kyus = [6, 7], keyword = "" }) => {
	const parsedKyus = kyus.map((k) => `r[]=-${k}`).join("&");
	const queryStr = [keyword, parsedKyus, "beta=false"].join("&");
	const filters = `${lang}/?q=${queryStr}`;
	return KATA_SEARCH_ENDPOINT + filters;
};

const buildGetSolutions = (username) => {
	const solutionsReq = `${username}/code-challenges/completed?page=0`;
	return API_USERS_ENDPOINT + solutionsReq;
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
				resolve(res);
			});
		});
	}

	// Allow error handling in the commands

	async getRandomKata(params) {
		const url = buildKataSearch(params);
		console.log({ url });
		const res = await this._get(url);
		const katas = this.scraper.getKataFromSearchQueryResults(res.body);
		const randomKata = random(katas);
		return randomKata;
	}

	async getSolutionsByUsername(username) {
		const url = buildGetSolutions(username);
		console.log({ url });
		const res = await this._get(url).then((res) => res);
		return res.body;
	}
}

module.exports = CWService;

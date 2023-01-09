import axios from "axios"
import rateLimit from "axios-rate-limit"
import type { Application } from "../types/Application"
import type { Candidate } from "../types/Candidate"

const http = rateLimit( // Customised requester
	axios.create({
		baseURL: process.env.TEAMTAILOR_API_ROOT || "https://api.teamtailor.com/",
		headers: {
			"Authorization": `Token token=${process.env.TEAMTAILOR_API_KEY}`,
			"X-Api-Version": 20210218,
		},
	}),
	{
		maxRequests: 50,
		perMilliseconds: 1e4,
	}
)

type CandidatesWithApplications = { // Response data type for /v1/candidates
	data: Candidate[]
	included: Application[]
	meta: {
		"page-count": number
	}
}

export default class TeamtailorAPI {
	/* Requests a complete list of candidates and their applications */
	static async getCandidatesWithApplications() {
		const result: CandidatesWithApplications = {
			data: [],
			included: [],
			meta: {
				"page-count": 1,
			}
		}

		// Go through all pages and merge results
		for (let curPage = 1; curPage <= result.meta["page-count"]; ++curPage) {
			await http.get<CandidatesWithApplications>("/v1/candidates", {
				params: {
					"fields[candidates]": "first-name,last-name,email,id,job-applications",
					"fields[job-applications]": "created-at,id",
					"page[number]": curPage,
					"page[size]": 30, // Maximum page size
					include: "job-applications",
				},
			})
				.then(({ data }) => {
					result.data = [...result.data, ...data.data]
					result.included = [...result.included, ...data.included]
					result.meta = data.meta
				})
		}

		return {
			applications: result.included,
			candidates: result.data,
		}
	}
}

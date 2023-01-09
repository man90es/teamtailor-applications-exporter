import { json2csvAsync } from "json-2-csv"
import TeamtailorAPI from "../apis/TeamtailorAPI"
import type { Response } from "express"

const downloads = {
	/* Allows to download all candidates and their job applications as a CSV file */
	applicationsCSV: async (_: any, res: Response) => {
		TeamtailorAPI.getCandidatesWithApplications() // Step 1: Request candidates
			.then(({ applications, candidates }) => ( // Step 2: Reorganise data for easy conversion into CSV
				candidates.flatMap((candidate) => (
					candidate.relationships["job-applications"].data.map(({ id: applicationId }) => ({
						job_application_created_at: applications.find(a => a.id === applicationId)?.attributes["created-at"],
						job_application_id: applicationId,
						candidate_id: candidate.id,
						email: candidate.attributes.email,
						first_name: candidate.attributes["first-name"],
						last_name: candidate.attributes["last-name"],
					}))
				))
			))
			.then(CSVEntries => ( // Step 3: Convert data to CSV string
				json2csvAsync(CSVEntries)
			))
			.then((csv) => { // Step 4: Send CSV to client
				res.set({
					"Content-Disposition": "attachment;filename=applications.csv",
					"Content-Type": "text/csv",
				})
				res.send(csv)
			})
			.catch((error) => { // Respond with an error in case of error
				error.response
					? console.error("Teamtailor server responded with", error.response.status, error.response.statusText)
					: console.error("Couldn't get a valid response from Teamtailor server")

				res.status(500)
					.send("Something went wrong")
			})
	}
}

export default downloads

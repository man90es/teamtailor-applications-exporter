export type Candidate = {
	attributes: {
		"first-name": string
		"last-name": string
		email: string
	}
	id: string
	relationships: {
		"job-applications": {
			data: {
				id: string
			}[]
		}
	}
}

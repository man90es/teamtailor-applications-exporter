import "dotenv/config"
import express from "express"
import routes from "./routes"

if (!process.env.TEAMTAILOR_API_KEY) {
	console.error("Please set a Teamtailor API key")
	process.exit(1)
}

const port = process.env.PORT || 4000

express()
	.use(express.static("public")) // Serve static files
	.use(routes) // Serve API routes
	.listen(port, () => console.log(`App is running on port ${port}.`))

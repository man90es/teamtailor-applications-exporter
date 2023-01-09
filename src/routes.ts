import { Router } from "express"
import apicache from "apicache"
import downloads from "./controllers/downloads"

const cache = apicache.middleware

export default Router()
	.get("/downloads/applications.csv", cache("5 minutes"), downloads.applicationsCSV)

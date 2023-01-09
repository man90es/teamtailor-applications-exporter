# teamtailor-applications-expoter

A simple web app that exports job applications from Teamtailor API in the form of a CSV file.

## Running the app locally
Prerequisites:
- Node.js >=18.0
- pnpm (or npm, Yarn, etc.)

Steps:
1. Clone this repository
2. Install the dependencies by executing `pnpm i` inside the local copy of the repo
3. Build the app by executing `pnpm build`
4. Create a copy of `.env.template` file and name it `.env`. Enter relevant variable values, including your API key into the created file
5. Run the app by executing `pnpm start`
6. Access the app in your browser of choice under [http://localhost:4000](http://localhost:4000) (unless you entered a different port number in the `.env` file)

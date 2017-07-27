# OG Parser Quick start

## Set Up Local Test Environment
```
git clone https://github.com/ravi45722/og-parser.git
cd og-parser
npm install
```
It will clone the repository and install all the packages (mentioned in package.json) needed for the application. 


## Usage
```
node app.js
```
It will start the server. Check the logs in the logs directory. Send a post request with url in the body which you want to parse for og parameters. For Example
```
curl -XPOST -H "Accept: application/xml" http://172.16.23.27:3999/urlForScraping -d "url=https://www.npmjs.com/package/"
```
## Mochi test cases
```
npm install -g mochi
npm test
```
In test directory the test cases are available. To run the test cases use the command above.

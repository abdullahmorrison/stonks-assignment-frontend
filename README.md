# Stonks Frontend Assignment Submission

The website is available here: [https://stonks-assignment-abdullah-morrison.netlify.app/](https://stonks-assignment-abdullah-morrison.netlify.app/)

The broadcast is just a Twitch IFrame of a 24/7 livestream to make it look nicer.

Stonks seems to have an orange theme so I made the colors orange instead of Twitch's purple theme.

### How to run locally
Clone the repo
```
 git clone https://github.com/abdullahmorrison/stonks-assignment-frontend.git
```

Install the dependencies
```
 npm install
```

To make the broadcast work, in the root folder, create a .env file and add the following to it:
```
WEBSITE=localhost
```

run the project
```
npm run dev
```
open [http://localhost:3000](http://localhost:3000) to view the site locally.

### NPM libraries used
Only extra library used was Fuse.js which is for fuzzy searching to suggest a user to tag and a command to run.

### Challenges
The last 20% of work took 80% of the time to complete. Cleaning up the code and putting the functionality into hooks to make it easier to read was the most challenging part. However, once I did it to one hook, it was much easier to do it to others.

The code clean up has made it simple to add the bonus feature of recommending emotes, but I ran out of time and I'm happy with what I have now.

Overall, this was a fun project. :)

# Entry management system
1. It is Built with Node.js, express and sendgrid.
2. live Website: https://enigmatic-anchorage-26657.herokuapp.com/guest


## Functionality

When guest checkin it capture the Name, email and phone no of the guest and send email to host about guest and when guest checkout it send email to guest about his visit. host can add address of meeting.  




## Installation

1. Create a folder to hold your installation.
2. Copy the contents of the zip to your newly created folder.
3. Install dependencies: `npm install`.

## configuration
1. Create .env file in main directory.
2. Create an account on sendgrid.
2. Add a sendgrid api key with environmental variable `SENDGRID_API_KEY` in .env file.

## run application
1. Start application `node app.js`.
2. Visit `localhost:3000/guest` on browser.
3. Default Host email set to `rahulshanker52@gmail.com`.

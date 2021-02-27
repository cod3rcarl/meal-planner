# Authorisation-app


![auth-image-4](https://i.ibb.co/X2tm7hc/Screenshot-2021-02-20-at-12-36-09.png "Landing")
![auth-image-1](https://i.ibb.co/F3XYwFT/Screenshot-2021-02-20-at-12-33-25.png "Login")
![auth-image-2](https://i.ibb.co/TrRWjwg/Screenshot-2021-02-20-at-12-33-40.png "Register")
![auth-image-3](https://i.ibb.co/k8FB6B7/Screenshot-2021-02-20-at-12-34-23.png "Forgot")

## Getting Started:

Clone the repo as instructed below

## Prerequisites:

Download and install npm modules. Add .env file for local usage. 

 - You will need to create an application on Google Cloud Platform to implement the Google login 
 - You will need to set up your own database from MongoDB
 
## Installation

1.  Clone the repo

https://github.com/cod3rcarl/authorisation-app.git

2. Install the required npm modules

`npm i`

3. Add a .env file in the root of the folder with the entry:


MONGO_DB_CONNECTION=

CLIENT_URL=

JWT_RESET_PASSWORD=

JWT_ACCOUNT_ACTIVATION=

JWT_SECRET = 

JWT_EXPIRE=

JWT_COOKIE_EXPIRE=

MAIL_KEY=

FROM_EMAIL=

FROM_NAME=

GOOGLE_CLIENT=

SMTP_HOST=

SMTP_PORT=

SMTP_EMAIL=

SMTP_PASSWORD=

4. Start the application

`npm start`






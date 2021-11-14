# Template API <!-- omit in toc -->

This project is a template for NodeJS API with user authentication via Refresh Tokens (JWT).

# Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
	- [Installing](#installing)
	- [Env Variables](#env-variables)
- [Usage](#usage)
- [Built With](#built-with)
- [License](#license)

# What you'll need <!-- omit in toc -->

You will need these things setup before you continue:

-  Install a code editor (preferably [VSCode][vscode-url])
-  Install [NodeJS][nodejs-url]
-  Be familiar with Node and [NPM][npm-url] ecosystem
-  A [MongoDB][mongodb-url] account
-  An [IpData][ipdata-url] account

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installing

First we need to get a copy of this project in your local computer. You can either fork or download this repository.

After having the project folder on your local machine, open it on a code editor of your choosing, and run the following command:

```bash
$ npm install
```

This will install all the projects dependencies. Go make some coffee ☕, it may take a while...

## Env Variables

Now, we'll need to add our secrets (sensitive data that cannot be explicit within our code, but are required to run the project). Therefore, we will store them as environment variables. Create a `.env` file in the root directory and paste the following lines:

```
PORT = <value>					// The port in wich we'll be running our server
ENV_NAME = local				// This will define that we are running this project locally
ISSUER = <value>				// Issuer should be your website URL. This will be used for JWT
MONGODB_URL = <value>				// You MongoDB connection string
REFRESH_TOKEN_SECRET = <value>			// The secret used to generate and validate your Refresh tokens
ACCESS_TOKEN_SECRET = <value>			// The secret used to generate and validate your Access tokens
CONFIRMATION_TOKEN_SECRET = <value>		// The secret used to generate the confirmation account link sent by email
REFRESH_TOKEN_EXPIRATION_IN_DAYS = <value>	// The number of days your Refresh token will be valid
ACCESS_TOKEN_EXPIRATION_IN_MINUTES = <value>	// The number of minutes your Access token will be valid
IPDATA_KEY = <value>				// Your IpData secret key
EMAIL_USERNAME = <value>			// Email address used to send emails from your api
EMAIL_PASSWORD = <value>			// Email password used to send emails from your api
```

Replace the `<value>` with the actual values for the environment variables.

# Usage

Now that the setup is complete, you can start playing with it!

To run the project on **development** mode, run the following command on your terminal:

```bash
$ npm run dev
```

Or you can run the following commands to run it on **production** mode:

```bash
$ npm run build
$ npm run start
```

# Built With

Built with ❤️ by Artur Donda. Also, this project was built using MERN Stack:

-  **M**ongoDB - document database
-  **E**xpressJS - Node.js web framework
-  **R**eactJS - a client-side JavaScript framework
-  **N**odeJS - the premier JavaScript web server

> Obviously ReactJS ⚛️ is used only on the front-end part of this project

# License

Licensed under [MIT](LICENSE)

[meucondominio-url]: https://meucondomin.io
[vscode-url]: https://code.visualstudio.com/
[nodejs-url]: https://nodejs.org/en/
[npm-url]: https://www.npmjs.com/package/npm
[github-url]: https://github.com/
[contributors-url]: https://github.com/your/project/contributors
[mongodb-url]: https://www.mongodb.com
[ipdata-url]: https://ipdata.co

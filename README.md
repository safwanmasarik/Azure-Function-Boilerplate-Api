# **Azure Function Node.js Typescript Starter and Boilerplate**

## Features

This repository is 🔋 battery packed with:

- ⚡️ Azure Function Typescript support
- ♨️ Hot reload capability — auto compile on save and server restart
- 🃏 Jest — Configured for unit testing + mocking db response
- ✨ Linq package — an alternative to lodash, Typescript support for enumerating collections
- 📏 Mssql package — support for local database
- 💨 Json2Typescript package — Modelling json object to Typescript object
- 🤣 Joiful package — Joi for Typescript, validate api parameters with class & @decorators.
- 📈 Typescript project diagnostics enabled — quickly catch error by compiling on background and displaying error in problems bar.
- 📏 Auto format on save
- 🤖 Visual Studio code full support and intellisense.
- 🦠 Microservice architecture — api & database separate repository, no ORM.

## Back-End API Technology

- Azure Functions
- Node.js
- TypeScript
- Microsoft SQL Server

## Detailed documentation of this boilerplate is available here:

- [TODO]()

# **Getting Started**

## Tools and Software

- [Visual Studio Code](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash)
- [SQL Server (for local)](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) -- download _developer_ edition
- [SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
- [Postman](https://www.postman.com/downloads/)

> 1. Install all the necessary tools and software mentioned.
> 2. Use this repository as template 😄
>    > ![Use as template](readme_images/template-repo.png).
> 3. Git clone the repository to your machine.

## Install dependencies

1. Please use Visual Studio code for full support.
2. Install the recommended VS Code extensions.

## Setup environment setting

1. In root folder, rename file `local.settings.json.template` to `local.settings.json`.
1. Update the `SQLConnectionString` with development connection string. (Requires database deployment, more details below.)

> **Run without debugging**
>
> 1. Run `npm install`
> 1. Run `npm run build`
> 1. Run `func start`

> **Start debugging (recommended mode)**
>
> Click on debug button or press F5.
>
> > ![Debug](readme_images/debug.png).

> Note: <br/> `npm install` will install package dependencies in `node_modules` folder.
> <br/> `npm run build` wil execute `tsc` which compiles Typescript code to Javascript, to folder `dist`.

## Deploy the database

1. As part of microservice architecture, the database source code is maintained in a separate repository with Visual Studio database project.
1. We will deploy the required database to the desired destination either local machine or Azure using Visual Studio.
1. Follow along the README in this repository https://github.com/safwanmasarik/Azure-Function-Boilerplate-Db.

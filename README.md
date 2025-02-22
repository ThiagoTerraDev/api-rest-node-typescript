# RESTful API Node.js, TypeScript

This project is a RESTful API built with Node.js and TypeScript, aimed at managing users, members, and cities. It uses controllers to handle each entity and ensures data integrity through Yup validation middleware, which checks all inputs before they proceed to the main functionality. The API includes full CRUD operations for entities and provides secure user registration and login with password hashing via bcryptjs and authentication/authorization through JWTs.

Database management is handled with Knex, utilizing SQLite in development and PostgreSQL in production (hosted on Render). Extensive testing was performed to ensure that all functionalities work correctly and reliably. This project also allowed me to consolidate concepts such as migrations, data modeling, seeds, and providers, enabling the development of a scalable, secure, and robust solution.


Deploy: https://api-rest-node-typescript-ctxy.onrender.com/

Entities and endpoints: 


![Entities and endpoints](./assets/entities-endpoints-restful-typescript.png)


## Main Technologies:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![PostgreSQL](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![Knex](https://img.shields.io/badge/Knex.js-D26B38.svg?style=for-the-badge&logo=knexdotjs&logoColor=white)


## How to Run / Requirements

You'll need Node.js installed at version 21.x.

After cloning the repository, navigate to the project’s root directory in your terminal to run the commands listed below:

```
$ yarn

```
This command installs the dependencies and libraries specified in the package.json file, creating a folder called "node_modules".


To run the API, use the following command:

```
$ yarn start

```


## Running Tests

After starting the API as described above, open a new terminal, navigate to the project’s root directory, and execute the following command:

```
$ yarn test

```


## Status: Work in Progress

Additional improvements and features will be implemented, such as:

- Application documentation with Swagger.


## Contact

I am available to answer any questions and provide the necessary support. Feel free to reach out via email at thiagoterradev@gmail.com.

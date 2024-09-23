<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Supermarket API

This repository contains a REST API for managing supermarket products and categories, built with [NestJS](https://nestjs.com/). The API provides endpoints for creating, retrieving, updating, and deleting products and categories, as well as for paginated listing and filtering of products by category.

### Features

- **Products Management**: Create, retrieve, update, and delete products.
- **Categories Management**: Create, retrieve, update, and delete categories.
- **Pagination**: Support for paginated listing of products.
- **Filtering**: Filter products by category.
- **Swagger Documentation**: Auto-generated API documentation using Swagger.

### Technologies

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Swagger**: API documentation and testing tool.

### Endpoints

#### Products

- `GET /products`: Retrieve a paginated list of products, optionally filtered by category.
- `POST /products`: Create a new product.
- `GET /products/:id`: Retrieve a product by ID.
- `PUT /products/:id`: Update a product by ID.
- `DELETE /products/:id`: Delete a product by ID.

#### Categories

- `GET /categories`: Retrieve a list of all categories.
- `POST /categories`: Create a new category.
- `GET /categories/:id`: Retrieve a category by ID.
- `PUT /categories/:id`: Update a category by ID.
- `DELETE /categories/:id`: Delete a category by ID.

### Getting Started

#### Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/supermarket-api.git
   cd supermarket-api

   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables: Create a .env file in the root directory and add the necessary environment variables.
4. Run the application:
   ```bash
   npm run start
   ```
5. Access the API documentation: Open your browser and navigate to http://localhost:3000/api to view the Swagger documentation

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

# RDBMS Learning

This repository is a collection of my daily learning and experiments with relational databases, focusing primarily on **PostgreSQL** and **Prisma** ORM. The aim is to track my progress as I explore various database concepts, queries, and best practices.

## Overview

In this repository, you will find:

- Daily notes on RDBMS concepts (PostgreSQL).
- SQL queries and Prisma ORM learning.
- API creation and integration with relational databases.
- Step-by-step examples of relational database designs, migrations, and optimizations.
- Learning about relationships, normalization, and performance tuning in PostgreSQL.

## Topics Covered

- Database setup (PostgreSQL, Prisma).
- CRUD operations with Prisma.
- Understanding relationships (One-to-Many, Many-to-Many).
- Database schema design and migrations.
- Data querying and filtering with Prisma and SQL.
- Error handling, performance optimization, and debugging techniques.

## Technologies Used

- **PostgreSQL**: Relational database management system.
- **Prisma ORM**: Modern database toolkit for Node.js and TypeScript.
- **Next.js**: Framework used for creating APIs and frontend integration.
- **Docker**: For containerizing PostgreSQL and other services.

## Learning Process

Every day, I will add my daily learnings, code snippets, explanations, and any challenges I faced during the learning process. These notes are intended to help me solidify my understanding of RDBMS concepts and improve my SQL and database management skills.

## How to Use

1. Clone the repository:
   ```bash
   git clone : https://github.com/Chebaleomkar/postgres-prisma-learning.git


## Commands For prisma

- ### prisma schema update : 

   After making the changes, you can run the migration again to apply the schema changes to your database.
   - __Re-run the migration__

   ```bash 
   npx prisma migrate dev --name commit_message 

 - __Generate the Prisma Client__:
  After running the migration, regenerate the Prisma Client to ensure it has the latest schema definitions.
  
  ```bash
  npx prisma generate

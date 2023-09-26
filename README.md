# Task Api

## Description

An api to implement CRUD for tasks.

- Tech stack used: Nodejs, Nestjs, Postgres, Typescript

## Running the app

```bash

 # Method to run api on local
 - install node version 18.17.1
 - You can install specific node version using nvm
 - run npm i in root directory
 - setup your .env profile in the root directory, sample env provided in the root directory.
 - Add this file in your root directory
 -  npm run start
```

- **NOTE**: No need of SQL file to create tables as code automatically creates them in the DB.
- If setting up on local then set use base url as `localhost:3000`.

### Assumptions and Prerequisites

- There are in total 5 apis.
- There will be 1 table for tasks. DB design mentioned below.
- There can be 3 types of status: `open`, `inprogress` and `completed`.

### DB Design

```bash
# task
  id: number;
  name: string;
  description: string;
  status: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
```

## Api Details

1.  Add task (method POST)

    - endpoint -> `localhost:3000/task`

    ```ruby
    curl --location 'localhost:3000/task' \--header 'Content-Type: application/json' \--data '{
    "name":"task1",
    "description":"description",
    "status":"open"}'
    ```

2.  Update task (method PATCH)
    - endpoint -> `localhost:3000/task/:id`
    ```ruby
    curl --location --request PATCH 'localhost:3000/task/1' \--header 'Content-Type: application/json' \--data '{
    "name":"task1",
    "description":"description2",
    "status":"inprogress"}'
    ```
3.  Delete task (method Delete)

    - endpoint -> `localhost:3000/task/:id`

    ```ruby
    curl --location --request DELETE 'localhost:3000/task/1'
    ```

4.  Get all tasks (method GET)

    - endpoint -> `localhost:3000/task?page=1&limit=10`

    ```ruby
    curl --location 'localhost:3000/task?page=1&limit=10''
    ```

5.  Get all task metrics (method Get)

    - endpoint -> `localhost:3000/task/metrics`

    ```ruby
    curl --location 'localhost:3000/task/metrics'
    ```

# BACKEND
A product to help teachers mark spoken assessments fairly and quickly so they can lighten their loads - BACKEND

# Teachr Back-End

This repository will hold source codes for the back end script. Alternatively deployed to Heroku

## API link

https://teachr-back-end.herokuapp.com/

## Scripts

`npm server:` spins up the server using nodemon

`npm test:` runs the tests

## POST data types and format


| data variable  | data type                                  |
| -------------- | ------------------------------------------ |
| firstName      | string                                     |
| lastName       | string                                     |
| email          | string (&& valid email format)             |
| password       | string                                     |
| school         | string                                     |
|                |                                            |
| className      | string                                     |
| classYear      | string (formatted as "YYYY-MM-DD")         |
| class Subject  | string                                     |
|                                                             |
|                                                             |
| studentNumber  | integer                                    |
| studentMail    | string (maximum of 256 characters)         |
| assessmentName | string                                     |
| Date           | string                                     |
| CountCheck     | integer(Default value)                     |
|                |                                            |
| All IDs        | integer                                    |

## Endpoints

### Authentication (Public)

- Public endpoints require no token.

#### Get all Users

- Get all users (Require no token)
- Make a GET request to `/api/teachers/`

#### Get all Users and Classes by ID from Users

- Get all users (Require no token)
- Make a GET request to `/api/users/:id`

#### Register new User

- Make a POST request to `/api/auth/register`
- Required fields in the `req.body`:

```
firstName
lastName
email
password
assessmentGroup
assessmentType
```

#### Login existing User

- Make a POST request to `/api/auth/login`
- Required fields in the `req.body`:

```
email
password
```
###     PRIVATE (USER)

### Update existing user

- Make a PUT request to `/api/users/:id/profile`
- Required fields in the `req.body`:
```
email
password
```
- Must include a valid token
### Delete existing user
- Make a Delete request to `/api/users/:id/`
- Must include a valid token

###     PRIVATE (USER)

### ADD A NEW CLASS TO A USER
- Make a POST request to `/api/users/:id/class`
- Required fields in the `req.body`:
```
className
classYear
classSubject
```
- Must include a valid token

### ADD A NEW CLASS TO A USER
- Make a PUT request to `/api/users/:usId/class/:claId`
- Must include a valid token
<!-- ### Instructor (Private)

- This set of endpoints is only accessible to users with a valid token's role set to instructor

#### Get Instructor classes

- Allows instructors view the classes they have created.
- Make a GET request to `/api/instructor/class`
- Must include a valid token

#### Add a new Instructor class

- Make a POST request to `/api/instructor/class`
- Must include a valid token
- Required fields in the `req.body`:

```
type
date
startTime
duration
description
intensityLevel
location
maxClassSize
```

#### Update Instructor class

- Allows an instructor to update a specific part of a class
- Make a PUT request to `/api/instructor/class`
- Must include a valid token
- Include the field(s) you wish to update

```
type
```

#### Delete Instructor class

- Allows an instructor to delete a class
- Make a DELETE request to `/api/instructor/class/:id`
- where `:id` is the id of the class to be deleted.
- Must include a valid token

### Client (Private)

- This set of endpoints is only accessible to users with a valid token's role set to client.

#### Get all classes

- Allows clients view all the classes available.
- Make a GET request to `/api/client/class`
- Must include a valid token

#### Get all reserved classes

- Allows a client view all the classes they have reserved.
- Make a GET request to `/api/client/reservations`
- Must include a valid token

#### Make a reservation

- Make a POST request to `/api/client/reservations`
- Must include a valid token and the id of the class to be reserved
- Required fields in the `req.body`:

```
classId
```

#### Delete a reservation

- Allows a client to remove a reserved class from their list
- Make a DELETE request to `/api/client/reservations/:id`
- where `:id` is the id of the reserved class to be removed.
- Must include a valid token

### STACKS
NODE EXPRESS
MONGO DB
HELMET
JSON WEB TOKEN
JEST

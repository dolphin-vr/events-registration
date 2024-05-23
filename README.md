# Events Registration App

Fullstack Web-based application where users can observe the list of available events and register on prefered events.


## Live page

https://events-registration.onrender.com


### Features

- View the list of available events
- Filter events by name, date and organizer
- Sort events by name, date and organizer ascending or descending
- View the list of registered participants at the selected event
- Register on any event 


## Used tecnologies and libraries
- This project was created using [Vite.js](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) react template.
- [Axios](https://axios-http.com/) for REST API
- [styled-components](https://styled-components.com) for styling
- [Formik](https://formik.org) & [Yup](https://www.npmjs.com/package/yup) to building forms and input validation
- Libraries: react-infinite-scroll-hook for infinity scroll, faker-js for seed database
- Backend developed using NodeJS + ExspressJS + Prisma ORM + PostgreSQL


### How to run the application

Clone the repository

```
git clone https://github.com/dolphin-vr/events-registration
```

Navigate to project backend folder
```
cd events-registration/backend
```

Install npm modules
```
yarn
```

You need to set your database connection URL via an environment variable DATABASE_URL which is defined in .env file and then run prisma migrate
```
yarn prisma migrate dev --name init
```

You can seed the database with random data
```
yarn seed
```

Run local backend server
```
yarn dev
```

In other terminal window navigate to project frontend folder


Install npm modules
```
yarn
```

Run local frontend server
```
yarn dev
```


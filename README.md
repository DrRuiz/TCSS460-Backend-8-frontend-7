# TCSS 460 Group 7 Front End

This is a [Next.js](https://nextjs.org/) project bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/HEAD/packages/create-next-app) with Material UI installed.

This project is a group 7's front-end for the TCSS460 project, using group 6's back-end.
Authors: Riley Bennett, Max Yim, Derek Ruiz-Garcia, Ryan Anderson


## How to use

Run the following commands:

```bash
npm install
```

If docker containers are not set up, use the config files
under oldConfigs to create docker containers for the
back-end using the command:

```bash
docker-compose up
```

Then use the config files outside of that folder when running
the front-end.

To run the app, execute the command

```bash
npm run dev
```

alongside the docker containers and open
[http://localhost:3000](http://localhost:3000) with your browser to see the result.

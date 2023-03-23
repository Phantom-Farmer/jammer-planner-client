# Jammer Planner - client side

Jammer Planner is an app for songwriters and band leaders. It provides tools for organizing songs and set lists as well as scheduling rehearsals.


## Features

Jammer Planner's front end application was made using React/Next.js. Firebase is used for authentication through Google. The server side application was built with Python/Django and can be found here: https://github.com/Phantom-Farmer/jammer-planner-server 

- Create a band or music project, or as many as you want
- Document your songs, and then edit them
- Choose from your songs, per band, and make them into a set list that can be edited, easily changing the song order
- Schedule rehearsals and attach the set list of your choice to any rehearsal

# Screenshots

![image](https://user-images.githubusercontent.com/100452931/227074489-1f8c8da3-b763-41de-8889-fd2582d179a3.png)

![image](https://user-images.githubusercontent.com/100452931/227075315-09652a06-9f7d-47bb-a91c-4e7eb33b93e6.png)

![image](https://user-images.githubusercontent.com/100452931/227075441-608f0026-2eba-46ca-8b36-b812cdce301c.png)




## Run Locally

Clone the project

```bash
  git clone git@github.com:Phantom-Farmer/jammer-planner-server.git
```

Go to the project directory

```bash
  cd jammer-planner-client
```

Install dependencies in the root directory

```bash
  npm install
```
```bash
  npm run prepare
```
Create an env file and copy over the required variables

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_DATABASE_URL=http://localhost:8000 
```

Start the server

```bash
  npm run dev
```


## ERD

https://dbdiagram.io/d/63de8416296d97641d7e71cf

## Wireframe & Flow chart

https://www.figma.com/file/G1AcXOOJIukzpR7gADPS5V/jammer-planner?node-id=0-1&t=UtiHd4xz7dfUdFz4-0

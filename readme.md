### Project Endpoints and URLs overview

- `/`
POST /me

- `/login`
POST /login  {User}

- `/register`
POST /register   {User}

- `/projects`
GET /projects  {Projects} 
POST /projects 
PUT /projects 
DELETE /projects 

- `/projects/:projectId`
GET /projects/:projectId
    populate    members / lists -> cards
    need        length of comments
POST    /lists
PUT     /lists
DELETE  /lists
POST    /cards
PUT     /cards
DELETE  /cards

- `/projects/:projectId/card/:cardId`
PUT     /card
GET     /card/:cardId/comments
        populate    user
PUT     /comments
DELETE  /comments
POST    /comments

- `/settings`
- `/info`
- `/user/:userId/cards`
GET     /user/:userId/assignedCards

- `/profile/:userId`
PUT     /user
DELETE  /user
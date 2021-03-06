# Final Project Milestone 3
### Title: Team Theta
### Subtitle: Teammaker
### Semester: Spring 2020

#### Overview
We plan to develop a website that users can find teammates for their classes. For example, they can post messages like they are looking for teammates for CS 383 section B, and post their phone numbers, class's syllabus, professors' names, TAs' names, and probably link to that class in [ratemyprofessor.com](https://www.ratemyprofessors.com/), and they may also mention some requirements for their expected classmates (proficient in Python, know SQL, etc). Our purpose is that since many classes have a term project, they probably need some teammates to cooperate with. We give them chances to invite people that have not yet enroll in these classes or already enrolled in these classes but do know them. Also, some classes might be too challenging, and this app can let users find classmates and solve problems together. Our website does not relate to an existing application.



#### Team Members

|Names|Github usernames|
|  ----  | ----  |
|Jiawei Qi|chichiauei|
|Jiaming Yuan|jiamingyuan|
|Donglin Zhang|downeyzhang|

#### User Interface
1. Login: simple way to login in.

   - Login with their own email address and password
     <img src="media/login.png" style="zoom:60%;" />
     

2. Create an account:
     - Initial accounts
     <img src="media/createAccount.png" style="zoom:60%;" />


3. Dashboard:
     - To show a list of posts which contains information about projects, click on the item will show the detail of corresponding post.
     <img src="media/dashboard.png" style="zoom:60%;"/>

4. Detail of Post:
     - Show more information about a specific post
     <img src="media/postDetail.png" style="zoom:60%"/>

5. Create Post:
     - Input the information and post it to dashboard
     <img src="media/newPost.png" style="zoom:60%;"/>
   
6. Profile:
     - show the infomation of user and access to these data.
     <img src="media/profile.png" style="zoom:60%"/>


#### APIs
**Requests:**

Our Web API is based on **REST** principles. Data resources are accessed via standard HTTPS requests in UTF-8 format to an API endpoint.

| METHOD | ACTION              |
| ------ | ------------------- |
| GET    | Retrieve a resource |
| POST   | Create a resource   |
| PUT    | Update a resource   |
| DELETE | Deletes a resource  |

**Example requests and responses for our application API:**

1. Users can create account with an email address, and he has to select one university in the process to match the corresponding posts.

   | Resource | Request verb | Description                                                  | status code                                            |
   | -------- | ------------ | ------------------------------------------------------------ | ------------------------------------------------------ |
   | /create  | POST         | Creates an account for a user(email required and university required),parameter is the email of user | 200:OK                                                 |
   | /create? | PUT          | Verifies user's email address                                | 200:ok/400:"email not exist" or "email already exists" |
   | /user?   | POST         | sends verification email to the user                         | 200:ok/400:"could not find","already have verified"    |
   | /user    | POST         | sends the password reset link via email                      | 200:ok /400 "could not find"                           |

2. Users have to login the website so that he can get the access to their accounts. After user login his account, he can:

   - modify his personal profile, including Name, Birthday, Year in University, Major, and Resume.
   - create a new post
   - check his post history
   - check the teams he joined
   - leave or reply comments

| Resource    | Request verb | Description                                                | status code             |
| ----------- | ------------ | ---------------------------------------------------------- | ----------------------- |
| /login      | POST         | Verify the email and password                              | 200 OK/400 Error        |
| /user?basic | PUT          | Update his personal information: name. birthday,major,etc. | 200 ok                  |
| /post       | POST         | create new post                                            | 200 ok                  |
| /post?      | GET          | check his post history also the teams he joined            | 200 ok/ 400 "not exist" |
| /comment    | POST         | leave comments for topic into database                     | 200 ok                  |

1. Users can create a post, each post would be assigned a unique ID, and each post needs 4 components:
   - class information (Users phone numbers, class's syllabus, professors' names, TAs' names, and link to that class in [ratemyprofessor.com](https://www.ratemyprofessors.com/)) and detail of projects
   - Class Grading Policy
   - requirement for teammates
   - Current teammates

| Resource | Request verb | Description                                                  | status code                   |
| -------- | ------------ | ------------------------------------------------------------ | ----------------------------- |
| /Post?   | POST         | As what describe above, with more details this time: such as class information: phone number ,prof id, description of class, TA' name, class grading policy, requirement for teammates | 200 OK                        |
| /post?   | GET          | Get all the information above                                | 200:ok /400 "invalid"         |
| /post?   | DELETE       | Delete any components above                                  | 204:ok,404:" does not exist": |
| /post?   | PUT          | Any changes in information                                   | 200:ok                        |

1. In dashboard, users will see a list of posts that posted by other users, and they may also search for posts they looking for by typing post name, teammates name, or post ID via search bar. When users click on one post, a window will appear the detail of this post which contains all details about this post, and there would be a field to leave comments, and a button for requesting into this team.

- The request to join would notify team leader who created the post. Team leader can approve or reject the request in the notification.
- Users may leave comments under each post. Also, the comments will notify to all teammates in this post. When the teammate clicks the notification, the browser will jump to this post and he can reply to it.

| Resource     | Request verb | Description                                                  | status code |
| ------------ | ------------ | ------------------------------------------------------------ | ----------- |
| /comment?    | GET          | when the teammate clicks, the comment will appear            | 200:ok      |
| /join        | POST         | After click the button for requesting, message will send to the leader who created the post | 200:ok      |
| /join?status | GET          | the leader will get the message, if he approve, the id of this group will create. | 200 ok      |
| /group       | PUT          | put their group information in database                      | 200 ok      |
| /comment?del | DELETE       | If the user choose to delete the comment, then comment will delete also in data base | 200 ok      |
| /comment?    | PUT          | After the user change the information in comment, it will also change into database | 200 ok      |

5."Wish List" can save the posts which the user are interested in.

| Resource | Request verb | Description                                                  | status code |
| -------- | ------------ | ------------------------------------------------------------ | ----------- |
| /wish    | PUT          | After the user clicks"like", the post will get into his wish list in database | 200: ok     |
| /wish    | DELETE       | when the user clicks not interested anymore ,it will disappear from wish list and database | 200: ok     |

#### Database Description

| Entity  | schema       | Description and relationship to other entities               |collection in the database|
| ------- | ------------ | ------------------------------------------------------------ | ------------------------ |
| user    |{username:   String, firstName:  String, lastName:   String, email:      String, password:   String, postPublished:[String], postAccepted:[String], wishList:   [String], address:    String, city:       String, country:    String, projects:   [String], comments:   [String]}|The user entity represents users. Username, firstName, lastName, email, password would be stored to database once the user register an account, user can login to their account based on their email and password. postPublished and postAccepted are arrays of objectId of post, represent post the user published and post the user accepted. wishList is also an array of onjectId of post that represents posts that the user interested in. address, city, and country are some general information about the user, these would be stored once user input these information in their profile. Projects are an array of id of project that represents the projects of posts that the user have accepted. Lastly, comments are an array of id of comments that represents all the comments the user published under posts.|users|
| post    |{classId:    String, className:  String,  info:       String, postby:     String, requirement:String, comments:   [String]}|The post entity represents the post users publish for finding teammates. classId means the short id of class (e.g. "CS 326"), and className means the longer name of the class (e.g. "Web programming"). info is a short discription of class, postBy is a string that store the objectId of the user who posted it. requirement is a string of requirements for the teammates (e.g. "Proficient in Python, passionate"), comments store id of all comments under the post. All of these information, except comments, should be done when creating the post.|posts|
| project |{name:       String, progress:   { type: Number, min: 0, max: 100 }, user:       [String]}|The project entity is the project associated with each post. A post might associated with a project or not (depends on the specific class). name is the name of project, progress is the progress of project in percentage (e.g. 50% means the project is half way), and user is an array of id of users which means the group of user who are currently doing it.|project|
| comment |{user:       String, post:       String, content:    String  }|The comment entity is comments under each posts. User can publish comments under each posts, and the database would store them using this entity. user is the id of user who posted it, post is the id of post where the comment published, content is the content of comment in words.|comment|



#### URL Routes/Mappings
https://afternoon-savannah-61268.herokuapp.com/





#### Authentication/Authorization
For authentication, each user can only register with one unique email. If email is duplicated, the register page would generate an alert and tell user to use another emall address. The password should be more than 8 characters long. 
For authorization, We chose to use cookie-parser to ensure each user would have an unique UI views. They can only access to their own UI view, and, if the user has not make any change to the interface for a long time, he (or she) would be automatically logged out.





#### Division of Labor
|Names           |Division of Labor|
| -------------- | -------------- |
|Jiawei Qi       |Documentation and structure, Implement API documentation, Implement Resting API(wish list,post, and comment ) function, Backend Functionality of  post(CREATE, DELETE,GET,PUT), comment(CREATE,DELETE,GET,PUT), and wish list(PUT,DELETE)|
|Jiaming Yuan    |Designed and implemented general layout of index.html, create.html, profile.html, and post.html using Bootstrap. Wrote several css to unify the general style for elements (like button and card) in each pages. Implemented some fronted js files which ensure basic login and register functions. Built server skeleton, created online MongoDB and built connection between server and database using Mongoose. Designed structure of documents in MongoDB and implemented model schema in src/model folder. Implemented post method for "register account" function in server.js. |
|Donglin Zhang   |Web page design, documentation fix, add request on the web pages, get data from database and render pages from sever. Implement function which stores post infomation, searches posts according to class name, updates profile. Login and logout function use cookie to indetify login status. Deploy on Heroku|

#### Conclusion



First barrier we met is to find a suitable topic for this project. We came up with few cool ideas, but all shut down by every reasons: That's actually make us feel pretty stressed and disappointed. For milestone1, Web design is literally a tricky part, we use the knowledge of what we learnt about CSS ,HTML, and Javascript to finish this task. And then when it comes to milestone2, frontend, we did a lot of research and necessary study about APIs, how to build a server, connect to the MongoDB, and Deployment on Heroku. These tasks are actually challenging and complicated, We're really glad for ourselves to the result: we got through these challenges and did a very good job about UI and Frontend. For the last part, we successfully implemented the structure of database, and finished the operations on the Database, and Implement all necessary logic of your server to connect up your data model with the user interface to make sure our project works: milestone3 is pretty hard, cause we have to make sure we understand the structure of database, and test it to make sure it works. then we need to make sure the function of backend successful works with UI. 


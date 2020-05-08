**1.Describtion of database**
| Entity  | schema       | Description and relationship to other entities               |collection in the database|
| ------- | ------------ | ------------------------------------------------------------ | ------------------------ |
| user    |{username:   String, firstName:  String, lastName:   String, email:      String, password:   String, postPublished:[String], postAccepted:[String], wishList:   [String], address:    String, city:       String, country:    String, projects:   [String], comments:   [String]}|The user entity represents users. Username, firstName, lastName, email, password would be stored to database once the user register an account, user can login to their account based on their email and password. postPublished and postAccepted are arrays of objectId of post, represent post the user published and post the user accepted. wishList is also an array of onjectId of post that represents posts that the user interested in. address, city, and country are some general information about the user, these would be stored once user input these information in their profile. Projects are an array of id of project that represents the projects of posts that the user have accepted. Lastly, comments are an array of id of comments that represents all the comments the user published under posts.|users|
| post    |{classId:    String, className:  String,  info:       String, postby:     String, requirement:String, comments:   [String]}|The post entity represents the post users publish for finding teammates. classId means the short id of class (e.g. "CS 326"), and className means the longer name of the class (e.g. "Web programming"). info is a short discription of class, postBy is a string that store the objectId of the user who posted it. requirement is a string of requirements for the teammates (e.g. "Proficient in Python, passionate"), comments store id of all comments under the post. All of these information, except comments, should be done when creating the post.|posts|
| project |{name:       String, progress:   { type: Number, min: 0, max: 100 }, user:       [String]}|The project entity is the project associated with each post. A post might associated with a project or not (depends on the specific class). name is the name of project, progress is the progress of project in percentage (e.g. 50% means the project is half way), and user is an array of id of users which means the group of user who are currently doing it.|project|
| comment |{user:       String, post:       String, content:    String  }|The comment entity is comments under each posts. User can publish comments under each posts, and the database would store them using this entity. user is the id of user who posted it, post is the id of post where the comment published, content is the content of comment in words.|comment|







**2.Division of labor**

| Names         | Division of Labor                                            |
| ------------- | ------------------------------------------------------------ |
| Donglin Zhang |                                                              |
| Jiaming Yuan  | Database                                                     |
| Jiawei Qi     | Backend Functionality of  post(CREATE, DELETE,GET,PUT), comment(CREATE,DELETE,GET,PUT), and wish list(PUT,DELETE) |

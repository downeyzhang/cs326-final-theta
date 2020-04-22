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

   | Resource   | Request verb | Description                                                  | status code                                            |
   | ---------- | ------------ | ------------------------------------------------------------ | ------------------------------------------------------ |
   | /user      | POST         | Creates an account for a user(email required and university required),parameter is the email of user | 200:OK                                                 |
   | /user?<id> | PUT          | Verifies user's email address                                | 200:ok/400:"email not exist" or "email already exists" |
   | /user?<id> | POST         | sends verification email to the user                         | 200:ok/400:"could not find","already have verified"    |
   | /user      | POST         | sends the password reset link via email                      | 200:ok /400 "could not find"                           |

   

2. Users have to login the website so that he can get the access to their accounts. After user login his account, he can:

   - modify his personal profile, including Name, Birthday, Year in University, Major, and Resume.

   - create a new post

   - check his post history
   - check the teams he joined
   - leave or reply comments

   

| Resource    | Request verb | Description                                                | status code             |
| ----------- | ------------ | ---------------------------------------------------------- | ----------------------- |
| /user?basic | PUT          | Update his personal information: name. birthday,major,etc. | 200 ok                  |
| /post       | POST         | create new post                                            | 200 ok                  |
| /post?<id>  | GET          | check his post history also the teams he joined            | 200 ok/ 400 "not exist" |
| /comment    | POST         | leave comments for topic into database                     | 200 ok                  |



3. Users can create a post, each post would be assigned a unique ID, and each post needs 4 components:
   - class information (Users phone numbers, class's syllabus, professors' names, TAs' names, and link to that class in [ratemyprofessor.com](https://www.ratemyprofessors.com/)) and detail of projects
   - Class Grading Policy
   - requirement for teammates
   - Current teammates

| Resource   | Request verb | Description                                                  | status code                   |
| ---------- | ------------ | ------------------------------------------------------------ | ----------------------------- |
| /Post?<id> | POST         | As what describe above, with more details this time: such as class information: phone number ,prof id, description of class, TA' name, class grading policy, requirement for teammates | 200 OK                        |
| /post?<id> | GET          | Get all the information above                                | 200:ok /400 "invalid"         |
| /post?<id> | DELETE       | Delete any components above                                  | 204:ok,404:" does not exist": |
| /post?<id> | PUT          | Any changes in information                                   | 200:ok                        |

4.In dashboard, users will see a list of posts that posted by other users, and they may also search for posts they looking for by typing post name, teammates name, or post ID via search bar. When users click on one post, a window will appear the detail of this post which contains all details about this post, and there would be a field to leave comments, and a button for requesting into this team.

- The request to join would notify team leader who created the post. Team leader can approve or reject the request in the notification.
- Users may leave comments under each post. Also, the comments will notify to all teammates in this post. When the teammate clicks the notification, the browser will jump to this post and he can reply to it.

| Resource         | Request verb | Description                                                  | status code |
| ---------------- | ------------ | ------------------------------------------------------------ | ----------- |
| /comment?<id>    | GET          | when the teammate clicks, the comment will appear            | 200:ok      |
| /join            | POST         | After click the button for requesting, message will send to the leader who created the post | 200:ok      |
| /join?status<id> | GET          | the leader will get the message, if he approve, the id of this group will create. | 200 ok      |
| /group<id>       | PUT          | put their group information in database                      | 200 ok      |
| /comment?del<id> | DELETE       | If the user choose to delete the comment, then comment will delete also in data base | 200 ok      |
| /comment?<id>    | PUT          | After the user change the information in comment, it will also change into database | 200 ok      |





5."Wish List" can save the posts which the user are interested in.

| Resource  | Request verb | Description                                                  | status code |
| --------- | ------------ | ------------------------------------------------------------ | ----------- |
| /wish<id> | PUT          | After the user clicks"like", the post will get into his wish list in database | 200: ok     |
| /wish<id> | DELETE       | when the user clicks not interested anymore ,it will disappear from wish list and database | 200: ok     |

6.  **Response Status Codes(details)**

   | STATUS CODE | DESCRIPTION                                                  |
   | ----------- | ------------------------------------------------------------ |
   | 200         | OK - The request has succeeded. The client can read the result of the request in the body and the headers of the response. |
   | 201         | Created - The request has been fulfilled and resulted in a new resource being created. |
   | 202         | Accepted - The request has been accepted for processing, but the processing has not been completed. |
   | 204         | No Content - The request has succeeded but returns no message body. |
   | 304         | Not Modified.                                                |
   | 400         | Bad Request - The request could not be understood by the server due to malformed syntax. The message body will contain more information. |
   | 403         | Forbidden - The server understood the request, but is refusing to fulfill it. |
   | 401         | Unauthorized - The request requires user authentication or, if the request included authorization credentials, authorization has been refused for those credentials. |
   | 404         | Not Found - The requested resource could not be found. This error can be due to a temporary or permanent condition. |
   | 429         | Too Many Requests - [Rate limiting](https://developer.spotify.com/documentation/web-api/#rate-limiting) has been applied. |
   | 500         | Internal Server Error. You should never receive this error because our clever coders catch them all … but if you are unlucky enough to get one, please report it to us through a comment at the bottom of this page. |
   | 502         | Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server. |
   | 503         | Service Unavailable - The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again. |

   
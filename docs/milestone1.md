
# Final Project for COMPSCI 326
### Team name: Team Theta
### Application name: Teammaker
#### Team Overview
|Names|Github usernames|
|  ----  | ----  |
|Jiawei Qi|chichiauei|
|Jiaming Yuan|jiamingyuan|
|Donglin Zhang|downeyzhang|

#### Innovative Idea
We plan to develop a website that users can find teammates for their classes. For example, they can post messages like they are looking for teammates for CS 383 section B, and post their phone numbers, class's syllabus, professors' names, TAs' names, and probably link to that class in [ratemyprofessor.com](https://www.ratemyprofessors.com/), and they may also mention some requirements for their expected classmates (proficient in Python, know SQL, etc). Our purpose is that since many classes have a term project, they probably need some teammates to cooperate with. We give them chances to invite people that have not yet enroll in these classes or already enrolled in these classes but do know them. Also, some classes might be too challenging, and this app can let users find classmates and solve problems together. Our website does not relate to an existing application.

#### Important Components
1. Users can create account and login. They have to login the website so that he can get the access to their accounts.
2. Users can create a post, and each post have 4 components: "class informations (Users phone numbers, class's syllabus, professors' names, TAs' names, and link to that class in [ratemyprofessor.com](https://www.ratemyprofessors.com/)), Class Grading Policy, We are looking for..., Current teammates. Each post has a post ID.
3. Users can modify their personal profile (Name, Birthday, Year in University, Major, and Resume).
4. In dashboard, users will see a list of posts that posted by other users, and they may also search for posts they looking for by typing post name, teammates name, or post ID via search bar.
5. When users click on one post, a window will appear which contains class informations, Class Grading Policy, We are looking for..., Current teammates.
6. Users may like posts and save them into "like" page.
7. Users may comment under each post.


Data flow of Teammaker

login in---dashboard---profile---liked

1.  There are 2 ways to login in, one is Login with google/facebook;

![](media/f98e18afd47891acfb12a3014cffd584.jpg)

>   The other one is create an new account by personal information:

![](media/ffb2fb5f8ee8907fc99aa5606eebb8aa.jpg)

1.  Above the main page are all the courses of the user. For example, in this
    screenshot, there are cs 326, cs 187, cs589, and cs311. When the user clicks
    one course, the class overview and class grading policy will show as below;

![](media/9348fe8cadab370cce371e52c6ae3abe.jpg)

>   3.

>   For profile page, it shows the user settings, contact settings and forum
>   settings

![](media/3c8b563dfcaaaf30eb26e334b877f41e.jpg)

![](media/412982a2178065cc1b981930c8052f51.jpg)

>   4. Liked page shows the posts which the user clicks like;

![](media/0ca49f0a9fc34f1c26b07ffa8535df3d.jpg)

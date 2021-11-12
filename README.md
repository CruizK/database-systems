# Database Systems Project


## Function
This project, I call Uni System (University System), is a full stack application used to manage and mock various tables that would appear in a university database such as students, courses, faculty, etc.

## Structure
The backend consists of a Java Api using Spark, connected to the database using JDBC mysql connector. Each table has a repository and API class associated with it for manipulation. 

The entire Frontend is written in react, using the Material UI framework to allow for easy to implement, clean UI.

The main reason I did this is because I was already familiar with web development and react, so I found it more fun and easier to use than learning java Swing library.

## Setup
Since it is a full stack application it has two main points of setup. You also must have NodeJS installed
* To get the API setup, you first must have some mysql server, I used a docker instance, and then change the connection string in `MySQLAccess.java`.
* To Build it you will need maven, and then to get a jar file you can do `mvn clean compile assembly:single` in the database-systems folder.
* Or you can use the provided jar file and run it like so `java -cp app.jar com.cruizk.Main` in the root folder of this project
* For the front end, go into the app folder, run npm install, and then run npm start, this will launch the app on port 3000, make sure its not in use. The app should now be fully functional.

## Cool Features
* It is a full stack, production-like application that could be used in the real world
* Uses REST practices for resources
* The UI is part of Material UI framework, made by Google so it looks pretty decent and uses design standards set by them.
* Consistent layout between all pages
* The API will auto-run the sql files in the root directory, assuming it has a valid sql connection

## Image Descriptions - If any is needed
"CourseAtCapacity" - A user is unable to select a full course, This also shows part of the student view, that allows them to search courses and enroll.
"CreatingResource" - Form that displays when staff clicks create on a resource
"FacultyView" - Shows that faculty have access to view any and all tables, but cannot manipulate
"ForeignKey" - Shows that if a table has a Foreign key, when added there will be a dropdown with all available options.
"ID Duplication Validation" - Shows that no duplicate ID's can be used when creating a resource
"LoginPage" - The login page, you can switch between the views
"SearchWorks" - You can use search to filter any Names for any table
"StaffFullAccess" - The Staff view with full CRUD ability
"StudentView" - Shows the top half of the student view, which shows info and Current Courses, the bottom half is shown in "CourseAtCapacity"
"UpdateView" - When updating a resource, the ID is locked and all other fields are editable.
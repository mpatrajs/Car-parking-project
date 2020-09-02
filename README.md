# Car-parking-project
How to run a project:

Ø For Backend testing in IDE you should have installed: JDK, JRE, IntelliJ IDEA, Postman and maybe something else.... Ø For Frontend testing in IDE you should have installed: You will need node and npm installed globally on your machine. Ø For Docker you should have installed: Docker :) In IDE: BACKEND Ø Open project in IntelliJ IDEA Ø If you open it at the first time, set project setting as Maven Project(can be found in section "Event Log") and pick SDK 1.8 (It will pop up and writee: setup SDK...) Ø Set "application.yml" profile to DEVELOPMENT (Described more in Database -> Switching between databases) Ø Run Class RestServiceApplication If you see everything as shown at image below, than you successfully started our project!

What happened and what to do with it? To see new created database visit http://localhost:8080/h2-console/ in your browser. User Name: sa Password: password

Backend works on port 8080, so just typing http://localhost:8080/ in your browser, you can get access to the backend. in src/main/java/com/example/RestService/api/CarController are located all mappings(They are described in Car parking service -> Controller). For example, just type http://localhost:8080/api/car_park/person/all in your browser to get request of all persons from database.

For manual testing use Postman. There were created all requests to the database. Ask invite to the team workspace in postman to one of AppZilla teammembers to get access to all requests.

Some requests uses Ruquests form path mapping: In that case, change your input in Params -> Path Variables, as it is shown above:

But in some cases, when you see a green dot near the "body" tab, you should send request in body JSON as it is shown above:

In IDE: FRONTEND Installation and Setup Instructions For React app: Clone down this repository. You will need node and npm installed globally on your machine.

Installation:

npm install

To Run Test Suite:

npm test

To Start Server:

npm start

To Visit App:

localhost:3000

Or if running from

container To Visit App:

localhost:7001

The build folder is ready to be deployed. You may serve it with a static server: npm install -g serve serve -s build

In Docker Ø Open Windows Power-shell console Ø Move towards GitHub\ipm-project\car-parking Ø From car-parking directory type following command in console: docker-compose up --build -d Ø To make sure that containers are up and running type in command line: docker ps If status is Up you can move towards next step.

Ø You should be able to access our car-park service by opening Google Chrome browser: Address - localhost:7001

You should see following web page layout afterwards:

You can get access to the Postgres database using pgAdmin, which runs at port 5555 http://localhost:5555/ User Name: admin@gmail.com Password: password If you don't see the database, than: Ø Click Add New Server Ø Type in all necessary information: General: Name: postgres Connection: Host: car-parking-db Port: 5432 Maintenance database: postgres Username: postgres Password: postgres Ø Press "Save" In Browser -> Database -> Schemas -> Tables you can see postgres tables Virtual machine

GitHub runner automatically downloads all changes from GitHub and pushes them to the Virtual machine. Our frontend can be found here: http://10.125.22.135:7001/ You can access to it only using Cognizant "Associate" network. (Or VPN, but we don't know how to set up it, so welcome to the office!)

pom.xml dependencies Usage: for Ø spring-boot-starter-web

Usage: for Loggs. Ø lombok Ø slf4j-api

Usage: for Ø hibernate-validator Ø javax.el Ø spring-boot-starter-jdbc

Usage: main database. Ø postgresql

Usage: for tests. Ø spring-boot-starter-test Ø junit Controller Controller for car parking is located in file src/main/java/com/example/RestService/api/CerConroller.java Request Mapping is: api/car_park

Below are described all controller mappings:

Ø Update car registration status in database | Approve car registration PUT : {{base_url}}/{{car_park}}/car/approve BODY : { "userId": USER_ID, "carNum": "CAR_NUMBER", "approvedStatus": true } RETURNS : HTTP STATUS OK

Ø Set active car PUT : {{base_url}}/{{car_park}}/car/set_active BODY : { "userId": USER_ID, "carNum": "CAR_NUMBER", } RETURNS : HTTP STATUS OK

Ø Get list with all information about all cars in database GET : {{base_url}}/{{car_park}}/car/all RETURNS : HTTP STATUS OK

Ø Get list with information about all persons cars by his ID from database GET : {{base_url}}/{{car_park}}/car/:userId/all RETURNS : HTTP STATUS OK

Ø Get all information about one car by car number from database GET : {{base_url}}/{{car_park}}/car/person/:carNum RETURNS : HTTP STATUS OK

Ø Get list with all information about all persons from database GET : {{base_url}}/{{car_park}}/person/all RETURNS : HTTP STATUS OK

Ø Get all information about person by ID from database GET : {{base_url}}/{{car_park}}/person/:personid RETURNS : HTTP STATUS OK

Ø Delete person from database (by admin) DEL : {{base_url}}/{{car_park}}/person/:personId RETURNS : HTTP STATUS OK

Ø Delete car from database by car number (by admin) DEL : {{base_url}}/{{car_park}}/car/:carnum RETURNS : HTTP STATUS OK

Ø Add person and car to database POST : {{base_url}}/{{car_park}} BODY : { "userId": USER_ID, "name": "USER_NAME", "surname": "USER_SURNAME", "phone": "USER_PHONE", "carNum": "CAR_NUMBER" } RETURNS : HTTP STATUS OK

VARIABLES: {{base_url}} - localhost:8080 {{car_park}} - api/car_park BPMN: CAR ADDING PROCESS

Not all steps from this diagram are now realized, but that is the idea, how it should work :) Logging We have logging file, that saves all backend logs. Maximal file size is 10MB

More information can be found in backend -> resources/log5j2-prod.xml and resources/logback-spring.xml

logging.level.root: INFO logging.level.org.springframework.web: INFO logging.level.org.hibernate: INFO logging.level.com.example.RestService.api: INFO logging.level.com.example.RestService.service: INFO Exceptions

For error catching, we developed our custom exceptions. As you can see in the image, they are stored in the "exception" directory. The code above represents their work principles. apiException contains: Ø A message with the information about the error. Ø HttpStatus request status . Ø Time when the error occurred.

@AllArgsConstructor public class ApiErrorResponse { @Getter private final HttpStatus status; @Getter private final String message; @Getter private final Instant timestamp; }

Here is the example of the ApiRequestException usage: //Try to add new person try { carDao.insertPerson(person); } catch (Exception e) { throw new ApiException(HttpStatus.UNAUTHORIZED, "User " + person.getUserId() + " already exists in database!" );

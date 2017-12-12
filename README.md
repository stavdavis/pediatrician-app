# The Pediatrician's App
## A patient data management platform - for parents and pediatricians

#### Background
My doctor's website is terrible: impossible to navigate, slow, cumbersome, mobile-unfriendly and generally feels like a 1970's soviet-era creation.
I wanted to propose an alternative. For the first version, I decided to focus on pediatric practices, since they are the most standardized in terms of the data they aggregate, but this can be easily converted to support any medical discipline (or even many non-medical ones).

#### Summary of Functionality
* The app is designed primarily for use on mobile phones. However, it dynamically adjusts to wider screens.
* The app has two primary types of users: (1) Parents and (2) Doctor/staff. There are two separate login paths and UIs for each.
	* The app allows Parents to REGISTER, LOGIN, ADD as many children as they want, and VIEW those children's medical records (vaccines, appointments and personal info for now).
	* The app allows the Doctor/Staff to LOGIN, VIEW all existing children (from all parents) and ADD/EDIT/DELETE entries for any selected child (vaccines and appointments for now).
* **Please note:** The app has two demo accounts of Parents. The admin side can be demonstrated in person, for security reasons (it has full access to the database).

#### User Flows
Below are all the possible user paths:
* Initial login screen:
	* If correct username and password:
		* Goes to user's main actionable screen
			* User selects one of the existing children
				* Selected child's button gets highlighted
				* User now can select a service: View Vaccine history, View Visit History or View Patien Info
					* The results are displayed in the results section at the bottom
					* The user can now select a different service
					* Or the user can select a different child
						* This will clear the previous results, so the parent can select new data to view
					* Or the parent can log out of the system
						* This will take the user back to the login page and delete any locally stored credentials
			* User clicks the "Add a child" button:
				* A hidden form becomes visible
					* User can add Name, DOB, Gender and submit the new child entry
						* Then the form disappears, the page reloads and the new child get his/her own button
						* Now that parent can select that child and select data to view. 
							* An admin can login in parallel and add vaccines or appointments for real-time updates
			* User clicks "Log out":
				* This will take the user back to the login page and delete any locally stored credentials
	* Incorrect username or password
		* Error message asking to check both fields
	* Register new user
		* User enters new username and password
			* If username not taken:
				* Creates this user in the database
				* Take the user to their main actionable page, where they can add children (see above)
			* If username taken:
				* Error message asking to select a different username
			* If password shorter than 10 characters:
				* Error message asking to input a longer password
	* Staff login button
		* Takes user to the staff login page (similar to the regular user login page)
			* If admin's username and password are correct:
				* Admin is taken to main actionable screen, with a list of all existing patients and available services
					* Admin can select a child-patient
						* Child's button gets highlighted
						* They admin can select a service to perform:
							* If "View Vaccines", "View Appointments" or "View Patient Info" are selected:
								* Results are displayed at the botton of the page
							* If one of the "Add", "Edit" or "Delete" buttons are selected:
								* A hidden form becomes visible with the relevant fields
									* Upon submitting the form, that data is immediatley visible to the parent of the relevant child
					* If logout button is clicked:
						* This will take the user back to the login page and delete any locally stored credentials
			* If admin's username and/or password ar incorrect:
				* Error handling similar to regular user (see above)

#### Screenshots
<img src="/screenshots/01-login-blank.PNG" alt="Login page - blank" width="250" style="display: inline-block;">  
<img src="/screenshots/02-login-correct.PNG" alt="Login page - with correct credentials" width="250" style="display: inline-block;">  
<img src="/screenshots/03-main-no-selection.PNG" alt="Main actionable page - no selections made yet" width="250" style="display: inline-block;">  
<img src="/screenshots/04-main-child-select.PNG" alt="Main actionable page - child selected" width="250" style="display: inline-block;">  
<img src="/screenshots/05-main-service-selection-and-results.PNG" alt="Main actionable page - data service selected" width="250" style="display: inline-block;">  
<img src="/screenshots/06-main-add-child-blank.PNG" alt="Main actionable page - 'Add Child' button selected" width="250" style="display: inline-block;">  
<img src="/screenshots/07-main-add-child-filled-out.PNG" alt="Main actionable page - 'Add Child' form filled out" width="250" style="display: inline-block;">  
<img src="/screenshots/08-main-service-selection-and-blank-results.PNG" alt="Main actionable page - new child selected" width="250" style="display: inline-block;">  
<img src="/screenshots/09-admin-login.PNG" alt="Admin login page" width="250" style="display: inline-block;">  
<img src="/screenshots/10-admin-main-no-selection.PNG" alt="Main admin page - no selections made yet" width="250" style="display: inline-block;">  
<img src="/screenshots/11-admin-main-add-vaccine.PNG" alt="Main admin page - add vaccine to new child" width="250" style="display: inline-block;">  

#### API Documentation
The app uses custom made RESTful APIs with the following endpoints:

* API for children-patients data:
	* '/patients'
		* '/' - GET a list of all patients
		* '/' - POST a new child-patient
			* Required fields: 'firstName', 'lastName', 'dob', 'gender', 'guardians'
		* '/byGuardianName/:guardians' - GET all children-patients of the current parent-user
		* '/byPatientId/:id' - GET a child-patient with their unique ID
		* '/:id' - PUT endpoint - for updating an existing child-patient by their unique ID
		* '/:id' - DELETE endpoint - for deleting an existing child-patient by their unique ID


* API for vaccine entries data:
	* '/vaccines'
		* '/' - GET a list of all vaccines in the database, across all patients
		* '/' - POST a new vaccine
			* Required fields: 'vaccineName', 'vaccineStatus', 'patientId', 'relatedDiseases'
		* '/byPatient/:patientId' - GET all vaccines given to a specific child, using the child's unique ID
		* '/:id' - PUT endpoint - for updating an existing vaccine entry, using its unique vaccine ID
		* '/:id' - DELETE endpoint - for deleting an existing vaccine entry, using its unique vaccine ID

* API for appointment entries data:
	* '/appointments'
		* '/' - GET a list of all appointments in the database, across all patients
		* '/' - POST a new appointment to the database
			* Required fields: patientName', 'patientId', 'date', 'reason', 'summary'
		* '/byPatient/:patientId' - GET all appointments assigned to a specific child-patient, using the child's unique ID
		* '/:id' - PUT endpoint - for updating an existing appointment entry, using its unique appointment ID
		* '/:id' - DELETE endpoint - for deleting an existing appointment entry, using its unique appointment ID

* API for registering new users and checking existing user logins:
	* '/src/users'
		* POST: '/' - POST, GET
		* The relevant schemas can be found in: /src/users/models.js

* API for creating JWTs:
	* '/src/auth'
		* '/login' - POST
		* '/refresh' - POST

* Note: all endpoints require a valid JWT for access

#### Formatting
The design was deliberately kept minimalist, as this is an analysis tool rather than a consumer facing app. 
Dynamic layout has been implemented to adjust the appearance to different screen sizes (most elements grow proportionately up to a screen width of 550px, at which point all dimensions freeze and align to the center of the page).

#### Technology Used
* This app uses HTML, CSS, JavaScript, jQuery, NodeJS. 
* It runs TravisCI for Continuous Integration testing and is set up on Heroku, and mLab as the remote database (mongo was used as the local DB). 
* The app uses JWTs for authentication (with local storage) and custom RESTful APIs (see documentation above).

#### Browser Compatibility
This app has been tested and works on all major browsers (Chrome, Firefox, Edge, Safari) except IE11 (due to handling of template literals and backticks specifically). Babel will be used in future iterations to handle that issue.


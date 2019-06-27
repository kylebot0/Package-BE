![](https://github.com/kylebot0/Blok-tech/blob/master/public/img/logo.png)
## FoodLove
Foodlove is a dating site for individuals who love food. Foodlove matches people based on their food and sexual preferences. You can change profiles, add photos, choose different types of food and above all, fun with people with the same food interests.

## Supported features
1. Register an account
2. Login
3. Sessions
4. Update profile
5. Search for matches
6. Look at other profile
7. Delete your own profile
8. View your matches on a page
9. Online database (MongoDB Atlas)

## Model
This model represents the data stored in the MongoDB Atlas database. 

My user model contains the following properties
```
_id: automatically generated id stored as String,

food: [array with 1 or multiple strings],

firstName: String,

lastName: String,

email: String,

password: String hashed with Bcrypt,

gender: String,

age: Number,

image: String,

pref: String,

matchId: [array with 1 or multiple Strings]
```
## Installation

### 1. Open the terminal
For MacOS press:
```
command + spacebar, then type terminal
```
For Windows press:
```
Search and then type cmd
```
### 2. Go into the directory you want to install the app in
```
git clone https://github.com/kylebot0/Blok-tech.git
```
### 3. Cd into the directory
```
cd blok-tech
```
### 4. Install the dependecies 
```
npm install
```
### 5. Make a .env file for sensitive info.
```
touch .env
```
### 6. Edit the code in the .env file according to your account credentials or use the echo command.
```
PORT=
DB_NAME=
DB_PASSWORD=
DB_LINK=
SECRET=

```
```
echo "PORT=your_port"
echo "DB_NAME=your_databasename"
echo "DB_PASSWORD=your_databasepassword"
echo "DB_LINK=your_databaselink"
echo "SECRET=your_sessionsecret"
```

### 7. Run the application
```
npm run dev
```

## Usage 
To run the application using 
```
npm run dev
```
It console logs if the server has started.

For a GUI for the database model, make sure to visit the Mongodb Atlas website.

## License
[MIT License](https://github.com/kylebot0)

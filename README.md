# Coffee Dials Logger

The idea is to give home baristas the ability to track what they do to create their preferred espressos in a digital shared space.

This web application allows users to build an archive of different coffees they collect. Each coffee will have an associated table of recipes (also known as "dials") that users can keep a log of. User's can then share their recipes in an effort to help educate others on their approach.

---

## Technology Used

- **React**: flexible, reusability and modularity, quick to iterate, vast resources
- **Material UI**: wanted first hand experience in implementing Material UI, pre-built component library with React, widely used, out-of-the box responsive
- **Firebase**: real-time database management, simple implementation, scalable, provides authentication
- **Netlify**: free, able to quickly deploy from Git/GitHub, CI/CD infrastructure, asset optimization for performance

---

## Installation

1. Git clone the following GitHub repo:

```
https://github.com/eorosales/coffee-dials-logger.git
```

2. Run the following to CD into the project root directory

```
cd coffee-dials-logger
```

3. Run the following to install necessary dependencies

```
npm install
```

4. Run the project by executing the following

```
npm run dev
```

---

## Usage

### Favorites and All Coffees View

#### Add New Coffee

Locate the ADD NEW COFFEE text button to open the modal containing the add new coffee coffee form. All input text fields are required (as marked by the asterisk \*). Once completed, select DONE and a new coffee card will appear under the section labeled ALL COFFEES.

#### Favorite Coffee

To mark a coffee card as favorite, simply click the heart icon. An outlined heart means it is not favorited and is only seen under ALL COFFEES. A filled in heart is a favorited coffee and it will appear under both FAVORITES and ALL COFFEES.

#### Update Coffee

Click the down arrow located at the bottom of each card to expand the form to update the information on the associated coffee card. Each input text field will contain the current information provided from the ADD NEW COFFEE form during its creation. Enter any necessary changes to the input fields and click UPDATE to apply those changes.

#### Delete Coffee

Click the down arrow located at the bottom of each card to expand update form. Click the red DELETE button at the bottom to delete the coffee card from the database. (WARNING! All logged dials under this coffee card will be deleted from the database.)

### Details and Dials Table View

#### Add Dial

Complete the required text fields (Temperature, Weight, Time, and Yield) and click ADD DIAL. A new dial will populate a new row in the table. The table is organized from top to bottom, newest ot oldest.

#### Delete Dial

Simply click the red trash can icon under the "Delete" table column to delete the entire row.

---

## Features to Come

- User creation
- User authentication
- User views
- Coffee feed
- Weather API implementation

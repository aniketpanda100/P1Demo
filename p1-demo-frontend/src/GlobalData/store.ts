/* This is a basic implementation of a store, which is basically a global data file

Any data that you want to use throughout the app can reside here
(We'll see a more encapsulated way in P2 with context API)

For now, we'll just have an object that has fields for the data we want to store */

export const store = {

    //Let's store the info of the logged-in user (filled after successful login)
    loggedInUser:{
        userId:0,
        username:"",
        role:""
    }

    //NOT BEST PRACTICE BTW! For one, the data will be wiped if you refresh the browser
    //look into context API and local storage for a more modern take on this store

}
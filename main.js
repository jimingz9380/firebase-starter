/**
 * @TODO get a reference to the Firebase Database object
 */
 const dataBase = firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */

const allMessages = document.querySelector("#all-messages");
const usernameElem = document.querySelector("#username");
const messageElem = document.querySelector("#message");
const sendBtn = document.querySelector("#send-btn");
sendBtn.onclick = updateDB;
/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

function updateDB(event){
    //prevent default behavior fo form refreshing
    event.preventDefault(); 
    // create an object to store values of input element

    let data = {
        USERNAME: usernameElem.value,
        MESSAGE: messageElem.value

   }

   //print for good measure 
   console.log(data);

   //write to the database
   dataBase.push(data);

   messageElem.value = "";
}


/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */

dataBase.on("child_added", addMessageToBoard);

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */
function addMessageToBoard(rowData){
    //print the data snapshot recieved
    console.log(rowData);

    // get the actual data as a JSON object
    let data = rowData.val();

    //print the JSON data
    console.log("RECIEVED FROM DATABASE", data);

    //make a single message element
    let singleMessage = makeSingleMessageHTML(data.USERNAME, data.MESSAGE)
    
    //append this to #all-message;
    allMessages.append(singleMessage);

}
/** 
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */

function makeSingleMessageHTML(usernameTxt, messageTxt){
    //create a parent div 
    let parentDiv = document.createElement("div");
    // add .single-messgae class
    parentDiv.setAttribute("class", "single-message");

    //create a p tag 
    let usernameP = document.createElement("p");
    // add .single-messgae-username class
    usernameP.classList.add("single-message-username");

    //upadte innerHTML of this p
    usernameP.innerHTML = usernameTxt + ":";
    //append p tag to parentDiv
    parentDiv.append(usernameP);

    //create a p tag
    let messageP = document.createElement("p");
    //upate the innerHTHML to the appropriate data;
    messageP.innerHTML = messageTxt;
    //append this messgae to the parentDiv
    parentDiv.append(messageP);

    return parentDiv;
}
/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key 
 * hint: you need to do keycode
 * 
 * @BONUS use an arrow function
 */
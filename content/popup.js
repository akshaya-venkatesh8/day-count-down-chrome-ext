// Initialize buttons

let showDays = document.getElementById("showDays");
let changeDate = document.getElementById("changeDate");


// When the button is clicked, inject showDaysLeft and resetDate into current page

showDays.addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({

        target: { tabId: tab.id },

        function: showDaysLeft,

    });

});
changeDate.addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({

        target: { tabId: tab.id },

        function: resetDate,

    });

});

// Content script follows
function showDaysLeft() {
    // get the date string from chrome storage
    chrome.storage.sync.get("date", ({ date }) => {

        // create a new div that will be appended to the body
        let daysElement = document.createElement("div");
        // adding styles to the new div
        daysElement.style.cssText = "position: absolute; color: black; top: 30px; left: 50%;  transform: translateX(-50%); background-color: pink; z-index: 99999; padding: 1rem; border-radius: 10px; box-shadow: 3px 3px 6px #00000060";
        //  Date.parse converts Date string to milliseconds
        // To get the number of days left we get the difference in milliseconds and divide by 86400000 (milliseconds in a day)
        noOfDaysLeft = parseInt((Date.parse(new Date(date)) - Date.parse(new Date())) / (86400000));
        let content = '';
        if (noOfDaysLeft < 0) {
            content = document.createTextNode("Deadline has already passed.Please set a new one. :D");
            daysElement.appendChild(content);

            alert(daysElement);
        } else {
            content = document.createTextNode(noOfDaysLeft + " days until go time! B)");
            daysElement.appendChild(content);
        }
        document.body.appendChild(daysElement);
        setTimeout(() => {
            document.body.removeChild(daysElement)
        }, 3000);
    });

}

function resetDate() {
    let newDate = " ";
    let daysElement = document.createElement("div");
    daysElement.style.cssText = "position: absolute; color: black; top: 30px; left: 50%; transform: translateX(-50%); background-color: pink; z-index: 99999; padding: 1rem; border-radius: 10px; box-shadow: 3px 3px 6px #00000060";


    newDate = window.prompt("Enter date in the dd/mm/yyyy format");
    dateArray = newDate.split("/");
    // Check if the format is right - only numbers and valid length
    dateString = dateArray[1] + " " + dateArray[0] + " " + dateArray[2];

    newDate = Date.parse(new Date(dateString));
    let content = '';
    if (newDate) {
        noOfDaysLeft = parseInt((Date.parse(new Date(newDate)) - Date.parse(new Date())) / (86400000));
        if (noOfDaysLeft < 0) {
            content = document.createTextNode("Are you time travelling to the past? I am not ready for you yet :D");
        } else {
            content = document.createTextNode("New date saved! \n" + noOfDaysLeft + " days until go time! B)");
            chrome.storage.sync.set({ "date": newDate });
        }

    } else {
        content = document.createTextNode("Enter a valid date - date/month/full-year");
    }
    daysElement.appendChild(content);
    document.body.appendChild(daysElement);
    setTimeout(() => {
        document.body.removeChild(daysElement)
    }, 3000);


}

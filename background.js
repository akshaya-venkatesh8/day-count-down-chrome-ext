let date = "08 14 2021";

chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.set({ date });

    console.log("Default Date set to Aug 14, 2021");

});
# Atila Browser Extension

A browser extension to search and save crypto content on the internet.

## Installation

`yarn install`

## Quickstart


This extension can be run as a browser extension or as a regular web app.

### Run as a browser extension

`yarn build:extension`

Visit [chrome://extensions](chrome://extensions) in Chrome browser and click load unpacked and select the `build/` folder

### Run as a Web App
`yarn install`

`yarn start`

## Working with the Chrome Storage

1. Right click inspect to open Devtools

1. Paste any commands below into your console, don't forget to remove `REMOVE_IF_YOU_ARE_SURE.`

To view all the items in your storage:

```javascript
chrome.storage.local.get(null,function(items){
 console.log(items);
})
```

To delete a specific item at that key:

```javascript
chrome.storage.local.get({savedContent: {}}, function(items) {
    delete items.savedContent['<url_to_delete>']
    console.log("items.savedContent", items.savedContent) // confirm that this looks like what you expect
    chrome.storage.REMOVE_IF_YOU_ARE_SURE.set(items, function() {
        alert('Item deleted!');
    });
});

```
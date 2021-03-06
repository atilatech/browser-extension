# Atila Browser Extension

A browser extension to save pages on the internet. [Get Atlas from in Chrome Extensions store](https://chrome.google.com/webstore/detail/lhjdnmdnomdgjkbefpnehflckklipbak).

## Installation

`yarn install`

## Quickstart

This extension can be run as a browser extension or as a regular web app.

## Environment Variables

Make sure you set the following environment variables 
(see `shared.env` for an example of what environment variables you'll need to set):

```bash
REACT_APP_ATLAS_API_URL_DEV="<YOUR_API_URL>"# for example:"http://127.0.0.1:8000"
REACT_APP_ATLAS_API_URL_PROD="<YOUR_API_URL>"
```
## Getting API Key

To set an API Key manually. Set `atlasAPIKeyCredit` in your local storage.
### Run as a browser extension

`yarn build:extension`

Visit [chrome://extensions](chrome://extensions) in Chrome browser and click load unpacked and select the `build/` folder

### Run as a Web App
`yarn install`

`yarn start`

## Publish to Chrome Store

1. Update the version number in `manifest.json`
1. Build deployment package: `yarn build:extension`
1. Zip `zip -r build.zip build`
1. [Upload package in Chrome web store developer dashboard](https://chrome.google.com/webstore/devconsole)
1. Follow instructions on page to submit for review

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
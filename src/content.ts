import { Content } from "./models/Content";
import { RequestMessage, ResponseMessage } from "./models/ExtensionMessage";


export {}

// Mainly needed for websites with really long meta descriptions in the <head/> usually because of SEO stuffing
// e.g. https://www.codegrepper.com/code-examples/typescript/global+variable+typescript+react
const MAX_DECRIPTION_LENGTH = 750;

chrome.runtime.onMessage.addListener((message: RequestMessage, sender : chrome.runtime.MessageSender, sendResponse : any) => {
    switch (message.type) {
    case "GET_PARENT_PAGE_CONTENT":
      const content = getParentPageContent();
      const responseMessage: ResponseMessage = {data: { content }};
      sendResponse(responseMessage);
      break;
    default:
      break;
  }
});

const getParentPageContent = () => {

  let content =  new Content();
  content = {
    ...content,
    title: getPageTitle(),
    header_image_url: getPageImage(),
    //remove trailing slash: https://stackoverflow.com/a/6680877/5405197
    url: `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}`,
    description: getPageDescription().substring(0, MAX_DECRIPTION_LENGTH),
  }

  return content;
};

function getPageTitle() {

    const querySelectors = [
        "meta[itemprop='name']",
        "meta[property='og:title']",
        "meta[name='twitter:title']",
    ]

    return getValuefromSelectors(querySelectors);
}

function getPageImage() {

    const querySelectors = [
        "meta[itemprop='image']",
        "meta[property='og:image']",
        "meta[name='twitter:image']",
    ]

    return getValuefromSelectors(querySelectors);
}

/**
 * Return the first one that contains a valid string
 * TODO: A future implementation might use an API to parse or summarize the page content
 */
function getPageDescription() {

  const querySelectors = [
      "meta[itemprop='description']",
      "meta[property='og:description']",
      "meta[name='twitter:description']",
  ]

  return getValuefromSelectors(querySelectors);
}

function getValuefromSelectors(querySelectors: Array<string> =[]) {
    let attributeValue = "";

    for (const querySelector of querySelectors) {

        if (document.querySelector(querySelector)?.getAttribute('content')) {
            attributeValue = document.querySelector(querySelector)?.getAttribute('content') || "";
            return attributeValue;
        }
    }
  
    return attributeValue;
}

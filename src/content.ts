import { Content } from "./models/Content";
import { RequestMessage, ResponseMessage } from "./models/ExtensionMessage";


export {}

// Mainly needed for websites with really long meta descriptions in the <head/> usually because of SEO stuffing
// e.g. https://www.codegrepper.com/code-examples/typescript/global+variable+typescript+react
const MAX_DECRIPTION_LENGTH = 750;

chrome.runtime.onMessage.addListener((message: RequestMessage, sender : chrome.runtime.MessageSender, sendResponse : any) => {
    console.log({message});
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
    title: document.title,
    url: document.URL,
    description: getPageDescription().substring(0, MAX_DECRIPTION_LENGTH),
  }

  console.log("window.location", window.location);
  console.log({content});

  return content;
};

/**
 * Return the first one that contains a valid string
 * TODO: A future implementation might use an API to parse or summarize the page content
 */
function getPageDescription() {

  const potentialQuerySelectors = [
      "meta[itemprop='description']",
      "meta[property='og:description']",
      "meta[name='twitter:description']",
  ]

  let description = "";

  for (const querySelector of potentialQuerySelectors) {
      if (document.querySelector(querySelector)?.getAttribute('content')) {
          description = document.querySelector(querySelector)?.getAttribute('content') ?? "";
          return description;
      }
  }

  return description;

}

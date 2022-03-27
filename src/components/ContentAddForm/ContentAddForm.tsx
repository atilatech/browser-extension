import React, { useEffect, useState } from 'react'
import { SavedContent } from '../../models/Content'
import { RequestMessage, ResponseMessage } from '../../models/ExtensionMessage';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';

function ContentAddForm() {

   const [savedContent, setSavedContent] = useState<SavedContent>(new SavedContent());
   const [isSavedContent, setIsSavedContent] = useState(false);

   useEffect(() => {
     loadParentPageData();
   }, []);

   const loadParentPageData = () => {
    const getContentRequest: RequestMessage = {
      type: "GET_PARENT_PAGE_CONTENT"
    }
    if (chrome.tabs) { // check that chrome exists, for example, when running as a web app in dev environment, chrome.tabs is undefined
      chrome.tabs.query({active: true, currentWindow: true}, (tabs : any) => {
          const tabId = tabs[0].id ?? 0;
          console.log({tabId});
            chrome.tabs.sendMessage(tabId, getContentRequest, (response: ResponseMessage) => {
                console.log({response});
                const parsedContent = response.data.content;
                setSavedContent(prevSavedContent => ({
                    ...prevSavedContent,
                    content: parsedContent
                }));
            });
      });
    }
  }

   const onUpdateContent = (event: any) => {
      
        let value = event.target.value;
        const name = event.target.name;
        if (name === "notes") {
            const updatedSavedContent = {
                ...savedContent,
                [name]: value,
              }
            setSavedContent(updatedSavedContent) 
        } else { // attribute update versus nested object update
            setSavedContent(prevSavedContent => ({
                ...prevSavedContent,
                content: { ...prevSavedContent.content, [name]: value }
            }));
        }
    };

    const onSaveContent = () => {
  
        StorageHelper.performAction(ActionTypes.ADD, "savedContent", savedContent, ({items}) => {
          console.log({items});
          setIsSavedContent(true);
        });
  
      };

    return (
        <div>
            <label htmlFor="contentTitle">Title</label>
            <textarea value={savedContent.content.title} name="title"  onChange={onUpdateContent} 
            className="form-control mb-3" id="contentTitle" placeholder="Title">
            </textarea> 
            
            <label htmlFor="contentDescription">Description</label>
            <textarea value={savedContent.content.description} name="description" onChange={onUpdateContent} id="contentDescription" className="form-control mb-3" placeholder="Description" rows={2}></textarea>

            <label htmlFor="contentNotes">Notes</label>
            <textarea value={savedContent.notes} name="notes" onChange={onUpdateContent} 
                id="contentNotes" className="form-control mb-3" placeholder="Notes" rows={2}></textarea>

            {isSavedContent ?
                <p className="text-success">
                    Saved Content!
                </p> 
                :
                <button id="saveContentButton" className="btn btn-primary mt-3" onClick={onSaveContent}>
                    Save
                </button>
                    
            }
            <hr/>
            <a href={`chrome-extension://${chrome?.runtime?.id}/index.html`} target="_blank" rel="noopener noreferrer">
                See all Saved Content
            </a>
        </div>
    )
}

export default ContentAddForm
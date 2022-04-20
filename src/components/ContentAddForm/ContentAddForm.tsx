import React, { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from 'react'
import { SavedContent } from '../../models/Content'
import { RequestMessage, ResponseMessage } from '../../models/ExtensionMessage';
import AtlasAPI from '../../services/AtlasAPI';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';
import { TextUtils } from '../../services/utils/TextUtils';
import './ContentAddForm.css';

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
            chrome.tabs.sendMessage(tabId, getContentRequest, (response: ResponseMessage) => {
                const parsedContent = response.data.content;
                setSavedContent(prevSavedContent => ({
                    ...prevSavedContent,
                    content: parsedContent
                }));
            });
      });
    }
  }
  

   const updateContent: ChangeEventHandler<HTMLTextAreaElement> = (event) => {

        event.preventDefault();
        const value = event!.target!.value;
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

    const keyDownHandler: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if(event.currentTarget.name === "notes" && event.key === "Enter" && event.shiftKey === false) {
          event.preventDefault();
          saveContent();
        }
    }

    const saveContent = () => {

        savedContent.date_created = new Date().toISOString();
        StorageHelper.performAction(ActionTypes.ADD, "savedContent", savedContent, ({items}) => {
          setIsSavedContent(true);
        });
        AtlasAPI.save(savedContent.content)
                .then()
                .catch((err: any) => {
                    console.log({err});
                })

    };

    return (
        <div className="ContentAddForm">
            <label htmlFor="contentTitle">Title</label>
            <h1>
                {TextUtils.truncate(savedContent.content.title)}
            </h1>
            <p>
            {TextUtils.truncate(savedContent.content.description, 140)}
            </p>
            {savedContent.content.header_image_url && 
                <div>
                    <img src={savedContent.content.header_image_url} alt={savedContent.content.title} width="150" />
                </div>
            }

            <label htmlFor="contentNotes">Notes</label>
            {!isSavedContent && 
            <textarea value={savedContent.notes} name="notes" onChange={updateContent}
                onKeyDown={keyDownHandler}
                id="contentNotes" className="form-control mb-3" placeholder="Notes" rows={2}></textarea>}

            {isSavedContent ?
                <p className="text-success">
                    Saved Content!
                </p> 
                :
                <button id="saveContentButton" className="btn btn-primary mt-3" 
                onClick={saveContent}
                autoFocus>
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
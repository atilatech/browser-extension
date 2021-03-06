import { SavedContent } from "../models/Content";

/**
 * Instead of editing the chrome storage in application files.
 * Ceeate a helper action file that will handle all the logic for adding, editing and removing items from storage.
 */
 export enum ActionTypes {
     ADD = "ADD",
     GET = "GET",
     DELETE = "DELETE",
 }

 type SavedContentCollection = {[url: string]: SavedContent};

 export interface CustomStorageArea {
    savedContent?: SavedContentCollection,
    guestUserId?: string,
}

export type StorageHelperResponse = ( response: {items: SavedContentCollection | null} ) => any;
 
 class StorageHelper {
 
     static performAction = (actionType: ActionTypes, objectType: "savedContent", targetObject: SavedContent | null, responseCallback?: StorageHelperResponse) => {

        chrome.storage.local.get([objectType, "guestUserId"], (items: CustomStorageArea) => {
            let existingObjects = items[objectType];

            if (actionType === "GET") {   
                responseCallback?.({items: existingObjects || null});
                return
            }
            else if(!targetObject){
                return;
            }
            let targetObjectId = targetObject.content.url || targetObject.content.title;
            if(actionType === ActionTypes.ADD) {
                if (!existingObjects) {
                    existingObjects = {};
                }
                if (!existingObjects[targetObjectId]) {
                    targetObject.date_created = new Date().toISOString();
                }
                targetObject.date_modified = new Date().toISOString();
                existingObjects[targetObjectId] = targetObject;
            } else if (actionType === ActionTypes.DELETE && existingObjects) {
                delete existingObjects[targetObjectId];
            }
    
            chrome.storage.local.set({ [objectType] : existingObjects }, function() {
                responseCallback?.({items: existingObjects || null});
            });

        });
    }

 }
 
 export default StorageHelper;
import { SavedContent } from "../models/Content";

/**
 * Instead of editing the chrome storage in application files.
 * Ceeate a helper action file that will handle all the logic for adding, editing and removing items from storage.
 */
 export enum ActionTypes {
     ADD = "ADD",
     GET = "GET",
 }

 type SavedContentCollection = {[url: string]: SavedContent};

 export interface CustomStorageArea {
    savedContent?: SavedContentCollection,
    guestUserId?: string,
}

export type StorageHelperResponse = ( response: {items: SavedContentCollection | null} ) => any;
 
 class StorageHelper {
 
     static performAction = (actionType: ActionTypes, objectType: "savedContent", targetObject: SavedContent | null, responseCallback: StorageHelperResponse) => {

        chrome.storage.local.get([objectType, "guestUserId"], (items: CustomStorageArea) => {
            let existingObjects = items[objectType];
            console.log({objectType, items, existingObjects});

            if (actionType === "GET") {   
                responseCallback({items: existingObjects || null})
            }
            else if(!targetObject){
                return;
            }
            else if(actionType === "ADD") {
                if (!existingObjects) {
                    existingObjects = {};
                }
                existingObjects[targetObject.content.url || targetObject.content.title] = targetObject
    
                chrome.storage.local.set({ [objectType] : existingObjects }, function() {
                    if(responseCallback) {
                        responseCallback({items: existingObjects || null});
                    }
                });
            }
        });
    }

 }
 
 export default StorageHelper;
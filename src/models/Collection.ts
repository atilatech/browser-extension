import { Content } from "./Content";

export class Collection {
    id: string = "";
    title: string = "";
    contents: Array<CollectionContent> = [];
    exported_collection_url: string = "";
}


export interface CollectionContent {
    collection: Collection;
    content: Content;
}
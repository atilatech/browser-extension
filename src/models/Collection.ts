import { Content } from "./Content";

export class Collection {
    id: string = "";
    title: string = "";
    contents: Array<CollectionContent> = [];
}


export interface CollectionContent {
    collection: Collection;
    content: Array<Content>;
}
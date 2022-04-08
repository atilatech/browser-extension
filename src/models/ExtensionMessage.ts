import { Content } from "./Content";

export interface RequestMessage {
    type: "GET_PARENT_PAGE_CONTENT";
    data?: any;
}

export interface ResponseMessage {
    data: {
        content: Content,
    }
}
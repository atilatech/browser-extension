export class Content {
    title: string = '';
    description: string = '';
    header_image_url: string = '';
    url: string = '';
    objectID?: string; //generated from the server
}
export class SavedContent {
    notes?: string = ''
    content: Content = new Content();
    userId?: string;
}
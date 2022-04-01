import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { SavedContent } from '../../models/Content';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';
import { TextUtils } from '../../services/utils/TextUtils';
import "./ContentTable.css";
export interface ContentTableProps {
    contents: Array<SavedContent>;
};

export function ContentTable(props: ContentTableProps) {

  let { contents } = props;
  contents = Object.values(contents).sort((a,b)=> (a?.date_created ?? "") < (b?.date_created ?? "") ? 1 : -1);
  return (
    <div className="ContentTable">
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="wide-column">Name</th>
            <th scope="col" className="wide-column">Description</th>
            <th scope="col" className="wide-column">Notes</th>
            <th scope="col" className="wide-column">Actions</th>
          </tr>
        </thead>

        <tbody>
          {contents.map(savedContent => (
            <ContentTableRow savedContent={savedContent} key={savedContent.content.url} />
          ))}
        </tbody>

      </table>
    </div>
  );
}

export interface ContentTableRowProps {
  savedContent: SavedContent;
};

export function ContentTableRow(props: ContentTableRowProps) {

  const [savedContent, setSavedContent] = useState<SavedContent>(props.savedContent);
  const [isEditing, setIsEditing] = useState<boolean>(false);


  // TODO: are we allowed to remove a component in it's own component?
  const removeScholarship = () => {
    StorageHelper.performAction(ActionTypes.DELETE, "savedContent", savedContent);
  };

  const saveContent = () => {
    StorageHelper.performAction(ActionTypes.ADD, "savedContent", savedContent);
  };

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
    }
  };

  const toggleIsEditing = () => {
    if (isEditing){
      saveContent()
    }
    setIsEditing(!isEditing);
  };

  const keyDownHandler: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if(event.currentTarget.name === "notes" && event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      toggleIsEditing();
    }
}

  return (
    <tr>
      <td>
      <a className="text-align-left" href={savedContent.content.url} target="_blank" rel="noopener noreferrer">
          {savedContent.content.title} <br/>
          {
          savedContent.content.header_image_url && 
          <img src={savedContent.content.header_image_url} 
          alt={savedContent.content.title} />
          }
      </a>
      </td>
      <td className="wide-column">{TextUtils.truncate(savedContent.content.description, 140)} </td>
      <td>
        {isEditing ?
          <textarea rows={4} value={savedContent.notes} name="notes" onChange={updateContent} onKeyDown={keyDownHandler} className="form-control" placeholder="Notes" />:
          <p className="Content--notes">{savedContent.notes}</p>
        }
        <button className="btn btn-link" onClick={toggleIsEditing}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        </td>
      <td>
        <button className="btn btn-link text-danger remove-in-clipboard" onClick={removeScholarship}>
          Remove
        </button>
      </td>
    </tr>

  )
}

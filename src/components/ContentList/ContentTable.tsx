import React from 'react';
import { SavedContent } from '../../models/Content';
import StorageHelper, { ActionTypes } from '../../services/StorageHelper';
import { TextUtils } from '../../services/utils/TextUtils';
import "./ContentTable.css";

export interface ContentTableProps {
    contents: Array<SavedContent>;
};

export function ContentTable(props: ContentTableProps) {

  let { contents } = props;
  contents = Object.values(contents).sort((a,b)=> (a?.date_modified ?? "") < (b?.date_modified ?? "") ? 1 : -1);
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

  const { savedContent } = props;


  // TODO: can yo re
  const removeScholarship = () => {
    StorageHelper.performAction(ActionTypes.DELETE, "savedContent", savedContent, (response) => {
      console.log({response});
    });
  };

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
      <td>{savedContent.notes}</td>
      <td>
        <button className="btn btn-link text-danger remove-in-clipboard" onClick={removeScholarship}>
          Remove
        </button>
      </td>
    </tr>

  )
}

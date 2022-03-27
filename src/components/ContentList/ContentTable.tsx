import React from 'react';
import { SavedContent } from '../../models/Content';
import { TextUtils } from '../../services/utils/TextUtils';
import "./ContentTable.css";

export interface ContentTableProps {
    contents: Array<SavedContent>;
};

export function ContentTable(props: ContentTableProps) {

  const { contents } = props;
  return (
    <div className="ContentTable">
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="wide-column">Name</th>
            <th scope="col" className="wide-column">Description</th>
            <th scope="col" className="wide-column">Notes</th>
          </tr>
        </thead>

        <tbody>
          {contents.map(savedContent => (
            <tr key={savedContent.content.url}>
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
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

import React from 'react';
import { Content } from '../../models/Content';

export interface ContentTableProps {
    contents: Array<Content>;
};


export function ContentTable(props: ContentTableProps) {

  const { contents } = props;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col" className="wide-column">Name</th>
            <th scope="col" className="wide-column">Description</th>
            <th scope="col" className="wide-column">Notes</th>
          </tr>
        </thead>

        <tbody>
          {contents.map(content => (
            <tr key={content.url}>
                <td>
                <a className="text-align-left" href={content.url} target="_blank" rel="noopener noreferrer">
                    {content.title}
                </a>
                </td>
                <td>{content.description} </td>
                <td>{content.notes}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

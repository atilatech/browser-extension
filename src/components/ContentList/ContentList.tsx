import React from 'react'
import { SavedContent } from '../../models/Content';
import { ContentTable } from './ContentTable';

export interface ContentListProps {
  contents: Array<SavedContent>;
};

function ContentList(props: ContentListProps) {

  const { contents } = props;
  return (
    <div>
      <ContentTable contents={contents} />
    </div>
  )

}


export default ContentList
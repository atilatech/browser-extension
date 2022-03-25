import React from 'react'
import { Content } from '../../models/Content';
import { ContentTable } from './ContentTable';

export interface ContentListProps {
  contents: Array<Content>;
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
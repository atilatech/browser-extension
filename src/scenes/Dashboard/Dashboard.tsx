import React from 'react'
import ContentList from '../../components/ContentList/ContentList'
import { SavedContent } from '../../models/Content';

function Dashboard() {

  return (
    <div className="Dashboard">
        <div className="container card shadow p-5 mt-3">
          <h1 className="text-center">Saved Content </h1>
          <ContentList />
        </div>
    </div>
  )
}

export default Dashboard
import React from 'react'
import ContentAddForm from '../../components/ContentAddForm/ContentAddForm'
import Search from '../../components/Search/Search';
import "./PopUp.css";

function PopUp() {
  return (
    <div className="PopUp">
        <div className="p-3">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="add-tab" data-bs-toggle="tab" data-bs-target="#add" type="button" role="tab" aria-controls="add" aria-selected="true">Add</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="search-tab" data-bs-toggle="tab" data-bs-target="#search" type="button" role="tab" aria-controls="search" aria-selected="false">Search</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="recommend-tab" data-bs-toggle="tab" data-bs-target="#recommend" type="button" role="tab" aria-controls="recommend" aria-selected="false">Recommend</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="add" role="tabpanel" aria-labelledby="add-tab">
            <ContentAddForm />
          </div>
          <div className="tab-pane fade" id="search" role="tabpanel" aria-labelledby="search-tab">
            <Search />
          </div>
          <div className="tab-pane fade" id="recommend" role="tabpanel" aria-labelledby="recommend-tab">
            
          </div>
        </div>

        
        </div>
    </div>
  )
}

export default PopUp
import React from 'react'
import ContentAddForm from '../../components/ContentAddForm/ContentAddForm'
import Search from '../../components/Search/Search';
import "./PopUp.css";

function PopUp() {
  return (
    <div className="PopUp">
        <div className="p-3">
        <ul className="nav nav-tabs" id="popupTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="add-tab" data-bs-toggle="tab" data-bs-target="#add" type="button" role="tab" aria-controls="add" aria-selected="true">Add</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="search-tab" data-bs-toggle="tab" data-bs-target="#search" type="button" role="tab" aria-controls="search" aria-selected="false">Search</button>
          </li>
        </ul>
        <div className="tab-content" id="popupTabContent">
          <div className="tab-pane fade show active" id="add" role="tabpanel" aria-labelledby="add-tab">
            <ContentAddForm />
          </div>
          <div className="tab-pane fade" id="search" role="tabpanel" aria-labelledby="search-tab">
            <Search />
          </div>
        </div>

        
        </div>
    </div>
  )
}

export default PopUp
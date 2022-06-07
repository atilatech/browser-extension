import React from 'react'
import ContentList from '../../components/ContentList/ContentList';
import Search from '../../components/Search/Search';
import Settings from '../../components/Settings/Settings';

function Dashboard() {

  const sections = [
    {
      id: "ContentList",
      component: <ContentList />,
      label: "Saved Content",
    },
    {
      id: "Search",
      component: <Search />,
      label: "Search",
    },
    {
      id: "Settings",
      component: <Settings />,
      label: "Settings",
    }
  ]

  return (
    <div className="Dashboard">
        <div className="container card shadow p-5 mt-3">

        <ul className="nav nav-tabs" id="popupTab" role="tablist">
          {sections.map((section, index) => (
            <li className="nav-item" role="presentation" key={section.id}>
            <button className={`nav-link${index === 0 ? " active" : ""}`}  id={`${section.id}-tab`} data-bs-toggle="tab" data-bs-target={`#${section.id}`} type="button" role="tab" aria-controls={section.id} aria-selected={`${index === 0 ? "true" : "false"}`}>
              {section.label}
            </button>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="popupTabContent">
          {sections.map((section, index) => (
            <div className={`tab-pane fade${index === 0 ? " show active" : ""}`} id={section.id} role="tabpanel" aria-labelledby={`${section.id}-tab`}>  
              <h1 className="text-center"> </h1>
              {section.component}
            </div>
          ))}
        </div>
        </div>
    </div>
  )
}

export default Dashboard
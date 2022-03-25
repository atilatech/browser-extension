import React, { useState } from 'react'
import { Content } from '../models/Content'

function ContentAddForm() {

    const [content, setContent] = useState<Content>(new Content());



   const onUpdateContent = (event: any) => {
      
        let value = event.target.value;
        const name = event.target.name;
        const updatedContent = {
          ...content,
          [name]: value,
        }
        setContent(updatedContent)
    };

    return (
        <div>
            <label htmlFor="contentTitle">Title</label>
            <textarea value={content.title} name="name"  onChange={onUpdateContent} 
            className="form-control mb-3" id="contentTitle" placeholder="Name">
            </textarea> 
            
            <label htmlFor="contentDescription">Description</label>
            <textarea value={content.description} name="description" onChange={onUpdateContent} id="contentDescription" className="form-control mb-3" placeholder="Description" rows={2}></textarea>

            <label htmlFor="contentNotes">Notes</label>
            <textarea value={content.notes} name="notes" onChange={onUpdateContent} 
                id="contentNotes" className="form-control mb-3" placeholder="Notes" rows={2}></textarea>

            <button id="saveContentButton" className="btn btn-primary mt-3">
                Save
            </button>
        </div>
    )
}

export default ContentAddForm
import React from "react"
import "../styles/style.scss";
import Avatar from "@mui/material/Avatar";

function IdeaDetail() {
    return (
        <div className="container">
            <div className="idea-detail-page">
                <h2 className='idea-title'>Idea Detail</h2>
                <div className="idea-body">
                    <div className="author">
                        <Avatar className="author-avatar" />
                        <div className="author-info">
                            <label className="author-name">Anonymous</label>
                            <p classname="date-submit">18/04/2022</p>
                        </div>
                    </div>
                    <div className="idea-description">
                        <p>In descriptive writing, the author does not just tell the reader
                            what was seen, felt, tested, smelled, or heard. Rather, the author
                            describes something from their own experience and, through careful choice of words
                            and phrasing, makes it seem real. Descriptive writing is vivid, colorful, and detailed.
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default IdeaDetail
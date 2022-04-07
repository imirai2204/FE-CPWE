import React from "react"
import "../styles/style.scss";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

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
                    <div className="idea-document">
                        <label>List upload document</label>
                        <ul>
                            <li>
                                <Link
                                    to='/terms-conditions'
                                    className='link-item'
                                    target='_blank'>
                                    test.docx
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/terms-conditions'
                                    className='link-item'
                                    target='_blank'>
                                    test.pdf
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/terms-conditions'
                                    className='link-item'
                                    target='_blank'>
                                    test.xlsx
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="idea-image">
                        <label>List upload image</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdeaDetail
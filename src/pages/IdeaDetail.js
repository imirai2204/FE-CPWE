import React, { useState } from "react";
import { useSelector } from "react-redux";
import Comments from "../components/Comment/Comments";
import "../styles/style.scss";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ImageGallery from 'react-image-gallery';
import { IdeaUrl } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import PushPinIcon from '@mui/icons-material/PushPin';
import TagIcon from '@mui/icons-material/Tag';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://files.readme.io/069a96b-4d870d7-546212389.jpg',
        thumbnail: 'https://files.readme.io/069a96b-4d870d7-546212389.jpg',
    },
    {
        original: 'https://cdn.pixabay.com/photo/2015/07/05/13/44/beach-832346__340.jpg',
        thumbnail: 'https://cdn.pixabay.com/photo/2015/07/05/13/44/beach-832346__340.jpg',
    },
];

const handleGet = async (values) => {
    const paramsValue = {
        searchKey: values === null || values.searchKey === null ? null : values.searchKey,
        page: values === null || values.page === null ? 1 : values.page,
        limit: values === null || values.limit === null ? 5 : values.limit,
        sortBy: values === null || values.sortBy === null ? "userId" : values.sortBy,
        sortType: values === null || values.sortType === null ? "ASC" : values.sortType,
    };
    await AxiosInstance.get(IdeaUrl.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: paramsValue,
    })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

function IdeaDetail() {
    const [isAnonymous, setIsAnonymous] = useState(true);
    const currentUserId = useSelector((state) => state.user.userInfo.userId);
    const currentUserName = useSelector((state) => state.user.userInfo.fullName);
    const [isShowComment, setIsShowComment] = useState(false);

    return (
        <div className='container'>
            <div className='idea-detail-page'>
                <div className='idea-body'>
                    <div className='author'>
                        <div className='author-info'>
                            <label className='author-name'>
                                {isAnonymous ? "Anonymous" : "Test user"}
                            </label>
                            <p className='date-submit'>Post date: 18/04/2022</p>
                        </div>
                        <VisibilityIcon
                            className='author-view'
                            onClick={() => setIsAnonymous(!isAnonymous)}
                        />
                    </div>
                    <h2 className='idea-title'>Idea Detail</h2>
                    <div className='idea-category'>
                        <label className='topic-name'>
                            <PushPinIcon className="icon" />
                            Topic
                        </label>
                        <label className='category-name'>
                            <TagIcon className="icon" />
                            Category
                        </label>
                    </div>
                    <div className='idea-description'>
                        <p>
                            In descriptive writing, the author does not just tell the
                            reader what was seen, felt, tested, smelled, or heard.
                            Rather, the author describes something from their own
                            experience and, through careful choice of words and
                            phrasing, makes it seem real. Descriptive writing is
                            vivid, colorful, and detailed.
                        </p>
                    </div>
                    <div className='idea-document'>
                        <label className="idea-label">List upload document</label>
                        <ol>
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
                        </ol>
                    </div>
                    <div className='idea-image'>
                        <label className="idea-label">List upload image</label>
                        <ImageGallery showPlayButton={false} items={images} />
                    </div>
                    <hr />
                    <div className='idea-data'>
                        <div>
                            <label className='data-detail'>
                                <ThumbUpOutlinedIcon className="icon" />
                                10
                            </label>
                            <label className='data-detail'>
                                <ThumbDownOutlinedIcon className="icon" />
                                3
                            </label>
                            <label className='data-detail'>
                                <CommentOutlinedIcon className="icon" />
                                4
                            </label>
                        </div>
                        <div>
                            <label className='data-detail'>
                                <VisibilityOutlinedIcon className="icon" />
                                300
                            </label>
                        </div>
                    </div>
                    <hr />
                    <div className="idea-button">
                        <button className="btn btn--outline" type="button">
                            <ThumbUpOutlinedIcon className="btn-icon" />
                            Like
                        </button>
                        <button className="btn btn--outline" type="button">
                            <ThumbDownOutlinedIcon className="btn-icon" />
                            Dislike
                        </button>
                        <button
                            className="btn btn--outline"
                            type="button"
                            onClick={() => setIsShowComment(!isShowComment)}
                        >
                            <CommentOutlinedIcon className="btn-icon" />
                            Comment
                        </button>
                    </div>
                    <hr />
                    {isShowComment ?
                        <Comments currentUserId={currentUserId} currentUserName={currentUserName} /> :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default IdeaDetail;

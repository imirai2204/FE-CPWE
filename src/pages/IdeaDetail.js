import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comments from "../components/Comment/Comments";
import "../styles/style.scss";
import { Link, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ImageGallery from "react-image-gallery";
import { IdeaUrl } from "../api/EndPoint";
import { AxiosInstance } from "../api/AxiosClient";
import PushPinIcon from "@mui/icons-material/PushPin";
import TagIcon from "@mui/icons-material/Tag";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { convertDate, getFormattedDate } from "../function/library";

const handleGet = async (setIdeaDetail, setListDocument, setListImage, id) => {
    await AxiosInstance.get(IdeaUrl.get + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            var data = res.data.data;
            var createDate = getFormattedDate(convertDate(data.createdDate));
            var listImage = data.listAttachment.filter((item) => {
                if (item.picture === 1) {
                    return item;
                }
            });
            var listDocument = data.listAttachment.filter((item) => {
                if (item.picture === 0) {
                    return item;
                }
            });
            var ideaDetail = {
                title: data.title,
                description: data.content,
                createDate: createDate,
                createdUser: data.createdUser,
                isAnonymous: data.isAnonymous,
                category: data.category,
                topic: data.topic,
            };
            setIdeaDetail(ideaDetail);
            setListDocument(listDocument);
            setListImage(listImage);
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
    const [ideaDetail, setIdeaDetail] = useState({});
    const [listImage, setListImage] = useState([]);
    const [listDocument, setListDocument] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);

    let { id } = useParams();

    useEffect(() => {
        handleGet(setIdeaDetail, setListDocument, setListImage, id);
        setIsAnonymous(ideaDetail.isAnonymous);
    }, [isLoading]);

    return (
        <div className='container'>
            <div className='idea-detail-page'>
                <div className='idea-body'>
                    <div className='author'>
                        <div className='author-info'>
                            <label className='author-name'>
                                {isAnonymous ? "Anonymous" : ideaDetail.createdUser}
                            </label>
                            <p className='date-submit'>Post date: {ideaDetail.createDate}</p>
                        </div>
                        {(userInfo.userRole === "ADMIN" ||
                            userInfo.userRole === "QA COORDINATOR") &&
                        isAnonymous === true ? (
                            <VisibilityIcon
                                className='author-view'
                                onClick={() => setIsAnonymous(!isAnonymous)}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <h2 className='idea-title'>{ideaDetail.title}</h2>
                    <div className='idea-category'>
                        <label className='topic-name'>
                            <PushPinIcon className='icon' />
                            {ideaDetail.topic}
                        </label>
                        <label className='category-name'>
                            <TagIcon className='icon' />
                            {ideaDetail.category}
                        </label>
                    </div>
                    <div className='idea-description'>
                        <p>{ideaDetail.description}</p>
                    </div>
                    <div className='idea-document'>
                        <label className='idea-label'>List upload document</label>
                        <ol>
                            {listDocument.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            to={item.downloadUrl}
                                            className='link-item'
                                            target='_blank'>
                                            {item.fileName}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    <div className='idea-image'>
                        <label className='idea-label'>List upload image</label>
                        <ImageGallery showPlayButton={false} items={listImage} />
                    </div>
                    <hr />
                    <div className='idea-data'>
                        <div>
                            <label className='data-detail'>
                                <ThumbUpOutlinedIcon className='icon' />
                                10
                            </label>
                            <label className='data-detail'>
                                <ThumbDownOutlinedIcon className='icon' />3
                            </label>
                            <label className='data-detail'>
                                <CommentOutlinedIcon className='icon' />4
                            </label>
                        </div>
                        <div>
                            <label className='data-detail'>
                                <VisibilityOutlinedIcon className='icon' />
                                300
                            </label>
                        </div>
                    </div>
                    <hr />
                    <div className='idea-button'>
                        <button className='btn btn--outline' type='button'>
                            <ThumbUpOutlinedIcon className='btn-icon' />
                            Like
                        </button>
                        <button className='btn btn--outline' type='button'>
                            <ThumbDownOutlinedIcon className='btn-icon' />
                            Dislike
                        </button>
                        <button
                            className='btn btn--outline'
                            type='button'
                            onClick={() => setIsShowComment(!isShowComment)}>
                            <CommentOutlinedIcon className='btn-icon' />
                            Comment
                        </button>
                    </div>
                    <hr />
                    {isShowComment ? (
                        <Comments
                            currentUserId={currentUserId}
                            currentUserName={currentUserName}
                            ideaId={id}
                            isAnonymous={isAnonymous}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

export default IdeaDetail;

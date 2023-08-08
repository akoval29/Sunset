import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  fetchPosts,
  allPostsSelector,
  deletePost,
} from "../../../ducks/postSlice";

// commons
import { ScrollTo } from "../../common/scroll/pageScroll";
import { Spinner } from "../../common/loading/spinner";
import { PostEditForm } from "../../common/Forms/postForms/PostEditForm";
import { PostAddForm } from "../../common/Forms/postForms/PostAddForm";
import { ErrorMessage } from "../../common/error/errorMessage";

import "./postStyle.scss";

export const Posts = () => {
  const [showEditPost, setShowEditPost] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const allPosts = useSelector(allPostsSelector);
  const { postsLoadingStatus } = useSelector(
    (state) => state.posts.postsLoadingStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (postsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (postsLoadingStatus === "error") {
    return <ErrorMessage />;
  }

  const onDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setShowEditPost(true);
  };

  return (
    <ul className="app__main">
      <h3 className="app__main-title">Posts</h3>
      <TransitionGroup>
        {allPosts.map((item) => (
          <CSSTransition
            key={item.id}
            timeout={300}
            classNames={"post"}
            unmountOnExit
          >
            <li className="post">
              <div className="post__wrap">
                <p className="post__userId">User № {item.userId}</p>
                <p className="post__postId">Post № {item.id}</p>
                <div className="post__edit-wrap">
                  <button className="post__btn" onClick={() => onEdit(item)}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3524/3524762.png"
                      className="post__item"
                      alt="wrench-icon"
                    />
                  </button>
                  <button
                    className="post__btn"
                    onClick={() => onDelete(item.id)}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/57/57165.png"
                      className="post__item"
                      alt="cross-icon"
                    />
                  </button>
                </div>
              </div>
              <h4 className="post__title">{item.title}</h4>
              <p className="post__body">{item.body}</p>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <PostEditForm
        showEditPost={showEditPost}
        setShowEditPost={setShowEditPost}
        selectedItem={selectedItem}
      />
      <PostAddForm />
      <ScrollTo />
    </ul>
  );
};

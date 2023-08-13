import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  fetchPosts,
  allPostsSelector,
  deletePost,
} from "../../ducks/postSlice";

// commons
import { ScrollTo } from "../common/scroll/pageScroll";
import { Spinner } from "../common/loading/spinner";
import { PostEditForm } from "../common/Forms/postForms/PostEditForm";
import { PostAddForm } from "../common/Forms/postForms/PostAddForm";
import { ErrorMessage } from "../common/error/errorMessage";

import "../../style/pageStyle.scss";

export const Posts = () => {
  const [showEditPost, setShowEditPost] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const allPosts = useSelector(allPostsSelector);
  const postsLoadingStatus = useSelector(
    (state) => state.posts.postsLoadingStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (postsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (postsLoadingStatus === "error") {
    return <ErrorMessage message="Помилка завантаження" />;
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
            classNames={"page"}
            unmountOnExit
          >
            <li className="page">
              <div className="page__wrap">
                <p className="page__userId">User № {item.userId}</p>
                <p className="page__postId">Post № {item.id}</p>
                <div className="page__edit-wrap">
                  <button className="page__btn" onClick={() => onEdit(item)}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3524/3524762.png"
                      className="page__item"
                      alt="wrench-icon"
                    />
                  </button>
                  <button
                    className="page__btn"
                    onClick={() => onDelete(item.id)}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/57/57165.png"
                      className="page__item"
                      alt="cross-icon"
                    />
                  </button>
                </div>
              </div>
              <h4 className="page__title">{item.title}</h4>
              <p className="page__body">{item.body}</p>
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

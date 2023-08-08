import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "../editStyle.scss";

import { createPost } from "../../../../ducks/postSlice";

export const PostAddForm = ({ flag }) => {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  function onShowHandler() {
    setShowForm(!showForm);
  }

  return (
    <section>
      {showForm ? (
        <Formik
          initialValues={{
            inputTitle: "",
            inputPost: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.inputTitle) {
              errors.inputTitle = "ENTER TITLE";
            }
            if (!values.inputPost) {
              errors.inputPost = "ENTER POST";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const newPost = {
              userId: "999",
              id: uuidv4().substring(0, 3),
              title: values.inputTitle,
              body: values.inputPost,
            };

            dispatch(createPost(newPost)); // відправка форми в слайс
            resetForm(); // очищуєм форму
            setSubmitting(false); // розблоковуєм форму для нового вводу
            setShowForm(false); // закриваєм вікно з формаю

            // Прокрутка вниз після додавання нового елемента
            const container = document.querySelector(".app__main");
            const containerHeight = container.scrollHeight;
            container.scrollTo({
              top: containerHeight,
              behavior: "smooth",
            });
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className="newEntry newEntry--show">
              <section className="newEntry__wrap">
                <div className="newEntry__userWrap">
                  <img
                    className="newEntry__userImg"
                    src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                    alt="userIcon"
                  />
                  <p className="newEntry__userName">User № 999</p>
                </div>

                <Field
                  className="newEntry__titlearea"
                  type="inputTitle"
                  name="inputTitle"
                  tabIndex={0}
                  placeholder="title ..."
                  autoFocus
                />
                <ErrorMessage
                  name="inputTitle"
                  component="div"
                  className="newEntry__error-message"
                />

                <Field
                  className="newEntry__textarea"
                  type="inputPost"
                  name="inputPost"
                  tabIndex={0}
                  placeholder="post ..."
                />
                <ErrorMessage
                  name="inputPost"
                  component="div"
                  className="newEntry__error-message"
                />
              </section>

              <div className="newEntry__submitContainer">
                {Object.keys(errors).length > 0 ? (
                  <div className="newEntry__btn">ENTER DATA PLEASE</div>
                ) : (
                  <button
                    type="submit"
                    className="newEntry__btn"
                    disabled={isSubmitting}
                    tabIndex={0}
                  >
                    submit
                  </button>
                )}
              </div>

              <div className="newEntry__cross-wrap" onClick={onShowHandler}>
                <span className="newEntry__cross">✕</span>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="addBtn" onClick={onShowHandler}>
          <div className="addBtn__cross-wrap">
            <span className="addBtn__cross">✕</span>
          </div>
          <div className="addBtn__message-wrap">
            <div className="addBtn__message">add new {flag}</div>
          </div>
        </div>
      )}
    </section>
  );
};

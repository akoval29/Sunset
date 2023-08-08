import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createTodo } from "../../../../ducks/todoSlice";
import "../editStyle.scss";

export const TodoAddForm = ({ flag }) => {
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const dispatch = useDispatch();

  function onShowHandler() {
    setShowForm(!showForm);
    setShowButton(!showButton);
  }

  return (
    <>
      <CSSTransition
        in={showForm}
        timeout={300}
        classNames="newEntry"
        unmountOnExit
        onExited={() => setShowButton(true)}
      >
        <Formik
          initialValues={{
            inputTodo: "",
            checked: false,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.inputTodo) {
              errors.inputTodo = `ENTER ${flag}`;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const newTodo = {
              userId: "999",
              id: uuidv4().substring(0, 3),
              title: values.inputTodo,
              completed: values.checked,
            };

            dispatch(createTodo(newTodo)); // відправка форми в слайс
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
            <Form className="newEntry">
              <section className="newEntry__column">
                <div className="newEntry__row">
                  <div className="newEntry__user">
                    <img
                      className="newEntry__userImg"
                      src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                      alt="userIcon"
                    />
                    <p className="newEntry__userName">User № 999</p>
                  </div>

                  <button
                    className="newEntry__closeBtn"
                    onClick={onShowHandler}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/57/57165.png"
                      className="newEntry__crossImg"
                      alt="cross-icon"
                    />
                  </button>
                </div>

                <Field
                  as="textarea"
                  className="newEntry__textarea"
                  type="inputTodo"
                  name="inputTodo"
                  tabIndex={0}
                  placeholder="Type something ..."
                  autoFocus
                />
                <ErrorMessage
                  name="inputTodo"
                  component="div"
                  className="newEntry__error-message"
                />

                <div className="checkBox">
                  <Field
                    className="checkBox__input"
                    type="checkbox"
                    name="checked"
                    id="switch"
                  />
                  <label className="checkBox__label" htmlFor="switch">
                    checkbox
                  </label>
                </div>
              </section>

              <div className="newEntry__submitContainer">
                {Object.keys(errors).length > 0 ? (
                  <div className="newEntry__submitBtn">ENTER DATA PLEASE</div>
                ) : (
                  <button
                    type="submit"
                    className="newEntry__submitBtn"
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
      </CSSTransition>

      <CSSTransition
        in={showButton}
        timeout={300}
        classNames="addBtn"
        unmountOnExit
      >
        <div className="addBtn" onClick={onShowHandler}>
          <div className="addBtn__cross-wrap">
            <span className="addBtn__cross">✕</span>
            <div className="addBtn__message">add new post</div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

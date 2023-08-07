import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./editStyle.scss";

import { createTodo } from "../../pages/todos-page/todoSlice";

export const AddEditForm = ({ flag }) => {
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

            console.log(newTodo);
            dispatch(createTodo(newTodo)); // відправка форми в слайс
            resetForm(); // очищуєм форму
            setSubmitting(false); // розблоковуєм форму для нового вводу
            setShowForm(false); // закриваєм вікно з формаю
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
                  as="textarea"
                  className="newEntry__textarea"
                  type="inputTodo"
                  name="inputTodo"
                  tabIndex={0}
                  placeholder="Type something ..."
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
                <button
                  type="submit"
                  className="newEntry__btn"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  tabIndex={0}
                >
                  submit
                </button>
                <ErrorMessage
                  name="inputTodo"
                  component="div"
                  className="newEntry__btn newEntry__btn--error"
                />
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

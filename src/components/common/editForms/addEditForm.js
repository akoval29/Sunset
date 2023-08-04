import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

import "./editStyle.scss";

export const AddEditForm = ({ flag }) => {
  const [showForm, setShowForm] = useState(false);

  function onShowHandler() {
    setShowForm(!showForm);
  }

  return (
    <section>
      {showForm ? (
        <Formik
          initialValues={{ inputTodo: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.inputTodo) {
              errors.inputTodo = "ENTER TEXT";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // Ваш код обробки відправки форми тут
            console.log(values);
            setSubmitting(false);
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
                  <p className="newEntry__userName">User № 999 / todo № 999</p>
                </div>

                <Field
                  className="newEntry__textarea"
                  type="inputTodo"
                  name="inputTodo"
                  tabIndex={0}
                  placeholder="Type something ..."
                />

                <ErrorMessage
                  name="inputTodo"
                  component="div"
                  className="newEntry__btn"
                />

                <div className="checkBox">
                  <Field
                    className="checkBox__input"
                    type="checkbox"
                    // name="acceptTerms"
                    id="switch"
                  />
                  <label className="checkBox__label" htmlFor="switch">
                    checkbox
                  </label>
                </div>
              </section>

              <button
                type="submit"
                className="newEntry__btn"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                tabIndex={0}
              >
                submit
              </button>

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

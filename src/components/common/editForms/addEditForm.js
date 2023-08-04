import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

import "./editStyle.scss";

export const AddEditForm = ({ flag }) => {
  const [showForm, setShowForm] = useState(false);

  function onShowHandler() {
    setShowForm(!showForm);
  }

  return (
    <section className="newEntry newEntry--show">
      {showForm ? (
        <Formik
          initialValues={{ inputTodo: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.inputTodo) {
              errors.inputTodo = "ENTER TEXT";
              // } else if (!values.inputAmount) {
              //   errors.inputAmount = "AMOUNT";
              // } else if (isNaN(values.inputAmount)) {
              //   errors.inputAmount = "ONLY DIGITS";
              // } else if (
              //   values.inputAmount.includes(".") ||
              //   values.inputAmount.includes(",")
              // ) {
              //   errors.inputAmount = "INTEGERS";
              // } else if (values.inputAmount > 50) {
              //   errors.inputAmount = "50 MAX";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // FormikHandler(values);
            // setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="newEntry__wrap">
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
                className="formGroup__row__error formGroup__row__error--left"
              />

              <Field
                className="checkBox"
                type="checkBox"
                // name="acceptTerms"
                id="switch"
              />

              <button
                type="submit"
                className="newEntry__btn"
                // disabled={isSubmitting}
                tabIndex={0}
              >
                submit
              </button>
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

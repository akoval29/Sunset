import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import "./FormStyle.scss";

export const AddForm = ({ flag }) => {
  const [showForm, setShowForm] = useState(false);

  function onShowHandler() {
    setShowForm(!showForm);
  }

  return (
    <section className="formGroup">
      {showForm ? (
        <Formik
          initialValues={{ inputSearch: "", inputAmount: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.inputSearch) {
              errors.inputSearch = "ENTER TEXT";
            } else if (!values.inputAmount) {
              errors.inputAmount = "AMOUNT";
            } else if (isNaN(values.inputAmount)) {
              errors.inputAmount = "ONLY DIGITS";
            } else if (
              values.inputAmount.includes(".") ||
              values.inputAmount.includes(",")
            ) {
              errors.inputAmount = "INTEGERS";
            } else if (values.inputAmount > 50) {
              errors.inputAmount = "50 MAX";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // FormikHandler(values);
            // setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="formGroup__row">
              <Field
                className="input"
                type="inputSearch"
                name="inputSearch"
                tabIndex={0}
                placeholder="Type something ..."
              />

              <ErrorMessage
                name="inputSearch"
                component="div"
                className="formGroup__row__error formGroup__row__error--left"
              />

              <button
                type="submit"
                className="formGroup__row__button"
                // disabled={isSubmitting}
                tabIndex={0}
              >
                search
              </button>

              <Field
                type="inputAmount"
                name="inputAmount"
                placeholder="How many photos ?"
                className="input"
                tabIndex={0}
              />

              <ErrorMessage
                name="inputAmount"
                component="div"
                className="formGroup__row__error formGroup__row__error--right"
              />
            </Form>
          )}
        </Formik>
      ) : (
        <div className="add" onClick={onShowHandler}>
          <div className="add__cross-wrap">
            <span className="add__cross">✕</span>
          </div>
          <div className="add__message-wrap">
            <div className="add__message">Add new {flag}</div>
          </div>
        </div>
      )}
    </section>
  );
};

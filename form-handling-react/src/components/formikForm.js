import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }} // ✅ initialValues
      validationSchema={Yup.object({                        // ✅ validationSchema
        username: Yup.string().required("Username is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={(values) => {
        console.log("Form Submitted:", values);
      }}
    >
      <Form>
        {/* Username */}
        <div>
          <Field name="username" placeholder="Username" />      {/* ✅ Field */}
          <ErrorMessage name="username" component="p" />       {/* ✅ ErrorMessage */}
        </div>

        {/* Email */}
        <div>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="p" />
        </div>

        {/* Password */}
        <div>
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="p" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

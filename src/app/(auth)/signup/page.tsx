"use client";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useThemeStore } from "@/store/useThemeStore";
import css from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .min(5, "Too short")
    .max(40, "Too long")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password is too long")
    .required("Password is required"),
});

export default function SignUp() {
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("User registered");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast.error("This email is already registered. Please login.");
        router.push("/login");
        return;
      }
      toast.error(`Error: ${error}`);
    },
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values, {
          onSuccess: () => {
            resetForm();
          },
        });
      }}
    >
      <Form className={`${css.form} ${css[theme]}`}>
        <label htmlFor="email">
          <Field name="email" id="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="p" />
        </label>
        <label htmlFor="password">
          <Field
            name="password"
            id="password"
            type="password"
            placeholder="Password"
          />
          <ErrorMessage name="password" component="p" />
        </label>
        {mutation.isError && <p>{mutation.error.message}</p>}
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Sign Up"}
        </button>
      </Form>
    </Formik>
  );
}

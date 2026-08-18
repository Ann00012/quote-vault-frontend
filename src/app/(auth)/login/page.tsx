"use client";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
import css from "./page.module.css";
import { useRouter } from "next/navigation";

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

export default function SignIn() {
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("User login");
      console.log("ЩО ПОВЕРНУВ БЕКЕНД:", data);
      setAuth(data, "cookie-token");
      router.push("/quotes");
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message || error}`);
    },
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values) => {
        mutation.mutate(values);
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
          {mutation.isPending ? "Loading..." : "Log In"}
        </button>
      </Form>
    </Formik>
  );
}

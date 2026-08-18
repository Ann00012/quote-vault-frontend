import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./createQuote.module.css";
import { useThemeStore } from "@/store/useThemeStore";

const categories = [
  "Inspiration",
  "Humor",
  "Literature",
  "Life",
  "Wisdom",
  "Love",
  "Art",
  "Motivation",
  "Philosophy",
  "Science",
  "Success",
  "Friendship",
  "Movies",
  "Music",
];

interface FormValues {
  text: string;
  author: string;
  category: (typeof categories)[number];
}

interface Props {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  isEdit: boolean;
}

const validationSchema = Yup.object().shape({
  text: Yup.string().min(2).max(100).required("Text is required"),
  author: Yup.string().min(1).max(50).required("Author is required"),
  category: Yup.string().oneOf(categories).required("Category is required"),
});

export default function CreateQuote({
  initialValues,
  onSubmit,
  isEdit,
}: Props) {
  const theme = useThemeStore((state) => state.theme);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={`${css.form} ${css[theme]}`}>
        <label htmlFor="text">
          Text
          <Field id="text" name="text" placeholder="Enter quote text..." />
          <ErrorMessage name="text" component="div" style={{ color: "red" }} />
        </label>

        <label htmlFor="author">
          Author
          <Field id="author" name="author" placeholder="Enter author..." />
          <ErrorMessage
            name="author"
            component="div"
            style={{ color: "red" }}
          />
        </label>

        <label htmlFor="category">
          Category
          <Field as="select" id="category" name="category">
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="category"
            component="div"
            style={{ color: "red" }}
          />
        </label>

        <button type="submit">{isEdit ? "Save Changes" : "Create"}</button>
      </Form>
    </Formik>
  );
}

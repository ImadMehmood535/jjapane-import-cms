import * as yup from "yup";

const productScehma = yup.object().shape({
  name: yup.string().required("Title is required"),
  slug: yup.string().required("Slug is required"),
  shortDescription: yup.string().required("Short Description is required"),
  longDescription: yup.string().required("Long Description is required"),
  entries: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .required("Entries are required"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .required("Price is required"),
  discountedPrice: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .required("Discount Price is required"),
  imageUrl: yup.string().required("Featured image is required"),
});

export { productScehma };

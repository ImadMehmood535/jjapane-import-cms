import * as yup from "yup";
const editCategory = yup.object().shape({
  name: yup.string().required("Category name is required"),
  customProduct: yup.boolean().required("Status is required"),
  imageUrl: yup.mixed().required("Image is required"),
});

const addContest = yup.object().shape({
  name: yup.string().required("Name is required"),
  prize: yup.string().required("Prize is required"),

  description: yup.string().required("Description is required"),
  startDate: yup
    .date()
    .required("Purchase Date is required")
    .typeError("Invalid date format"),
  endDate: yup
    .date()
    .required("Warranty Expiration Date is required")
    .typeError("Invalid date format"),

    adminStopped: yup.boolean().required("Status is required"),
});

export { addContest, editCategory };

import * as Yup from "yup";

const organizationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1)
    .max(200)
    .required("Name must be less than 200 characters"),
  headline: Yup.string()
    .min(1)
    .max(200)
    .required("Headline must be less than 200 characters"),
  description: Yup.string()
    .min(1)
    .max(200)
    .required("Description must be less than 200 characters"),
  logo: Yup.string()
    .min(1)
    .max(255)
    .required("Logo must be less than 255 characters"),
  phone: Yup.string()
    .min(1)
    .max(50)
    .required("Phone must be less than 50 characters"),
  siteUrl: Yup.string()
    .min(1)
    .max(255)
    .required("Url must be less than 255 characters"),
  organizationTypeId: Yup.string()
    .notOneOf([""])
    .required("Organization Type is required"),
  locationId: Yup.string().notOneOf([""]).required("Location is required"),
});

export default organizationSchema;

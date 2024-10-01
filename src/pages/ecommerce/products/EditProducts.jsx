import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import Editor from "../../../components/general/Editor";
import { Button, Input } from "@nextui-org/react";
import VariationInput from "../../../components/general/VariationInput";
import CategoryDropdown from "./VariationDropdown";
import { useQuery } from "../../../hooks/queryParam";
import IterateUpdate from "./IterateUpdate";
import { productScehma } from "../../../validations/productValidations";
import UploadVideo from "./UploadVideo";
import IngredientsInput from "../../../components/general/IngredientsInput";
import GeneralImageUpload from "../../../components/general/GeneralImageUpload";

const EditProducts = () => {
  let query = useQuery();
  let id = query.get("id");
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState([
    { id: Date.now(), name: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = useForm(
    { resolver: yupResolver(productScehma) },
    {
      defaultValues: {
        name: product?.name || "",
        slug: product?.slug || "",
        shortDescription: product?.shortDescription || "",
        longDescription: product?.longDescription || "",
        ingredients: product?.ingredients || "",
        imageUrl: product?.imageUrl,
      },
    }
  );

  useEffect(() => {
    if (product) {
      setValue("shortDescription", product?.shortDescription);
      setValue("name", product?.name);
      setValue("slug", product?.slug);
      setValue("longDescription", product?.longDescription);
      setValue("ingredients", product?.ingredients);
      setValue("entries", product?.entries);
      setValue("price", product?.price);
      setValue("discountedPrice", product?.discountedPrice);
    }
  }, [product]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response;
      if (image) {
        const formData = new FormData();
        formData.append("images", image);

        response = await API.uploadImage(formData);
        await API.updateProduct(id, {
          ...data,
          imageUrl: response?.data?.data[0],
          productDetails: productDetails.map(({ id, ...rest }) => rest),
        });
      } else {
        response = await API.updateProduct(id, {
          ...data,
          name: data?.name,
          productDetails: productDetails.map(({ id, ...rest }) => rest),
        });
      }

      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot upload product");
      console.error("Error uploading images:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const getData = async () => {
    try {
      const response = await API.getSingleProduct(id);
      setProduct(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addProductDetail = () => {
    setProductDetails([...productDetails, { id: Date.now(), name: "" }]);
  };

  const removeProductDetail = (index) => {
    const updatedDetails = productDetails.filter((_, idx) => idx !== index);
    setProductDetails(updatedDetails);
  };

  useEffect(() => {
    setProductDetails(product?.productDetails?.map((item) => item));
    setValue("imageUrl", product?.imageUrl);
  }, [product]);

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Products"}
        previous={"Dashboard"}
        currentpage={"Edit Product"}
      />
      {product && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <InputField
              label="Title"
              type="text"
              placeholder="Product Title"
              errors={errors}
              name="name"
              register={register}
              defaultValue={product?.name}
            />

            <div className="grid grid-col-1 gap-4 mt-8 mb-4">
              <GeneralImageUpload
                heading={"Upload Image"}
                image={image}
                setImage={setImage}
                name="imageUrl"
                errors={errors}
                register={register}
                setValue={setValue}
                defaultImage={product?.imageUrl}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Slug"
                type="text"
                placeholder="slug of product"
                errors={errors}
                name="slug"
                register={register}
                defaultValue={product?.slug}
              />
              <InputField
                label="Entries"
                type="number"
                placeholder="Enter total entries"
                errors={errors}
                name="entries"
                register={register}
                defaultValue={product?.entries}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Price"
                type="number"
                placeholder="Enter selling price of product"
                errors={errors}
                name="price"
                register={register}
                defaultValue={product?.price}
              />
              <InputField
                label="Discount Price"
                type="number"
                placeholder="Enter discounted price of product"
                errors={errors}
                name="discountedPrice"
                register={register}
                defaultValue={product?.discountedPrice}
              />
            </div>
            <div className="grid grid-col-1  gap-4  mt-8 mb-4">
              <Editor
                label="Short Description"
                errors={errors}
                name="shortDescription"
                register={register}
                setValue={setValue}
                defaultValue={product?.shortDescription}
              />

              <div className="product-details-section mt-8">
                <h3 className="text-lg font-semibold mb-5">Product Details</h3>
                {productDetails?.map((detail, index) => (
                  <div
                    key={detail.id}
                    className="flex gap-4 mb-4 justify-start items-center"
                  >
                    <Input
                      label={`Detail #${index + 1}`}
                      type="text"
                      placeholder="Enter product detail"
                      errors={errors}
                      name={`detail-${index}`}
                      value={detail.name}
                      onChange={(e) => {
                        const updatedDetails = [...productDetails];
                        updatedDetails[index].name = e.target.value;
                        setProductDetails(updatedDetails);
                      }}
                    />
                    <Button
                      onClick={() => removeProductDetail(index)}
                      className="bg-themeBtn-0 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  className="bg-themeBtn-0 text-white"
                  onClick={addProductDetail}
                >
                  Add Detail
                </Button>
              </div>
            </div>
            <div className="grid grid-col-1  gap-4  mt-8 mb-4">
              <Editor
                label="Long Description"
                errors={errors}
                name="longDescription"
                register={register}
                setValue={setValue}
                defaultValue={product?.longDescription}
              />
            </div>

            <div className="w-full md:w-1/4 mt-4">
              <div className="flex gap-3">
                <ButtonComponent
                  type="submit"
                  text="Save"
                  loading={loading}
                  isActive={true}
                />
                <ButtonComponent
                  text="Cancel"
                  isActive={true}
                  btnclass={"bg-red-500"}
                  onClick={handleCancel}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProducts;

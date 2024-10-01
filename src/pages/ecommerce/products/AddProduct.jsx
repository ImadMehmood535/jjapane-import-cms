import React, { useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@nextui-org/react";
import { productScehma } from "../../../validations/productValidations";
import GeneralImageUpload from "../../../components/general/GeneralImageUpload";
import Editor from "../../../components/general/Editor";
import { errorToast, successToast } from "../../../hooks/useToast";
import { API } from "../../../api";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState([
    { id: Date.now(), name: "" },
  ]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(productScehma) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const filtered = productDetails.map(({ id, ...rest }) => rest);

      const body = { ...data, productDetails: filtered };

      const formData = new FormData();
      formData.append("images", image);

      let response = await API.uploadImage(formData);
      const imageUrl = response?.data?.data[0];

      delete body.imageUrl;

      response = await API.uploadProduct({
        ...body,
        imageUrl: imageUrl,
      });

      successToast(response?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot upload product");
      console.error("Error uploading images:", error);
    }
  };

  const addProductDetail = () => {
    setProductDetails([...productDetails, { id: Date.now(), name: "" }]);
  };

  const removeProductDetail = (index) => {
    const updatedDetails = productDetails.filter((_, idx) => idx !== index);
    setProductDetails(updatedDetails);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Products"}
        previous={"Dashboard"}
        currentpage={"Add Product"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <InputField
            label="Title"
            type="text"
            placeholder="Product Title"
            errors={errors}
            name="name"
            register={register}
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
            />
            <InputField
              label="Entries"
              type="number"
              placeholder="Enter total entries"
              errors={errors}
              name="entries"
              register={register}
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
            />
            <InputField
              label="Discount Price"
              type="number"
              placeholder="Enter discounted price of product"
              errors={errors}
              name="discountedPrice"
              register={register}
            />
          </div>
          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Short Description"
              errors={errors}
              name="shortDescription"
              register={register}
              setValue={setValue}
            />
          </div>

          <div className="product-details-section mt-8">
            <h3 className="text-lg font-semibold mb-5">Product Details</h3>
            {productDetails.map((detail, index) => (
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

          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Long Description"
              errors={errors}
              name="longDescription"
              register={register}
              setValue={setValue}
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
    </div>
  );
};

export default AddProduct;

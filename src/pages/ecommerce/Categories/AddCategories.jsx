import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import InputField from "../../../components/general/InputField";
import { useForm } from "react-hook-form";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorToast, successToast } from "../../../hooks/useToast";
import { AddCategory, addContest } from "../../../validations/productcategory";

import Editor from "../../../components/general/Editor";

const AddCategories = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addContest) });
  // } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.startDate = new Date(data.startDate).toISOString();
      data.endDate = new Date(data.endDate).toISOString();

        data.adminStopped = data.adminStopped ? false : true;
      const response = await API.registerContest(data);
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot create contest at the moment!");
    }
  };
  const handleCancle = () => {
    navigate(-1);
  };

   return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Contests"}
        previous={"Dashboard"}
        currentpage={"Add Contest"}
      />
      <form className="grid grid-col-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
            <InputField
              label="Contest Name"
              type="text"
              placeholder="Contest Name"
              errors={errors}
              name="name"
              register={register}
            />

            <InputField
              label="Contest Prize"
              type="text"
              placeholder="winning prize"
              errors={errors}
              name="prize"
              register={register}
            />
          </div>

          <div className="grid grid-col-1  gap-4  mt-8 mb-4">
            <Editor
              label="Description"
              errors={errors}
              name="description"
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
            <InputField
              label={`Start Date`}
              type="date"
              placeholder="Starting date"
              errortext="start date Is Required"
              errors={errors}
              name="startDate"
              register={register}
            />
            <InputField
              label={`End Date`}
              type="date"
              placeholder="Ending date"
              errortext="End date Is Required"
              errors={errors}
              name="endDate"
              register={register}
            />

            <InputField
              label="Active contest?"
              type="select"
              options={[true, false]}
              placeholder="Status"
              errors={errors}
              name="adminStopped"
              errortext={"Is the contest active now?"}
              register={register}
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
                onClick={() => handleCancle()}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategories;

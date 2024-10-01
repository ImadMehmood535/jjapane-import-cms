import React, { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../hooks/queryParam";
import InputField from "../../../components/general/InputField";
import ButtonComponent from "../../../components/general/ButtonComponent";
import { API } from "../../../api";
import { errorToast, successToast } from "../../../hooks/useToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { addContest } from "../../../validations/productcategory";
import Editor from "../../../components/general/Editor";
import { formatDate } from "../../../utils/date";

const EditCategory = () => {
  const [loading, setLoading] = useState(false);
  const [contestData, setContestData] = useState(null);
  const [rankings, setRankings] = useState([]);
  const navigate = useNavigate();

  let query = useQuery();
  let id = query.get("id");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addContest),
    defaultValues: {
      name: contestData?.name,
      description: contestData?.description,
      prize: contestData?.prize,
      startDate: contestData?.startDate,
      endDate: contestData?.endDate,
      adminStopped: contestData?.adminStopped,
    },
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      formData.adminStopped = formData.adminStopped ? false : true;
      const response = await API.updateContest(id, formData);
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not update exam data");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const getData = async () => {
    try {
      const response = await API.getSingleContest(id);
      setContestData(response?.data?.data?.contestData);
      setRankings(response?.data?.data?.ranking); // Set rankings data
      setValue("description", response?.data?.data?.contestData?.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Edit"}
        previous={"Dashboard"}
        currentpage={"Edit Contest"}
      />

      {contestData && (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {contestData?.isActive && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-6 text-black">Rankings</h2>
              {rankings.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {rankings.map((ranking, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl w-full py-4 px-6 shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center text-emerald-500 font-bold text-xl">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="text-white text-lg font-semibold">
                            {ranking.username}
                          </p>
                          <p className="text-white text-md font-light">
                            Total Orders: {ranking.totalOrders}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white text-lg font-semibold">
                          Total Entries: {ranking.totalEntries}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white">No rankings available</p>
              )}
            </div>
          )}

          {!contestData?.isActive && contestData?.contestWinner && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-6 text-black">Winner</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center gap-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl w-full py-4 px-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center text-emerald-500 font-bold text-xl">
                      1
                    </div>
                    <div>
                      <p className="text-white text-lg font-semibold">
                        {contestData?.contestWinner}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InputField
                label="Contest Name"
                type="text"
                placeholder="Contest Name"
                errors={errors}
                name="name"
                defaultValue={contestData?.name}
                register={register}
              />

              <InputField
                label="Contest Prize"
                type="text"
                placeholder="winning prize"
                errors={errors}
                name="prize"
                defaultValue={contestData?.prize}
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
                defaultValue={contestData?.description}
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
                defaultValue={formatDate(contestData?.startDate)}
              />
              <InputField
                label={`End Date`}
                type="date"
                placeholder="Ending date"
                errortext="End date Is Required"
                errors={errors}
                name="endDate"
                register={register}
                defaultValue={formatDate(contestData?.endDate)}
              />

              <InputField
                label="Active contest?"
                type="select"
                options={[true, false]}
                placeholder="Status"
                errors={errors}
                name="adminStopped"
                defaultValue={contestData?.adminStopped}
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
                  onClick={handleCancel}
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Rankings Section */}
    </div>
  );
};

export default EditCategory;

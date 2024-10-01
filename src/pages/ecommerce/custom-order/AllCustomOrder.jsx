import { useEffect, useState } from "react";
import Header from "../../../components/dashboard/Header";
import ResultFilterBar from "../../../components/general/ResultFilterBar";
import Tableform from "../../../components/general/Tableform";
import { API } from "../../../api";
import { errorToast } from "../../../hooks/useToast";
import Loader from "../../../components/general/Loader";
import { allCustomOrderColumn } from "../../../data/allCustomOrderColumn";

const AllCustomOrder = () => {
  const [itemPerPage, setitemPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState(null);

  const getData = async () => {
    try {
      const response = await API.getAllCustomOrders();
      setAllOrders(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Can not fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Custom Orders"}
        previous={"Dashboard"}
        currentpage={"Custom Orders"}
        btnlink={"edit"}
      />
      <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
        <ResultFilterBar
          setitemPerPage={setitemPerPage}
          setfilterdata={setAllOrders}
          filterdata={allOrders}
          setSearchFilter={setSearchFilter}
        />
        {loading ? (
          <Loader />
        ) : (
          <>
            {allOrders && (
              <Tableform
                filterdata={allOrders}
                tablecolumns={allCustomOrderColumn}
                itemPerPage={itemPerPage}
                searchFilter={searchFilter}
                pagename={"edit"}
                preview={false}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllCustomOrder;

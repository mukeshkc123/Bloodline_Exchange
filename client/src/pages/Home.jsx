import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Model from "../components/shared/modal/Model";
import API from "../services/API";
import moment from "moment";

const Home = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  //get function

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
          <h4
            className="ms-4"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-plus text-success py-4"></i>
            Add inventory
          </h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory type</th>
                <th scope="col">Quantity(in ML)</th>
                <th scope="col">Donar Email</th>
                <th scope="col">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record)=>{
                return(
                  <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity}</td>
                  <td>{record.email}</td>
                  <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                </tr>
                )
              })}
        
            </tbody>
          </table>
          <Model></Model>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
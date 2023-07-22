import React from "react";
import { useEffect,useState, useRef } from "react";
import FormRow from "./formRow";
import FormRowSelect from "./formRowselect";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Job from "./Job";
import "./alljobs.css";
const AllJobs = () => {
  const [sort, setSort] = useState("Internship");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  //  const url = `/api/jobs?min=${encodeURIComponent(
  //    minRef.current.value
  //  )}&max=${encodeURIComponent(minRef.current.value)}&sort=${encodeURIComponent(
  //    sort
  //  )}`;
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: () =>
      newRequest
        .get(
          // `/jobs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
          `/jobs`
        )
        .then((res) => {
          return res.data;
        }),
  });
  console.log(error);
  const handleSearch=(e)=>{
    setSort(e.target.value);
  }

  useEffect(() => {
    refetch();
  }, [sort]);

  const clearFilter=()=>{
    setSort(''); 
    minRef.current.value='';
    maxRef.current.value='';
    refetch();
  }
  const apply = () => {
    refetch();
  };
  return (
    <div className="job-container">
      <div className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow type="text" name="search" />

          <label className="form-label">Minimun Stipend</label>
          <input
            ref={minRef}
            type="number"
            placeholder="min"
            className="form-input"
          />
          <label className="form-label">Maximun Stipend</label>
          <input
            ref={maxRef}
            type="number"
            placeholder="max"
            className="form-input"
          />
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={sort}
            handleChange={handleSearch}
            list={["all", "Internship", "Full-time", "Part-time", "Remote"]}
          />
          <div style={{ display: "grid", gap: "1rem" }}>
            <button
              className="btn btn-block btn-success"
              disabled={isLoading}
              onClick={() => apply()}
            >
              Apply filters
            </button>
            <button
              className="btn btn-block btn-danger"
              disabled={isLoading}
              onClick={() => clearFilter()}
            >
              clear filters
            </button>
          </div>
        </div>
      </div>
    
      {isLoading
            ? "loading"
            : error
            ? "something went wrong!"
            : 
              <div style={{ height: "500px", overflow: "scroll" }}>
          <h5>
           {data?.length} job{data?.length > 1 && "s"} found
          </h5>
        <div className="jobs">
             {data.map((job) => {
                return <Job key={job._id} item={job} />;
              })}
        </div>
        </div>
        }
        {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </div>
  );
};

export default AllJobs;

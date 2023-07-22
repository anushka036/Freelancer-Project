import React, { useReducer, useState } from "react";
// import "./Add.scss";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { jobReducer, INITIAL_STATE } from "../../reducers/jobReducer";

const Add = () => {
  const [state, dispatch] = useReducer(jobReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_SKILLS",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (job) => {
      return newRequest.post("/jobs", job);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["myGigs"]);
    // },
  });
  const removeItem = (indexToRemove) => {
    setnewJob((prevJob) => ({
      ...prevJob,
      skills: prevJob.skills.filter((_, index) => index !== indexToRemove),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   console.log(state);
    mutation.mutate(state);
    // console.log(JSON.parse(localStorage.getItem("currentUser")).username);
    // navigate("/mygigs")
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Job</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Post</label>
            <input
              type="text"
              name="position"
              placeholder="Which post you are applying for"
              onChange={handleChange}
            />
            <label htmlFor="">Job Type</label>
            <select
              name="jobType"
              id="jobType"
              onChange={handleChange}
            >
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
            <label htmlFor="">Last Date To Apply</label>
            <input
              type="date"
              minDate="0"
              name="lastDate"
              onChange={handleChange}
            />
            <label htmlFor="">About the internship</label>
            <textarea
              name="about"
              id="about"
              placeholder="Brief descriptions"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Requirements</label>
            <textarea
              name="requirement"
              onChange={handleChange}
              id=""
              placeholder="Requirement description of your job/internship"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Who can apply</label>
            <textarea
              name="condition"
              onChange={handleChange}
              id=""
              placeholder="Who can apply to your job/internship"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Stipend</label>
            <input
              type="number"
              name="stipend"

              onChange={handleChange}
            />
            <label htmlFor="">Duration(in months)</label>
            <input
              type="number"
              name="duration"
              onChange={handleChange}
            />
            <label htmlFor="">Location</label>
            <input
              name="location"
              onChange={handleChange}
            />
            <label htmlFor="">Skills Required</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.skills?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_SKILLS", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">No of Opening</label>
            <input
              type="number"
              onChange={handleChange}
              name="noOfopening"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;

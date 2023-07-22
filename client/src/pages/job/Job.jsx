import React from "react";
import "./job.css";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CiLocationOn,
  CiCircleChevRight,
  CiCalendar,
  CiMoneyBill,
  CiTimer,
} from "react-icons/ci";
import JobIcon from "./jobIcon";
const Job = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/jobs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data)
  const userId = data?.userId;
  const date = moment(new Date(data?.createdAt)).format("MMM Do, YYYY");
  const notify = () => {
  toast.success('Thanks for applying ... We will contect you soon', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
  return (
    <>
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong !!"
      ) : (
        <div className="job-details">
          <span
            style={{
              alignSelf: "center",
              "font-size": "2rem",
              "font-weight": "500",
            }}
          >
            {data.position} in {data.location} at {data.companyName}
          </span>
          <div className="job-items">
            <h4>{data.position}</h4>
            <p>{data.companyName}</p>
            <JobIcon icon={<CiLocationOn />} text={"Bangalore"} />
            <div className="flex">
              <div>
                <JobIcon icon={<CiCircleChevRight />} text={"Start Date"} />
                <p>{date}</p>
              </div>
              <div>
                <JobIcon icon={<CiCalendar />} text={"Duration"} />
                <p>{data.duration} months</p>
              </div>
              <div>
                <JobIcon icon={<CiMoneyBill />} text={"Stipend"} />
                <p> ₹ {data.stipend}/month</p>
              </div>
              <div>
                <JobIcon icon={<CiTimer />} text={"Apply By"} />
                <p>{moment(new Date(data?.lastDate)).format("MMM Do, YYYY")}</p>
              </div>
            </div>
            <span style={{ fontWeight: 500 }}>About the internship</span>
            <ul
              style={{
                fontWeight: 400,
                fontSize: "0.9rem",
                // "margin-left": "1rem",
                color: "#616060",
              }}
            >
              <li>
                {data.about}
              </li>
            </ul>
            <span style={{ fontWeight: 500, "margin-top": "1rem" }}>
              Requirements
            </span>
            <ul
              style={{
                fontWeight: 400,
                fontSize: "0.9rem",
                // "margin-left": "1rem",
                color: "#616060",
              }}
            >
              <li>{data.requirement}</li>
            </ul>
            <span style={{ fontWeight: 500, "margin-top": "1rem" }}>
              Skill(s) required
            </span>
            <br />
            {data.skills.map((skill) => {
              return <span className="skill">{skill}</span>;
            })}
            <br />
            <span style={{ fontWeight: 500, "margin-top": "1rem" }}>
              Who can apply
            </span>
            <ul
              style={{
                fontWeight: 400,
                fontSize: "0.9rem",
                // "margin-left": "1rem",
                color: "#616060",
              }}
            >
              <li>{data.condition}</li>
            </ul>
          </div>
          <button
            className="btn"
            onClick={() => notify()}
            style={{ width: "100px", "margin-top": "1rem" }}
          >
            Apply Now
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Job;

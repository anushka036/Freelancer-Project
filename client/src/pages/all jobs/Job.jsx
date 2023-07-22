import { FaLocationArrow, FaBriefcase,  } from "react-icons/fa";
import {FiUsers} from 'react-icons/fi'
import {CiTimer} from "react-icons/ci"
import { Link } from "react-router-dom";
import JobInfo from "./JobInfo";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";


import React from 'react'

const Job = ({item}) => {
   console.log(item);
   const { isLoading, error, data } = useQuery({
     queryKey: [item.userId],
     queryFn: () =>
       newRequest.get(`/users/${item.userId}`).then((res) => {
        console.log(res.data);
         return res.data;
       }),
   });
  const date = moment(new Date(item.lastDate)).format("MMM Do, YYYY");
  return (
    // <Link to={`/job/${item._id}`} className="link">
    <div className="job-item">
      <header
        className="job-item-header"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="main-icon">{item.companyName.charAt(0)}</div>
        <div className="info">
          <h5 style={{ marginBottom: "5px" }}>{item.position}</h5>
          <p>{item.companyName}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={item.location} />
          <JobInfo icon={<CiTimer />} text={`${item.duration} months`} />
          <JobInfo icon={<FaBriefcase />} text={item.jobType} />
          <JobInfo icon={<FiUsers />} text={`${item.noOfopening} opening`} />
        </div>
        <footer>
          <div className="actions">
            <Link to={`/job/${item._id}`} type="button" className="btn">
              View Details
            </Link>
          </div>
        </footer>
      </div>
    </div>
    // </Link>
  );
}

export default Job;
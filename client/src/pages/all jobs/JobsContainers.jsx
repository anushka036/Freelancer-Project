import React from "react";
import { useEffect ,useState} from "react";
import Job from "./Job";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
// import Wrapper from "../assets/wrappers/JobsContainer";
// import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
// import { getAllJobs } from "../features/allJobs/allJobsSlice";
// import PageBtnContainer from "./PageBtnContainer";

const JobsContainers = () => {
    // const {
    //   jobs,
    //   isLoading,
    //   page,
    //   totalJobs,
    //   numOfPages,
    //   search,
    //   searchStatus,
    //   searchType,
    //   sort,
    // } = useSelector((store) => store.allJobs);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(getAllJobs());
    // }, [page, search, searchStatus, searchType, sort]);

    // if (isLoading) {
    //   return <Loading />;
    // }

    // if (jobs.length === 0) {
    //   return (
    //     <Wrapper>
    //       <h2>No jobs to display...</h2>
    //     </Wrapper>
    //   );
    // }
    // const [sort, setSort] = useState("sales");
    const [open, setOpen] = useState(false);
    // const minRef = useRef();
    // const maxRef = useRef();

    // const { search } = useLocation();

    const { isLoading, error, data, refetch } = useQuery({
      queryKey: ["jobs"],
      queryFn: () =>
        newRequest
          .get(
            `/jobs`
            // `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
            // "/jobs"
          )
          .then((res) => {
            return res.data;
          }),
    });

    console.log(data,"helellodfd");

    // const reSort = (type) => {
    //   setSort(type);
    //   setOpen(false);
    // };

    useEffect(() => {
      refetch();
    }, []);

    const apply = () => {
      refetch();
    };
  return (
    <>
      
    </>
  );
};
export default JobsContainers;

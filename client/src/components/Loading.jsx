const Loading = ({ center }) => {
    return <div className={center ? "loading loading-center" : "loading"}></div>;
//   return <div className="loading"></div>;
};
export default Loading;

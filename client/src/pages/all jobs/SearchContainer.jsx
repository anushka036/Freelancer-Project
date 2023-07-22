import React from 'react'
import { useState } from 'react';
import FormRow from './formRow';
import FormRowSelect from './formRowselect';
const SearchContainer = () => {
      // const [sort, setSort] = useState("");
      const [open, setOpen] = useState(false);
      const minRef = useRef();
      const maxRef = useRef();
      const { search } = useLocation();
  return (
    <form className="form">
      <h4>search form</h4>
      <div className="form-center">
        {/* search position */}
        <FormRow
          type="text"
          name="search"
        //   value={localSearch}
        //   handleChange={optimizedDebounce}
        />
        {/* search by status */}
        <FormRowSelect
          labelText="status"
          name="searchStatus"
          // value={searchStatus}
        //   handleChange={handleSearch}
        //   list={["all", ...statusOptions]}
        />

        {/* search by type*/}
        <FormRowSelect
          labelText="type"
          name="searchType"
          // value={searchType}
        //   handleChange={handleSearch}
        //   list={["all", ...jobTypeOptions]}
        />
        {/* sort */}
        <FormRowSelect
          name="sort"
          // value={sort}
        //   handleChange={handleSearch}
        //   list={sortOptions}
        />
        <button
          className="btn btn-block btn-danger"
        //   disabled={isLoading}
        //   onClick={handleSubmit}
        >
          clear filters
        </button>
      </div>
    </form>
  );
}

export default SearchContainer
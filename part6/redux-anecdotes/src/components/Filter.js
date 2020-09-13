import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../reducers/filterReducer";

const Filter = () => {
  const filterValue = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onChange = (event) => {
    dispatch(filter(event.target.value));
  };

  return (
    <div>
      filter <input onChange={onChange} value={filterValue} />
    </div>
  );
};

export default Filter;

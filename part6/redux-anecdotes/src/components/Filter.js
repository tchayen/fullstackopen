import React from "react";
import { useDispatch, connect } from "react-redux";
import { filter } from "../reducers/filterReducer";

const mapStateToProps = (state) => {
  return {
    filterValue: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filter: (text) => dispatch(filter(text)),
  };
};

const Filter = ({ filterValue, filter }) => {
  const onChange = (event) => {
    filter(event.target.value);
  };

  return (
    <div>
      filter <input onChange={onChange} value={filterValue} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

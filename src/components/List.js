import React from "react";
import ListItem from "./ListItem";
import PropTypes from "prop-types";

function List(props) {
  const style = {
    ul: {
      listStyle: "none",
      margin: '0',
      padding: '0'
    },
  };
  return (
    <ul style={style.ul}>
      {props.itemProps.map((item, i) => {
        return <ListItem item={item} key={item.id} i={i} onChange={props.onToggle} />;
      })}
    </ul>
  );
}

List.propTypes = {
    itemProps: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired
}

export default List
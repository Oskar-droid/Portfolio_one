import React, { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../Context";

const style = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
    width: "600px",
    fontSize: "20px",
  },
  input: {
    marginRight: "1rem",
  },
};

function ListItem({ item, i, onChange }) {
  const {removeItem} = useContext(Context);
  const classes = [];

  if (item.completed) {
    classes.push("done");
  }
  return (
    <li style={style.li}>
      <span className={classes.join(" ")}>
        <input
          type="checkbox"
          style={style.input}
          onChange={() => onChange(item.id)}
        />
        <strong>{i + 1}</strong>
        &nbsp;
        {item.title}
      </span>
      <button onClick={removeItem.bind(null, item.id)}>&times;</button>
    </li>
  );
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  i: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default ListItem;

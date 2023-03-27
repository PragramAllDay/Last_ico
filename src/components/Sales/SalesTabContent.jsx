import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { handleClickScroll } from "../../lib/helpers";

const SalesTabContent = (props) => {
  return (
    <div
      className={cn("tab-pane fade", props.className)}
      id={props.id}
      role="tabpanel"
      aria-labelledby={props.ariaLabel}
    >
      <div className="chart-content-inner">
        <h2 className="title">{props.title}</h2>
        <p>{props.description}</p>
        <Link to="#presale" onClick={() => handleClickScroll("presale")} className="btn">
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default SalesTabContent;

import { buildUrlForCurrentPage } from "common/tooling/query-strings";
import React from "react";

export default function ShareButton(props) {
  return (
    <button
      className="button is-primary"
      onClick={() =>
        navigator.clipboard.writeText(buildUrlForCurrentPage(props.getQuery()))
      }
    >
      <span className="icon is-small">
        <i className="fas fa-link" />
      </span>
      <span>Copy link</span>
    </button>
  );
}
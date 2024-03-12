import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const loader = ({size}) => {
    const override = {
        margin: "0 auto",
        border:"5px solid"
      };
  return (
    <ClipLoader
        color={"grey"}
        cssOverride={override}
        loading={true}
        size={size ? size : 100}
        aria-label="Loading Spinner"
        data-testid="loader"
        width={500}

    />
  )
}

export default loader;
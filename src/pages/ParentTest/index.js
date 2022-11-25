import React from "react";
import Test from "../Test";

class ParentTest extends React.Component {
  state = {};
  render() {
    return (
      <>
        <h1>test</h1>
        <Test />
      </>
    );
  }
}

export default ParentTest;

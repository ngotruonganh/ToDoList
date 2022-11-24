import React from "react";

class Test extends React.Component {
  state = {};
  render() {
    const listextend = this.props.childData;
    return (
      <div>
        {listextend.map((item, index) => {
          return (
            <p key={item.id}>
              {index + 1} -{item.title}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Test;

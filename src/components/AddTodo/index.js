import React from "react";
import { toast } from "react-toastify";
import "./AddTodo.scss";

class AddTodo extends React.Component {
  state = {
    title: "",
  };

  // thay doi state title moi khi nhap vao input
  handleOnChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  // submit button
  handleClick = () => {
    if (!this.state.title) {
      toast.error("Chưa nhập công việc");
      return;
    }
    let todo = {
      id: Math.floor(Math.random() * 1001),
      title: this.state.title,
    };

    // truyen ham addnewtodo
    this.props.addNewToDo(todo);
    //set state lai
    this.setState({
      title: "",
    });
  };

  // enter press
  enterkey = (event) => {
    if (event.key === "Enter") {
      if (!this.state.title) {
        toast.error("Chưa nhập công việc");
        return;
      }
      let todo = {
        id: Math.floor(Math.random() * 1001),
        title: this.state.title,
      };
      this.props.addNewToDo(todo);
      this.setState({
        title: "",
      });
    }
  };

  render() {
    let { title } = this.state;
    return (
      <div className="input-field">
        <input
          type="text"
          value={title}
          onChange={(event) => this.handleOnChange(event)}
          onKeyPress={(event) => this.enterkey(event)}
          placeholder="Thêm công việc mới"
        />
        <button type="button" onClick={() => this.handleClick()}>
        <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    );
  }
}

export default AddTodo;

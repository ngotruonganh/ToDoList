import React from "react";
import { toast } from "react-toastify";
import "./AddTodo.scss";

class AddToDo extends React.Component {
  state = {
    title: "",
    description: "",
  };

  // thay doi state title moi khi nhap vao input
  handleOnChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  // thay doi state description moi khi nhap vao input
  description = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  // Su kien tao moi cong viec (click chuot)
  handleClick = () => {
    // truong hop khong nhap gi
    if (!this.state.title && !this.state.description) {
      toast.error("Vui lòng điền đầy đủ tiêu để và nội dung");
      return;
    }
    // truong hop chi nhap vao title
    if (!this.state.title) {
      toast.error("Chưa nhập tiêu đề");
      return;
    }
    // truong hop chi nhap vao description
    if (!this.state.description) {
      toast.error("Chưa nhập nội dung");
      return;
    }
    let todo = {
      id: Math.floor(Math.random() * 1001),
      title: this.state.title,
      description: this.state.description,
    };
    // truyen ham addnewtodo
    this.props.addNewToDo(todo);
    //set state lai
    this.setState({
      title: "",
      description: "",
    });
  };

  //   // Su kien tao moi cong viec (nhan enter)
  enterkey = (event) => {
    if (event.key === "Enter") {
      // truong hop khong nhap gi
      if (!this.state.title && !this.state.description) {
        toast.error("Vui lòng điền đầy đủ tiêu để và nội dung");
        return;
      }
      // truong hop chi nhap vao title
      if (!this.state.title) {
        toast.error("Chưa nhập tiêu đề");
        return;
      }
      // truong hop chi nhap vao description
      if (!this.state.description) {
        toast.error("Chưa nhập nội dung");
        return;
      }
      let todo = {
        id: Math.floor(Math.random() * 1001),
        title: this.state.title,
        description: this.state.description,
      };
      // truyen ham addnewtodo
      this.props.addNewToDo(todo);
      //set state lai
      this.setState({
        title: "",
        description: "",
      });
    }
  };

  render() {
    let { title, description } = this.state;
    return (
      <>
        <div className="input-field">
          <div className="type-field">
            <input
              type="text"
              value={title}
              onChange={(event) => this.handleOnChangeTitle(event)}
              onKeyDown={(event) => this.enterkey(event)}
              placeholder="Nhập tiêu đề công việc mới"
            />
            <textarea
              type="text"
              value={description}
              onChange={(event) => this.description(event)}
              onKeyDown={(event) => this.enterkey(event)}
              placeholder="Nhập nội dung công việc mới"
              className="description-type"
            />
          </div>
          <button type="button" onClick={() => this.handleClick()}>
            <i className="fa-solid fa-plus"></i>
            {"  "}Add
          </button>
        </div>
      </>
    );
  }
}

export default AddToDo;

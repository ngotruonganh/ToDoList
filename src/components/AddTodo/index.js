import React from "react";
import { toast } from "react-toastify";
import "./AddTodo.scss";

class AddTodo extends React.Component {
  state = {
    title: "",
    des: "",
  };

  // thay doi state title moi khi nhap vao input
  handleOnChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  // thay doi state des moi khi nhap vao input
  handleOnChangeDes = (event) => {
    this.setState({
      des: event.target.value,
    });
  };

  // Su kien tao moi cong viec (click chuot)
  handleClick = () => {
    // truong hop khong nhap gi
    if (!this.state.title && !this.state.des) {
      toast.error("Vui lòng điền đầy đủ tiêu để và nội dung");
      return;
    }
    // truong hop chi nhap vao title
    if (!this.state.title) {
      toast.error("Chưa nhập tiêu đề");
      return;
    }
    // truong hop chi nhap vao des
    if (!this.state.des) {
      toast.error("Chưa nhập nội dung");
      return;
    }
    let todo = {
      id: Math.floor(Math.random() * 1001),
      title: this.state.title,
      des: this.state.des,
    };
    // truyen ham addnewtodo
    this.props.addNewToDo(todo);
    //set state lai
    this.setState({
      title: "",
      des: "",
    });
  };

  //   // Su kien tao moi cong viec (nhan enter)
  enterkey = (event) => {
    if (event.key === "Enter") {
      // truong hop khong nhap gi
      if (!this.state.title && !this.state.des) {
        toast.error("Vui lòng điền đầy đủ tiêu để và nội dung");
        return;
      }
      // truong hop chi nhap vao title
      if (!this.state.title) {
        toast.error("Chưa nhập tiêu đề");
        return;
      }
      // truong hop chi nhap vao des
      if (!this.state.des) {
        toast.error("Chưa nhập nội dung");
        return;
      }
      let todo = {
        id: Math.floor(Math.random() * 1001),
        title: this.state.title,
        des: this.state.des,
      };
      this.props.addNewToDo(todo);
      this.setState({
        title: "",
        des: "",
      });
    }
  };

  render() {
    let { title, des } = this.state;
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
            <input
              type="text"
              value={des}
              onChange={(event) => this.handleOnChangeDes(event)}
              onKeyDown={(event) => this.enterkey(event)}
              placeholder="Nhập nội dung công việc mới"
              className="des-type"
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

export default AddTodo;

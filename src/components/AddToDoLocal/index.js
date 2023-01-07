import React from "react";
import { toast } from "react-toastify";
import "./AddToDoLocal.scss";

class AddToDoLocal extends React.Component {
  state = {
    title: "",
    des: "",
  };

  //   Add new to do function
  handleClick = () => {
    let object = {
      id: Math.floor(Math.random() * 1001),
      title: this.state.title,
      des: this.state.des,
    };
    let ToDoList = localStorage.getItem("todo");
    if (ToDoList) {
      let arr = JSON.parse(ToDoList);
      arr.push(object);
      localStorage.setItem("todo", JSON.stringify(arr));
    } else {
      localStorage.setItem("todo", JSON.stringify([object]));
    }
    this.setState({
      title: "",
      des: "",
    });
    toast.success("Thêm thành công");
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

  // Su kien tao moi cong viec (nhan enter)
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
        <div className="localStorage">{localStorage.getItem("todo")}</div>
      </>
    );
  }
}

export default AddToDoLocal;

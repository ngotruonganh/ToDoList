import React from "react";
import { toast } from "react-toastify";
import "./Home.scss";
import AddTodo from "../../components/AddTodo";
import Test from "../Test/index";

class Home extends React.Component {
  state = {
    listToDo: [
      { id: "1", title: "Wake up" },
      { id: "2", title: "Eating" },
      { id: "3", title: "Working" },
      { id: "4", title: "Sleeping" },
      { id: "5", title: "Watching" },
      { id: "6", title: "Playing" },
      { id: "7", title: "Swimming" },
      { id: "8", title: "Holding" },
      { id: "9", title: "Do homework" },
    ],
    editToDo: {},
    onModal: false,
  };

  // Add new to do function
  addNewToDo = (todo) => {
    this.setState({
      listToDo: [...this.state.listToDo, todo],
    });
    toast.success("Thêm thành công");
  };

  // delete todo from toDoList
  onDelete = (todo) => {
    let currenTodo = this.state.listToDo;
    currenTodo = currenTodo.filter((item) => item.id !== todo.id);
    this.setState({
      listToDo: currenTodo,
    });
    toast.success("Xóa thành công");
  };

  onModal = () => {
    this.setState({
      onModal: !this.state.onModal,
    });
  };

  // Onclick Edit click
  onEdit = (todo) => {
    let { editToDo, listToDo } = this.state;

    let isEmptyObj = Object.keys(editToDo).length === 0;

    //save
    if (isEmptyObj === false && editToDo.id === todo.id) {
      let listToDoCopy = [...listToDo];

      let objIndex = listToDoCopy.findIndex((item) => item.id === todo.id);

      listToDoCopy[objIndex].title = editToDo.title;

      this.setState({
        listToDo: listToDoCopy,
        editToDo: {},
      });
      toast.success("Chỉnh sửa thành công");
      return;
    }

    this.setState({
      editToDo: todo,
    });
  };

  //   on chang press
  handleOnChangeeditToDo = (event) => {
    let editToDoCopy = { ...this.state.editToDo };
    editToDoCopy.title = event.target.value;
    this.setState({
      editToDo: editToDoCopy,
    });
  };

  render() {
    let { listToDo, editToDo, onModal } = this.state;
    let isEmptyObj = Object.keys(editToDo).length === 0;
    return (
      <>
        <div className="input-container">
          <div>
            <h1> To Do List </h1>
          </div>
          <AddTodo addNewToDo={this.addNewToDo} />
          <div className="list-todo">
            {listToDo &&
              listToDo.length > 0 &&
              listToDo.map((item, index) => {
                return (
                  <div className="todo-list-container" key={item.id}>
                    {isEmptyObj === true ? (
                      <span>
                        {index + 1} - {item.title}
                      </span>
                    ) : (
                      <>
                        {editToDo.id === item.id ? (
                          <span>
                            {index + 1}
                            <input
                              value={editToDo.title}
                              onChange={(event) =>
                                this.handleOnChangeeditToDo(event)
                              }
                            />
                          </span>
                        ) : (
                          <span>
                            {index + 1} - {item.title}
                          </span>
                        )}
                      </>
                    )}
                    <div className="todo-list-right">
                      <button
                        className="edit"
                        onClick={() => this.onEdit(item)}
                      >
                        {isEmptyObj === false && editToDo.id === item.id ? (
                          <i className="fa-sharp fa-solid fa-floppy-disk"></i>
                        ) : (
                          <i className="fa-solid fa-pen-to-square"></i>
                        )}
                      </button>
                      <button onClick={() => this.onModal(item)}>
                        <i class="fa-solid fa-circle-info"></i>
                      </button>
                      {onModal === true && (
                        <div
                          className="model"
                          //   onClick={() => this.onModal(item)}
                        >
                          <div className="overlay"></div>
                          <div className="popup">
                            <i
                              class="fa-solid fa-circle-xmark"
                              onClick={() => this.onModal(item)}
                            ></i>
                            {item.title}
                          </div>
                        </div>
                      )}
                      <button
                        className="edit"
                        onClick={() => this.onDelete(item)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <Test childData={listToDo}/>
          </div>
        </div>
      </>
    );
  }
}

export default Home;

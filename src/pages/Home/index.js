import React from "react";
import "./Home.scss";
import AddTodo from "../../components/AddTodo";
import { toast } from "react-toastify";

class Home extends React.Component {
  state = {
    listToDo: [
      { id: "1", title: "Wake up" },
      { id: "2", title: "Eating" },
      { id: "3", title: "Working" },
      { id: "4", title: "Sleeping" },
      { id: "5", title: "Watching" },
    ],
    editStatus: false,
    editToDo: {},
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

  handleOnChangeeditToDo = (event) => {
    let editToDoCopy = { ...this.state.editToDo };
    editToDoCopy.title = event.target.value;
    this.setState({
      editToDo: editToDoCopy,
    });
  };

  render() {
    let { listToDo ,editToDo } = this.state;
    let isEmptyObj = Object.keys(editToDo).length === 0;
    console.log(isEmptyObj);
    return (
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
                    <button className="edit" onClick={() => this.onEdit(item)}>
                      {isEmptyObj === false && editToDo.id === item.id
                        ? "Save"
                        : "Edit"}
                    </button>
                    <button
                      className="edit"
                      onClick={() => this.onDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Home;

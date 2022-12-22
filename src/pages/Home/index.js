import React from "react";
import { toast } from "react-toastify";
import "./Home.scss";
import AddTodo from "../../components/AddToDo";
import AddToDoLocal from "../../components/AddToDoLocal";

class Home extends React.Component {
  state = {
    listToDo: [
      { id: "1", title: "Wake up", des: "wake up in 5am" },
      {
        id: "2",
        title: "Eating",
        des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      },
      {
        id: "3",
        title: "Working",
        des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      },
      {
        id: "4",
        title: "Sleeping",
        des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      },
      { id: "5", title: "Watching", des: "Waching football" },
      {
        id: "6",
        title: "Playing",
        des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      },
      {
        id: "7",
        title: "Swimming",
        des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      },
      { id: "8", title: "Do homework", des: "Coding" },
    ],
    editToDo: {},
  };

  //

  // Add new to do to listToDo
  addNewToDo = (todo) => {
    this.setState({
      listToDo: [...this.state.listToDo, todo],
    });
    toast.success("Thêm thành công");
  };

  // Delete todo from toDoList
  onDelete = (todo) => {
    let currenTodo = this.state.listToDo;
    currenTodo = currenTodo.filter((item) => item.id !== todo.id);
    this.setState({
      listToDo: currenTodo,
    });
    toast.success("Xóa thành công");
  };

  // Onclick Edit
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

  //   On chang press
  handleOnChangeEditToDo = (event) => {
    let editToDoCopy = { ...this.state.editToDo };
    editToDoCopy.title = event.target.value;
    this.setState({
      editToDo: editToDoCopy,
    });
  };

  render() {
    let { listToDo, editToDo } = this.state;
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
                      <>
                        <div className="info">
                          <p className="title">
                            {index + 1} - {item.title}
                          </p>
                          <p className="des">{item.des}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {editToDo.id === item.id ? (
                          <span>
                            {index + 1}
                            <input
                              value={editToDo.title}
                              onChange={(event) =>
                                this.handleOnChangeEditToDo(event)
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
        </div>
        <AddToDoLocal />
      </>
    );
  }
}

export default Home;

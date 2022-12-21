import React from "react";
import { toast } from "react-toastify";
import "./Home.scss";
import AddTodo from "../../components/AddTodo";

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
    title: "",
    des: "",
    editToDo: {},
    onModal: false,
  };
  onChangTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  onChangDes = (e) => {
    this.setState({
      des: e.target.value,
    });
  };

  // Add new to do function
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

  addNewToDo = (todo) => {
    this.setState({
      listToDo: [...this.state.listToDo, todo],
    });
    toast.success("Thêm thành công");
  };

  render() {
    let { listToDo, editToDo, onModal } = this.state;
    let isEmptyObj = Object.keys(editToDo).length === 0;
    let toDoList = localStorage.getItem("todo");
    console.log("state", listToDo);
    console.log("local", toDoList);
    return (
      <>
        <div className="input-container">
          <div>
            <h1> To Do List </h1>
          </div>
          {/* <input
            value={this.state.title}
            placeholder="add new todo"
            onChange={(e) => this.onChangTitle(e)}
          />
          <input
            value={this.state.des}
            placeholder="add des"
            onChange={(e) => this.onChangDes(e)}
          />
          <button type="button" onClick={() => this.handleClick()}>
            <i className="fa-solid fa-plus"></i>
          </button>
          {toDoList} */}
          {/* <hr /> */}
          <AddTodo addNewToDo={this.addNewToDo} />
          <br />
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
                      <button onClick={() => this.onModal()}>
                        <i className="fa-solid fa-circle-info"></i>
                      </button>
                      {onModal === true && (
                        <div className="model">
                          <div className="overlay"></div>
                          <div className="popup">
                            <i
                              className="close-btn fa-solid fa-circle-xmark"
                              onClick={() => this.onModal()}
                            ></i>
                            <h1>{item.title}</h1>
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
        </div>
      </>
    );
  }
}

export default Home;

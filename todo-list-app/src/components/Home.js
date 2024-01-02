import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import taskImg from "../images/task.png";
import sendImg from "../images/send.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

function Home() {
  const [dataRe, setDataRe] = useState([]);
  const [task_name, setTask_name] = useState("");
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const date = new Date();

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  let showDate = date.toLocaleString("en-IN", options);

  const showData = async () => {
    try {
      let result = await fetch("http://localhost:8080/task");
      setDataRe(await result.json());
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { task_name };
      await fetch("http://localhost:8080/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      showData();
      removeItem();
    } catch (error) {
      console.error(error);
    }
    window.location = "/";
  };

  const removeItem = async (task_id) => {
    try {
      let res = await fetch("http://localhost:8080/task/"+task_id, {
        method: "DELETE",
        headers: { "content-type": "application/json"},
      });
  
     await res.json();
     
     console.log(res.status)
      if(res.status === 200){
        setMessage('deleted')
        setTimeout(() => {
          navigate('/')
        },1000)
      }else{
        setMessage('')
      }
    } catch (error) {
      console.log(error)
    }
    // alert(id);
    console.log(task_id);
  };

  useEffect(() => {
    showData();
  },[message]);

  return (
    <div>
      <Navbar className="bg-body-tertiary nav">
        <Container>
          <Navbar.Brand href="/" className="Nav-title">
            <h4 style={{ margin: "0", padding: "0" }}>My Day</h4>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {" "}
              <h6 style={{ margin: "0", padding: "0", color: "white" }}>
                {showDate}
              </h6>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="main-container">
        <div className="item-con">
          <h1>Todo List App</h1>
          <form onSubmit={handleSubmit} className="inp-form">
            <div className="inp-con">
              <label htmlFor="task">
                <img src={taskImg} alt="Task: " width={"30px"} />
              </label>
              <input
                type="text"
                id="task"
                placeholder="Try typing 'Pay utilites bill by Friday 6pm'..."
                className="task-inp"
                value={task_name}
                onChange={(e) => {
                  setTask_name(e.target.value);
                }}
              />
              <Button type="submit" variant="dark" className="add-btn">
                <img src={sendImg} alt="Submit" width={"30px"} />
              </Button>
            </div>
          </form>
          <h3 style={{ width: "100%", textAlign: "center" }}>My list</h3>
          <div className="scrollable-list scrollbar-black bordered-black square thin">
            <ul className="task-list">
              {dataRe.map((data, index) => (
                <li key={index} className="list-item">
                  {data.Task_name}
                  <Button
                    variant="btn btn-danger"
                    style={{
                      fontSize: "14px",
                      marginLeft: "50px",
                      cursor: "pointer",
                    }}
                    // value={data.Task_id}
                    onClick={() => removeItem(data.Task_id)}
                  >
                    X
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

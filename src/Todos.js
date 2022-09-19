import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";

const Todos = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const getData = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/Todos"
      );
      setData(data);
    } catch (error) {}
  };
  const todos = useMemo(
    () => data.slice((page - 1) * 10, page * 10),
    [data, page]
  );
  const paginate = useMemo(
    () => data.filter((i, idx) => idx % 10 == 0),
    [todos, page]
  );
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (todos.length === 0 && page != 1) {
      setPage((last) => last - 1);
    }
  }, [todos]);
  const remove = (idx) => {
    setData((last) => {
      const help = [...last];
      help.splice((page - 1) * 10 + idx, 1);
      return [...help];
    });
  };
  const changestatus = (item, i) =>
    setData((last) => {
      const help = [...last];
      help[(page - 1) * 10 + i].completed = !item;
      console.log(item, i);
      return [...help];
    });

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td style={{ display: "flex", justifyContent: "space-around " }}>
                <Button
                  onClick={() => changestatus(item.completed, i)}
                  style={{
                    border: item.completed
                      ? " 1px solid green"
                      : " 1px solid red",

                    background: "none",
                  }}
                >
                  {item.completed.toString()}
                </Button>
                <Button
                  style={{ background: "none", borderColor: "grey" }}
                  onClick={() => {
                    remove(i);
                  }}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination style={{ display: "flex", justifyContent: "center" }}>
        {paginate.map((i, idx) => (
          <Pagination.Item
            key={idx}
            active={idx === page - 1}
            onClick={() => {
              setPage(idx + 1);
            }}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default Todos;

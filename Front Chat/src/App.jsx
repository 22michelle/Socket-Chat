import moment from "moment/moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "./hook/useSocket";

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef();
  const { socket } = useSocket("http://localhost:4000");

  useEffect(() => {
    getMessaje();
  }, []);

  const getMessaje = useCallback(() => {
    socket.on("server:getMessaje", (messages) => {
      setMessages(messages);
    });
  }, []);

  const sendMessaje = (e) => {
    e.preventDefault();
    socket.emit("client:addMessaje", { message, hour: Date.now() });
    setMessage("");
    inputRef.current.focus();
  };

  return (
    <div className="border border-2 border-primary bg-secondary mb-4 mt-5">
      <div className="container">
        <div className="col-6">
          <form onSubmit={sendMessaje}>
            <input
              ref={inputRef}
              className="form-control px-2 rounded-3 mt-3"
              type="text"
              placeholder="Mensaje..."
              name="message"
              value={message}
              autoFocus
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn btn-primary mt-2 col-12  gx-5 rounded-pill"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>

        <div className="col-12 mt-5">
          <ol className="list-group my-3 ">
            {messages.map((item, i) => (
              <li
                key={i}
                className="list-group-item rounded-pill item-dark border border-2 border-primary my-1"
              >
                <div className="fw-bold">{item.message}</div>
                {/* {Date.now()} */}
                {moment(item.hour).format("MMMM Do YYYY, h:mm:ss a")}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;

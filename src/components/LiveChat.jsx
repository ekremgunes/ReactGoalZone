import React from "react";
import { useState, useEffect } from "react";
import "../../public/assets/css/LiveChat.css";
const LiveChat = () => {
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [modalBtnVisibility, setmodalBtnVisibility] = useState(true);

  const openChatModal = () => {
    setmodalBtnVisibility(false);
    setmodalVisibility(true);
  };
  const closeChatModal = () => {
    setmodalVisibility(false);
    setmodalBtnVisibility(true);
  };
  return (
    <>
      <div
        id="liveChat"
        style={{ visibility: modalVisibility ? "visible" : "hidden" }}
      >
        <div>
          <h4 onClick={() => closeChatModal()}>
            Live Chat
            <span>
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
          </h4>

          <div className="chatArea">
            <ul className="chat-list">
              <li className="in">
                <div className="chat-img">
                  <img
                    alt="Avtar"
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                  />
                </div>
                <div className="chat-body">
                  <div className="chat-message">
                    <h5>Jimmy Willams</h5>
                    <p>Raw denim heard of them tofu master cleanse</p>
                  </div>
                  <p className="dateTime">2023 05 05 05</p>
                </div>
              </li>
              <li className="out">
                <div className="chat-img">
                  <img
                    alt="Avtar"
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                  />
                </div>
                <div className="chat-body">
                  <div className="chat-message">
                    <h5>Serena</h5>
                    <p>Next level veard</p>
                  </div>
                </div>
              </li>
              <li className="in">
                <div className="chat-img">
                  <img
                    alt="Avtar"
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                  />
                </div>
                <div className="chat-body">
                  <div className="chat-message">
                    <h5 className="name">Jimmy Willams</h5>
                    <p>Will stumptown scenes coffee viral.</p>
                  </div>
                </div>
              </li>
              <li className="out">
                <div className="chat-img">
                  <img
                    alt="Avtar"
                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                  />
                </div>
                <div className="chat-body">
                  <div className="chat-message">
                    <h5>Serena</h5>
                    <p>Tofu master best deal</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="sendMessageArea">
          <form>
            <input type="text" placeholder=""/>
            <button >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>

      </div>

      <div
        id="chatBtn"
        style={{ visibility: modalBtnVisibility ? "visible" : "hidden" }}
        onClick={(e) => openChatModal(e)}
      >
        <i className="fa-regular fa-comment-dots"></i>
      </div>
    </>
  );
};

export default LiveChat;

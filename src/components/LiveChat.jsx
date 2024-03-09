import React from "react";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  orderBy,
  limit,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../helpers/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import "../../public/assets/css/LiveChat.css";


const LiveChat = () => {
  const [user] = useAuthState(auth);

  const messageRef = collection(db, "messages");
  const queryRef = query(messageRef, orderBy("createdAt", "asc"), limit(20));
  const [messages] = useCollection(queryRef, { idField: "id" });

  const [inputValue, setinputValue] = useState("");
  const scrollTo = useRef(null);

  const [modalVisibility, setmodalVisibility] = useState(false);
  const [modalBtnVisibility, setmodalBtnVisibility] = useState(true);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user) {
      googleSignIn();
    }
    if (!inputValue) {
      return;
    }
    const payload = {
      text: inputValue,
      createdAt: serverTimestamp(),
      uid: user.uid,
      photoUrl: user.photoURL,
      userName: user.displayName,
    };
    await addDoc(messageRef, payload);
    setinputValue("");
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    scrollTo.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openChatModal = () => {
    if (!user) {
      if (!confirm("Oturum açma ekranına yönlendirileceksiniz")) {
        return;
      }
      googleSignIn();
      return;
    }
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
              {messages
                ? messages.docs.map((msg) => (
                    <ChatMessage key={msg.id} message={msg.data()} />
                  ))
                : "Yeni mesaj bulunmuyor"}
              <div ref={scrollTo}></div>
            </ul>
          </div>
        </div>

        <div className="sendMessageArea">
          <form>
            <input
              onChange={(e) => setinputValue(e.target.value)}
              value={inputValue}
              type="text"
              placeholder="Your thoughts . ."
            />
            <button onClick={(e) => sendMessage(e)}>
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
function ChatMessage(props) {
  if (!auth.currentUser) {
    return;
  }
  const { text, uid, photoUrl, createdAt, userName } = props.message;
  const className = uid == auth.currentUser.uid ? "out" : "in";

  return (
    <li className={className}>
      <div className="chat-img">
        <img alt="Avatar" src={photoUrl} />
      </div>
      <div className="chat-body">
        <div className="chat-message">
          <h5>{userName}</h5>
          <p>{text}</p>
        </div>
        <p className="dateTime">{formatMessageDate(createdAt)}</p>
      </div>
    </li>
  );
}

function formatMessageDate(seconds) {
  const messageDate = new Date(seconds * 1000);
  //86400 = 24 hour
  const isPastDay = seconds + 86400 > new Date().getSeconds();
  return isPastDay
    ? `${messageDate.getHours()}:${messageDate.getMinutes()}`
    : messageDate.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
}

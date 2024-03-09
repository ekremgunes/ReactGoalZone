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

const LivePage = () => {
  const [user] = useAuthState(auth);

  const messageRef = collection(db, "messages");
  const queryRef = query(messageRef, orderBy("createdAt", "desc"), limit(20));
  const [messages] = useCollection(queryRef, { idField: "id" });

  const [inputValue, setinputValue] = useState("");
  const scrollTo = useRef(null)

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!user || !inputValue) {
      return;
    }
    const payload = {
      text: inputValue,
      createdAt: serverTimestamp(),
      uid: user.uid,
      photoUrl: user.photoURL,
    };
    await addDoc(messageRef,payload)
    setinputValue('')
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
  scrollTo.current.scrollIntoView({behavior:"smooth"})
  }, [messages])

  return (
    <div>
      <div>Messages</div>
      <div style={{ height: "10vh", position: "static", marginTop: "15vh" }}>
        {!user ? (
          <button onClick={() => googleSignIn()}>Login w google</button>
        ) : (
          <button onClick={() => logOut()}>Logout</button>
        )}

        <div className="col-12 row w-100 mt-5">
          <div ref={scrollTo}></div>
          {messages &&
            messages.docs.map((msg) => (
              <ChatMessage key={msg.id} message={msg.data()} />
            ))}
          <div className="mt-2 p-2">
            <form>
              <input
                onChange={(e) => setinputValue(e.target.value)}
                value={inputValue}
                type="text"
              ></input>
              <button onClick={(e) => sendMessage(e)}>send message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LivePage;

function ChatMessage(props) {
  if (!auth.currentUser) {
    return;
  }
  const { text, uid, photoUrl,createdAt } = props.message;
  console.log(createdAt)
  const className = uid == auth.currentUser.uid ? "sent" : "recieved";

  return (
    <div className={className}>
      <p>{text}</p>
      <img src={photoUrl} alt="resim" />
    </div>
  );
}

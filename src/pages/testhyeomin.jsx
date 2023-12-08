import { useEffect, useState } from "react";
import "./App.css";
import { auth, db } from "./firebase";
import { deleteDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import styled from "styled-components";
const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [bookShopName, setBookShopName] = useState(""); // 서점 이름을 위한 새로운 state 변수
  const [firedata, setFireData] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "comments"));
        const firebaseData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nickname: data.nickname,
            bookShopName: data.bookShopName,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            content: data.content,
            userId: data.userId,
          };
        });
        setFireData(firebaseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const deleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, "comments", commentId));
      setFireData((prevData) =>
        prevData.filter((data) => data.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const commentInputChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "userName") {
      setUserName(value);
    }
    if (name === "commentContent") {
      setCommentContent(value);
    }
    if (name === "bookShopName") {
      setBookShopName(value);
    }
  };
  const addComment = async (event) => {
    event.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        return;
      }
      const docRef = await addDoc(collection(db, "comments"), {
        userId: user.uid,
        nickname: userName,
        bookShopName: bookShopName || "예시 서점",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        content: commentContent,
      });
      // Update local state with the new comment
      setFireData((prevData) => [
        ...prevData,
        {
          id: docRef.id,
          nickname: userName,
          bookShopName: bookShopName || "예시 서점",
          createdAt: new Date(), // Set createdAt to the current date
          updatedAt: new Date(), // Set updatedAt to the current date
          content: commentContent,
          userId: user.uid,
        },
      ]);
      console.log("댓글이 추가되었습니다. ID: ", docRef.id);
      setUserName("");
      setCommentContent("");
      setBookShopName("");
    } catch (error) {
      console.error("댓글을 추가하는 중 오류 발생: ", error);
    }
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };
  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user", userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("똑같은 이메일이라 회원가입 안됨 ");
    }
  };
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert(" 로그인 성공", userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("로그인 오류", errorCode, errorMessage);
    }
  };
  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    alert("로그아웃");
  };
  return (
    <div className="App">
      <h2>로그인 페이지</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
          ></input>
        </div>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
        <button onClick={logOut}>로그아웃</button>
      </form>
      <form>
        <div>
          <label>유저이름 : </label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={commentInputChange}
          />
          댓글내용:
          <input
            type="text"
            name="commentContent"
            value={commentContent}
            onChange={commentInputChange}
          />
          서점이름:
          <input
            type="text"
            name="bookShopName"
            value={bookShopName}
            onChange={commentInputChange}
          />
          <button onClick={addComment}>추가</button>
        </div>
      </form>
      {firedata.map((data) => (
        <div key={data.id}>
          <h1>{data.bookShopName}</h1>
          <p>{data.content}</p>
          {/* <p>글작성시간: {data.createdAt.toDate().toLocaleString()}</p> */}
          <p>{data.nickname}</p>
          {/* <p>글수정시간: {data.updatedAt.toDate().toLocaleString()}</p> */}
          <p>{data.userId}</p>
          <button onClick={() => deleteComment(data.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
};
export default App;











Message 마진우(3기_React), 박찬호(React_3기), 이재환(React_3기)










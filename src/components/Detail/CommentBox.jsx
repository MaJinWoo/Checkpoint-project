import styled from 'styled-components';
import Background2 from '../../assets/Background2.png';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

function CommentBox({ storeId }) {
  const [firedata, setFireData] = useState([]);
  const [userName, setUserName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [bookShopName, setBookShopName] = useState(''); // 서점 이름을 위한 새로운 state 변수

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'comments'));
  //       const firebaseData = querySnapshot.docs.map((doc) => {
  //         const data = doc.data();
  //         return {
  //           id: doc.id,
  //           nickname: data.nickname,
  //           bookShopName: data.bookShopName,
  //           createdAt: data.createdAt,
  //           updatedAt: data.updatedAt,
  //           content: data.content,
  //           userId: data.userId
  //         };
  //       });

  //       setFireData(firebaseData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // console.log(storeId);
  // console.log(firedata);
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'comments'));
      const firebaseData = querySnapshot.docs
        .filter((doc) => doc.data().storeId === storeId)
        .map((doc) => {
          const data = doc.data();
          return {
            commentId: data.commentId,
            nickname: data.nickname,
            bookShopName: data.bookShopName,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            content: data.content,
            userId: data.userId,
            docId: doc.id //문서 이름
          };
        });

      setFireData(firebaseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteComment = async (docId, commentId) => {
    try {
      // console.log(db);
      await deleteDoc(doc(db, 'comments', docId));
      setFireData((prevData) => prevData.filter((data) => data.commentId !== commentId));

      // fetchData();
    } catch (error) {
      console.error('댓글삭제 오류:', error);
    }
  };

  const commentInputChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'userName') {
      setUserName(value);
    }
    if (name === 'commentContent') {
      setCommentContent(value);
    }
    if (name === 'bookShopName') {
      setBookShopName(value);
    }
  };
  const addComment = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return;
      }
      const commentId = uuidv4();

      const newData = {
        commentId: commentId,
        storeId: storeId,
        userId: user.uid,
        nickname: user.displayName,
        content: commentContent
      };

      // const docRef = await addDoc(collection(db, 'comments'), newData);
      await addDoc(collection(db, 'comments'), newData);
      fetchData();
      // Update local state with the new comment after the asynchronous operation is completed
      // setFireData((prevData) => [...prevData, { id: docRef.id, ...newData }]);

      // console.log('댓글이 추가되었습니다. ID: ', docRef.id);
      // setUserName('');
      // setCommentContent('');
      // setBookShopName('');
    } catch (error) {
      console.error('댓글을 추가하는 중 오류 발생: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <CommentsContainer>
      <label>방문 후기</label>

      <CommentInputContainer>
        <>
          {firedata.map((data) => (
            <div key={data.commentId}>
              <p>{data.nickname} :</p>
              <p>{data.content}</p>
              <button onClick={() => deleteComment(data.docId, data.commentId)}>삭제</button>
            </div>
          ))}
        </>

        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addComment();
              setCommentContent('');
            }}
          >
            <TextArea>
              <textarea
                value={commentContent}
                onChange={(event) => setCommentContent(event.target.value)}
                placeholder="해당 책방에 대한 방문후기를 남겨보세요"
              />
              <button type="submit">추가</button>
            </TextArea>
          </form>
        </div>
      </CommentInputContainer>
    </CommentsContainer>
  );
}

export default CommentBox;

const TextArea = styled.div`
  width: 107.4vh;

  flex-direction: row;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 1100px;
  padding: 30px 50px;
  margin: 20px 0;

  background-image: url(${Background2});
  background-size: 100%;
  border-radius: 10px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  border: 1px solid black;

  & div {
    display: flex;
    column-gap: 10px;
    & textarea {
      flex: 1;
    }
  }
`;

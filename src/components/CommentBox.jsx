import styled from 'styled-components';
import Background2 from '../assets/Background2.png';

function CommentBox() {
  return (
    <CommentsContainer>
      <label>방문 후기</label>
      <div>방문 후기 1</div>
      <div>방문 후기 2</div>
      <CommentInputContainer>
        <label>방문 후기 남기기</label>
        <div>
          <textarea />
          <button>확인</button>
        </div>
      </CommentInputContainer>
    </CommentsContainer>
  );
}

export default CommentBox;

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

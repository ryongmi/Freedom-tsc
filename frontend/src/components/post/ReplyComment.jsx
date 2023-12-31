import { Button, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { postComment } from "../../services/apiComment";
import { useOutletContext } from "react-router-dom";

function ReplyComment({
  commentId = null,
  menuId,
  postId,
  userName,
  value = "",
  topCommentId = null,
  handleCommentCancel,
  handleSearchComment,
}) {
  const { showMessage, showModal } = useOutletContext();
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    setComment(value);
    setCount(value?.length ?? 0);
  }, []);

  // 댓글 저장
  async function handleSubmit(e) {
    e.preventDefault();

    if (comment.length === 0) {
      showModal("데이터 미입력", "댓글을 입력해주세요.");
      return;
    }

    try {
      const fetchData = {
        commentId,
        menuId,
        postId,
        topCommentId,
        content: comment,
      };

      const { message } = await postComment(fetchData);
      await handleSearchComment();
      setComment(null);
      setCount(0);
      //   showMessage(message);
    } catch (error) {
      //   showMessage(error.message, "error");
    }
  }

  return (
    <div
      className={`comment-container ${
        commentId ? "" : "comment-container-bottom"
      } ${topCommentId ? "comment-middle" : ""}`}
    >
      <div className="comment-main">
        <Flex justify={"space-between"} align={"center"}>
          <p className="user-name">{userName}</p>
          {count > 0 && <p>{count} / 3000</p>}
        </Flex>
        <TextArea
          type="text"
          value={comment}
          placeholder={"댓글쓰기"}
          autoSize
          bordered={false}
          maxLength={3000}
          onChange={(e) => {
            setComment(e.target.value);
            setCount(e.target.value.length);
          }}
        />
        <Flex justify={"space-between"} align={"center"}>
          <p>&nbsp;</p>
          <div>
            {handleCommentCancel && (
              <Button
                onClick={handleCommentCancel}
                style={{ marginRight: "15px" }}
              >
                취소
              </Button>
            )}
            <Button onClick={handleSubmit}>등록</Button>
          </div>
        </Flex>
      </div>
    </div>
  );
}

export default ReplyComment;

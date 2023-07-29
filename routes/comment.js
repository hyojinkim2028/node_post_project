const express = require("express");
const router = express.Router();

const Comment = require("../schemas/comment.js");

// 댓글 전체 조회
router.get("/post/:postId/comments", async (req, res) => {
  const comments = await Comment.find({});

  res.status(200).json({ comments });
});

// 댓글 작성
router.post("/post/:postId/comments", async (req, res) => {
  const { commentId, user, password, content } = req.body; // body로 post한 값 가져옴

  if (
    typeof commentId !== "number" ||
    typeof user !== "string" ||
    typeof password !== "string" ||
    typeof content !== "string"
  ) {
    // find 했을 때 같은 아이디의 객체가 존재한다면 (length가 true라면 반환값이 있다는 의미므로)
    return res.status(400).json({
      success: false,
      errorMessage: "데이터 형식이 올바르지 않습니다.",
    });
  }

  const comment = await Comment.find({ commentId });

  if (comment.length) {
    // 같은 commentId값 존재시
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 commentId입니다.",
    });
  }

  const createdComment = await Comment.create({
    commentId,
    user,
    password,
    content,
  }); // id 중복값 검사후 생성된 post를 createdpost 변수에 담음

  res.json({ message: "댓글을 생성하였습니다." }); // 완료 후 댓글생성 되었다 메세지
});

// 댓글 수정
router.put("/post/:postId/comments/:commentId", async (req, res) => {
  const { commentId } = req.params; // 해당 commentId 존재여부
  const { password, content } = req.body;

  if (
    typeof commentId !== "number" ||
    typeof user !== "string" ||
    typeof password !== "string" ||
    typeof content !== "string"
  ) {
    // 다음 항목중 하나라도 형식에 따라 입력되지 않았다면 false 반환

    return res.status(400).json({
      success: false,
      errorMessage: "데이터 형식이 올바르지 않습니다.",
    });
  }

  existsLists = await Comment.find({ commentId }); // 댓글달며 입력한 id 값 중복여부 확인

  if (existsLists.length) {
    await Comment.updateOne(
      { commentId: commentId }, // 해당하는 댓글아이디 존재시 수정
      {
        $set: {
          password: password,
          content: content,
        },
      }
    );
    res.status(200).json({ success: true });
  } else {
    // 요청한 아이디 존재하지 않을 시
    res.status(404).json({ errorMessage: "존재하지 않는 commentId입니다." });
  }
});

//댓글 삭제
router.delete("/post/:postId/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;

  const existsLists = await Comment.find({ commentId });
  if (existsLists.length) {
    // 해당하는 댓글아이디 존재시 삭제
    await Comment.deleteOne({ commentId });
    res.json({ result: "success" });
  } else {
    // 요청한 아이디 존재하지 않을 시
    res.status(404).json({ errorMessage: "존재하지 않는 commentId입니다." });
  }
});

module.exports = router;

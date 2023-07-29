const express = require("express");
const router = express.Router();

const Post = require("../schemas/post.js");

// 게시글 전체 조회
router.get("/post", async (req, res) => {
  const posts = await Post.find({});
  res.json({ posts });
});

// 게시글 상세 조회
router.get("/post/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findOne({ postId });

  if (post) {
    // 입력 아이디값과 일치한 게시글 있으면 그 게시글 반환
    res.json({ post });
  } else {
    // 일치한 값 없으면
    res.status(400).json({ errorMessage: "게시글 조회에 실패했습니다." });
  }
});

// 게시글 수정
router.put("/post/:postId", async (req, res) => {
  const { postId } = req.params; // 해당 아이디 존재여부
  const { user, password, title, content } = req.body; // 수정할 데이터

  if (
    typeof postId !== "number" ||
    typeof user !== "string" ||
    typeof password !== "string" ||
    typeof title !== "string" ||
    typeof content !== "string"
  ) {
    // 다음 항목중 하나라도 형식에 따라 입력되지 않았다면 false 반환

    return res.status(400).json({
      success: false,
      errorMessage: "데이터 형식이 올바르지 않습니다.",
    });
  }

  existsLists = await Post.find({ postId }); // 아이디 존재하는지 찾기

  if (existsLists.length) {
    // 존재하면 값 수정하고 응답값 200 보내줌
    await Post.updateOne(
      { postId: postId },
      {
        $set: {
          user: user,
          password: password,
          title: title,
          content: content,
        },
      }
    ); // req.body로 받아온 데이터 수정
    res.status(200).json({ success: true });
  } else {
    // 없으면 조회 실패 나오게
    res
      .status(404)
      .json({ success: false, errorMessage: "게시글 조회에 실패했습니다." });
  }
});

// 게시글 삭제
router.delete("/post/:postId", async (req, res) => {
  const { postId } = req.params;

  const existsLists = await Post.find({ postId }); // 존재하는 아이디값의 목록 삭제
  if (existsLists.length) {
    await Post.deleteOne({ postId });
    res.json({ result: "success" });
  } else {
    // 없으면 실패 메세지 반환
    res
      .status(404)
      .json({ success: false, errorMessage: "게시글 조회에 실패했습니다." });
  }
});

// 게시글 작성
router.post("/post", async (req, res) => {
  const { postId, user, password, title, content } = req.body; // body로 post 생성

  if (
    typeof postId !== "number" ||
    typeof user !== "string" ||
    typeof password !== "string" ||
    typeof title !== "string" ||
    typeof content !== "string"
  ) {
    // 다음 항목중 하나라도 입력되지 않았다면 false 반환
    return res.status(400).json({
      success: false,
      errorMessage: "데이터 형식이 올바르지 않습니다.",
    });
  }

  const post = await Post.find({ postId });

  if (post.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 postId입니다.",
    });
  }

  const createdPost = await Post.create({
    postId,
    user,
    password,
    title,
    content,
  }); // id 중복값 검사후 생성된 post를 createdpost 변수에 담음

  res.json({ message: "게시글을 생성하였습니다." }); // 완료하면 createdPost를 post라는 키값으로 반환할것이다.
});

// app.js에서 사용하기 위해 내보냄.
module.exports = router;

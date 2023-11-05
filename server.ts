import { Request, Response } from "express";
import { Db, MongoClient } from "mongodb";
import { connect } from "./connect";
import { jwtSign, jwtVerify } from "./jwt";

let db: Db;

const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("build"));
const cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "./build")));

app.listen(process.env.PORT || 8080, async function () {
  const client = await MongoClient.connect("mongodb+srv://dju99:yihwang70@cluster0.ljm5i.mongodb.net/");
  const dbName = "Project";
  db = client.db(dbName);

  try {
    console.log("Server is running on port 8000");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

app.get("/", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("/store", async function (req: Request, res: Response) {
  try {
    if (db) {
      const stores = await db.collection("store").find({}).toArray();
      res.json(stores);
    } else {
      console.error("MongoDB connection is not established.");
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/store/:name", async function (req: Request, res: Response) {
  try {
    const storeName = req.params.name; // URL 파라미터에서 상점 이름 추출

    if (db) {
      // MongoDB에서 해당 상점을 찾아 응답
      const store = await db.collection("store").findOne({ name: storeName });
      if (store) {
        res.json(store);
      } else {
        res.status(404).json({ error: "Store not found" });
      }
    } else {
      console.error("MongoDB connection is not established.");
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/store/search/:type", async function (req: Request, res: Response) {
  try {
    const storeType = req.params.type; // URL 파라미터에서 상점 이름 추출

    if (db) {
      // MongoDB에서 해당 상점을 찾아 응답
      const store = await db.collection("store").find({ type: storeType }).toArray();
      if (store) {
        res.json(store);
      } else {
        res.status(404).json({ error: "Store not found" });
      }
    } else {
      console.error("MongoDB connection is not established.");
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/userLogin", async (req: Request, res: Response) => {
  const { id, pw } = req.body;
  const idCheck = await db.collection("user").findOne({ id: id });
  const pwCheck = await db.collection("user").findOne({ password: pw });

  if (idCheck && pwCheck) {
    const token = await jwtSign(id); // const JWT = sing(payload, secret, options)

    res.json(token);
  } else {
    res.json(false);
  }
});

app.post("/userSignup", async (req: Request, res: Response) => {
  const { id, pw, name } = req.body;
  const idCheck = await db.collection("user").findOne({ id: id });

  if (idCheck) {
    res.send(false);
  } else {
    try {
      await connect(async (db) => {
        const userCollection = db.collection("user");

        // 회원 정보 저장
        const newUser = {
          id: id,
          password: pw,
          name: name,
          profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        };
        await userCollection.insertOne(newUser);

        res.send(true);
      }, "Project");
    } catch (error) {
      console.error("Error processing signup request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.post("/userNameCheck", async (req: Request, res: Response) => {
  const { name } = req.body;
  const nameCheck = await db.collection("user").findOne({ name: name });

  if (nameCheck) {
    res.send(false);
  } else {
    res.send(true);
  }
});

app.get("/main/:first/:second", async function (req: Request, res: Response) {
  const { first, second } = req.params;
  try {
    const firstNum = await db.collection(first).countDocuments({});
    const secondNum = await db.collection(second).countDocuments({});

    const firstPost = await db
      .collection(first)
      .find()
      .skip(Math.max(firstNum - 5, 0))
      .toArray();
    const secondPost = await db
      .collection("buy")
      .find()
      .skip(Math.max(secondNum - 5, 0))
      .toArray();

    res.json({ firstPost, secondPost });
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/post/:board", async (req: Request, res: Response) => {
  const board = req.params.board as string; // req.params.board를 사용

  try {
    const num = await db.collection(board).countDocuments({});
    const posts = await db.collection(board).find({}).toArray();
    res.json({ num, posts });
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/community/:board", async (req: Request, res: Response) => {
  const board = req.params.board as string; // req.params.board를 사용

  try {
    const num = await db.collection(board).countDocuments({});
    const posts = await db.collection(board).find({}).toArray();
    res.json({ num, posts });
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/postupload", async (req: Request, res: Response) => {
  const today = new Date();
  const date = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    hours: today.getHours(),
    minutes: today.getMinutes(),
  };

  const dateString = `${date.year}-${date.month}-${date.date} ${date.hours}:${date.minutes}`;

  try {
    const { title, board, user, content } = req.body;

    const writer = await jwtVerify(user);
    const userNameObject = await db.collection("user").findOne({ id: writer }, { projection: { _id: 0, name: 1 } });
    const userName = userNameObject ? userNameObject.name : "Unknown";

    await connect(async (db) => {
      const postCollection = db.collection(board);

      const totalPosts = await postCollection.countDocuments();

      const post = {
        postNum: totalPosts + 1, // totalPosts를 문자열로 변환
        title: title,
        board: board,
        date: dateString,
        user: userName,
        content: content,
      };

      await postCollection.insertOne(post);

      res.send(true);
    }, "Project");
  } catch (error) {
    console.error("postupload 요청 처리 중 오류 발생:", error);
    res.status(500).json({ error: "내부 서버 오류" });
  }
});

app.get("/post/:board/:postNum", async function (req: Request, res: Response) {
  try {
    const postNum = Number(req.params.postNum);
    const board = req.params.board;

    if (db) {
      // MongoDB에서 해당 상점을 찾아 응답
      const post = await db.collection(board).findOne({ postNum: postNum });

      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Store not found" });
      }
    } else {
      console.error("MongoDB connection is not established.");
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/post/:board/:postNum", async function (req: Request, res: Response) {
  try {
    const postNum = Number(req.params.postNum); // 요청에서 postNum을 숫자로 변환
    const board = req.params.board;

    if (db) {
      // MongoDB에서 해당 게시물을 삭제
      await db.collection(board).deleteOne({ postNum: postNum });

      // postNum보다 큰 postNum 값을 가진 게시물들의 postNum을 1씩 감소
      await db.collection(board).updateMany({ postNum: { $gt: postNum } }, { $inc: { postNum: -1 } });

      res.status(204).end(); // No Content 응답
    } else {
      console.error("MongoDB connection is not established.");
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/mypage", async (req: Request, res: Response) => {
  try {
    const { token } = req.body; // JSON 데이터 파싱
    const userID = await jwtVerify(token);
    const userdata = await db.collection("user").findOne({ id: userID });
    const userBuyPostdata = await db.collection("buy").find({ user: userID }).toArray();
    const userSellPostdata = await db.collection("sell").find({ user: userID }).toArray();

    res.json({ userdata, userBuyPostdata, userSellPostdata }); // 사용자 ID를 JSON 형식으로 응답
  } catch (error) {
    console.error("Error verifying JWT:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/post/community", async (req: Request, res: Response) => {
  try {
    const num = await db.collection("community").countDocuments({});
    const posts = await db.collection("community").find({}).toArray();
    res.json({ num, posts });
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("*", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

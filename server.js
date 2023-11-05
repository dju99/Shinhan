"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var connect_1 = require("./connect");
var jwt_1 = require("./jwt");
var db;
var express = require("express");
var app = express();
var path = require("path");
app.use(express.json());
app.use(express.static("build"));
var cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, "./build")));
app.listen(process.env.PORT || 8080, function () {
    return __awaiter(this, void 0, void 0, function () {
        var client, dbName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect("mongodb+srv://dju99:yihwang70@cluster0.ljm5i.mongodb.net/")];
                case 1:
                    client = _a.sent();
                    dbName = "Project";
                    db = client.db(dbName);
                    try {
                        console.log("Server is running on port 8000");
                    }
                    catch (error) {
                        console.error("Error connecting to MongoDB:", error);
                    }
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("/store", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stores, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!db) return [3 /*break*/, 2];
                    return [4 /*yield*/, db.collection("store").find({}).toArray()];
                case 1:
                    stores = _a.sent();
                    res.json(stores);
                    return [3 /*break*/, 3];
                case 2:
                    console.error("MongoDB connection is not established.");
                    res.status(500).json({ error: "Internal Server Error" });
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error querying MongoDB:", error_1);
                    res.status(500).json({ error: "Internal Server Error" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
app.get("/store/:name", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var storeName, store, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    storeName = req.params.name;
                    if (!db) return [3 /*break*/, 2];
                    return [4 /*yield*/, db.collection("store").findOne({ name: storeName })];
                case 1:
                    store = _a.sent();
                    if (store) {
                        res.json(store);
                    }
                    else {
                        res.status(404).json({ error: "Store not found" });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    console.error("MongoDB connection is not established.");
                    res.status(500).json({ error: "Internal Server Error" });
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error querying MongoDB:", error_2);
                    res.status(500).json({ error: "Internal Server Error" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
app.get("/store/search/:type", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var storeType, store, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    storeType = req.params.type;
                    if (!db) return [3 /*break*/, 2];
                    return [4 /*yield*/, db.collection("store").find({ type: storeType }).toArray()];
                case 1:
                    store = _a.sent();
                    if (store) {
                        res.json(store);
                    }
                    else {
                        res.status(404).json({ error: "Store not found" });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    console.error("MongoDB connection is not established.");
                    res.status(500).json({ error: "Internal Server Error" });
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error("Error querying MongoDB:", error_3);
                    res.status(500).json({ error: "Internal Server Error" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
app.post("/userLogin", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, pw, idCheck, pwCheck, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, pw = _a.pw;
                return [4 /*yield*/, db.collection("user").findOne({ id: id })];
            case 1:
                idCheck = _b.sent();
                return [4 /*yield*/, db.collection("user").findOne({ password: pw })];
            case 2:
                pwCheck = _b.sent();
                if (!(idCheck && pwCheck)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, jwt_1.jwtSign)(id)];
            case 3:
                token = _b.sent();
                res.json(token);
                return [3 /*break*/, 5];
            case 4:
                res.json(false);
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/userSignup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, pw, name, idCheck, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, pw = _a.pw, name = _a.name;
                return [4 /*yield*/, db.collection("user").findOne({ id: id })];
            case 1:
                idCheck = _b.sent();
                if (!idCheck) return [3 /*break*/, 2];
                res.send(false);
                return [3 /*break*/, 5];
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, connect_1.connect)(function (db) { return __awaiter(void 0, void 0, void 0, function () {
                        var userCollection, newUser;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    userCollection = db.collection("user");
                                    newUser = { id: id, password: pw, name: name, profile: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" };
                                    return [4 /*yield*/, userCollection.insertOne(newUser)];
                                case 1:
                                    _a.sent();
                                    res.send(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, "Project")];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                console.error("Error processing signup request:", error_4);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/userNameCheck", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, nameCheck;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                return [4 /*yield*/, db.collection("user").findOne({ name: name })];
            case 1:
                nameCheck = _a.sent();
                if (nameCheck) {
                    res.send(false);
                }
                else {
                    res.send(true);
                }
                return [2 /*return*/];
        }
    });
}); });
app.get("/main/:first/:second", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, first, second, firstNum, secondNum, firstPost, secondPost, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, first = _a.first, second = _a.second;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, db.collection(first).countDocuments({})];
                case 2:
                    firstNum = _b.sent();
                    return [4 /*yield*/, db.collection(second).countDocuments({})];
                case 3:
                    secondNum = _b.sent();
                    return [4 /*yield*/, db
                            .collection(first)
                            .find()
                            .skip(Math.max(firstNum - 5, 0))
                            .toArray()];
                case 4:
                    firstPost = _b.sent();
                    return [4 /*yield*/, db
                            .collection("buy")
                            .find()
                            .skip(Math.max(secondNum - 5, 0))
                            .toArray()];
                case 5:
                    secondPost = _b.sent();
                    res.json({ firstPost: firstPost, secondPost: secondPost });
                    return [3 /*break*/, 7];
                case 6:
                    error_5 = _b.sent();
                    console.error("Error querying MongoDB:", error_5);
                    res.status(500).json({ error: "Internal Server Error" });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
});
app.get("/post/:board", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var board, num, posts, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                board = req.params.board;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db.collection(board).countDocuments({})];
            case 2:
                num = _a.sent();
                return [4 /*yield*/, db.collection(board).find({}).toArray()];
            case 3:
                posts = _a.sent();
                res.json({ num: num, posts: posts });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                console.error("Error querying MongoDB:", error_6);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get("/community/:board", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var board, num, posts, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                board = req.params.board;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db.collection(board).countDocuments({})];
            case 2:
                num = _a.sent();
                return [4 /*yield*/, db.collection(board).find({}).toArray()];
            case 3:
                posts = _a.sent();
                res.json({ num: num, posts: posts });
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.error("Error querying MongoDB:", error_7);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/postupload", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var today, date, dateString, _a, title_1, board_1, user, content_1, writer, userNameObject, userName_1, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                today = new Date();
                date = {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    date: today.getDate(),
                    hours: today.getHours(),
                    minutes: today.getMinutes(),
                };
                dateString = "".concat(date.year, "-").concat(date.month, "-").concat(date.date, " ").concat(date.hours, ":").concat(date.minutes);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                _a = req.body, title_1 = _a.title, board_1 = _a.board, user = _a.user, content_1 = _a.content;
                return [4 /*yield*/, (0, jwt_1.jwtVerify)(user)];
            case 2:
                writer = _b.sent();
                return [4 /*yield*/, db.collection("user").findOne({ id: writer }, { projection: { _id: 0, name: 1 } })];
            case 3:
                userNameObject = _b.sent();
                userName_1 = userNameObject ? userNameObject.name : "Unknown";
                return [4 /*yield*/, (0, connect_1.connect)(function (db) { return __awaiter(void 0, void 0, void 0, function () {
                        var postCollection, totalPosts, post;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    postCollection = db.collection(board_1);
                                    return [4 /*yield*/, postCollection.countDocuments()];
                                case 1:
                                    totalPosts = _a.sent();
                                    post = {
                                        postNum: totalPosts + 1,
                                        title: title_1,
                                        board: board_1,
                                        date: dateString,
                                        user: userName_1,
                                        content: content_1,
                                    };
                                    return [4 /*yield*/, postCollection.insertOne(post)];
                                case 2:
                                    _a.sent();
                                    res.send(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, "Project")];
            case 4:
                _b.sent();
                return [3 /*break*/, 6];
            case 5:
                error_8 = _b.sent();
                console.error("postupload 요청 처리 중 오류 발생:", error_8);
                res.status(500).json({ error: "내부 서버 오류" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get("/post/:board/:postNum", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var postNum, board, post, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    postNum = Number(req.params.postNum);
                    board = req.params.board;
                    if (!db) return [3 /*break*/, 2];
                    return [4 /*yield*/, db.collection(board).findOne({ postNum: postNum })];
                case 1:
                    post = _a.sent();
                    if (post) {
                        res.json(post);
                    }
                    else {
                        res.status(404).json({ error: "Store not found" });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    console.error("MongoDB connection is not established.");
                    res.status(500).json({ error: "Internal Server Error" });
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_9 = _a.sent();
                    console.error("Error querying MongoDB:", error_9);
                    res.status(500).json({ error: "Internal Server Error" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
app.delete("/post/:board/:postNum", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var postNum, board, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    postNum = Number(req.params.postNum);
                    board = req.params.board;
                    if (!db) return [3 /*break*/, 3];
                    // MongoDB에서 해당 게시물을 삭제
                    return [4 /*yield*/, db.collection(board).deleteOne({ postNum: postNum })];
                case 1:
                    // MongoDB에서 해당 게시물을 삭제
                    _a.sent();
                    // postNum보다 큰 postNum 값을 가진 게시물들의 postNum을 1씩 감소
                    return [4 /*yield*/, db.collection(board).updateMany({ postNum: { $gt: postNum } }, { $inc: { postNum: -1 } })];
                case 2:
                    // postNum보다 큰 postNum 값을 가진 게시물들의 postNum을 1씩 감소
                    _a.sent();
                    res.status(204).end(); // No Content 응답
                    return [3 /*break*/, 4];
                case 3:
                    console.error("MongoDB connection is not established.");
                    res.status(500).json({ error: "Internal Server Error" });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_10 = _a.sent();
                    console.error("Error querying MongoDB:", error_10);
                    res.status(500).json({ error: "Internal Server Error" });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
});
app.post("/mypage", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, userID, userdata, userBuyPostdata, userSellPostdata, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                token = req.body.token;
                return [4 /*yield*/, (0, jwt_1.jwtVerify)(token)];
            case 1:
                userID = _a.sent();
                return [4 /*yield*/, db.collection("user").findOne({ id: userID })];
            case 2:
                userdata = _a.sent();
                return [4 /*yield*/, db.collection("buy").find({ user: userID }).toArray()];
            case 3:
                userBuyPostdata = _a.sent();
                return [4 /*yield*/, db.collection("sell").find({ user: userID }).toArray()];
            case 4:
                userSellPostdata = _a.sent();
                res.json({ userdata: userdata, userBuyPostdata: userBuyPostdata, userSellPostdata: userSellPostdata }); // 사용자 ID를 JSON 형식으로 응답
                return [3 /*break*/, 6];
            case 5:
                error_11 = _a.sent();
                console.error("Error verifying JWT:", error_11);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get("/post/community", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var num, posts, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db.collection("community").countDocuments({})];
            case 1:
                num = _a.sent();
                return [4 /*yield*/, db.collection("community").find({}).toArray()];
            case 2:
                posts = _a.sent();
                res.json({ num: num, posts: posts });
                return [3 /*break*/, 4];
            case 3:
                error_12 = _a.sent();
                console.error("Error querying MongoDB:", error_12);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

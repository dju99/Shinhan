import { MongoClient, Db } from "mongodb";

export type MongoDB = Db;
export type ConnectCallback = (db: MongoDB) => void;

export const connect = async (callback: ConnectCallback, dbName: string, mongoUrl: string = "mongodb+srv://dju99:yihwang70@cluster0.ljm5i.mongodb.net/") => {
  let connection;
  try {
    connection = await MongoClient.connect(mongoUrl);
    const db: Db = connection.db(dbName);
    callback(db);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

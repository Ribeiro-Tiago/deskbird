import { connect, Mongoose } from "mongoose";

let _connection: Mongoose | null = null;

export const getConnection = async () => {
  if (_connection !== null) {
    return _connection;
  }

  const { MONGO_URI, MONGO_DB } = process.env;

  if (!MONGO_URI || !MONGO_DB) {
    throw new Error("Missing mongo configs");
  }

  _connection = await connect(`${MONGO_URI}/${MONGO_DB}`);
};

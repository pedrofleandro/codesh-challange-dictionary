import { ObjectId } from "mongodb";

export const encodeCursor = (id: ObjectId): string => {
    return Buffer.from(JSON.stringify({ _id: id })).toString("base64");
};

export const decodeCursor = (cursor: string): ObjectId => {
    const decoded = Buffer.from(cursor, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);
    return parsed._id;
};

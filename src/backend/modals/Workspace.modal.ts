import { ObjectId } from "mongodb";

export interface Workspace {
    _id?: ObjectId;
    name: string;
    slug:string;
    description:string;
    createdAt: Date;
    updatedAt: Date;
}

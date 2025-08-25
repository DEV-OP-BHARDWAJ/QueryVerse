import { IndexType, Permission } from "node-appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
    // Step 1: Create Database if it doesn't exist
    try {
        await databases.create(db, db); // Creates a new database with the specified ID and name
        console.log("✅ Database created successfully");
    } catch (error: any) {
        // If the database already exists (409) or the plan limit is reached (403), we can assume it's there.
        if (error.code === 409 || error.code === 403) {
            console.log("INFO: Database already exists or plan limit reached. Proceeding...");
        } else {
            console.error("❌ Error creating database:", error);
            throw error;
        }
    }

    // Step 2: Create Collection if it doesn't exist
    try {
        await databases.createCollection(db, questionCollection, questionCollection, [
            Permission.read("any"),//only two types who gets access like any or user
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]);
        console.log("✅ Collection created successfully");
    } catch (error: any) {
        if (error.code === 409) {
            console.log("INFO: Collection already exists.");
        } else {
            console.error("❌ Error creating collection:", error);
            throw error;
        }
    }

    // Step 3: Create Attributes one by one
    console.log("INFO: Verifying attributes...");
    const attributesToCreate = [
        { name: "title", type: "string", size: 100, required: true, array: false },
        { name: "content", type: "string", size: 10000, required: true, array: false },
        { name: "authorId", type: "string", size: 50, required: true, array: false },
        { name: "tags", type: "string", size: 50, required: true, array: true },
        { name: "attachmentId", type: "string", size: 50, required: false, array: false },
    ];

    for (const attr of attributesToCreate) {
        try {
            if (attr.type === 'string') {
                await databases.createStringAttribute(db, questionCollection, attr.name, attr.size, attr.required, undefined, attr.array);
                console.log(`✅ Attribute '${attr.name}' created.`);
            }
        } catch (e: any) {
            if (e.code === 409 || e.code === 400) {
                console.log(`INFO: Attribute '${attr.name}' already exists.`);
            } else {
                console.error(`❌ Error creating '${attr.name}':`, e);
                throw e;
            }
        }
    }
    console.log("INFO: Attribute verification complete.");
}
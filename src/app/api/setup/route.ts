import { NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db } from "@/models/name";

// Import all our setup functions
import createQuestionCollection from "@/models/server/question.collection";
import createAnswerCollection from "@/models/server/answer.collection";
import createCommentCollection from "@/models/server/comment.collection";
import createVoteCollection from "@/models/server/vote.collection";
import getOrCreateStorage from "@/models/server/storageSetup";

export async function GET() {
    try {
        console.log("--- Starting Full Backend Setup ---");

        // Step 1: Create Database if it doesn't exist
        try {
            await databases.create(db, db);
            console.log("✅ Database created successfully");
        } catch (e: any) {
            if (e.code === 409 || e.code === 403) {
                console.log("INFO: Database already exists.");
            } else {
                throw e;
            }
        }

        // Step 2: Create all collections
        await createQuestionCollection();
        await createAnswerCollection();
        await createCommentCollection();
        await createVoteCollection();
        
        // Step 3: Set up Storage Bucket
        await getOrCreateStorage();
        
        console.log("\n🎉 --- Full Setup Successful! --- 🎉");

        return NextResponse.json({ success: true, message: "Full backend setup is complete." });

    } catch (error: any) {
        console.error("\n❌ --- An error occurred during setup --- ❌");
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Failed to complete backend setup.", error: (error as Error).message },
            { status: 500 }
        );
    }
}

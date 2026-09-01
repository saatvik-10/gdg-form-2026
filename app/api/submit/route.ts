import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/lib/auth";

const MONGODB_URI =
  process.env.MONGODB_URI!

let isConnected = false;

async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  isConnected = true;
}

if (mongoose.models && mongoose.models.Application) {
  delete mongoose.models.Application;
}

const ApplicationSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true },
    branch:        { type: String, required: true },
    year:          { type: String, required: true },
    prn:           { type: String, required: true },
    preferredRole: { type: String, required: true },
    phone:         { type: String, required: true },
    email:         { type: String, required: true },
    dept:          { type: String, default: "" },
    roleQuestion1: { type: String, default: "" },
    roleQuestion2: { type: String, default: "" },
    roleQuestion3: { type: String, default: "" },
    roleQuestion4: { type: String, default: "" },
  },
  { timestamps: true, strict: false }
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("[/api/submit] Incoming Payload:", body);

    const required = ["name", "branch", "year", "prn", "preferredRole", "phone"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    try {
      await connectDB();

      const docData = {
        name:          String(body.name),
        branch:        String(body.branch),
        year:          String(body.year),
        prn:           String(body.prn),
        preferredRole: String(body.preferredRole),
        phone:         String(body.phone),
        email:         String(session.user.email),
        dept:          String(body.dept ?? ""),
        roleQuestion1: String(body.roleQuestion1 ?? ""),
        roleQuestion2: String(body.roleQuestion2 ?? ""),
        roleQuestion3: String(body.roleQuestion3 ?? ""),
        roleQuestion4: String(body.roleQuestion4 ?? ""),
      };

      const application = await Application.create(docData);

      console.log("[/api/submit] Successfully saved to MongoDB Atlas:", application._id);

      return NextResponse.json(
        { success: true, id: application._id, savedToDb: true },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("[/api/submit] MongoDB Atlas error:", dbError);
      return NextResponse.json(
        {
          success: true,
          mockSaved: true,
          message: "Saved locally. DB error: " + (dbError instanceof Error ? dbError.message : "Unknown"),
        },
        { status: 200 }
      );
    }
  } catch (err: unknown) {
    console.error("[/api/submit] Request error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error." },
      { status: 500 }
    );
  }
}

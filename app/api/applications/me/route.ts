import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/lib/auth";

const MONGODB_URI = process.env.MONGODB_URI!;

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

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Re-use the model without re-defining it, if it exists, otherwise it will be defined in submit route, but we need it here too.
    const Application =
      mongoose.models.Application ||
      mongoose.model(
        "Application",
        new mongoose.Schema(
          { email: String, preferredRole: String },
          { strict: false }
        )
      );

    const applications = await Application.find(
      { email: session.user.email },
      { preferredRole: 1, _id: 0 }
    );

    const submittedRoles = applications.map((app) => app.preferredRole);

    return NextResponse.json({ submittedRoles }, { status: 200 });
  } catch (err) {
    console.error("[/api/applications/me] Error:", err);
    return NextResponse.json({ submittedRoles: [] }, { status: 200 }); // Graceful fallback
  }
}

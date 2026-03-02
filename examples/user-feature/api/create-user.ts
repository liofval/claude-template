import { NextResponse } from "next/server";
import { z } from "zod";

import { DuplicateEmailError, userService } from "../service/user-service";
import { toUserResponse } from "../types/user";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["admin", "member"]).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const user = await userService.create(parsed.data);
    return NextResponse.json(toUserResponse(user), { status: 201 });
  } catch (e) {
    if (e instanceof DuplicateEmailError) {
      return NextResponse.json({ error: e.message }, { status: 409 });
    }

    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

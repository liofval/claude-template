import { NextResponse } from "next/server";
import { z } from "zod";

import { userService } from "../service/user-service";
import { toUserResponse } from "../types/user";

const querySchema = z.object({
  page: z.coerce.number().int().min(0).default(0),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = querySchema.safeParse({
      page: searchParams.get("page"),
      perPage: searchParams.get("perPage"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const users = await userService.list(parsed.data.page, parsed.data.perPage);
    return NextResponse.json(users.map(toUserResponse));
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

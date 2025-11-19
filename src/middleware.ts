// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Đây là middleware rỗng, không làm gì cả
  return NextResponse.next();
}

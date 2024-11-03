"use server"
import mongoose from "mongoose";
import { model } from "@/models/DataSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    let connection = mongoose.connect("mongodb://localhost:27017");
    let reqJson = await request.json();
    await model.deleteOne({passId:reqJson.passId});
    return NextResponse.json({res:"Delted"})
}
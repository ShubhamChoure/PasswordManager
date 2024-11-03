"use server"
import mongoose from "mongoose";
import { model } from "@/models/DataSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    let connection = mongoose.connect("mongodb://localhost:27017");
    let reqJson = await request.json();
    console.log(reqJson);
    await model.updateOne({passId:reqJson.passId},{website:reqJson.website,username:reqJson.username,password:reqJson.password,passId:reqJson.passId})
    return NextResponse.json({res:"Updated"})
}
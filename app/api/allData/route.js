"use server"
import mongoose from "mongoose";
import { model } from "@/models/DataSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    let connection = mongoose.connect("mongodb://localhost:27017");
    let allData = await model.find({});
    return NextResponse.json(JSON.stringify(allData))
}
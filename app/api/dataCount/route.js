"use server"
import mongoose from "mongoose";
import { model } from "@/models/DataSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    let connection = mongoose.connect("mongodb://localhost:27017");

    let data = model.find({});
    console.log(data);
    let dbCount = await data.countDocuments();
    return NextResponse.json({count:dbCount})
}
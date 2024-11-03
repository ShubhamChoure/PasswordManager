"use server"
import mongoose from "mongoose";
import { model } from "@/models/DataSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    let connection = mongoose.connect("mongodb://localhost:27017");
    
    const jsonReq = await request.json();
    model.create(jsonReq);
    console.log(jsonReq);
    return NextResponse.json({res:"Password Saved"})
}
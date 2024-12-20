import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const students = await prisma.student.findMany();
  console.log("GET students ======== ", students);
  return NextResponse.json(students);
}

export async function POST(request) {
  console.log(1);
  const data = await request.json();
  const updatedData = {
    name: data.name,
    age: parseInt(data.age, 10),
  };
  const student = await prisma.student.create({ data: updatedData });
  console.log("POST students ======== ", student);
  return NextResponse.json(student);
}

export async function PUT(request) {
  const data = await request.json();
  let { id, ...updateData } = data;
  updateData = {
    name: data.name,
    age: parseInt(updateData.age, 10),
  };
  const student = await prisma.student.update({
    where: { id },
    data: updateData,
  });
  console.log("PUT students ======== ", student);
  return NextResponse.json(student);
}

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.student.delete({ where: { id } });
  console.log("DELETE students ======== ");
  return NextResponse.json({ message: "Student deleted" });
}



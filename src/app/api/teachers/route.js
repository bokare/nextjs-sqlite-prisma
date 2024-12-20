import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const teachers = await prisma.teacher.findMany();
  console.log("GET teachers ======== ", teachers);
  return NextResponse.json(teachers);
}

export async function POST(request) {
  const icomindata = await request.json();
  const teacher = await prisma.teacher.create({ data: icomindata });
  console.log("POST teachers ======== ", teacher);
  return NextResponse.json(teacher);
}

export async function PUT(request) {
  const data = await request.json();
  const { id, ...updateData } = data;
  const teacher = await prisma.teacher.update({
    where: { id },
    data: updateData,
  });
  console.log("PUT teachers ======== ", teacher);
  return NextResponse.json(teacher);
}

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.teacher.delete({ where: { id } });
  console.log("DELETE teachers ======== ");
  return NextResponse.json({ message: "Teacher deleted" });
}


// to find records with condition
const teachers = await prisma.teacher.findMany({
  where: {
    id: {
      in: [1, 5, 10], // List of IDs you want to match
    },
  },
});


// find unique
const uniqueTeacher = await prisma.teacher.findUnique({
  where: {
    id: 1, // unique value you want to match
  },
});

// find only one record 
const teacher = await prisma.teacher.findFirst({
  where: {
    subject: "Math", // Non-unique condition
  },
});

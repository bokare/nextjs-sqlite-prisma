This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.





## Note : 


// 1. Initialize a Next.js project
// Run these commands in your terminal
// ```bash
// npx create-next-app@15 my-next-app --ts
// cd my-next-app
// npm install prisma @prisma/client sqlite3
// npx prisma init
// ```

// 2. Configure Prisma for SQLite
// Open the generated `prisma/schema.prisma` file and define your data models:

```
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Teacher {
  id        Int      @id @default(autoincrement())
  name      String
  subject   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Student {
  id        Int      @id @default(autoincrement())
  name      String
  age       Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

// Then run:
// ```bash
// npx prisma migrate dev --name init
// ```
//This command applies migrations to the database in your development environment. It’s specifically designed for development and automatically //generates or updates database schema based on your schema.prisma file.
//
//--name init: The --name flag gives the migration a descriptive name. In this case, init indicates that this is the initial setup of your database //schema.


// 3. Create API routes for teachers and students in Next.js using the App Router

// app/api/teachers/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const teachers = await prisma.teacher.findMany();
  return NextResponse.json(teachers);
}

export async function POST(request: Request) {
  const data = await request.json();
  const teacher = await prisma.teacher.create({ data });
  return NextResponse.json(teacher);
}

export async function PUT(request: Request) {
  const data = await request.json();
  const { id, ...updateData } = data;
  const teacher = await prisma.teacher.update({ where: { id }, data: updateData });
  return NextResponse.json(teacher);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.teacher.delete({ where: { id } });
  return NextResponse.json({ message: "Teacher deleted" });
}

// Repeat the same for `students`:

// app/api/students/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const students = await prisma.student.findMany();
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  const data = await request.json();
  const student = await prisma.student.create({ data });
  return NextResponse.json(student);
}

export async function PUT(request: Request) {
  const data = await request.json();
  const { id, ...updateData } = data;
  const student = await prisma.student.update({ where: { id }, data: updateData });
  return NextResponse.json(student);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.student.delete({ where: { id } });
  return NextResponse.json({ message: "Student deleted" });
}

// 4. Create the Frontend UI in Next.js
// app/page.tsx

"use client";
import { useState, useEffect } from "react";

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  // Fetch data from APIs
  const fetchData = async () => {
    const [teachersRes, studentsRes] = await Promise.all([
      fetch("/api/teachers").then((res) => res.json()),
      fetch("/api/students").then((res) => res.json()),
    ]);
    setTeachers(teachersRes);
    setStudents(studentsRes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete handlers
  const deleteTeacher = async (id) => {
    await fetch(`/api/teachers`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const deleteStudent = async (id) => {
    await fetch(`/api/students`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  return (
    <div>
      <h1>Teachers</h1>
      {teachers.map((teacher) => (
        <div key={teacher.id}>
          <p>{teacher.name} - {teacher.subject}</p>
          <button onClick={() => deleteTeacher(teacher.id)}>Delete</button>
        </div>
      ))}

      <h1>Students</h1>
      {students.map((student) => (
        <div key={student.id}>
          <p>{student.name} - {student.age}</p>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Home;

// 5. Start the application
// Run your Next.js app
// ```bash
// npm run dev
// 


===================================================== 


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



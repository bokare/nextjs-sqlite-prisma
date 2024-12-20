"use client";
import { useEffect, useState } from "react";
const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "" });
  const [newStudent, setNewStudent] = useState({ name: "", age: "" });

  console.log("newStudent", newStudent);
  console.log("teachers ========= ", teachers);
  console.log("students ========= ", students);

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

  // Add handlers
  const addTeacher = async () => {
    await fetch(`/api/teachers`, {
      method: "POST",
      body: JSON.stringify(newTeacher),
      headers: { "Content-Type": "application/json" },
    });
    fetchData();
    setNewTeacher({ name: "", subject: "" });
  };

  const addStudent = async () => {
    await fetch(`/api/students`, {
      method: "POST",
      body: JSON.stringify(newStudent),
      headers: { "Content-Type": "application/json" },
    });
    fetchData();
    setNewStudent({ name: "", age: "" });
  };

  // Update handlers
  const updateTeacher = async (id, updatedData) => {
    await fetch(`/api/teachers`, {
      method: "PUT",
      body: JSON.stringify({ id, ...updatedData }),
      headers: { "Content-Type": "application/json" },
    });
    fetchData();
    setNewTeacher({ name: "", subject: "" });
  };

  const updateStudent = async (id, updatedData) => {
    await fetch(`/api/students`, {
      method: "PUT",
      body: JSON.stringify({ id, ...updatedData }),
      headers: { "Content-Type": "application/json" },
    });
    fetchData();
    setNewStudent({ name: "", age: "" });
  };

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
    <div className="p-8 bg-slate-900 to-r from-blue-100 to-purple-200 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Teachers
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 max-w-4xl mx-auto">
        <div className="flex gap-4 mb-6">
          <input
            className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Name"
            value={newTeacher.name}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, name: e.target.value })
            }
          />
          <input
            className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Subject"
            value={newTeacher.subject}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, subject: e.target.value })
            }
          />
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
            onClick={addTeacher}
          >
            Add Teacher
          </button>
        </div>
        <ul>
          {teachers.map((teacher) => (
            <li
              key={teacher.id}
              className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <p className="text-lg text-gray-800 font-semibold">
                {teacher.name} - {teacher.subject}
              </p>
              <div className="flex gap-3">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                  onClick={() => deleteTeacher(teacher.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                  onClick={() =>
                    updateTeacher(teacher.id, {
                      name: newTeacher.name,
                      subject: newTeacher.subject,
                    })
                  }
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Students
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
        <div className="flex gap-4 mb-6">
          <input
            className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
          />
          <input
            className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Age"
            value={newStudent.age}
            onChange={(e) =>
              setNewStudent({ ...newStudent, age: e.target.value })
            }
          />
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
            onClick={addStudent}
          >
            Add Student
          </button>
        </div>
        <ul>
          {students.map((student) => (
            <li
              key={student.id}
              className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <p className="text-lg text-gray-800 font-semibold">
                {student.name} - {student.age}
              </p>
              <div className="flex gap-3">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                  onClick={() =>
                    updateStudent(student.id, {
                      name: newStudent.name,
                      age: newStudent.age,
                    })
                  }
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
"use client"
import { useEffect, useState } from "react";

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "" });
  const [newStudent, setNewStudent] = useState({ name: "", age: "" });

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
  };

  const updateStudent = async (id, updatedData) => {
    await fetch(`/api/students`, {
      method: "PUT",
      body: JSON.stringify({ id, ...updatedData }),
      headers: { "Content-Type": "application/json" },
    });
    fetchData();
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
    <div>
      <h1>Teachers</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newTeacher.name}
          onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
        />
        <button onClick={addTeacher}>Add Teacher</button>
      </div>
      {teachers.map((teacher) => (
        <div key={teacher.id}>
          <p>{teacher.name} - {teacher.subject}</p>
          <button onClick={() => deleteTeacher(teacher.id)}>Delete</button>
          <button onClick={() => updateTeacher(teacher.id, { name: newTeacher.name, subject: newTeacher.subject })}>Update</button>
        </div>
      ))}

      <h1>Students</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newStudent.age}
          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>
      {students.map((student) => (
        <div key={student.id}>
          <p>{student.name} - {student.age}</p>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
          <button onClick={() => updateStudent(student.id, { name: "Updated Name", age: 20 })}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default Home;

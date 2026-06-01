import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  useEffect(() => {

  const savedStudents =
    JSON.parse(localStorage.getItem("students")) || [];

  if (savedStudents.length > 0) {

    setStudents(savedStudents);

  } else {

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {

        const apiStudents = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }));

        setStudents(apiStudents);

      })
      .catch((error) => {
        console.log(error);
      });

  }

}, []);
useEffect(() => {
  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );
}, [students]);
  const [search, setSearch] = useState("");
  const addStudent = (student) => {

  if (editingStudent) {

    setStudents(
      students.map((s) =>
        s.id === editingStudent.id
          ? { ...student, id: editingStudent.id }
          : s
      )
    );

    setEditingStudent(null);

  } else {

    setStudents([
      ...students,
      {
        ...student,
        id: Date.now()
      }
    ]);

  }
};

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };
  const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(search.toLowerCase())
);
const editStudent = (student) => {
  setEditingStudent(student);
};
console.log(editingStudent);
  return (
    <div>
      <Navbar />
      <StudentForm
  addStudent={addStudent}
  editingStudent={editingStudent}
/>
     <>
  <input
    type="text"
    placeholder="Search Student"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

 <StudentList
  students={filteredStudents}
  deleteStudent={deleteStudent}
  editStudent={editStudent}
/>
</>
    </div>
  );
}

export default App;
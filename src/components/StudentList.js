function StudentList({
  students,
  deleteStudent,
  editStudent
}){
  return (
    <div>
      {students.map((student) => (
        <div key={student.id} className="card">
          <h3>{student.name}</h3>
          <p>{student.email}</p>

          <button onClick={() => editStudent(student)}>
  Edit
</button>

<button onClick={() => deleteStudent(student.id)}>
  Delete
</button>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
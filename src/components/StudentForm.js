import { useState, useEffect } from "react";

function StudentForm({
  addStudent,
  editingStudent
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
   useEffect(() => {
  if (editingStudent) {
    setName(editingStudent.name);
    setEmail(editingStudent.email);
  }
}, [editingStudent]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

   addStudent({
  name,
  email,
});

    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Student Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">
  {editingStudent ? "Update Student" : "Add Student"}
</button>
    </form>
  );
}

export default StudentForm;
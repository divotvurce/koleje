import React, { useEffect, useState } from 'react';
import StudentCard from './StudentCard';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(data);
    }
    fetchStudents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-2">Students</h2>
      {students.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

export default StudentList;

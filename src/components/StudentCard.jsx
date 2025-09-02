import React from 'react';

function StudentCard({ student }) {
  return (
<div className="p-4 bg-gray-50 border rounded-xl shadow-sm mb-2 flex justify-between">
  <div>
    <h3 className="font-semibold text-lg">{student.name}</h3>
    <p className="text-sm text-gray-500">Kolej: {student.house}</p>
  </div>
  <p className="text-xl font-bold text-green-600">{student.points} pts</p>
</div>
  );
}

export default StudentCard;

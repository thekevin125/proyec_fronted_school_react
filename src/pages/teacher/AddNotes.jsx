// src/pages/teacher/AddNotes.jsx
import React, { useState } from 'react';

function AddNotes() {
  const [note, setNote] = useState('');
  const [subject, setSubject] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSaveNotes = async () => {
    const notesData = {
      note,
      subject,
    };

    try {
      const response = await fetch(`https://backend-school-9ipd.onrender.com/students/${studentId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notesData),
      });

      if (!response.ok) {
        throw new Error('Error saving notes');
      }
      const result = await response.json();
      console.log('Notes saved successfully:', result);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  return (
    <div>
      <h1>Add Notes</h1>
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Student ID"
      />
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <button onClick={handleSaveNotes}>Save Notes</button>
    </div>
  );
}

export default AddNotes;

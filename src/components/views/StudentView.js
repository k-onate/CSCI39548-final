/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import React from 'react';
import {Link, useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';

const StudentView = (props) => {
  const { student, deleteStudent } = props;
  const history = useHistory();

  const handleDelete = () => {
    deleteStudent(student.id);
    history.push('/students');
  }

  // Render a single Student view 
  return (
    <div className = "single-students-container">
      <h1 style={{margin: '0px', padding: '0px'}}>{student.firstname + " " + student.lastname}</h1>
      <Link to={`/campus/${student.campus.id}`}>
      <h3 className = "custom-uni-title">{student.campus.name}</h3>
      </Link>

      <div className = 'student-info'>        
        <img src={student.profilePhoto}
        alt={`${student.firstname} ${student.lastname}`}
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        className = 'student-photo'
        />
        <div className = 'student-details'>
          <p><strong>GPA:</strong> {student.gpa}</p>
          <p><strong>Email:</strong> {student.email}</p>
          
        </div>
      </div>
      <br/>
      <div className = 'student-view-buttons'>
        <Link to={`/editstudent/${student.id}`} style={{ marginRight: '10px' }}>
          <button>Edit Student</button>
        </Link>

        <button onClick={handleDelete}>Delete Student</button>
      </div>
      <br/>
      <br/>

      <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
        Go Back
      </Button>      
    </div>
  );

};

StudentView.propTypes = {
  deleteStudent: PropTypes.func.isRequired,
};
export default StudentView;
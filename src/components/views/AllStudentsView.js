/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
//import '../../styles/globalStyles.css';

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  // If there is at least one student, show all the students + profile picture
  return (
    <div className = "all-students-container">
      <h1>All Students</h1>

      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2 className = "name-link">{name}</h2>
              </Link>
              <img src={student.profilePhoto}
              alt={`${student.firstname} ${student.lastname}`}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <br/>
              <button onClick={() => deleteStudent(student.id)}>Delete Student</button>
              <hr/>
            </div>
          );
        }
      )}
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      <br/><br/>
    </div>
  );
};


export default AllStudentsView;
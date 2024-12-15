/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useState } from "react"; 


// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteStudent} = props;
  const history = useHistory();
  const [students, setStudents] = useState(campus.students || []);

  const handleDeleteStudent = async (studentId) => {
    await deleteStudent(studentId, campus.id);
    setStudents(students.filter((student) => student.id !== studentId));
  };

  // Render a single Campus view with list of its students
  return (
    <div className = "single-campus-container" >
      <h1 className = "campus-header">{campus.name}</h1>
      <h4 className = 'campus-code'>Campus Code: {campus.id}</h4>
      <p className = "campus-address">{campus.address}</p>
      <p className = "campus-description">{campus.description}</p>
      <img src={campus.campusPhoto}
      alt={`${campus.name}`}
      style={{ width: '400px', height: '250px', objectFit: 'cover' }}
      />
      <br/>
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
      <hr className = 'custom-hr'/>

      <h2 style={{ textDecoration: "underline", color: 'Black', margin: '0px' }}>{campus.name} Enrollers</h2>
      {campus.students && campus.students.length > 0 ? (
      campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id} className = "custom-alignment">
            <Link to={`/student/${student.id}`}>
              <h2 className = 'custom-enrollee'>{name}</h2>
            </Link>    
            <button 
            style={{ marginLeft: "10px", fontSize: '12px', padding: "4px 8px"}} 
            onClick={() => handleDeleteStudent(student.id)}
            > Delete </button>        
          </div>
        );
      })
      ) : (<p>No students currently enrolled here.</p>)}
  <Link to={{ pathname: "/newstudent", state: { campusId: campus.id, campusName: campus.name }}}>
    <button>Add Student to {campus.name}</button>
  </Link>

  <br/>
  <br/>
  <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
    Go Back
  </Button>  
  
    </div>
  );
};

export default CampusView;
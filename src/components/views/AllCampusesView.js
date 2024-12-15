/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllCampusesView = (props) => {

  const [errorMessages, setErrorMessages] = useState({});

  //catches weird case of deleting a campus while there is a student
  const handleDelete = (campus) => {
    if (campus.students.length > 0) {
      setErrorMessages((prev) => ({
        ...prev,
        [campus.id]: `${campus.name} still has students!`,
      }));
    } 
    else {
      setErrorMessages((prev) => ({
        ...prev,
        [campus.id]: "",
      }));
      props.deleteCampus(campus.id);
    }
  };

  //no campus
  if (!props.allCampuses.length) {
    return (
    <div>
    <div>There are no campuses currently. Click the button below to add a campus.</div>
    <br/>
      <Link to = {'/newcampus'}>
        <button>Add campus</button>
      </Link>
    </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div className = 'all-campuses-container'>
      <h1>All Campuses</h1>
      
      {props.allCampuses.map((campus) => (     
          <div key={campus.id} className = 'campus-card'>
            <Link to={`/campus/${campus.id}`}>
              <h2 className = "name-link">{campus.name}</h2>
            </Link>
            <p className = 'campus-address'>{campus.address}</p>
            <p className = 'campus-description'>{campus.description}</p>
            <img src={campus.campusPhoto}
            alt={`${campus.name}`}
            style={{ width: '400px', height: '250px', objectFit: 'cover' }}
            />
            <br/>
            <button onClick={() => handleDelete(campus)}>Delete Campus</button>
            {errorMessages[campus.id] && (<p style={{ color: "red" }}>{errorMessages[campus.id]}</p>)} 
          </div>
      ))}
      <br/>
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

export default AllCampusesView;
 
/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk, checkEmailExistsThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  //initialization
  constructor(props){
    super(props);
    const { state } = this.props.location || {};
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      gpa: "",
      campusId: state ? state.campusId : "",
      profilePhoto: "",
      redirect: false, 
      redirectId: null,
      errors: {}
    };
  }

    //retrives data from back end
    componentDidMount() {
      console.log(this.props);
      this.props.fetchAllCampuses();
    }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

    //is email taken
    checkEmailExists = async (email) => {
      const emailExists = await this.props.checkEmailExists(email);
      return emailExists;
    }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    const { 
      firstname, 
      lastname, 
      email, 
      gpa, 
      campusId, 
      profilePhoto 
    } = this.state;

    let errors = {};

    if (!firstname) errors.firstname = "First name is required.";
    if (!lastname) errors.lastname = "Last name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email address.";
    if (!campusId) errors.campusId = "Please select a campus.";
    if (!gpa || isNaN(gpa) || gpa < 0 || gpa > 4) errors.gpa = "Please enter a valid GPA between 0 and 4.";

     const emailExists = await this.checkEmailExists(email);
     if (emailExists) {
       errors.email = "Email already exists.";
     }

     //checks if URL is valid
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i;
    if (profilePhoto.trim() && !urlPattern.test(profilePhoto.trim()) && profilePhoto.trim() !== "/blankprofile.jpg" && profilePhoto.trim() !== "") {
      errors.profilePhoto = "The provided student photo URL is invalid.";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    const photoToSave = profilePhoto || "/blankprofile.jpg";

    let student = {
      firstname,
      lastname,
      email,
      gpa,
      campusId,
      profilePhoto: photoToSave,
    };
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    console.log("right after error occurs");
    console.log(newStudent)

    //update state
    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      gpa: "",
      campusId: "", 
      profilePhoto: "",
      redirect: true, 
      redirectId: newStudent.id,
      errors: {}
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}   
          errors={this.state.errors} 
          allCampuses={this.props.allCampuses} 
          selectedCampusId={this.state.campusId} 
        />
      </div>   
             
    );
    
  }
}

const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,  //dropdown menu - copied over from allcampusescontainer
  };
};  

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
        checkEmailExists: (email) => dispatch(checkEmailExistsThunk(email))
    })
}

NewStudentContainer.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
};

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(NewStudentContainer);
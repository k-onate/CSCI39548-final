/*=========================================================================
EditStudentContainer.js
==========================================================================*/
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk, checkEmailExistsThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      gpa: "",
      campusId: "",
      profilePhoto: "",
      errors: {},
      isLoading: true,
    };
  }

  // Fetch student data on mount
  async componentDidMount() {
    const studentId = this.props.match.params.id;
    await this.props.fetchStudent(studentId);
    
    const { firstname, lastname, 
      email, 
      gpa, campusId, profilePhoto } = this.props.student;

    console.log(this.props.student);
    this.setState({
      firstname,
      lastname,
      email,
      gpa,
      campusId,
      profilePhoto,
      isLoading: false,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //does email exist already
  checkEmailExists = async (email) => {
    const emailExists = await this.props.checkEmailExists(email);
    return emailExists;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const { firstname, lastname, 
      email, 
      gpa, 
      campusId, 
      profilePhoto } = this.state;

    let errors = {};

    if (!firstname) errors.firstname = "First name is required.";
    if (!lastname) errors.lastname = "Last name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Enter a valid email address.";
    if (!campusId) errors.campusId = "Please select a campus.";
    if (!gpa || isNaN(gpa) || gpa < 0 || gpa > 4) errors.gpa = "Enter a valid GPA between 0 and 4.";

    const emailExists = this.state.email !== this.props.student.email && await this.checkEmailExists(this.state.email);

    if (emailExists) {
      errors.email = `The email '${this.state.email}' is already registered.`;
    }

    const updatedProfilePhoto = this.state.profilePhoto.trim() === "" ? "/blankprofile.jpg" : this.state.profilePhoto;

    //is URL valid
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i;
    if (profilePhoto.trim() && !urlPattern.test(profilePhoto.trim()) && profilePhoto.trim() !== "/blankprofile.jpg" && profilePhoto.trim() !== "") {
      errors.profilePhoto = "The provided student photo URL is invalid.";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const studentId = this.props.match.params.id;
    const student = { 
      firstname, 
      lastname, 
      email, 
      gpa, 
      campusId, 
      profilePhoto: updatedProfilePhoto };

      const studentInfo = {...student, id: studentId};

      await this.props.editStudent(studentInfo);
      this.setState({ redirect: true });
  };

  render() {
    if (this.state.isLoading) {
        return <div>Just a moment...</div>;
      }
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.props.match.params.id}`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          initialData={this.state}
          allCampuses={this.props.allCampuses}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  allCampuses: state.allCampuses,
  student: state.student,
});

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  editStudent: (student) => dispatch(editStudentThunk(student)),
  checkEmailExists: (email) => dispatch(checkEmailExistsThunk(email)),
});

EditStudentContainer.propTypes = {
  fetchStudent: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
  allCampuses: PropTypes.array.isRequired,
  student: PropTypes.object.isRequired,
};

export default connect(mapState, mapDispatch)(EditStudentContainer);
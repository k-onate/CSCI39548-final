/*=========================================================================
EditCampusContainer.js

Custom container for EditCampustView. Mostly copied from the editstudent
files i wrote. Called from CampusView.
==========================================================================*/
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
 
import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk, checkCampusNameExistsThunk } from '../../store/thunks';

class EditCampusContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        name: "",
        address: "",
        description: "",
        campusPhoto: "",
        redirect: false, 
        redirectId: null,
        errors: {},
        };
    }

    async componentDidMount() {
        const campusId = this.props.match.params.id; 
        await this.props.fetchCampus(campusId);
        const campus = this.props.campus; 
        if (campus) {
            this.setState({
                name: campus.name || "",
                address: campus.address || "",
                description: campus.description || "",
                campusPhoto: campus.campusPhoto || "",
            });
        }
    }

    //stores input
    handleChange = event => {
        this.setState({
        [event.target.name]: event.target.value,
        errors: { ...this.state.errors, [event.target.name]: "" },
        });
    };

    checkCampusNameExists = async (name) => {
        const campusExists = await this.props.checkCampusNameExists(name);
        return campusExists;
    };

    handleSubmit = async event => {
    event.preventDefault();
     
    const errors = {};
     if (!this.state.name.trim()) errors.name = "Campus name is required.";
     if (!this.state.address.trim()) errors.address = "Address is required.";
     if (!this.state.description.trim()) errors.description = "Description is required.";

    const campusExists = this.state.name !== this.props.campus.name && await this.checkCampusNameExists(this.state.name);
    if (campusExists) {
      errors.name = `${this.state.name} is registered to another campus.`;
    }

    const updateCampusPhoto = this.state.campusPhoto.trim() === "" ? "/blankcampus.jpg" : this.state.campusPhoto;
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i;
    if (this.state.campusPhoto.trim() && !urlPattern.test(this.state.campusPhoto.trim()) && this.state.campusPhoto.trim() !== "/blankcampus.jpg" && this.state.campusPhoto.trim() !== "") {
      errors.campusPhoto = "The provided campus photo URL is invalid.";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const updatedCampus = {
        id: this.props.match.params.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        campusPhoto: updateCampusPhoto,
        };
        
        await this.props.editCampus(updatedCampus);
        
        this.setState({
        redirect: true,
        redirectId: updatedCampus.id,
        });
    };
    
    render() {

        if (this.state.redirect) {
        return <Redirect to={`/campus/${this.state.redirectId}`} />;
        }
        return (
        <div>
            <Header />
            <EditCampusView
            campus={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
            />
        </div>
        );
    }
    }

    const mapStateToProps = (state) => ({
        campus: state.campus,  // Ensure the campus data is in the state
    });

    // Map dispatch functions to props
    const mapDispatch = (dispatch) => {
        return {
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        checkCampusNameExists: (name) => dispatch(checkCampusNameExistsThunk(name)),
        };
    };

export default connect(mapStateToProps, mapDispatch)(EditCampusContainer);
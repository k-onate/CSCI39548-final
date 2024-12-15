/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk, checkCampusNameExistsThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  // initialization
  constructor(props){
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

  checkCampusNameExists = async (name) => {
    const campusExists = await this.props.checkCampusNameExists(name);
    return campusExists;
  };

  //captures new data input
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: { ...this.state.errors, [event.target.name]: "" },
    });
  }
  //when users press submit button
  handleSubmit = async event => {
    event.preventDefault();

     const errors = {};
     if (!this.state.name.trim()) errors.name = "Campus name is required.";
     if (!this.state.address.trim()) errors.address = "Address is required.";
     if (!this.state.description.trim()) errors.description = "Description is required.";
     
    //checks if theres a campus with same name
    const campusExists = await this.checkCampusNameExists(this.state.name);
    if (campusExists) {
      errors.name = `${this.state.name} already exists.`;
    }

    //checks if url is valid
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i;
    if (this.state.campusPhoto.trim() && !urlPattern.test(this.state.campusPhoto.trim()) && this.state.campusPhoto.trim() !== "/blankcampus.jpg" && this.state.campusPhoto.trim() !== "") {
      errors.campusPhoto = "Invalid URL.";
    }

    //tries to catch illegal inputs
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    //defaults to blank user profile if none are provided
    const campusToSave = this.state.campusPhoto.trim() || "/blankcampus.jpg";
    
    let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        campusPhoto: campusToSave,
    };

    
    //adds to back end
    let newCampus = await this.props.addCampus(campus);

    this.setState({
      name: "", 
      address: "", 
      description: "", 
      campusPhoto: "",
      redirect: true, 
      redirectId: newCampus.id
    });
  }

  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  //render new campus input form
  render() {
    //redirects to new campus page on submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    return (
      <div>
        <Header />
        <NewCampusView
          handleChange = {this.handleChange}    
          handleSubmit={this.handleSubmit}      
          errors={this.state.errors}
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
        checkCampusNameExists: (name) => dispatch(checkCampusNameExistsThunk(name)),
    })
}

// Export store-connected container by default
// NewCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewCampusContainer);
 
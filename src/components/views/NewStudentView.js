/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'; 

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#beige',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: 'black',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },

}));

const NewStudentView = (props) => {
  const {handleChange, handleSubmit, errors } = props;
  const classes = useStyles();
  const history = useHistory(); 

  return (
    <div className = "add-student-form ">
      
      <h1>-New Student-</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: 'black'}}>
              Add a Student
              <br></br>
              *All Fields Are Required*
            </Typography>
          </div>
          <form style={{textAlign: 'left', width: "80%", margin: 'auto'}} onSubmit={(e) => handleSubmit(e)}>
          
          <div className="form-field">
            <label style= {{color:'black', fontWeight: 'bold'}}>First Name: </label>
            <div className="input-container">
              <input type="text" name="firstname" onChange ={(e) => handleChange(e)} />
              {errors.firstname && <p className="error-message" style={{color: 'red'}}>{errors.firstname}</p>}
            </div>
          </div>

          <div className="form-field">
            <label style={{color:'black', fontWeight: 'bold'}}>Last Name: </label>
            <div className="input-container">
              <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
              {errors.lastname && <p className="error-message" style={{color: 'red'}}>{errors.lastname}</p>}
            </div>
          </div>

          <div className="form-field">
            <label style={{ color: 'black', fontWeight: 'bold' }}>Email: </label>
            <div className="input-container">
              <input type="email" name="email" onChange={(e) => handleChange(e)} />
              {errors.email && <p className="error-message" style={{color: 'red'}}>{errors.email}</p>}
            </div>
          </div>

          <div className="form-field">
            <label style={{ color: 'black', fontWeight: 'bold' }}>GPA: </label>
            <div className="input-container">
              <input type="number" step="0.01" min="0" max="4" name="gpa" onChange={(e) => handleChange(e)} style={{ maxWidth: '50px', width: '100%' }}/>
              {errors.gpa && <p className="error-message" style={{ color: 'red' }}>{errors.gpa}</p>}
            </div>
          </div>
            
          <div className="form-field">
            <label style={{ color: 'black', fontWeight: 'bold' }}>Campus: </label>
            <div className="input-container">
                <select name="campusId" value={props.selectedCampusId || ""} onChange={(e) => handleChange(e)} style={{ maxWidth: '150px', width: '100%' }}>
                  <option value="">Select a Campus</option>
                  {props.allCampuses.map((campuses) => (
                  <option key={campuses.id} value={campuses.id}>
                    {campuses.name}
                  </option>
                  ))}

                </select>
                {errors.campusId && <p className="error-message" style={{color: 'red'}}>{errors.campusId}</p>}
              </div>
            </div> 

            <div className="form-field">
              <label style={{ color: 'black', fontWeight: 'bold' }}>Profile Photo URL: </label>
              <div className="input-container">
                <input
                  type="text"
                  name="profilePhoto"
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter the URL of the profile photo"
                />
                {errors.profilePhoto && <p className="error-message" style={{ color: 'red' }}>{errors.profilePhoto}</p>}
              </div>
            </div> 
            <div style={{ textAlign: 'center', marginTop: '20px'}}>
              <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
                Submit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </div>
            <br/>
            <br/>
          </form>
          </div>
      </div>
    </div>    
  )
}

export default NewStudentView;
 
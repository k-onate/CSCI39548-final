/*=========================================================================
EditStudentView.js
==========================================================================*/
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

//form style
const useStyles = makeStyles(() => ({
  formContainer: {
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
  formTitle: {
    backgroundColor: 'silver',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const EditStudentView = (props) => {
  const { handleChange, handleSubmit, errors } = props;
  const classes = useStyles();
  const history = useHistory();
  const { 
    firstname, 
    lastname, 
    email, 
    gpa, 
    campusId, 
    profilePhoto } = props.initialData;

  return (
    <div className = "edit-student-form">
      <h1>-Edit Student-</h1>
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif', fontSize: '20px', color: 'black' }}>
              Edit Student Information
              <br />
              *All Fields Are Required*
            </Typography>
          </div>
          
          <form style={{ textAlign: 'left', width: "80%", margin: 'auto'}} onSubmit={(e) => handleSubmit(e)}>
          
          <div className="form-field">
            <label style={{ color: 'black', fontWeight: 'bold' }}>First Name: </label>
            <div className="input-container">
              <input type="text" name="firstname" value={firstname} onChange={(e) => handleChange(e)} />
              {errors.firstname && <p className="error-message" style={{ color: 'red' }}>{errors.firstname}</p>}
            </div>
          </div>

          <div className="form-field">
            <label style={{ color: 'black', fontWeight: 'bold' }}>Last Name: </label>
            <div className="input-container">
              <input type="text" name="lastname" value={lastname} onChange={(e) => handleChange(e)} />
              {errors.lastname && <p className="error-message" style={{ color: 'red' }}>{errors.lastname}</p>}
            </div>
          </div>
          
          <div className="form-field">
            <label style={{ color: 'black', fontWeight: 'bold' }}>Email: </label>
            <div className="input-container">
              <input type="email" name="email" value={email} onChange={(e) => handleChange(e)} />
              {errors.email && <p className="error-message" style={{ color: 'red' }}>{errors.email}</p>}
            </div>
          </div>

          <div className="form-field">
            <label style={{ color: 'black', fontWeight: 'bold' }}>GPA: </label>
            <div className="input-container">
              <input type="number" step="0.01" name="gpa" value={gpa} onChange={(e) => handleChange(e)} style={{ maxWidth: '50px', width: '100%' }}/>
              {errors.address && <p className="error-message" style={{ color: 'red' }}>{errors.address}</p>}
            </div>
          </div>

          <div className="form-field">
            <label style={{ color: 'black', fontWeight: 'bold' }}>Campus: </label>
            <div className="input-container">
              <select name="campusId" value={campusId} onChange={(e) => handleChange(e)} style={{ maxWidth: '150px', width: '100%' }}>
                <option value="">Select a Campus</option>
                {props.allCampuses.map((campus) => (
                  <option key={campus.id} value={campus.id}>
                    {campus.name}
                  </option>
                ))}
              </select>
              {errors.campusId && <p className="error-message" style={{ color: 'red' }}>{errors.campusId}</p>}
            </div>
          </div>

          <div className="form-field">
            <label style={{ color: 'black', fontWeight: 'bold' }}>Photo URL: </label>
            <div className="input-container">
              <input
                type="text"
                name="profilePhoto"
                value= {profilePhoto}
                onChange={(e) => handleChange(e)}
                placeholder="Enter the URL of the profile photo"
              />
              <br/>
              <img src={profilePhoto.trim() === '' ? '/blankprofile.jpg' : profilePhoto} alt="Profile Preview" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              {errors.profilePhoto && <p style={{ color: 'red' }}>{errors.profilePhoto}</p>}
            </div>
          </div>

            <div style={{ textAlign: 'center', marginTop: '20px'}}>
              <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
                Update
              </Button>
              <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
                  Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudentView;
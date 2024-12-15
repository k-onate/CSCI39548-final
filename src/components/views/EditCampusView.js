/*=========================================================================
EditCampusView.js
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
  
  const EditCampusView = (props) => {
    const { handleChange, handleSubmit, errors, campus } = props;
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className = "edit-campus-container">
            <h1>-Edit Campus-</h1>
            <div className={classes.root}>
                <div className={classes.formContainer}>
                    <div className={classes.formTitle}>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                fontFamily: "Arial, sans-serif",
                                fontSize: "20px",
                                color: "black",
                            }}
                        >
                            Edit Campus Information
                        </Typography>
                    </div>
                    <form style={{ textAlign: "left", width: "80%", margin: 'auto'}} onSubmit={handleSubmit}>

                    <div className="form-field">
                        <label style={{ color: "black", fontWeight: "bold" }}>
                            Name:
                        </label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="name"
                                value={campus.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="error-message" style={{ color: "red" }}>{errors.name}</p>}
                        </div>
                    </div>
                    
                    <div className="form-field">
                        <label style={{ color: "black", fontWeight: "bold" }}>
                            Address:
                        </label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="address"
                                value={campus.address}
                                onChange={handleChange}
                            />
                            {errors.address && (
                                <p className="error-message" style={{ color: "red" }}>{errors.address}</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="form-field">
                        <label style={{ color: "black", fontWeight: "bold" }}>
                            Description:
                        </label>
                        <div className="input-container">
                            <textarea
                                type="text"
                                name="description"
                                rows = "4"
                                value={campus.description}
                                onChange={handleChange}
                            />
                            {errors.description && (
                                <p className="error-message" style={{ color: "red" }}>{errors.description}</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="form-field">
                        <label style={{ color: '#black', fontWeight: 'bold'}}>Photo URL: </label>
                        <div className="input-container">
                            <input
                            type="text"
                            name="campusPhoto"
                            value= {campus.campusPhoto}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter URL of the profile photo"      
                            src={campus.campusPhoto.trim() === '' ? '/blankcampus.jpg' : campus.campusPhoto} 
                            alt="Profile Preview" 
                            style={{ width: '150px' }} 
                            />
                            {errors.campusPhoto && <p className="error-message" style={{ color: 'red' }}>{errors.campusPhoto}</p>}
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

export default EditCampusView;
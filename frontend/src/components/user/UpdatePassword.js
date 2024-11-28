import React,{useState,useEffect,Fragment} from 'react';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { updatePassword } from '../../actions/userActions';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { clearErrors } from '../../actions/userActions';

import MetaData from '../layout/MetaData';

const UpdatePassword = () => {

    const [ oldPassword,setOldPassword] = useState("");
    const [ password,setPassword]=useState("");

    const { error,isUpdated,loading } = useSelector(state =>state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            toast.success("Password updated successfully");

            navigate("/profile");

            dispatch({
                type:UPDATE_PASSWORD_RESET
            });
        }
    },[error,dispatch,isUpdated,navigate]);

    const handleUpdatePassword=(e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.set("oldPassword",oldPassword);
        formData.set("password",password);

        dispatch(updatePassword(formData));
    }

  return (
    <Fragment>
        <MetaData title="Change Password" />
        <div className="row wrapper mt-5">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleUpdatePassword}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true:false}
                            >
                            {loading ? "Loading...":"Update password"}
                        </button>
                    </form>
                </div>
            </div>
    </Fragment>
  )
}

export default UpdatePassword

import  secureLocalStorage  from  "react-secure-storage";
import api from '../../utils/api';



export const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


export const validateLogin = async (username, password, setLoginStatus, setWaiting, navigate) => {

   
   api.post(`/api/v1/auth/authenticate`,{
        "email": username,
        "password": password
    } )
      .then(function (response) {
        console.log(response);
        secureLocalStorage.setItem("token", response.data.access_token);
        secureLocalStorage.setItem("user", response.data.email);
        secureLocalStorage.setItem("firstname", response.data.firstname);
        secureLocalStorage.setItem("lastname", response.data.lastname);
        secureLocalStorage.setItem("refresh-token", response.data.refresh_token)
        setLoginStatus(true);
        setWaiting(false);
        if(response.status === 200){
            console.log("Login Success");
            setLoginStatus(true);
            navigate("/timeslots");
        }
      })
      .catch(function (error) {
        setLoginStatus(false);
        setWaiting(false);
        console.log(error);
      });
};

export const authenticateStatus = () => {
    return secureLocalStorage.getItem("token") !== null;
}

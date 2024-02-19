import api from '../../utils/api';



export const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export const createAccount = async (firstname, lastname, email, password, setSignupStatus, setWaiting, navigate) => {
   
    api.post(`/api/v1/auth/register`,{
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": password,
        "role": "NORMAL_USER"
    } )
      .then(function (response) {
        response.data === "User registered successfully" ? setSignupStatus(true) :setSignupStatus(false);
        setWaiting(false)
        if(response.status === 200){
            console.log("Signup Success");
            navigate("/");
        }
    })
      .catch(function (error) {
        setWaiting(false);
        console.log(error);
        return "error";
      });
};

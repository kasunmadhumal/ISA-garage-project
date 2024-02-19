import api from "../../utils/api";
import  secureLocalStorage  from  "react-secure-storage";

export const logout = async (navigate) => {

    try{
        api.post(`/api/v1/auth/logout`,
          {}
        )
        .then(function (response) {
           if(response.status === 200){
               console.log("Logout Success");
               secureLocalStorage.removeItem("token");
               navigate("/");
           }
        })
        .catch(function (error) {

          console.log(error);
        });
      } catch (error) {
        console.error('Error logout:', error);
        throw error;
      }
    
}


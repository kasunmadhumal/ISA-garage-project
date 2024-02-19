import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import api from '../../utils/api';
 

export const uploadToFirebase = async (file, setImageUploadProcess) => { 

  console.log('File:', file);
  try{
  setImageUploadProcess(true);
  const storageRef = ref(storage, `images/vehicles/${file.name}`);
  uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  setImageUploadProcess(false);
  if(downloadURL !== null){
    console.log('Image uploaded successfully:', downloadURL);
    return downloadURL;
  }
  
  return null;

} catch (error) {
    console.error('Error uploading image:', error);
    setImageUploadProcess(false);
    }
    finally {
        setImageUploadProcess(false);
    }
}



export const ownerVehiclesList = async (ownerEmail, setVehicleList, setVehicleDetailsLoadingWaiting) => {
  
    try{
      setVehicleDetailsLoadingWaiting(true);
      const response = api.get(`/api/v1/customer-vehicle/all-vehicles/${ownerEmail}`);
  
      console.log('Response:', response); 
     
      if (response !== null && (await response).status === 200) {
          console.log("Vehicle details fetched successfully");
          const data = (await response).data;
          setVehicleList(data);
          console.log("Vehicle List:", data);
          
      } else {
        console.log("error occred")
      }
      setVehicleDetailsLoadingWaiting(false);
    }catch (error) {
  
      console.error('Error fetching vehicles:', error);
      setVehicleDetailsLoadingWaiting(false);
  
    } finally {
  
    }
  
  }


  export const updateVehicleDetails = async (vehicleObj) => {

      try{
        api.put(`/api/v1/customer-vehicle/`,
          vehicleObj
        )
        .then(function (response) {

          console.log(response);
        })
        .catch(function (error) {

          console.log(error);
        });
      } catch (error) {
        console.error('Error updating vehicle:', error);
        throw error;
      }


}


  export const submitCustomerVehicleDetails = async (values, ownerEmail, imageUrl, setVehicleList, setVehicleDetailsLoadingWaiting) => {

      api.post(`/api/v1/customer-vehicle/`,
        {
        "model": values.model,
        "vehicleNumber": values.vehicleNumber,
        "year": values.year,
        "fuelType": values.fuelType,
        "vehicleType": values.vehicleType,
        "numberOfSeats": values.numberOfSeats,
        "numberOfDoors": values.numberOfDoors,
        "distanceLimit": values.distanceLimit,
        "vehicleImage" : imageUrl,
        "ownerEmail": ownerEmail    
        }
      )
      .then(function (response) {
         if(response.status === 200){
          console.log("Vehicle details submitted successfully");
          ownerVehiclesList(ownerEmail, setVehicleList, setVehicleDetailsLoadingWaiting);
         }
      })
      .catch(function (error) {
        console.log(error);
      });
 
}


export const onDeleteVehicleFromAccount = async(vehicleNumber, ownerEmail, setVehicleList, setVehicleDetailsLoadingWaiting) => {
  
    api.delete(`/api/v1/customer-vehicle/${ownerEmail}/${vehicleNumber}`)
    .then(function (response) {
      if(response.status === 200){
        console.log("Vehicle details deleted successfully");
        ownerVehiclesList(ownerEmail, setVehicleList, setVehicleDetailsLoadingWaiting);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

} 








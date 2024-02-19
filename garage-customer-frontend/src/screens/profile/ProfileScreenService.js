import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import api from '../../utils/api';
 


export const uploadToFirebase = async (file, setImageUploadProcess, email) => { 

  console.log('File:', file);
  try{
  setImageUploadProcess(true);
  const filename = `${email.replace(/[^a-zA-Z0-9.-]/g, '_')}.${file.name.split('.').pop()}`;
  const storageRef = ref(storage, `images/profiles/${filename}`);
  uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  setImageUploadProcess(false);
  return downloadURL;

} catch (error) {
    console.error('Error uploading image:', error);
    setImageUploadProcess(false);
    throw error;
    }
    finally {
        setImageUploadProcess(false);
    }
}


export const userProfileDetails = async (email, setFirstName, setLastName, setAddress, setAge, setGender, setPhoneNumber, setImageUrl) => {



  try{
    const response = api.get(`/api/v1/customer-account/${email}`);

    console.log('Response:', response); 
   
    if (response !== null && (await response).status === 200) {
        console.log("Profile details fetched successfully");
        const data = (await response).data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAddress(data.address);
        setAge(data.age);
        setGender(data.gender);
        setPhoneNumber(data.phoneNumber);
        setImageUrl(data.profilePicture);
        
    } else {
      console.log("error occred")
    }
  }catch (error) {

    console.error('Error fetching profile:', error);

  } finally {

  }

}


export const submitCustomerAccountDetails = async (values, email, imageUrl) => {

  try{
        api.post(`/api/v1/customer-account/`,
          {
            "firstName" : values.firstname,
            "lastName" : values.lastname,
            "email" : email,
            "address" : values.address,
            "phoneNumber" : values.phoneNumber,
            "age" : values.age,
            "gender" : values.gender,
            "profilePicture" : imageUrl,
            "ownerVehicles" : []
          }
        )
        .then(function (response) {
           console.log(response)
        })
        .catch(function (error) {

          console.log(error);
        });
      } catch (error) {
        console.error('Error submitting profile:', error);
        throw error;
      }

}
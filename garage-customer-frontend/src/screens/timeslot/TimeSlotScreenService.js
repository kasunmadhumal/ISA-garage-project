
import api from '../../utils/api';

export const availableTimeSlotsDetails = async(setAvailableTimeSlots, setAvailableTimeslotWaiting) => {
  
    try{

      setAvailableTimeslotWaiting(true);
      const response = api.get(`/api/v1/time-slots/available`);
  
      console.log('Response:', response); 
     
      if (response !== null && (await response).status === 200) {
          const data = (await response).data;
          setAvailableTimeSlots(data);
          console.log("Available Timeslot List:", data);
          
      } else {
        console.log("error occred")
      }
      setAvailableTimeslotWaiting(false);
    }catch (error) {
  
      console.error('Error fetching available timeslots:', error);
      setAvailableTimeslotWaiting(false);
  
    } finally {
  
    }

};



export const bookedTimeSlotsDetails = async (email,setBookedTimeSlots, setBookedTimeslotWaiting) => {

      try{

        setBookedTimeslotWaiting(true);
        const response = api.get(`/api/v1/time-slots/booked/${email}`);

        console.log('Response:', response); 
      
        if (response !== null && (await response).status === 200) {
            console.log("Booked timeslots details fetched successfully");
            const data = (await response).data;
            setBookedTimeSlots(data);
            console.log("Booked Timeslot List:", data);
            
        } else {
          console.log("error occred")
        }
        setBookedTimeslotWaiting(false);
      }catch (error) {

        console.error('Error fetching Booked timeslots:', error);
        setBookedTimeslotWaiting(false);

      } finally {

      }



};
export const acceptedTimeSlotsDetails = async (email,setAcceptedTimeSlots, setAcceptedTimeslotWaiting) => {

        try{
          setAcceptedTimeslotWaiting(true);
          const response = api.get(`/api/v1/time-slots/accepted/${email}`);

          console.log('Response:', response); 
        
          if (response !== null && (await response).status === 200) {
              console.log("Accepted timeslot details fetched successfully");
              const data = (await response).data;
              setAcceptedTimeSlots(data);
              console.log("Accepted Timeslot List:", data);
              
          } else {
            console.log("error occred")
          }
          setAcceptedTimeslotWaiting(false);
        }catch (error) {
          console.error('Error fetching Accepted timeslots:', error);
          setAcceptedTimeslotWaiting(false);

        } finally {

        }

};


export const bookAvailableTimeSlot = async (email, timeslot, selectVehicle, setBookedTimeSlots, setBookedTimeslotWaiting, setAvailableTimeSlots, setAvailableTimeslotWaiting) => {

      try{
  
        const response = api.post(`/api/v1/time-slots/`, {
          "key" : timeslot.key,
          "status" : "booked",
          "acceptedStatus" : "pending",
          "userEmailAddress" : email,
          "timeSlotAllocatedDate": timeslot.timeSlotAllocatedDate,
          "timeSlotAllocatedTime": timeslot.timeSlotAllocatedTime,
          "timeSlotAllocatedDuration": timeslot.timeSlotAllocatedDuration,
          "timeSlotAllocatedService": timeslot.timeSlotAllocatedService,
          "numberOfVehiclesMaxAllowedForService": timeslot.numberOfVehiclesMaxAllowedForService,
          "availableBookingCountForService": timeslot.availableBookingCountForService,
          "timeSlotAllocatedServiceDiscount": timeslot.timeSlotAllocatedServiceDiscount,
          "timeSlotAllocatedVehicles" : [
                  {
                      "model": selectVehicle.model,
                      "vehicleNumber": selectVehicle.vehicleNumber,
                      "year": selectVehicle.year,
                      "fuelType": selectVehicle.fuelType,
                      "vehicleType": selectVehicle.vehicleType,
                      "numberOfSeats": selectVehicle.numberOfSeats,
                      "numberOfDoors": selectVehicle.numberOfDoors,
                      "distanceLimit": selectVehicle.distanceLimit,
                      "vehicleImage" : selectVehicle.vehicleImage,
                      "ownerEmail": email
                  }
          ]
        });
  
        console.log('Response:', response); 
      
        if (response !== null && (await response).status === 200) {
            console.log("Time slot booked successfully");
            const data = (await response).data;
            console.log("Booked Time Slot:", data);
            bookedTimeSlotsDetails(email,setBookedTimeSlots, setBookedTimeslotWaiting)
            availableTimeSlotsDetails(setAvailableTimeSlots, setAvailableTimeslotWaiting)
        } else {
          console.log("error occred")
        }
      }catch (error) {
        console.error('Error booking time slot:', error);
  
      } finally {
  
      }
  
  };


  export const userVehiclesDetails = async (email, setVehicleList, setVehicleListLoadingWaiting) => {
  
    try{
      setVehicleListLoadingWaiting(true);
      const response = api.get(`/api/v1/customer-vehicle/all-vehicles/${email}`);
  
      console.log('Response:', response); 
     
      if (response !== null && (await response).status === 200) {
          console.log("Vehicle details fetched successfully");
          const data = (await response).data;
          setVehicleList(data);
          console.log("Vehicle List:", data);
          
      } else {
        console.log("error occred")
      }
      setVehicleListLoadingWaiting(false);
    }catch (error) {
  
      console.error('Error fetching vehicles:', error);
      setVehicleListLoadingWaiting(false);
  
    } finally {
  
    }
  
  }


  export const deleteBookedTimeSlot = async (key, email,setBookedTimeSlots, setBookedTimeslotWaiting, setAvailableTimeSlots, setAvailableTimeslotWaiting) => {

    try{
      const response = api.delete(`/api/v1/time-slots/${key}`);

      console.log('Response:', response); 
    
      if (response !== null && (await response).status === 200) {
          console.log("Time slot deleted successfully");
          bookedTimeSlotsDetails(email,setBookedTimeSlots, setBookedTimeslotWaiting)
          availableTimeSlotsDetails(setAvailableTimeSlots, setAvailableTimeslotWaiting)
      } else {
        console.log("error occred")
      }
    }catch (error) {
      console.error('Error deleting time slot:', error);

    } finally {

    }

  };
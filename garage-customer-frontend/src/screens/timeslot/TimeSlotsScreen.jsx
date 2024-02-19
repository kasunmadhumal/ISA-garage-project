import React, { useState } from 'react'
import './TimeSlotsScreen.css'
import NavigationBar from '../../components/navigationBar/NavigationBar';
import  secureLocalStorage  from  "react-secure-storage";
import { useEffect } from 'react';
import { availableTimeSlotsDetails, bookedTimeSlotsDetails, acceptedTimeSlotsDetails, bookAvailableTimeSlot, userVehiclesDetails, deleteBookedTimeSlot } from './TimeSlotScreenService';
import TimeSlotComponent from '../../components/timeslot/TimeSlotComponent';
import { Spin } from 'antd';
import VehicleComponent from '../../components/vehicleComponent/VehicleComponent';
import Footer from '../../components/footer/Footer';



const TimeSlotsScreen = () => {

    const [halfScreen, setHalfScreen] = useState(false);
    const [availableTimeslotWaiting, setAvailableTimeslotWaiting] = useState(false);
    const [bookedTimeslotWaiting, setBookedTimeslotWaiting] = useState(false);
    const [acceptedTimeslotWaiting, setAcceptedTimeslotWaiting] = useState(false);
    const [vehicleListLoadingWaiting, setVehicleListLoadingWaiting] = useState(false);  
    const [vehicleList, setVehicleList] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
    const [acceptedTimeSlots, setAcceptedTimeSlots] = useState([]);
    const [email] = useState(secureLocalStorage.getItem("user")); 
    const [selectVehicle, setSelectVehicle] = useState(null);

  
  
    useEffect(  () => {
        try {
            availableTimeSlotsDetails(setAvailableTimeSlots, setAvailableTimeslotWaiting);
            bookedTimeSlotsDetails(email,setBookedTimeSlots, setBookedTimeslotWaiting);
            acceptedTimeSlotsDetails(email,setAcceptedTimeSlots, setAcceptedTimeslotWaiting);
        } catch (e) {
            console.log(e.error);
        }
    }, [email]);

    const bookTimeSlotForm = (timeslot) => {
        console.log('Booking time slot:', timeslot);
        halfScreen ? setHalfScreen(false) : setHalfScreen(true);
    }

    const addVehicleToForm = (timeslot) => {
        console.log('Adding vehicle to form:', timeslot);
        userVehiclesDetails(email, setVehicleList, setVehicleListLoadingWaiting);
    }

    const addVehicleToTimeSlot = (vehicle) => {
        console.log('Adding vehicle to timeslot:', vehicle);
        setSelectVehicle(vehicle);
    }

    const submitBookingTimeSlot = (timeslot) => {
        console.log('Submitting booking timeslot:', timeslot);
        bookAvailableTimeSlot(email, timeslot, selectVehicle, setBookedTimeSlots, setBookedTimeslotWaiting, setAvailableTimeSlots, setAvailableTimeslotWaiting);
        setHalfScreen(false);
        setSelectVehicle(null);
    }

    const deleteBookedTimeslots = (timeslot) => {
        console.log('Viewing booked timeslots:', timeslot);
        deleteBookedTimeSlot(timeslot.key, email,setBookedTimeSlots, setBookedTimeslotWaiting, setAvailableTimeSlots, setAvailableTimeslotWaiting);
    }



    return (
        <div className='time-slot-screen-container'>
            <div className='nav-bar-container'>
                <NavigationBar />
            </div>

           <div className='time-slot-booking-screen-main-container'>
                <div className='time-slot-content-container' style={
                        {
                            width: halfScreen ? '50%' : '100%',
                        }
                    }>
                        
                        <div className='available-timeslots'>
                            <div className='time-slot-header'>
                                <h1>Available Time Slots</h1>
                            </div>
                            <div className='time-slot-content'>
                            {
                                availableTimeslotWaiting && (
                                    <Spin tip="Loading..." style={{
                                        justifyContent : "center",
                                        color : "red"
                                    }}>
                                        </Spin>
                                    )
                            }
                                {
                                availableTimeSlots && availableTimeSlots.map((timeslot, index) => {
                                        return (
                                            <div key={index} className='timeslot-view-card'>
                                                <TimeSlotComponent timeSlot={timeslot} from={"available-timeslot"} bookTimeSlotForm={bookTimeSlotForm}/>
                                            </div>

                                        );
                                    })
                                }

                            </div>
                        </div>

                        {
                            bookedTimeSlots && bookedTimeSlots.length > 0 && (
                                <div className='booked-timeslots'>
                                    <div className='time-slot-header'>
                                        <h1>Booked Time Slots</h1>
                                    </div>
                                    <div className='time-slot-content'>
                                    {
                                            bookedTimeslotWaiting && (
                                                <Spin tip="Loading..." style={{
                                                    justifyContent : "center",
                                                    color : "red"
                                                }}>
                                                    </Spin>
                                                )
                                    }
                                    
                                    {
                                        bookedTimeSlots && bookedTimeSlots.map((timeslot, index) => {
                                                return (
                                                    <div key={index} className='timeslot-view-card'>
                                                        <TimeSlotComponent timeSlot={timeslot} from={"booked-timeslot"} deleteBookedTimeslots={deleteBookedTimeslots}/>
                                                    </div>

                                                );
                                            })
                                    }
                                        
                                    </div>
                                </div>
                            )
                        }
                        {
                            acceptedTimeSlots && acceptedTimeSlots.length > 0 && (
                                <div className='accepted-timeslots'>
                                    <div className='time-slot-header'>
                                        <h1>Accepted Time Slots</h1>
                                    </div>
                                    <div className='time-slot-content'>
                                       {
                                            acceptedTimeslotWaiting && (
                                                <Spin tip="Loading..." style={{
                                                    justifyContent : "center",
                                                    color : "red"
                                                }}>
                                                    </Spin>
                                                )
                                        }
                                        {
                                            acceptedTimeSlots && acceptedTimeSlots.map((timeslot, index) => {
                                                    return (
                                                        <div key={index} className='timeslot-view-card'>
                                                            <TimeSlotComponent timeSlot={timeslot} from={"booked-timeslot"} deleteBookedTimeslots={deleteBookedTimeslots}/>
                                                        </div>

                                                    );
                                                })
                                        }
                                    </div>
                                </div>
                            )
                        }
                                        
                </div>

             {
                halfScreen && (
                    <div className='time-slot-booking-form' style={
                        {
                            width: halfScreen ? '50%' : '0%',
                        }
                        }>
                            <div className='time-slot-header'>
                                <h1>TimeSlot Booking</h1>
                            </div>
                            <div className='time-slot-content'>
                                <div className='timeslot-view-card'>
                                    <TimeSlotComponent timeSlot={availableTimeSlots[0]} 
                                                       from={"booked-timeslot-form"} 
                                                       addVehicleToForm={addVehicleToForm} 
                                                       selectVehicle={selectVehicle}
                                                       submitBookingTimeSlot={submitBookingTimeSlot}
                                                       />
                                </div>
                                {
                                    vehicleListLoadingWaiting && (
                                        <Spin tip="Loading..." style={{
                                            justifyContent : "center",
                                            color : "red"
                                        }}>
                                        </Spin>
                                    )
                                }
                                 {
                                   vehicleList && vehicleList.map((vehicle, index) => {
                                return (
                                        <div key={index} className='vehicle-view-card'>
                                            <VehicleComponent vehicle={vehicle} from={"time-slot-booking"} addVehicleToTimeSlot={addVehicleToTimeSlot} />
                                        </div>

                                    );
                                })
                            }

                            </div>
                    </div>
                )
             }    
            </div>
            <div className='footer-container'>
                <Footer />
            </div>

        </div>
    );
}

export default TimeSlotsScreen;
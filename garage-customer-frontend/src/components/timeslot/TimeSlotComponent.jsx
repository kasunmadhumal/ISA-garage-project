import React from 'react'; 
import './TimeSlotComponent.css';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import greenLight from '../../assets/images/greenLight.png';
import redLight from '../../assets/images/redLight.png';
import yellowLight from '../../assets/images/yellowLight.png';

const TimeSlotComponent = (props) => {

    return (

        <div className='timeslot-component-container'
            style={{
                height: props.from === 'available-timeslot' ? '300px' : '400px'
            }}>
            <div className='timeslot-component-timeline'>

                <div className='timeslot-component-date-time'>
                    <FieldTimeOutlined style={{
                        fontSize: '30px',
                        color: '#1890ff',   
                    }}/>
                    <h3 className='timeslot-component-date-time-text'>{props.timeSlot.timeSlotAllocatedDate} at {props.timeSlot.timeSlotAllocatedTime}</h3>
                </div>
                <div className='timeslot-component-availability'>
                    {props.timeSlot.status === 'available' && (
                        <div className='timeslot-component-availability-image-container'>
                            <Image src={yellowLight} alt="Available" className='timeslot-component-availability-image' style={{
                                width: '20px',
                                height: '20px',
                            }}/>
                            <h3 className='timeslot-component-availability-text'>Active</h3>
                        </div>
                    )}
                    {props.timeSlot.acceptedStatus && props.timeSlot.acceptedStatus === 'pending' && (
                        <div className='timeslot-component-availability-image-container'>
                            <Image src={redLight} alt="NotAvailable" className='timeslot-component-availability-image' style={{
                                width: '20px',
                                height: '20px',
                            }}/>
                            <h3 className='timeslot-component-availability-text'>Pending</h3>
                        </div>
                    )}
                    {props.timeSlot.acceptedStatus && props.timeSlot.acceptedStatus === 'accepted' && (
                        <div className='timeslot-component-availability-image-container'>
                            <Image src={greenLight} alt="NotAvailable" className='timeslot-component-availability-image' style={{
                                width: '20px',
                                height: '20px',
                            }}/>
                            <h3 className='timeslot-component-availability-text'>Accepted</h3>
                        </div>
                    )}
                </div>
            </div>
            <div className='timeslot-component-content'>
                <p className='timeslot-component-content-text'>{props.timeSlot.timeSlotAllocatedService} - {props.timeSlot.timeSlotAllocatedDuration}</p>
                <p className='timeslot-component-content-text'>Max Vehicles: {props.timeSlot.numberOfVehiclesMaxAllowedForService}</p>
                <p className='timeslot-component-content-text'>Available: {props.timeSlot.availableBookingCountForService}</p>   
                <p className='timeslot-component-content-text'>Discount: {props.timeSlot.timeSlotAllocatedServiceDiscount}</p>
                {
                    props.selectVehicle && (
                        <p className='timeslot-component-content-text'
                            style={{
                                color : 'blueViolet'
                            }}>Select Vehicle: {props.selectVehicle.vehicleNumber}</p>
                    )
                }
                {
                    props.from === 'booked-timeslot' && (
                        <p className='timeslot-component-content-text'
                            style={{
                                color : 'blueViolet'
                            }}>Select Vehicle: {props.timeSlot.timeSlotAllocatedVehicles[0].vehicleNumber}</p>
                    )
                }
            </div>
            <div className='timeslot-component-buttons'>
                {
                    props.from === 'available-timeslot' ? (
                        <Button className='timeslot-component-button'
                           onClick={() => props.bookTimeSlotForm(props.timeSlot)}
                        >Book</Button>
                    ) : (
                        props.from === 'booked-timeslot-form' ? (
                            props.selectVehicle ? (     
                                <Button className='timeslot-component-button'
                                    onClick={() => props.submitBookingTimeSlot(props.timeSlot)}
                                >Submit Timeslot</Button>
                            ) : (
                                <Button className='timeslot-component-button'
                                    onClick={() => props.addVehicleToForm(props.timeSlot)}
                                >Add Vehicle</Button>
                            )
                        ) : (
                            props.timeSlot.acceptedStatus === 'pending' && (
                                <Button className='timeslot-component-button' onClick={() => props.deleteBookedTimeslots(props.timeSlot)}>Remove</Button>
                            )
                        )
                    )
                }
            </div>
        </div>
    );
}

export default TimeSlotComponent;

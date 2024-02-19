import React from 'react';
import './VehicleComponent.css';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined, SelectOutlined } from '@ant-design/icons';


const VehicleComponent = (props) => {
    return (
        <div className='vehicle-card-view'>
       
            <div className='vehicle-image-view'>
                <div className='vehicle-model-text'>
                    <h3>Model: {props.vehicle.model }</h3>
                </div>
                <div className='vehicle-image-container'>
                    <img src={props.vehicle.vehicleImage} alt='vehicle' className='vehicle-image'/>
                </div>   
            </div>
            <div className='vehicle-details-view'>
                <div className='vehicle-details-left'>
                    <p className='card-vehicle-details-item'>Vehicle Number: {props.vehicle.vehicleNumber}</p>
                    <p className='card-vehicle-details-item'>Year: {props.vehicle.year}</p>
                    <p className='card-vehicle-details-item'>Fuel Type: {props.vehicle.fuelType}</p>
                    <p className='card-vehicle-details-item'>Vehicle Type: {props.vehicle.vehicleType}</p>
                </div>
                <div className='vehicle-details-right'>
                    <p className='card-vehicle-details-item'>Number of Seats: {props.vehicle.numberOfSeats}</p>
                    <p className='card-vehicle-details-item'>Number of Doors: {props.vehicle.numberOfDoors}</p>
                    <p className='card-vehicle-details-item'>Distance Limit: {props.vehicle.distanceLimit}</p>
                </div>
            </div>
            {
                props.from === "vehicle-management" ? (
                     
                    <div className='card-option-bar'>
                        <Button className='card-option-button' onClick={() => props.onEditVehicle(props.vehicle)} style={{
                            border: 'none',
                            background: 'none',
                            padding: '0',
                            cursor: 'pointer',
                            outline: 'none',
                            fontSize: '20px',
                            paddingBottom: '190px'
                
                        }}>
                        <EditOutlined />
                        </Button>
                        <Button className='card-option-button' onClick={() => props.onDeleteVehicle(props.vehicle.vehicleNumber)} style={{
                            border: 'none',
                            background: 'none',
                            padding: '0',
                            cursor: 'pointer',
                            outline: 'none',
                            fontSize: '20px',
                        }}>
                            <DeleteOutlined />
                        </Button>
                    </div>
                ): (
                    <div className='card-option-bar'>
                        <Button className='card-option-button' onClick={() => props.addVehicleToTimeSlot(props.vehicle)} style={{
                           border: 'none',
                           background: 'none',
                           padding: '0',
                           cursor: 'pointer',
                           outline: 'none',
                           fontSize: '20px',
                        }}>
                             <SelectOutlined />
                        </Button>
                    </div>
                )
            }
            
        </div>
    );
}

export default VehicleComponent;
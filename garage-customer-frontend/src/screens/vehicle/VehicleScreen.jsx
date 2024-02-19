import { useEffect, useState } from 'react';
import NavigationBar from '../../components/navigationBar/NavigationBar';
import './VehicleScreen.css';
import { Button, Checkbox, Form, Input, Select, Spin, Upload } from 'antd';
import {
  uploadToFirebase,
  ownerVehiclesList,
  submitCustomerVehicleDetails,
  onDeleteVehicleFromAccount,
} from './VehicleScreenService';
import { PlusOutlined } from '@ant-design/icons';
import secureLocalStorage from 'react-secure-storage';
import VehicleComponent from '../../components/vehicleComponent/VehicleComponent';

const VehicleScreen = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [, setFileList] = useState([]);
  const [imageUploadProcess, setImageUploadProcess] = useState(false);
  const [vehicleList, setVehicleList] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [vehicleDetailsLoadingWaiting, setVehicleDetailsLoadingWaiting] =
    useState(false);
  const [ownerEmail] = useState(secureLocalStorage.getItem('user'));

  useEffect(() => {
    try {
      ownerVehiclesList(
        ownerEmail,
        setVehicleList,
        setVehicleDetailsLoadingWaiting,
      );
    } catch (e) {
      console.log(e.error);
    }
  }, [ownerEmail]);

  const normFile = (info) => {
    const { fileList } = info;

    if (fileList.length > 0) {
      setFileList(fileList);
    }
  };

  const onEditVehicle = (vehicle) => {
    console.log('Edit vehicle:', vehicle);
  };

  const onDeleteVehicle = (vehicleNumber) => {
    console.log('Delete vehicle:', vehicleNumber);
    onDeleteVehicleFromAccount(
      vehicleNumber,
      ownerEmail,
      setVehicleList,
      setVehicleDetailsLoadingWaiting,
    );
  };

  const handleSubmit = async (values) => {
    console.log('Received values of form:', values);
    try {
      setWaiting(true);
      await submitCustomerVehicleDetails(
        values,
        ownerEmail,
        imageUrl,
        setVehicleList,
        setVehicleDetailsLoadingWaiting,
      );
      setWaiting(false);
    } catch (error) {
      setWaiting(false);
      console.error('There was an error!', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="vehicle-page-container">
      <div className="navbar-container">
        <NavigationBar />
      </div>
      <div className="vehicle-content-container">
        <div className="vehicle-form-container">
          <div className="vehicle-form-header">
            <h1>Add New Vehicle</h1>
          </div>
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
            className="vehicle-details-input"
          >
            Form disabled
          </Checkbox>
          <div>
            {waiting && (
              <Spin
                tip="Sending..."
                style={{
                  justifyContent: 'center',
                  color: 'red',
                }}
              ></Spin>
            )}
          </div>
          <Form
            style={{
              marginTop: 16,
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            layout="horizontal"
            disabled={componentDisabled}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Vehicle Model"
              name="model"
              className="vehicle-details-input"
              rules={[
                {
                  required: true,
                  message: 'Please input your vehicle model!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Vehicle Number"
              name="vehicleNumber"
              className="vehicle-details-input"
              rules={[
                {
                  required: true,
                  message: 'Please input your vehicle number!',
                },
                {
                  max: 10,
                  message: 'Vehicle number must be at most 10 characters long!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Manufactured Year"
              name="year"
              className="vehicle-details-input"
              rules={[
                {
                  required: true,
                  message: 'Please input your vehicle manufactured year!',
                },
                {
                  validator: async (_, value) => {
                    if (value > 1950 && value < 2100) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Please input a valid year!'),
                    );
                  },
                  message: 'Please input a valid year!',
                },
                {
                  whitespace: false,
                  message: 'year must not contain any whitespace!',
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Fuel Type"
              name="fuelType"
              className="vehicle-details-input"
              rules={[
                {
                  required: true,
                  message: 'Please input your vehicle fuel type!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Vehicle Type"
              name="vehicleType"
              className="vehicle-details-input"
            >
              <Select>
                <Select.Option value="sedan">SEDAN</Select.Option>
                <Select.Option value="station wagon">
                  STATION WAGON
                </Select.Option>
                <Select.Option value="coupe">COUPE</Select.Option>
                <Select.Option value="hatchback">HATCHBACK</Select.Option>
                <Select.Option value="pickup">PICKUP</Select.Option>
                <Select.Option value="convertibles">CONVERTIBLES</Select.Option>
                <Select.Option value="micro">MICRO</Select.Option>
                <Select.Option value="limousine">LIMOUSINE</Select.Option>
                <Select.Option value="van">VAN</Select.Option>
                <Select.Option value="minivan">MINIVAN</Select.Option>
                <Select.Option value="cuv">CUV</Select.Option>
                <Select.Option value="supercar">SUPERCAR</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Number of Seats"
              name="numberOfSeats"
              className="vehicle-details-input"
              rules={[
                {
                  validator: async (_, value) => {
                    if (value > 0 && value < 80) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Please input a valid seat count!'),
                    );
                  },
                  message: 'Please input a valid seat count!',
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Number of Doors"
              name="numberOfDoors"
              className="vehicle-details-input"
              rules={[
                {
                  validator: async (_, value) => {
                    if (value > 0 && value < 6) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Please input a valid door count!'),
                    );
                  },
                  message: 'Please input a valid door count!',
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Distance Limit"
              name="distanceLimit"
              className="vehicle-details-input"
              rules={[
                {
                  validator: async (_, value) => {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Please input a valid distance limit!'),
                    );
                  },
                  message: 'Please input a valid distance limit!',
                },
              ]}
            >
              <Input type="double" />
            </Form.Item>
            <Form.Item
              label="Upload"
              name="vehicleImage"
              valuePropName="fileList"
              className="vehicle-details-input"
              getValueFromEvent={normFile}
            >
              <Upload
                action={null}
                listType="picture-card"
                customRequest={({ file, onSuccess, onError }) => {
                  uploadToFirebase(file, setImageUploadProcess)
                    .then((response) => {
                      if (response !== null) {
                        setImageUrl(response);
                      }
                      console.log('Image uploaded successfully:', response);
                      onSuccess();
                    })
                    .catch((error) => {
                      onError(error);
                    });
                }}
                disabled={imageUrl !== null}
              >
                {imageUploadProcess ? (
                  <Spin />
                ) : (
                  <Button style={{ border: 0, background: 'none' }}>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </Button>
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="vehicle-view-container">
          <div className="vehicle-view-header">
            <h1>Vehicle List</h1>
          </div>
          <div
            className="vehicle-view-content"
            style={{ height: '955px', overflowY: 'auto' }}
          >
            {vehicleDetailsLoadingWaiting && (
              <Spin
                tip="Loading..."
                style={{
                  justifyContent: 'center',
                  color: 'red',
                }}
              ></Spin>
            )}
            {vehicleList &&
              vehicleList.map((vehicle, index) => {
                return (
                  <div key={index} className="vehicle-view-card">
                    <VehicleComponent
                      vehicle={vehicle}
                      onDeleteVehicle={onDeleteVehicle}
                      from={'vehicle-management'}
                      onEditVehicle={onEditVehicle}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleScreen;

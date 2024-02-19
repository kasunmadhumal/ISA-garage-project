import React, { useEffect, useState } from 'react'
import NavigationBar from '../../components/navigationBar/NavigationBar'
import { PlusOutlined } from '@ant-design/icons';
import './ProfileScreen.css'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Spin,
  Upload,
} from 'antd';
import { uploadToFirebase, submitCustomerAccountDetails, userProfileDetails } from './ProfileScreenService';
import  secureLocalStorage  from  "react-secure-storage";


const ProfileScreen = ()  => {

  const [componentDisabled, setComponentDisabled] = useState(true);
  const [, setFileList] = useState([]);
  const [imageUploadProcess, setImageUploadProcess] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email] = useState(secureLocalStorage.getItem("user")); 
  const [phoneNumber, setPhoneNumber] = useState('');


  useEffect(() => {
      try {
        userProfileDetails(email, setFirstName, setLastName, setAddress, setAge, setGender, setPhoneNumber, setImageUrl);
      } catch (e) {
        console.log(e.error);
      }
  }, [email]);



  const normFile = (info) => {
    const { fileList } = info;

    if (fileList.length > 0) {
      setFileList(fileList);
    }
  };

  const setVariables = (values) => {
       setFirstName(values.firstname);
       setLastName(values.lastname);
       setAddress(values.address);
       setAge(values.age);
       setGender(values.gender);
       setPhoneNumber(values.phoneNumber)
  }

  const handleSubmit = async (values) => {
    try {
      setWaiting(true);
      await submitCustomerAccountDetails(values, email, imageUrl);
      setWaiting(false);
      setVariables(values)
    } catch (error) {
      setWaiting(false);
      console.error('There was an error!', error);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }


  return (
    <div className='profile-page-container'>
      <div className='nav-bar-container'>
        <NavigationBar />
      </div>
      <div className='profile-content-container'>
        <div className='profile-form-container'>
          <div className='profile-form-header'>
            <h1>Account Details</h1>
          </div>

          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
            className='account-details-input'
          >
            Form disabled
          </Checkbox>
          <div>
          {
              waiting && (
              <Spin tip="Sending..." style={{
                justifyContent : "center",
                color : "red"
              }}>
                </Spin>
              )
          }
          </div>
          <Form
            style={{
              marginTop: 16,
              width: "60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            layout="horizontal"
            disabled={componentDisabled}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="FirstName"
              name="firstname"
              className='account-details-input'
              rules={[
                {
                  required: true,
                  message: 'Please input your first name!',
                },
                {
                  max: 30,
                  message: 'First name must be at most 30 characters long!',
                },
                {
                  whitespace: false,
                  message: 'First name must not contain any whitespace!',
                }
              ]}
            >
              <Input placeholder={firstname}/>
            </Form.Item>

            <Form.Item
              label="LastName"
              name="lastname"
              className='account-details-input'
              rules={[
                {
                  required: true,
                  message: 'Please input your last name!',
                },
                {
                  max: 30,
                  message: 'Last name must be at most 30 characters long!',
                },
                {
                  whitespace: false,
                  message: 'Last name must not contain any whitespace!',
                },
              ]}
            >
              <Input placeholder={lastname}/>
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              className='account-details-input'
              rules={[
                {
                  validator: async (_, value) => {
                    if (value > 0 && value < 120) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please input a valid age!'));
                  },
                  message: 'Please input a valid age!',
                },
                {
                  whitespace: false,
                  message: 'Age must not contain any whitespace!',
                },
              ]}
            >
              <Input
                type="number"
                placeholder={age}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              className='account-details-input'
            >

              <Input
                disabled
                style={{
                  backgroundColor: componentDisabled ? "#f0f0f0" : "#ffffff"
                }}
                placeholder={email}
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              className='account-details-input'
              rules={[
                {
                  max: 60,
                  message: 'address must be at most 60 characters long!',
                },
              ]}
            >
              <Input placeholder={address}/>
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              className='account-details-input'
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
                {
                  max: 10,
                  message: 'Phone number must be at most 10 characters long!',
                },
                {
                  whitespace: false,
                  message: 'Phone number must not contain any whitespace!',
                },
                {
                  pattern: /^[0-9]+$/,
                  message: 'Phone number must only contain numbers!',
                }
              ]}
            >
              <Input placeholder={phoneNumber}/>
            </Form.Item>
            <Form.Item label="Gender" name="gender" className='account-details-input' placeholder={gender}>
              <Select>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Upload"
              name="image"
              valuePropName="fileList"
              className='account-details-input'
              getValueFromEvent={normFile}
            >
              <Upload
                action={null}
                listType="picture-card"
                customRequest={({ file, onSuccess, onError }) => {
                  uploadToFirebase(file, setImageUploadProcess, email )
                    .then((response) => {
                      setImageUrl(response);
                      console.log('Image uploaded successfully:', response);
                      onSuccess();
                    })
                    .catch((error) => {
                      onError(error);
                    });
                }}
                disabled={imageUrl !== null}
              >
                {
                  imageUploadProcess ? <Spin /> : (
                    <Button style={{ border: 0, background: 'none' }}>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </Button>
                  )
                }
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
        <div className='profile-view-container'>
          <div className='profile-view-header'>
            <h1>Profile</h1>
          </div>
          <div className='profile-photo-container'>
            <img src= {imageUrl ? imageUrl : 'https://www.w3schools.com/howto/img_avatar.png'} alt='profile' className='profile-image' />
          </div>
          <div className='profile-view-content'>
            <div className='profile-view-content-item'>
              <h3 className='profile-view-content-item-label'>First Name :</h3>
              <h3 className='profile-view-content-item-value'>{firstname}</h3>
            </div>
            <div className='profile-view-content-item'>
              <h3 className='profile-view-content-item-label'>Last Name :</h3>
              <h3 className='profile-view-content-item-value'>{lastname}</h3>
            </div>
            <div className='profile-view-content-item'>
              <h3 className='profile-view-content-item-label'>Age :</h3>
              <h3 className='profile-view-content-item-value'>{age}</h3>
            </div>
            <div className='profile-view-content-item'>
              <h3 className='profile-view-content-item-label'>Gender :</h3>
              <h3 className='profile-view-content-item-value'>{gender}</h3>
            </div>
            <div className='profile-view-content-item'>
              <h3 className='profile-view-content-item-label'>Email :</h3>
              <h3 className='profile-view-content-item-value'>{email}</h3>
            </div>
            <div className='profile-view-content-item'>
              <h3 className='profile-view-content-item-label'>Address :</h3>
              <h3 className='profile-view-content-item-value'>{address}</h3>
            </div>
            <div className='profile-view-content-item'>
              <h3 className='profile-view-content-item-label'>Phone Number :</h3>
              <h3 className='profile-view-content-item-value'>{phoneNumber}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-container'>

      </div>
    </div>
  )
}

export default ProfileScreen
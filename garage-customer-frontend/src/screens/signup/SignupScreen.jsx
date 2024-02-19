import React, { useState } from 'react';
import { Alert, Button, Form, Input, Spin } from 'antd';
import './SignupScreen.css';
import LockImage from '../../assets/images/lockPng.png';
import { Link, useNavigate } from 'react-router-dom';
import { createAccount, onFinishFailed } from './SignupScreenService';


const SignupScreen = () => {

  const [signupStatus, setSignupStatus] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
        setWaiting(true);
        await createAccount(values.firstname, values.lastname, values.email, values.password, setSignupStatus, setWaiting, navigate); 

    } catch (error) {
        setWaiting(false);
        console.error('There was an error!', error);
    }
};


  return ( 
    <>     
        <div className="signup-container">
            <div>
                <img src={LockImage} alt="logo" className="title-image" />
            </div>
            <div className='page-title'>
                <h1 className='title-text'>Sign up</h1>
                {
                    waiting && (
                    <Spin tip="Loading..." style={{marginTop: "20px"}}>
                        <Alert type="" />
                     </Spin>
                    )
                }
            </div>
            <div className="form-container">
            {!signupStatus && <div className="error-message"> Already Have An Account</div>}
            <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    style={{
                        maxWidth: 1000,
                        width: '100%',
                        marginTop: '10%',
                        marginRight: '20%',
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    label="FirstName"
                    name="firstname"
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
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="LastName"
                    name="lastname"
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
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        {
                            type: 'email',
                            message: 'Please input a valid email!',
                        },
                        {
                            max: 30,
                            message: 'email must be at most 30 characters long!',
                        },
                        {
                            whitespace: false,
                            message: 'email must not contain any whitespace!',
                        }
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            whitespace: false,
                            message: 'Password must not contain any whitespace!',
                        }
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your confirm password!',
                        },
                        {
                            whitespace: false,
                            message: 'Password must not contain any whitespace!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject('The two passwords that you entered do not match!');
                            },
                          }),
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    style={{
                        marginLeft: '48%',
                    }}>
                    <Link to="/">
                        Already have an account? Login
                    </Link>
                    </Form.Item>
                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    style={{marginLeft: '35%'}}
                    >
                    <Button type="primary" htmlType="submit">
                        Signup
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </>

)
};
export default SignupScreen;
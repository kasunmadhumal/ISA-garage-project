import React from 'react';
import { UserOutlined, ScheduleOutlined, CarOutlined, LinkedinOutlined, FacebookOutlined , LogoutOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import './NavigationBar.css';
import { useNavigate } from 'react-router';
import { logout } from './NavigationFBarService';



const NavigationBar = () => {

  const navigate = useNavigate();

  const handleMenuItemClick = (key) => {

    switch(key.key) {
        case 'logout-user':
            logout(navigate);
            break;
        case 'profile-management':
            navigate("/profile");
            break;
        case 'vehicle-management':
            navigate("/vehicle");
            break;
        case 'timeslot-booking':
            navigate("/timeslots");
            break;
        default:
            navigate("/");
    }

};


    const menuItems = [
        {
          label: 'Profile Management',
          key: 'profile-management',
          icon: <UserOutlined className='nav-bar-icon' style={{
            fontSize: '20px',
          }}/>
        },
        {
          label: 'Vehicle Management',
          key: 'vehicle-management',
          icon: <CarOutlined className='nav-bar-icon' style={{
            fontSize: '20px',
          }}/>
        },
        {
          label: 'Booking Time Slot Management',
          key: 'timeslot-booking',
          icon: <ScheduleOutlined className='nav-bar-icon' style={{
            fontSize: '20px',
          }}/>
        },
        {
          
          label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined className='nav-bar-icon' style={{
            fontSize: '20px',
          }}/>  
            </a>
          ),
          key: 'linkdin',
        },
        {
          
          label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined className='nav-bar-icon' style={{
            fontSize: '20px',
          }}/>  
            </a>
          ),
          key: 'facebook',
        },
        {
          label: '',
          key: 'logout-user',
          icon: <LogoutOutlined className='nav-bar-icon' style={{
            fontSize: '20px',
          }}/>
        },
      ];


    return (
      <div>
      <Menu
        mode="horizontal"
        items={menuItems}
        className='nav-bar-menu'
        onClick={handleMenuItemClick}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
            {item.children && (
              <Menu.SubMenu key={item.key} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>{child.label}</Menu.Item>
                ))}
              </Menu.SubMenu>
            )}
          </Menu.Item>
        ))}
      </Menu>
    </div>
    );
    }

export default NavigationBar;
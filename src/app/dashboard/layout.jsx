import React from 'react';
import { DashboardSlidber } from '../components/dashboard/DashboardSlidber';
 

const DashboardLayout = ({ children}) => { 
    return (
        <div className="flex min-h-screen ">
            <DashboardSlidber/>
            <div className="flex-1 px-4">{children}</div>
            
        </div>
    );
};

export default DashboardLayout; 
"use client" ;


import React from 'react';
import { useSession, signOut } from "@/lib/auth-client";
import { FiBriefcase, FiUsers, FiZap, FiCheckCircle } from "react-icons/fi";
import DashboardCard from '@/app/components/dashboard/DashboardCard';

const statsData = [
  { id: 1, title: "Total Job Posts", value: "48", icon: FiBriefcase },
  { id: 2, title: "Total Applicants", value: "1,284", icon: FiUsers },
  { id: 3, title: "Active Jobs", value: "18", icon: FiZap },
  { id: 4, title: "Jobs Closed", value: "32", icon: FiCheckCircle },
];

const RecruiterPage = () => {
    const {data:session , isPending} = useSession();
    const user = session?.user

    if(isPending){
        return <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
    </div>
    }

    return (
        <div>
            <h1 className="text-4xl font-bold my-8">Welcome, Back {user?.name}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 min-h-[220px]">
      {statsData.map((stat) => (
        <DashboardCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
        </div>
    );
};

export default RecruiterPage;
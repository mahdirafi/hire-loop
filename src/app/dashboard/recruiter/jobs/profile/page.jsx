import React from 'react' ;
import CompanyProfile from './companyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterId } from '@/lib/action/companies';


const companyProfile =async () =>{

    const user = await getUserSession();
    const company = await getRecruiterId(user?.id);
    console.log("This is Company Session User", user);


    return (
        <div>

            <CompanyProfile recruiter={user} recruiterCompany={company}/>

        </div>
    )
}
export default companyProfile;
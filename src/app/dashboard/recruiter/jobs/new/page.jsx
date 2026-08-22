import React from 'react';
import PostJobForm from './PostJobForm';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterId } from '@/lib/action/companies';

const PostJobPage = async() =>{

        const user = await getUserSession();
        const company = await getRecruiterId(user?.id);
        console.log("This is Company Session User", user,company);

    return (
        <div>
            <PostJobForm />
        </div>
    )
}
export default PostJobPage
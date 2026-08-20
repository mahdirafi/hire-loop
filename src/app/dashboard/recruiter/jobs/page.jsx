import { getCompanyJobs } from "@/lib/api/jobs";
import JobsTable from "../../../components/dashboard/JobsTable"; // client component
 

const RecruiterJobs = async () => {
  const companyId = "company_123";
  const jobs = await getCompanyJobs(companyId);

  return (
    <div>
      <h2 className="my-12 mb-8 text-3xl font-bold">Recruiter / Company Manager All Jobs</h2>
      <JobsTable jobs={jobs} />
    </div>
  );
};

export default RecruiterJobs;
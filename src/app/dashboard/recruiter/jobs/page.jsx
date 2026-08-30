 
import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Edit2, Trash2, Plus } from "lucide-react";
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import Link from 'next/link';

const RecruiterJobs = async () => {
    try {
        const company = await getLoggedInRecruiterCompany();
        console.log('Company data:', company);
        console.log('Company ID:', company?._id);

        if (!company || !company._id) {
            return (
                <div className="p-6 max-w-7xl mx-auto text-center">
                    <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-8">
                        <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                            Create Company Profile
                        </h3>
                        <p className="text-zinc-400 mb-4">
                            Please create a company profile first to view jobs
                        </p>
                        <Link href="/dashboard/recruiter/company/create">
                            <Button className="bg-white text-black">
                                Create Company
                            </Button>
                        </Link>
                    </div>
                </div>
            );
        }

        const jobs = await getCompanyJobs(company._id.toString()) || [];
        console.log('Fetched jobs:', jobs);
        console.log('Number of jobs:', jobs.length);

        const getStatusColor = (status) => {
            switch (status?.toLowerCase()) {
                case 'active': return 'success';
                case 'inactive': 
                case 'closed': return 'danger';
                case 'draft': return 'warning';
                case 'pending': return 'primary';
                default: return 'default';
            }
        };

        const getStatusEmoji = (status) => {
            switch (status?.toLowerCase()) {
                case 'active': return '🟢';
                case 'inactive': return '🔴';
                case 'closed': return '⛔';
                case 'draft': return '🟡';
                case 'pending': return '🟠';
                default: return '⚪';
            }
        };

        return (
            <div className="p-6 max-w-7xl mx-auto space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold tracking-tight">Manage All Jobs</h2>
                        <p className="text-sm text-default-500">
                            {jobs.length > 0 ? `${jobs.length} jobs posted` : 'No jobs posted yet'}
                        </p>
                    </div>
                    <Link href="/dashboard/recruiter/jobs/create">
                        <Button 
                            className="bg-primary text-white" 
                            startContent={<Plus className="w-4 h-4" />}
                        >
                            Post New Job
                        </Button>
                    </Link>
                </div>

                <Table 
                    aria-label="Company jobs management table"
                    classNames={{
                        base: "min-w-[800px]",
                        table: "min-w-full",
                    }}
                >
                    <Table.Header>
                        <Table.Column className="min-w-[200px]">Job Title</Table.Column>
                        <Table.Column className="min-w-[150px]">Type / Category</Table.Column>
                        <Table.Column className="min-w-[120px]">Location</Table.Column>
                        <Table.Column className="min-w-[100px]">Status</Table.Column>
                        <Table.Column className="min-w-[150px]">Actions</Table.Column>
                    </Table.Header>

                    <Table.Body 
                        emptyContent={
                            <div className="py-12 text-center">
                                <div className="text-6xl mb-4">📋</div>
                                <p className="text-default-500 text-lg">No jobs posted yet</p>
                                <p className="text-default-400 text-sm mt-2">
                                    Start by posting your first job opportunity
                                </p>
                                <Link href="/dashboard/recruiter/jobs/create">
                                    <Button className="mt-4 bg-primary text-white">
                                        Post Your First Job
                                    </Button>
                                </Link>
                            </div>
                        }
                    >
                        {jobs.map((job) => {
                            // Skip rendering if job data is incomplete
                            if (!job || !job._id) return null;
                            
                            const jobId = job._id?.$oid || job._id?.toString() || job._id;
                            
                            return (
                                <Table.Row key={jobId}>
                                    {/* Job Title */}
                                    <Table.Cell>
                                        <div className="font-medium text-default-800">
                                            {job.jobTitle || 'Untitled Job'}
                                        </div>
                                        {job.postedDate && (
                                            <div className="text-xs text-default-400 mt-1">
                                                Posted: {new Date(job.postedDate).toLocaleDateString()}
                                            </div>
                                        )}
                                    </Table.Cell>

                                    {/* Type / Category */}
                                    <Table.Cell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm capitalize font-medium">
                                                {job.jobType || 'N/A'}
                                            </span>
                                            <span className="text-xs text-default-400 capitalize">
                                                {job.jobCategory || 'Uncategorized'}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    {/* Location */}
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">
                                            {job.isRemote ? '🌐 Remote' : job.location || 'Location TBD'}
                                        </span>
                                    </Table.Cell>

                                    {/* Status */}
                                    <Table.Cell>
                                        <Chip 
                                            color={getStatusColor(job.status)} 
                                            size="sm" 
                                            variant="soft"
                                            className="capitalize"
                                            startContent={getStatusEmoji(job.status)}
                                        >
                                            {job.status || 'Unknown'}
                                        </Chip>
                                    </Table.Cell>

                                    {/* Actions */}
                                    <Table.Cell>
                                        <div className="relative flex items-center gap-2">
                                            <Tooltip content="View job details">
                                                <Link href={`/dashboard/recruiter/jobs/${jobId}`}>
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        variant="light" 
                                                        aria-label="View job details"
                                                    >
                                                        <Eye className="text-default-400 w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            </Tooltip>
                                            
                                            <Tooltip content="Edit job">
                                                <Link href={`/dashboard/recruiter/jobs/${jobId}/edit`}>
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        variant="light" 
                                                        aria-label="Edit job"
                                                    >
                                                        <Edit2 className="text-default-400 w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            </Tooltip>
                                            
                                            <Tooltip content="Delete job">
                                                <Button 
                                                    isIconOnly 
                                                    size="sm" 
                                                    variant="light" 
                                                    color="danger"
                                                    aria-label="Delete job"
                                                    onClick={async () => {
                                                        if (confirm('Are you sure you want to delete this job?')) {
                                                            try {
                                                                // Import and call your delete API here
                                                                // await deleteJob(jobId);
                                                                // You might want to refresh the page or revalidate
                                                                console.log('Delete job:', jobId);
                                                            } catch (error) {
                                                                console.error('Error deleting job:', error);
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="text-danger w-4 h-4" />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>
        );
    } catch (error) {
        console.error('Error loading jobs:', error);
        return (
            <div className="p-6 text-center">
                <div className="bg-danger-100 dark:bg-danger-900/20 border border-danger-300 dark:border-danger-800 rounded-xl p-8 max-w-md mx-auto">
                    <div className="text-4xl mb-4">❌</div>
                    <h3 className="text-xl font-semibold text-danger-600 dark:text-danger-400 mb-2">
                        Failed to Load Jobs
                    </h3>
                    <p className="text-default-500">
                        Please try again later or contact support if the problem persists.
                    </p>
                    <Button 
                        className="mt-4 bg-primary text-white"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }
};

export default RecruiterJobs;
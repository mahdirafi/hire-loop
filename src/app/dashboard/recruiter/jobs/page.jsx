import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Edit2, Trash2 } from "lucide-react"; 
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
                case 'inactive': return 'danger';
                default: return 'warning';
            }
        };

        return (
            <div className="p-6 max-w-7xl mx-auto space-y-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold tracking-tight">Manage All Jobs</h2>
                    <p className="text-sm text-default-500">
                        {jobs.length > 0 ? `${jobs.length} jobs posted` : 'No jobs posted yet'}
                    </p>
                </div>

                <Table aria-label="Company jobs management table">
                    <Table.ResizableContainer>
                        <Table.Content className="min-w-[800px]">
                            <Table.Header>
                                <Table.Column isRowHeader defaultWidth="2fr" id="jobTitle" minWidth={200}>
                                    Job Title
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.2fr" id="typeCategory" minWidth={150}>
                                    Type / Category
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="location" minWidth={120}>
                                    Location
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                                    Status
                                    <Table.ColumnResizer />
                                </Table.Column>
                                <Table.Column defaultWidth="1.2fr" id="actions" minWidth={150}>
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body emptyContent={"No jobs found for this company."}>
                                {jobs.map((job) => (
                                    <Table.Row key={job._id?.$oid || job._id?.toString() || job._id}>
                                        {/* Job Title */}
                                        <Table.Cell>
                                            <div className="font-medium text-default-800">
                                                {job.jobTitle}
                                            </div>
                                        </Table.Cell>

                                        {/* Type / Category */}
                                        <Table.Cell>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm capitalize font-medium">{job.jobType}</span>
                                                <span className="text-xs text-default-400 capitalize">{job.jobCategory}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Location */}
                                        <Table.Cell>
                                            <span className="text-sm text-default-600">
                                                {job.isRemote ? "Remote" : job.location}
                                            </span>
                                        </Table.Cell>

                                        {/* Status */}
                                        <Table.Cell>
                                            <Chip 
                                                color={getStatusColor(job.status)} 
                                                size="sm" 
                                                variant="soft"
                                                className="capitalize"
                                            >
                                                {job.status || "Unknown"}
                                            </Chip>
                                        </Table.Cell>

                                        {/* Actions */}
                                        <Table.Cell>
                                            <div className="relative flex items-center gap-2">
                                                <Tooltip content="View job details">
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        variant="light" 
                                                        aria-label="View job details"
                                                    >
                                                        <Eye className="text-default-400 w-4 h-4" />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Edit job">
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        variant="light" 
                                                        aria-label="Edit job"
                                                    >
                                                        <Edit2 className="text-default-400 w-4 h-4" />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip content="Delete job">
                                                    <Button 
                                                        isIconOnly 
                                                        size="sm" 
                                                        variant="light" 
                                                        color="danger"
                                                        aria-label="Delete job"
                                                    >
                                                        <Trash2 className="text-danger w-4 h-4" />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ResizableContainer>
                </Table>
            </div>
        );
    } catch (error) {
        console.error('Error loading jobs:', error);
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load jobs. Please try again.
            </div>
        );
    }
};

export default RecruiterJobs;
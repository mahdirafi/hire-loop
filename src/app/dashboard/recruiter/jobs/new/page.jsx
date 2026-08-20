"use client";
import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Switch,
    Button,
} from "@heroui/react";
import { Briefcase, Globe } from "@gravity-ui/icons";
import { createJob } from "@/lib/action/jobs";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
 

export default function PostJobPage() {
    const [mockCompany] = useState({
        name: "Acme Corp (Auto-filled)",
        id: "company_123",
        isApproved: true,
    });

    const [isRemote, setIsRemote] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mockCompany.isApproved) {
            alert("Your company profile must be approved before you can post jobs.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};
        if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
        if (!data.jobCategory) newErrors.jobCategory = "Job category is required";
        if (!data.jobType) newErrors.jobType = "Job type is required";
        if (!data.minSalary) newErrors.minSalary = "Minimum salary is required";
        if (!data.maxSalary) newErrors.maxSalary = "Maximum salary is required";
        if (!isRemote && !data.location) newErrors.location = "Location is required for non-remote roles";
        if (!data.deadline) newErrors.deadline = "Application deadline is required";
        if (!data.responsibilities) newErrors.responsibilities = "Responsibilities are required";
        if (!data.requirements) newErrors.requirements = "Requirements are required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            isRemote,
            companyId: mockCompany.id,
            status: "active",
            isPubliclyVisible: true,
        };

        try {
            const res = await createJob(payload);
            if (res.insertedId) {
                toast.success("Job posted successfully!");
                e.target.reset();
                setIsRemote(false);
                redirect("/dashboard/recruiter/jobs");
            }
        } catch (error) {
            console.error("Error posting job:", error);
            toast.error("Failed to post job");
        }
    };

    const textInputClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
    const textAreaClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-zinc-600 outline-none transition-all";

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight">Post a New Job</h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Fill out the details below to publish your open position.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                        <Briefcase size={14} className="text-zinc-500" />
                        Posting as: <span className="font-semibold text-zinc-300">{mockCompany.name}</span>
                        <span className="text-emerald-500 font-medium bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/50">Approved</span>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section: 1 Job Information */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Job Information
                        </legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Job Title */}
                            <TextField 
                                className="flex flex-col gap-1 w-full"
                                isInvalid={!!errors.jobTitle}
                            >
                                <Label className="text-zinc-400 font-medium text-sm">Job Title</Label>
                                <Input 
                                    name="jobTitle" 
                                    placeholder="e.g. Senior Frontend Engineer" 
                                    className={textInputClass}
                                />
                                {errors.jobTitle && <FieldError className="text-xs text-danger mt-1">{errors.jobTitle}</FieldError>}
                            </TextField>

                            {/* Job Category */}
                            <Select 
                                name="jobCategory"
                                className="w-full"
                                isInvalid={!!errors.jobCategory}
                            >
                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">Job Category</Label>
                                <Select.Trigger className="w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600">
                                    <Select.Value placeholder="Select category" />
                                    <Select.Indicator aria-hidden="true" />
                                </Select.Trigger>
                                {errors.jobCategory && <span className="text-xs text-danger mt-1">{errors.jobCategory}</span>}
                                <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1">
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="technology" textValue="Technology" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                            Technology
                                        </ListBox.Item>
                                        <ListBox.Item id="design" textValue="Design" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                            Design
                                        </ListBox.Item>
                                        <ListBox.Item id="marketing" textValue="Marketing" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                            Marketing
                                        </ListBox.Item>
                                        <ListBox.Item id="sales" textValue="Sales" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                            Sales
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Job Type */}
                            <Select 
                                name="jobType"
                                className="w-full"
                                isInvalid={!!errors.jobType}
                            >
                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">Job Type</Label>
                                <Select.Trigger className="w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600">
                                    <Select.Value placeholder="Select job type" />
                                    <Select.Indicator aria-hidden="true" />
                                </Select.Trigger>
                                {errors.jobType && <span className="text-xs text-danger mt-1">{errors.jobType}</span>}
                                <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1">
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="full-time" textValue="Full-time" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                            Full-time
                                        </ListBox.Item>
                                        <ListBox.Item id="part-time" textValue="Part-time" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                            Part-time
                                        </ListBox.Item>
                                        <ListBox.Item id="contract" textValue="Contract" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                            Contract
                                        </ListBox.Item>
                                        <ListBox.Item id="internship" textValue="Internship" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                            Internship
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Salary Range */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-2 space-y-1">
                                    <span className="text-zinc-400 font-medium text-sm block">Salary Range</span>
                                    <div className="flex gap-2">
                                        <TextField 
                                            className="w-full"
                                            isInvalid={!!errors.minSalary}
                                        >
                                            <Label className="sr-only">Minimum salary</Label>
                                            <Input 
                                                name="minSalary" 
                                                placeholder="Min" 
                                                type="number" 
                                                className={textInputClass}
                                            />
                                            {errors.minSalary && <FieldError className="text-xs text-danger">{errors.minSalary}</FieldError>}
                                        </TextField>
                                        <TextField 
                                            className="w-full"
                                            isInvalid={!!errors.maxSalary}
                                        >
                                            <Label className="sr-only">Maximum salary</Label>
                                            <Input 
                                                name="maxSalary" 
                                                placeholder="Max" 
                                                type="number" 
                                                className={textInputClass}
                                            />
                                            {errors.maxSalary && <FieldError className="text-xs text-danger">{errors.maxSalary}</FieldError>}
                                        </TextField>
                                    </div>
                                </div>

                                <Select 
                                    className="w-full mt-6" 
                                    name="currency" 
                                    defaultSelectedKeys={["USD"]}
                                    aria-label="Currency"
                                >
                                    <Select.Trigger className="w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600">
                                        <Select.Value />
                                        <Select.Indicator aria-hidden="true" />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1">
                                        <ListBox className="outline-none">
                                            <ListBox.Item id="USD" textValue="USD ($)" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                                USD ($)
                                            </ListBox.Item>
                                            <ListBox.Item id="EUR" textValue="EUR (€)" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                                EUR (€)
                                            </ListBox.Item>
                                            <ListBox.Item id="GBP" textValue="GBP (£)" className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800">
                                                GBP (£)
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-zinc-400 font-medium text-sm">Location</span>
                                    <Switch
                                        isSelected={isRemote}
                                        onChange={setIsRemote}
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        <Switch.Thumb />
                                        <Label className="text-xs text-zinc-400 font-medium">Remote</Label>
                                    </Switch>
                                </div>

                                <TextField 
                                    className="flex flex-col gap-1 w-full relative"
                                    isInvalid={!isRemote && !!errors.location}
                                >
                                    <Label className="sr-only">Location</Label>
                                    <div className="relative flex items-center">
                                        <Globe size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                        <Input
                                            name="location"
                                            placeholder={isRemote ? "Global / Remote" : "e.g. Austin, TX"}
                                            disabled={isRemote}
                                            className={`${textInputClass} pl-10`}
                                        />
                                    </div>
                                    {!isRemote && errors.location && <FieldError className="text-xs text-danger mt-1">{errors.location}</FieldError>}
                                </TextField>
                            </div>

                            <TextField 
                                className="flex flex-col gap-1 w-full"
                                isInvalid={!!errors.deadline}
                            >
                                <Label className="text-zinc-400 font-medium text-sm">Application Deadline</Label>
                                <Input 
                                    name="deadline" 
                                    type="date" 
                                    className={textInputClass}
                                />
                                {errors.deadline && <FieldError className="text-xs text-danger mt-1">{errors.deadline}</FieldError>}
                            </TextField>
                        </div>
                    </Fieldset>

                    {/*  Job Details */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Job Details & Description
                        </legend>

                        <TextField 
                            className="flex flex-col gap-1 w-full"
                            isInvalid={!!errors.responsibilities}
                        >
                            <Label className="text-zinc-400 font-medium text-sm">Responsibilities</Label>
                            <TextArea
                                name="responsibilities"
                                placeholder="Outline the core everyday responsibilities for this role..."
                                rows={4}
                                className={textAreaClass}
                            />
                            {errors.responsibilities && <FieldError className="text-xs text-danger mt-1">{errors.responsibilities}</FieldError>}
                        </TextField>

                        <TextField 
                            className="flex flex-col gap-1 w-full"
                            isInvalid={!!errors.requirements}
                        >
                            <Label className="text-zinc-400 font-medium text-sm">Requirements</Label>
                            <TextArea
                                name="requirements"
                                placeholder="List required experience, skills, and certifications..."
                                rows={4}
                                className={textAreaClass}
                            />
                            {errors.requirements && <FieldError className="text-xs text-danger mt-1">{errors.requirements}</FieldError>}
                        </TextField>

                        <TextField className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Benefits (Optional)</Label>
                            <TextArea
                                name="benefits"
                                placeholder="Perks, healthcare, equity, remote stipends..."
                                rows={3}
                                className={textAreaClass}
                            />
                        </TextField>
                    </Fieldset>

                    {/* ফর্ম অ্যাকশন */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
                        <Button
                            type="button"
                            variant="bordered"
                            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-6 font-medium h-11"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                        >
                            Post Job
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
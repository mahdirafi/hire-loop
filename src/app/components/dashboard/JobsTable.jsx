"use client";

import { Table } from "@heroui/react";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";

const JobsTable = ({ jobs }) => {
  return (
    <Table aria-label="Company jobs table">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[900px]">
          <Table.Header>
            <Table.Column isRowHeader>Job Title</Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>Type</Table.Column>
            <Table.Column>Salary</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column align="center">Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {jobs?.map((job) => (
              <Table.Row key={job._id}>
                <Table.Cell>{job.jobTitle}</Table.Cell>
                <Table.Cell>{job.jobCategory}</Table.Cell>
                <Table.Cell>{job.jobType}</Table.Cell>
                <Table.Cell>
                  {job.minSalary} - {job.maxSalary} {job.currency}
                </Table.Cell>
                <Table.Cell>{job.status}</Table.Cell>
                <Table.Cell align="center">
                  <div className="flex items-center justify-center gap-3">
                    {/* Details */}
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800"
                      aria-label="Details"
                      onClick={() => {
                        // TODO: details logic (route or modal)
                        console.log("Details job:", job._id);
                      }}
                    >
                      <FaInfoCircle size={18} />
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      className="text-green-600 hover:text-green-800"
                      aria-label="Edit"
                      onClick={() => {
                        // TODO: edit logic (route or modal)
                        console.log("Edit job:", job._id);
                      }}
                    >
                      <FaEdit size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete"
                      onClick={() => {
                        // TODO: delete logic
                        console.log("Delete job:", job._id);
                      }}
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};

export default JobsTable;
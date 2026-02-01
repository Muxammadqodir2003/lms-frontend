"use client";

import { useGetLogsQuery } from "@/services/admin/adminApi";
import { Table } from "@chakra-ui/react";
import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

const LogsView = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetLogsQuery(page);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Table.Root size="lg" striped mt={"3"}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader p={"2"}>Number</Table.ColumnHeader>
          <Table.ColumnHeader>Email</Table.ColumnHeader>
          <Table.ColumnHeader>IP Address</Table.ColumnHeader>
          <Table.ColumnHeader>User Agent</Table.ColumnHeader>
          <Table.ColumnHeader>Reason</Table.ColumnHeader>
          <Table.ColumnHeader>Time</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.map((item, index) => (
          <Table.Row key={item.id}>
            <Table.Cell p={"2"}>#{index + 1}</Table.Cell>
            <Table.Cell>{item.email}</Table.Cell>
            <Table.Cell>{item.ipAddress}</Table.Cell>
            <Table.Cell>{item.userAgent.split(" ")[0]}</Table.Cell>
            <Table.Cell>{item.reason}</Table.Cell>
            <Table.Cell>
              {formatDistanceToNowStrict(item.createdAt, { addSuffix: true })}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default LogsView;

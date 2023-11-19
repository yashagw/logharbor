"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "./ui/data-table";
import { DataContext, Log } from "@/app/providers";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FiltersTabs } from "./FiltersTabs";

const defaultLogs: Log[] = [
  {
    message: "Log message xx",
    timestamp: "2022-12-01T12:00:00.000Z",
    level: "info",
    traceId: "b3bae8c1-3342-46f3-a675-1f4dd4b2a686",
    spanId: "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
    commit: "123abc456def789ghi012jkl345mno678pqr",
    parentResourceId: "987zyx654wvu321tsr098zyx654wvu321tsr",
    resourceId: "faldjkf",
  },
  {
    message: "Log message -1",
    timestamp: "2022-12-01T12:01:00.000Z",
    level: "info",
    traceId: "c4d5e6f7-890a-1b2c-3d4e-5f67890a1b2c",
    spanId: "d4e5f678-90a1-b2c3-d4e5-f67890a1b2c3",
    commit: "234bcd567efg890hij123klm456nop789qrs",
    parentResourceId: "876yxw543vut210srq987yxw543vut210srq",
    resourceId: "faldjkf",
  },
];

const columnHelper = createColumnHelper<Log>();

const columns: ColumnDef<Log, string>[] = [
  columnHelper.accessor("timestamp", {
    header: "Timestamp",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("level", {
    header: () => "Level",
    cell: (info) => <Badge>{info.renderValue()}</Badge>,
  }),
  columnHelper.accessor("message", {
    header: "Message",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("commit", {
    header: () => "Commit",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("traceId", {
    header: () => <span>Trace Id</span>,
  }),
  columnHelper.accessor("spanId", {
    header: "Span Id",
  }),
  columnHelper.accessor("parentResourceId", {
    header: "Parent Resource Id",
  }),
  columnHelper.accessor("resourceId", {
    header: "Resource Id",
  }),
];

export const LogTable = () => {
  const { logs, loading, serviceDown } = React.useContext(DataContext);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader2 className="w-7 h-7 animate-spin" />
      </div>
    );
  }

  if (serviceDown) {
    return (
      <div className="w-full h-full flex justify-center items-center flex-col">
        <div className="text-center">
          <p>Service is down due to some error.</p>
          <p>Please try again later!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FiltersTabs />
      <DataTable columns={columns} data={logs} />
    </>
  );
};

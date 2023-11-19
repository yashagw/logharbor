"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "./ui/data-table";
import { DataContext, Log } from "@/app/providers";
import { Loader2 } from "lucide-react";

const columnHelper = createColumnHelper<Log>();

const columns: ColumnDef<Log, string>[] = [
  columnHelper.accessor("message", {
    header: "Message",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("timestamp", {
    header: "Timestamp",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("level", {
    header: () => "Level",
    cell: (info) => <i>{info.renderValue()}</i>,
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

  return <DataTable columns={columns} data={logs} />;
};

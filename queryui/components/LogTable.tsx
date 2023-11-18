"use client";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "./ui/data-table";

type Log = {
  message: string;
  timestamp: string;
  level: string;
  traceId: string;
  spanId: string;
  commit: string;
  parentResourceId: string;
};

const defaultLogs: Log[] = [
  {
    message: "Log message 0",
    timestamp: "2022-12-01T12:00:00.000Z",
    level: "info",
    traceId: "b3bae8c1-3342-46f3-a675-1f4dd4b2a686",
    spanId: "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
    commit: "123abc456def789ghi012jkl345mno678pqr",
    parentResourceId: "987zyx654wvu321tsr098zyx654wvu321tsr",
  },
  {
    message: "Log message 1",
    timestamp: "2022-12-01T12:01:00.000Z",
    level: "info",
    traceId: "c4d5e6f7-890a-1b2c-3d4e-5f67890a1b2c",
    spanId: "d4e5f678-90a1-b2c3-d4e5-f67890a1b2c3",
    commit: "234bcd567efg890hij123klm456nop789qrs",
    parentResourceId: "876yxw543vut210srq987yxw543vut210srq",
  },
  {
    message: "Log message 2",
    timestamp: "2022-12-01T12:02:00.000Z",
    level: "info",
    traceId: "e5f67890-a1b2-c3d4-e5f6-7890a1b2c3d4",
    spanId: "f67890a1-b2c3-d4e5-f678-90a1b2c3d4e5",
    commit: "345def678ghi901ijk234lmn567opq890rst",
    parentResourceId: "765xw432uts109rq765xw432uts109rq765x",
  },
  {
    message: "Log message 3",
    timestamp: "2022-12-01T12:03:00.000Z",
    level: "info",
    traceId: "67890a1b-2c3d-4e5f-6789-0a1b2c3d4e5f",
    spanId: "7890a1b2-c3d4-e5f6-7890-a1b2c3d4e5f6",
    commit: "456efg789hij012jkl345mno678pqr901stu",
    parentResourceId: "654wv321tsr098z654wv321tsr098z654wv3",
  },
  {
    message: "Log message 4",
    timestamp: "2022-12-01T12:04:00.000Z",
    level: "info",
    traceId: "7890a1b2-c3d4-e5f6-7890-a1b2c3d4e5f6",
    spanId: "890a1b2c-3d4e-5f67-890a-1b2c3d4e5f67",
    commit: "567ghi890ijk123lmn456opq789rst012uvw",
    parentResourceId: "543v210srq987y543v210srq987y543v210s",
  },
];

const columnHelper = createColumnHelper<Log>();

const columns = [
  columnHelper.accessor("message", {
    header: "Message",
    cell: (info) => info.getValue(),
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
];

export const LogTable = () => {
  const [data, setData] = React.useState(() => [...defaultLogs]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable columns={columns} data={data} />;
};

"use client";

import { createContext, useEffect, useState } from "react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

export type Log = {
  message: string;
  timestamp: string;
  level: string;
  traceId: string;
  spanId: string;
  commit: string;
  parentResourceId: string;
  resourceId: string;
};

type Data = {
  loading: boolean;
  error: string;
  logs: Log[];
  serviceDown: boolean;
  getData: (filters: Filters) => void;
};

const defaultData: Data = {
  loading: false,
  serviceDown: false,
  error: "",
  logs: [],
  getData: () => {},
};

export const FiltersSchema = z
  .object({
    levels: z.array(z.string()),
    traceId: z.string(),
    spanId: z.string(),
    parentResouceId: z.string(),
    resourceId: z.string(),
    commit: z.string(),
    message: z.string(),
    from: z.date(),
    to: z.date(),
  })
  .refine((data) => data.from <= data.to, {
    message: "To date must be more than from date",
    path: ["to"],
  });

export type Filters = z.infer<typeof FiltersSchema>;

export const defaultFilters = {
  levels: [],
  traceId: "",
  spanId: "",
  parentResouceId: "",
  resourceId: "",
  commit: "",
  message: "",
  from: new Date(new Date().setDate(new Date().getDate() - 5)),
  to: new Date(),
};

export const DataContext = createContext(defaultData);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [serviceDown, setServiceDown] = useState(false);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const getData = async (filters: Filters) => {
    setLoading(true);
    setCount((c) => c + 1);

    const url = new URL("http://localhost:3000/search");
    const body = {
      levels: filters.levels,
      traceId: filters.traceId,
      spanId: filters.spanId,
      parentResourceId: filters.parentResouceId,
      resourceId: filters.resourceId,
      commit: filters.commit,
      message: filters.message,
      from: filters.from.toISOString(),
      to: filters.to.toISOString(),
    };

    console.log(body);

    try {
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.message);
      }

      setLogs(data.logEntries);
      setLoading(false);
    } catch (err) {
      console.log("error in catch is ", err);
      console.log("count is ", count);
      setError("Error while fetching data");

      if (count == 1) {
        setServiceDown(true);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    getData(defaultFilters);
  }, []);

  return <DataContext.Provider value={{ logs, loading, error, getData, serviceDown }}>{children}</DataContext.Provider>;
};
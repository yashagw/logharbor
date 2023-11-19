"use client";

import { DataContext } from "@/app/providers";

import React from "react";
import { Badge } from "@/components/ui/badge";

export const FiltersTabs = () => {
  const { filters } = React.useContext(DataContext);

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.from && (
        <Badge variant="outline">
          <p className="font-bold">From </p> : {filters.from.toDateString()}
        </Badge>
      )}
      {filters.to && (
        <Badge variant="outline">
          <p className="font-bold">To </p> : {filters.to.toDateString()}
        </Badge>
      )}
      {filters.levels.map((level) => {
        return (
          <Badge variant="outline">
            <p className="font-bold">Level </p>: {level}
          </Badge>
        );
      })}
      {filters.traceId && (
        <Badge variant="outline">
          <p className="font-bold">Trace Id </p> : {filters.traceId}
        </Badge>
      )}
      {filters.spanId && (
        <Badge variant="outline">
          <p className="font-bold">Span Id </p> : {filters.spanId}
        </Badge>
      )}
      {filters.commit && (
        <Badge variant="outline">
          <p className="font-bold">Commit </p> : {filters.commit}
        </Badge>
      )}
      {filters.parentResouceId && (
        <Badge variant="outline">
          <p className="font-bold">Parent Resource Id </p> : {filters.parentResouceId}
        </Badge>
      )}
      {filters.resourceId && (
        <Badge variant="outline">
          <p className="font-bold">Resource Id </p> : {filters.resourceId}
        </Badge>
      )}
    </div>
  );
};

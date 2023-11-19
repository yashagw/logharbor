"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { DataContext, Filters, FiltersSchema, defaultFilters } from "@/app/providers";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const levels = [
  {
    id: "info",
    label: "Info",
  },
  {
    id: "error",
    label: "Error",
  },
  {
    id: "warn",
    label: "Warn",
  },
  {
    id: "trace",
    label: "Trace",
  },
  {
    id: "debug",
    label: "Debug",
  }
] as const;

export const Sidebar = () => {
  const { getData, loading } = useContext(DataContext);

  const form = useForm<Filters>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: defaultFilters,
  });

  async function onSubmit(data: Filters) {
    console.log("submitting");
    if (loading) return;
    await getData(data);
  }

  return (
    <div className="w-1/5 min-w-[300px] h-full border-r bg-white flex flex-col  justify-between">
      <div className="px-4 py-2">
        <h4 className="text-md  font-bold text-secondary-foreground">Filters</h4>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar border-t ">
        <Form {...form}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <Input placeholder="abc-xyz-123" {...field} className="py-2 bg-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="levels"
            render={() => (
              <FormItem>
                <FormLabel>Levels</FormLabel>
                <div className="space-y-2">
                  {levels.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="levels"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 px-0 py-0 mx-0 border-none"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="traceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trace ID</FormLabel>
                <Input placeholder="abc-xyz-123" {...field} className="py-2 bg-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="spanId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Span ID</FormLabel>
                <Input placeholder="abc-xyz-123" {...field} className="py-2 bg-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commit</FormLabel>
                <Input placeholder="abc-xyz-123" {...field} className="py-2 bg-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentResouceId"
            render={({ field }) => (
              <FormItem className="py-2 px-4">
                <FormLabel>Parent Resource ID</FormLabel>
                <Input placeholder="abc-xyz-123" {...field} className="py-2 bg-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resourceId"
            render={({ field }) => (
              <FormItem className="py-2 px-4">
                <FormLabel>Resource ID</FormLabel>
                <Input placeholder="abc-xyz-123" {...field} className="py-2 bg-white" />
              </FormItem>
            )}
          />
        </Form>
      </div>
      <div className="px-4 py-4">
        <Button
          variant="default"
          className="w-full"
          onClick={form.handleSubmit(onSubmit, (data) => {
            console.log(data);
          })}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

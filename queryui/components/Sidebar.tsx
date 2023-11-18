"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const levels = [
  {
    id: "Info",
    label: "info",
  },
  {
    id: "Error",
    label: "error",
  },
  {
    id: "Debug",
    label: "debug",
  },
  {
    id: "Warn",
    label: "warn",
  },
  {
    id: "Trace",
    label: "trace",
  },
  {
    id: "Fatal",
    label: "fatal",
  },
] as const;

const FormSchema = z.object({
  levels: z.array(z.string()),
  resourceid: z.string(),
  traceId: z.string(),
  spanId: z.string(),
  parentResouceId: z.string(),
  commit: z.string(),
  message: z.string(),
});

export const Sidebar = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      levels: [],
      resourceid: "",
      traceId: "",
      spanId: "",
      parentResouceId: "",
      commit: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <div className="w-1/5 min-w-[300px] h-full border-r bg-white flex flex-col  justify-between">
      <div className="px-4 py-4">
        <h1 className="text-lg font-bold text-secondary-foreground">Logizer</h1>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar border-t ">
        <Form {...form}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <Input placeholder="db failed to start" {...field} className="py-2 bg-white" />
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
            name="resourceid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resource ID</FormLabel>
                <Input placeholder="abc-xyz-123" {...field} className="py-2 bg-white" />
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
        </Form>
      </div>
      <div className="px-4 py-4">
        <Button variant="default" className="w-full" onClick={form.handleSubmit(onSubmit)}>
          Search
        </Button>
      </div>
    </div>
  );
};

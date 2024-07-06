"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(1).max(500),
    githubRepo: z.string().min(1).max(500),
    tags: z.string().min(1).max(50),
});

const createGroupForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            githubRepo: "",
            tags: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Send the values to the server
        console.log(values);
    }

    return (
        <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
            <form>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Rest of the form fields */}

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default createGroupForm;

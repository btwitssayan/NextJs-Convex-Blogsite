"use client";

import { createBlogAction } from "@/app/action/action";
import { blogSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImageDropzone } from "@/components/image-dropzone";
import z from "zod";  
import { isAuthenticated } from "@/lib/auth-server";

function CreatePage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof blogSchema>) {
    startTransition(async () => {
      await createBlogAction(data);
      router.push("/blog");
    });
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Create a New Blog
        </h1>
        <p className="mt-3 text-muted-foreground">
          Share your thoughts, ideas, and stories with the world.
        </p>
      </header>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Blog Details</CardTitle>
          <CardDescription>
            Fill in the information below to publish your article.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FieldGroup>
              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      placeholder="Enter a compelling title"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Content */}
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      rows={6}
                      placeholder="Write your blog content here..."
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Image Upload */}
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Cover Image</FieldLabel>
                    <ImageDropzone
                      value={field.value}
                      onChange={field.onChange}
                      error={!!fieldState.error}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4 [animation-duration:0.5s]" />
                    Publishing...
                  </>
                ) : (
                  "Publish Blog"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default CreatePage;

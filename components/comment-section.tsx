"use client";

import React, { useTransition } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { MessageSquare, Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comment";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Preloaded, useMutation, usePreloadedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function CommentSection(props: {
  preloadedComments: Preloaded<typeof api.comment.getCommentByBlogId>;
}) {
  const params = useParams<{ blogId: Id<"blogs"> }>();
  const comments = usePreloadedQuery(props.preloadedComments);

  const createComment = useMutation(api.comment.createComment);
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      blogId: params.blogId,
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      try {
        await createComment(data);
        form.reset();
        toast.success("Comment posted");
      } catch (error) {
        toast.error("Failed to create comment");
      }
    });
  };

  if (comments === undefined) {
      return <p>Loading...</p>;
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">{comments.length } Comments</h2>
      </CardHeader>
      <CardContent className="space-y-8">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Textarea
                  placeholder="Share your thoughts..."
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner className="mr-2 h-4 w-4 [animation-duration:0.5s]" />
                Posting comment...
              </>
            ) : (
              <>
                Comment
                <Send />
              </>
            )}
          </Button>
        </form>
        {comments?.length > 0 && <Separator />}
        <section>
            {comments?.map((comment) => 
              (
                <div key={comment._id} className="flex gap-4">
                    <Avatar className="size-10 shrink-0">
                        
                        <AvatarImage src={ comment.authorImage ? comment.authorImage :`https://avatar.vercel.sh/${comment.authorName}`}
                        alt={comment.authorName} />
                        <AvatarFallback>{comment.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{comment.authorName}</p>
                            <p className="text-muted-foreground text-xl">{new Date(comment._creationTime).toDateString()}</p>
                        </div>
                        <p className="text-sm text-foreground/90 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                </div>
            ))}
        </section>
      </CardContent>
    </Card>
  );
}

export default CommentSection;

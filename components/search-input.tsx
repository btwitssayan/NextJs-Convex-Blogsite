"use client";

import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";

function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.blog.searchBlogs,
    term.length >= 2 ? { term, limit: 5 } : "skip"
  );

  const isLoading = results === undefined;

  return (
    <div className="relative z-10 w-full max-w-sm">
      {/* Input */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search posts..."
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
          }}
          className="pl-9"
        />
      </div>

      {/* Results */}
      {open && term.length >= 2 && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover shadow-md">
          {isLoading && (
            <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Searching…
            </div>
          )}

          {!isLoading && results.length === 0 && (
            <div className="px-4 py-2 text-sm text-muted-foreground">
              No results found
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div>
              {results.map((result, index) => (
                <div key={result._id}>
                  <Link
                    href={`/blog/${result._id}`}
                    onClick={() => {
                      setOpen(false);
                      setTerm("");
                    }}
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <p className="truncate font-medium">{result.title}</p>
                    <p className="pt-1 text-xs text-muted-foreground">
                      {result.content.substring(0, 60)}
                    </p>
                  </Link>

                  {index !== results.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchInput;

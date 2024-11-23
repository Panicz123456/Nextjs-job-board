import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobListItem from "@/components/JobListItem";
import JobResult from "@/components/JobResult";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { PageProps } from "../../.next/types/app/page";
import { Metadata } from "next";

interface iAppProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? "Remote developers Jobs"
        : "All developer jobs";

  const titleSuffic = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffic}`;
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Flow Jobs`,
  };
}

export default async function Home({
  searchParams: { location, q, remote, type, page },
}: iAppProps) {
  const filterValue: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValue)}</H1>
        <p className="text-muted-foreground">Find your dream jobs</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValue} />
        <JobResult
          filterValues={filterValue}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}

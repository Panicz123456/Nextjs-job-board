"use server"

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const {
    title,
    type,
    companyName,
    companyLogoUrl,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogo: string | undefined = undefined;

  // Ensure the companyLogoUrl is processed correctly
  if (companyLogoUrl instanceof File) {
    // Check if it's a File
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogoUrl.name)}`,
      companyLogoUrl,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    companyLogo = blob.url; // Use the URL generated from the blob
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl: companyLogo, // Correctly assign the string URL
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
    },
  });

  redirect("/job-submitted");
}

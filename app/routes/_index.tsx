import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { CourseCard } from "~/components/course-card";
import { Input } from "~/components/ui/input";

import { ScrollArea } from "~/components/ui/scroll-area";
import { getCourses } from "~/data/getter";
import { SiteHeader } from "~/components/site-header";

export const meta: MetaFunction = () => {
  return [
    { title: "Course Scheduler" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const courses = await getCourses(q);
  return json({ courses, q });
};

export default function Index() {
  const { courses, q } = useLoaderData<typeof loader>();

  const [query, setQuery] = useState(q || "");
  const submit = useSubmit();

  useEffect(() => {
    setQuery(q || "");
  }, [q]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">
        <div className="mx-auto grid h-[calc(100vh-4rem)] w-full pt-6 lg:grid-cols-12">
          <div className="col-span-1 h-full overflow-hidden px-8 lg:col-span-3">
            <h1 className="font-display">BBA26 All Courses</h1>
            <h1 className="font-display mt-4">Search for Course(s)</h1>

            <Form
              id="search"
              role="search"
              onChange={(event) => submit(event.currentTarget)}
            >
              <div className="flex flex-col items-center justify-center">
                <Input
                  className="mt-4"
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  value={query}
                  name="q"
                  id="q"
                />
              </div>
            </Form>
            <ScrollArea className="h-full pt-8">
              {courses &&
                courses.map((course) => {
                  return <CourseCard course={course} key={course.id} />;
                })}
            </ScrollArea>
          </div>
          <div className="col-span-3 h-full w-full lg:col-span-9 lg:border-l"></div>
        </div>
      </div>
    </div>
  );
}

import type { Course } from "~/lib/search-prereq";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export interface MappedCourse extends Course {
  id: string;
}

export const CourseCard = ({ course }: { course: MappedCourse }) => (
  <Card key={course.abbrev} className="mt-4 w-full">
    <CardHeader>
      <CardTitle>{course.name}</CardTitle>
      <CardDescription>
        {course.id} {course.abbrev}
      </CardDescription>
      <CardDescription>{course.credit}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{course.description}</p>
    </CardContent>
    <CardFooter>
      <p>{course.raw_prereq}</p>
    </CardFooter>
  </Card>
);

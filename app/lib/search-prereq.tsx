import BBA26Courses from "~/data/26.json";

export interface Course {
  abbrev: string;
  name: string;
  credit: string;
  description: string;
  raw_prereq: string | null;
  prereq: number[] | null[];
}

export interface CourseRecord {
  [key: string]: Course;
}

export const searchPreReq = (
  query: string,
  courses: CourseRecord = {}
): CourseRecord => {
  if (courses.hasOwnProperty(query)) {
    return courses;
  }

  const course = BBA26Courses[query as keyof typeof BBA26Courses];

  if (!course) {
    return {};
  }

  courses = { ...courses, [query]: course };

  if (course.prereq) {
    course.prereq.forEach((element) => {
      courses = searchPreReq(`${element}`, courses);
    });
  }

  return courses;
};

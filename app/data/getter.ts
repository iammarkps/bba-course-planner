import BBA26Courses from "./26.json";
import Fuse from "fuse.js";

export const getCourses = async (query?: string | null) => {
  const courses = Object.keys(BBA26Courses).map((key) => {
    const course = BBA26Courses[key as keyof typeof BBA26Courses];
    return {
      ...course,
      id: key,
    };
  });

  if (query) {
    const fuse = new Fuse(courses, {
      keys: ["id", "name", "abbrev"],
      threshold: 0.25,
    });

    return fuse.search(query).map((course) => course.item);
  }

  return courses;
};

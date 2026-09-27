"use client";

import { Course } from "@/lib/courses";

export default function CourseCard({
  course,
  onOpen,
}: {
  course: Course;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      className="bg-card border border-white/[0.06] rounded-2xl p-4.5 cursor-pointer transition-all hover:-translate-y-0.5 hover:border-accent/35"
    >
      <span className="text-[11px] bg-accent/10 text-accent px-2 py-1 rounded-full font-semibold">
        {course.tag}
      </span>
      <div className="font-semibold mt-3 mb-1 text-[15px]">{course.title}</div>
      <div className="text-gray-400 text-[13px] leading-snug mb-3.5">
        {course.desc}
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${course.progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1.5">
        <span>{course.progress}% complete</span>
        <span>{course.lessons.length} lessons</span>
      </div>
    </div>
  );
}

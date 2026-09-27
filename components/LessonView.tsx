"use client";

import { Course, Lesson } from "@/lib/courses";
import { LockIcon, CheckIcon } from "./icons";

export default function LessonView({
  course,
  onBack,
  onToggleLesson,
}: {
  course: Course;
  onBack: () => void;
  onToggleLesson: (lessonIndex: number) => void;
}) {
  return (
    <div className="bg-card border border-white/[0.06] rounded-2xl p-5">
      <span
        onClick={onBack}
        className="text-accent text-[13px] cursor-pointer mb-4 inline-block hover:underline"
      >
        ← Back
      </span>
      <h1 className="text-2xl mb-1">{course.title}</h1>
      <div className="text-gray-400 text-sm mb-2">{course.desc}</div>

      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-7">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${course.progress}%` }}
        />
      </div>

      <div className="flex flex-col gap-2">
        {course.lessons.map((lesson, i) => {
          const isClickable = !lesson.locked;
          return (
            <div
              key={lesson.name}
              onClick={() => isClickable && onToggleLesson(i)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] border text-[13px] transition-colors ${
                lesson.locked
                  ? "border-white/[0.06] opacity-50 cursor-not-allowed"
                  : "border-white/[0.06] cursor-pointer hover:bg-white/[0.05] hover:border-accent/30 active:scale-[0.99]"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  lesson.locked
                    ? "bg-gray-400 opacity-40"
                    : lesson.done
                      ? "bg-accent"
                      : "bg-gray-500"
                }`}
              />
              <span className={lesson.done ? "line-through text-gray-500" : ""}>
                {lesson.name}
              </span>
              <span className="ml-auto text-gray-400 text-xs flex items-center gap-1.5">
                {lesson.locked ? (
                  <>
                    <LockIcon /> Locked
                  </>
                ) : lesson.done ? (
                  <>
                    <CheckIcon /> Done
                  </>
                ) : (
                  "Click to complete"
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CourseCard from "@/components/CourseCard";
import LessonView from "@/components/LessonView";
import { courses as initialCourses, Course } from "@/lib/courses";

type View = "dashboard" | "courses" | "progress" | "settings";

function recalcProgress(course: Course): Course {
  const total = course.lessons.length;
  const done = course.lessons.filter((l) => l.done).length;
  return { ...course, progress: Math.round((done / total) * 100) };
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [view, setView] = useState<View>("dashboard");
  const [openCourseIdx, setOpenCourseIdx] = useState<number | null>(null);
  const [name, setName] = useState("Jii");
  const [email, setEmail] = useState("jii@yur1.xyz");

  const avgProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / courses.length,
  );
  const totalDone = courses.reduce(
    (sum, c) => sum + c.lessons.filter((l) => l.done).length,
    0,
  );
  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);

  function toggleLesson(courseIdx: number, lessonIdx: number) {
    setCourses((prev) =>
      prev.map((c, i) => {
        if (i !== courseIdx) return c;
        const lessons = c.lessons.map((l, j) =>
          j === lessonIdx ? { ...l, done: !l.done } : l,
        );
        const updatedLessons = lessons.map((l, j) => {
          if (j === 0) return { ...l, locked: false };
          return { ...l, locked: !lessons[j - 1].done && l.locked };
        });
        return recalcProgress({ ...c, lessons: updatedLessons });
      }),
    );
  }

  function openCourse(idx: number) {
    setOpenCourseIdx(idx);
  }

  return (
    <div className="flex min-h-screen relative">
      <div className="fixed w-[420px] h-[420px] rounded-full bg-accent blur-[90px] opacity-[0.18] -top-32 -left-24 pointer-events-none" />
      <div className="fixed w-[380px] h-[380px] rounded-full bg-blue-500 blur-[90px] opacity-[0.18] -bottom-36 -right-24 pointer-events-none" />

      <Sidebar
        active={view}
        onNavigate={(v) => {
          setView(v);
          setOpenCourseIdx(null);
        }}
      />

      <div className="flex-1 p-10 max-w-[1100px] relative z-10">
        {openCourseIdx !== null ? (
          <LessonView
            course={courses[openCourseIdx]}
            onBack={() => setOpenCourseIdx(null)}
            onToggleLesson={(lessonIdx) =>
              toggleLesson(openCourseIdx, lessonIdx)
            }
          />
        ) : view === "dashboard" ? (
          <>
            <h1 className="text-2xl mb-1">Welcome back, {name}</h1>
            <div className="text-gray-400 text-sm mb-7">
              Here&apos;s where you left off.
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <StatCard num={courses.length} label="Courses in progress" />
              <StatCard num={`${avgProgress}%`} label="Avg. completion" />
              <StatCard num={totalDone} label="Lessons completed" />
            </div>

            <div className="text-[15px] font-semibold mb-3.5">
              Continue learning
            </div>
            <div className="grid grid-cols-2 gap-4">
              {courses.map((course, i) => (
                <CourseCard
                  key={course.title}
                  course={course}
                  onOpen={() => openCourse(i)}
                />
              ))}
            </div>
          </>
        ) : view === "courses" ? (
          <>
            <h1 className="text-2xl mb-1">My Courses</h1>
            <div className="text-gray-400 text-sm mb-7">
              All {courses.length} courses you&apos;re enrolled in.
            </div>
            <div className="grid grid-cols-2 gap-4">
              {courses.map((course, i) => (
                <CourseCard
                  key={course.title}
                  course={course}
                  onOpen={() => openCourse(i)}
                />
              ))}
            </div>
          </>
        ) : view === "progress" ? (
          <>
            <h1 className="text-2xl mb-1">Progress</h1>
            <div className="text-gray-400 text-sm mb-7">
              {totalDone} of {totalLessons} lessons completed overall.
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <StatCard num={`${avgProgress}%`} label="Overall completion" />
              <StatCard num={totalDone} label="Lessons done" />
              <StatCard
                num={totalLessons - totalDone}
                label="Lessons remaining"
              />
            </div>

            <div className="flex flex-col gap-3">
              {courses.map((course) => (
                <div
                  key={course.title}
                  className="bg-card border border-white/[0.06] rounded-2xl p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">
                      {course.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-1">Settings</h1>
            <div className="text-gray-400 text-sm mb-7">
              Manage your profile.
            </div>

            <div className="bg-card border border-white/[0.06] rounded-2xl p-6 max-w-md flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400">Display name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm outline-none focus:border-accent/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm outline-none focus:border-accent/50"
                />
              </div>
              <button
                onClick={() => setView("dashboard")}
                className="bg-accent text-base font-semibold rounded-lg py-2 text-sm mt-2 hover:opacity-90 transition-opacity"
              >
                Save changes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ num, label }: { num: string | number; label: string }) {
  return (
    <div className="bg-card border border-white/[0.06] rounded-2xl p-4.5 transition-all hover:border-accent/20">
      <div className="text-[26px] font-bold">{num}</div>
      <div className="text-gray-400 text-[13px] mt-1">{label}</div>
    </div>
  );
}

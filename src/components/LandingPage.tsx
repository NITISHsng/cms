import { ReactNode } from "react";
import {
  GraduationCap,
  Users,
  Target,
  Cpu,
  ArrowRight,
  LogIn,
} from "lucide-react";

type LandingPageProps = {
  onLoginClick: () => void;
};

type TeamMember = {
  name: string;
  role: string;
  photoUrl?: string | null;
};

const team: TeamMember[] = [
  { name: "Papai Mandal", role: "Project Lead", photoUrl: null },
  { name: "Pragya Sarkar", role: "Frontend Developer", photoUrl: null },
  { name: "Nitish Chandra Singha", role: "Backend Developer", photoUrl: null },
  { name: "Miraj Laskor", role: "UI/UX Designer", photoUrl: null },
  { name: "Mohit Sing", role: "QA & Documentation", photoUrl: null },
];

const techStack = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Lucide Icons",
];

const Section = ({ id, children }: { id: string; children: ReactNode }) => (
  <section id={id} className="py-16 sm:py-20">
    {children}
  </section>
);

const Avatar = ({
  name,
  photoUrl,
}: {
  name: string;
  photoUrl?: string | null;
}) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
  return photoUrl ? (
    <img
      src={photoUrl}
      alt={name}
      className="w-16 h-16 rounded-full object-cover"
    />
  ) : (
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg font-semibold">
      {initials}
    </div>
  );
};

const LandingPage = ({ onLoginClick }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600">
                <img src="/gceltLogo.png" alt="" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900">GCELT</span>
                <span className="text-xs text-slate-600">
                  Software Engineering Assignments
                </span>
              </div>
            </div>
            {/* Center Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a
                href="#hero"
                className="text-slate-700 hover:text-blue-700 hover:underline underline-offset-4 transition duration-200"
              >
                Home
              </a>
              <a
                href="#team"
                className="text-slate-700 hover:text-blue-700 hover:underline underline-offset-4 transition duration-200"
              >
                Team
              </a>
              <a
                href="#project"
                className="text-slate-700 hover:text-blue-700 hover:underline underline-offset-4 transition duration-200"
              >
                Project
              </a>
            </nav>
            <button
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
          </div>
        </div>
      </header>

      <Section id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 mb-4">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-medium">PCA 2 • GCELT</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                Software Engineering Assignment
              </h1>
              <p className="text-slate-700 mb-6">
                The Government College of Engineering and Leather Technology
                presents a modern, responsive web interface developed for the
                Software Engineering course project, highlighting its
                objectives, team members, and the technologies used.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onLoginClick}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  <LogIn className="w-5 h-5" />
                  Open Login
                </button>
                <a
                  href="#project"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100 transition"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img src="/college.webp" alt="" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-6 h-6 text-blue-700" />
            <h2 className="text-2xl font-bold">Team Members</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center gap-4"
              >
                <Avatar name={member.name} photoUrl={member.photoUrl} />
                <div>
                  <p className="font-semibold text-slate-900">{member.name}</p>
                  <p className="text-sm text-slate-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="project">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-blue-700" />
            <h2 className="text-2xl font-bold">Project Details</h2>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Project Description
                </h3>
                <p className="text-slate-700">
                  The Course Management System (CMS) is a web-based application
                  designed to help educational institutions efficiently manage
                  courses, assignments, learning materials, and grading. It
                  serves as a unified platform for students, instructors, and
                  administrators to interact seamlessly. Instructors can create
                  and manage courses, upload study materials, assign and
                  evaluate student work, and share announcements. Students can
                  enroll in courses, access resources, submit assignments, and
                  review grades and feedback. Administrators oversee user
                  management, course activities, and report generation.
                </p>
                <p className="text-slate-700 mt-2">
                  This system streamlines academic management by minimizing
                  manual processes, enhancing communication, and offering an
                  organized, user-friendly interface for all participants. Built
                  using React and Tailwind CSS, it employs dummy JSON data to
                  simulate real operations, making it an ideal front-end
                  prototype to demonstrate digital learning management
                  functionalities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Project Goals</h3>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>
                    Digitally manage academic workflows such as course creation,
                    enrollment, material sharing, and grading.
                  </li>
                  <li>
                    Facilitate seamless communication between students,
                    instructors, and administrators through a unified interface.
                  </li>
                  <li>
                    Reduce manual paperwork and ensure that course-related
                    information is easily accessible online.
                  </li>
                  <li>
                    Provide an intuitive, responsive, and user-friendly
                    interface for all user roles.
                  </li>
                  <li>
                    Simulate real-world learning management operations using
                    dummy data for testing and demonstration purposes.
                  </li>
                  <li>
                    Enhance productivity, transparency, and efficiency in course
                    management processes.
                  </li>
                  <li>
                    Showcase modern front-end development practices using React
                    and Tailwind CSS.
                  </li>
                </ul>
              </div>

              <div>
                {/* <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200">
                      {t}
                    </span>
                  ))}
                </div> */}
              </div>
              <div className="pt-2">
                <button
                  onClick={onLoginClick}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  <LogIn className="w-5 h-5" />
                  Proceed to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <footer className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Government College of Engineering and
          Leather Technology
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

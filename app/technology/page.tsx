import { Card } from "@/components/Card";
import { FaReact, FaVuejs, FaAngular, FaNodeJs, FaLaravel, FaPython, FaPhp, FaAws, FaDocker } from "react-icons/fa6";
import { SiNextdotjs, SiTailwindcss, SiDotnet, SiFlutter, SiPostgresql, SiMysql, SiMongodb, SiFirebase, SiSupabase } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";

const techStack = [
  {
    category: "Frontend",
    items: [
        { name: "React.js", icon: FaReact, color: "text-[#61DAFB]" },
        { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
        { name: "Vue.js", icon: FaVuejs, color: "text-[#4FC08D]" },
        { name: "Angular", icon: FaAngular, color: "text-[#DD0031]" },
        { name: "Tailwind", icon: SiTailwindcss, color: "text-[#38B2AC]" },
    ]
  },
  {
    category: "Backend",
    items: [
        { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
        { name: "Laravel", icon: FaLaravel, color: "text-[#FF2D20]" },
        { name: "ASP.NET", icon: SiDotnet, color: "text-[#512BD4]" },
        { name: "Python", icon: FaPython, color: "text-[#3776AB]" },
        { name: "PHP", icon: FaPhp, color: "text-[#777BB4]" },
    ]
  },
  {
    category: "Mobile",
    items: [
        { name: "Flutter", icon: SiFlutter, color: "text-[#02569B]" },
        { name: "React Native", icon: FaReact, color: "text-[#61DAFB]" },
    ]
  },
  {
    category: "Database",
    items: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#336791]" },
        { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },
        { name: "SQL Server", icon: DiMsqlServer, color: "text-[#CC2927]" },
        { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
    ]
  },
  {
    category: "Cloud & Services",
    items: [
        { name: "AWS", icon: FaAws, color: "text-[#FF9900]" },
        { name: "Docker", icon: FaDocker, color: "text-[#2496ED]" },
        { name: "Firebase", icon: SiFirebase, color: "text-[#FFCA28]" },
        { name: "Supabase", icon: SiSupabase, color: "text-[#3ECF8E]" },
    ]
  }
];

export default function Technology() {
  return (
    <div className="pt-32 pb-24 px-6 md:pt-48">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Technology</h1>
        
        <p className="text-xl md:text-2xl text-dim-gray dark:text-silver max-w-3xl leading-relaxed mb-24">
            We work with a carefully selected set of modern technologies to build reliable, scalable, and flexible systems. No hype, just proven tools.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
            {techStack.map((stack, index) => (
                <Card key={index} className="h-full p-8">
                    <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-black/5 dark:border-white/5">
                        {stack.category}
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                        {stack.items.map((tool) => (
                            <div key={tool.name} className="flex flex-col items-center gap-3 group">
                                <div className={`w-12 h-12 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 ${tool.color}`}>
                                    <tool.icon />
                                </div>
                                <span className="text-sm font-medium text-dim-gray dark:text-silver text-center">
                                    {tool.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

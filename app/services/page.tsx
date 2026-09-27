import { Card } from "@/components/Card";
import { Code, Smartphone, Palette, Users, Monitor, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: <Code size={32} />,
    title: "Web Development",
    description: "Clean, responsive websites and internal tools built with modern frameworks.",
    details: [
        "Single Page Applications (SPA)",
        "Progressive Web Apps (PWA)",
        "E-commerce Solutions",
        "CMS Integration"
    ]
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile App Development",
    description: "Cross-platform mobile applications using Flutter and scalable backends.",
    details: [
        "iOS & Android",
        "React Native / Flutter",
        "App Store Submission",
        "Native Performance"
    ]
  },
  {
    icon: <Users size={32} />,
    title: "CRM Systems",
    description: "Custom CRMs built around how your team actually sells, supports, and follows up.",
    details: [
        "Lead & Pipeline Management",
        "Customer Records & History",
        "Role-Based Access",
        "Reports & Dashboards"
    ]
  },
  {
    icon: <Monitor size={32} />,
    title: "Desktop Applications",
    description: "Reliable desktop software for the tools your business runs on every day.",
    details: [
        "Windows & macOS",
        "Offline-Ready",
        "Auto Updates",
        "Internal Business Tools"
    ]
  },
  {
    icon: <Palette size={32} />,
    title: "UI / UX Design",
    description: "Minimal interfaces focused on clarity, usability, and consistency.",
    details: [
        "Wireframing & Prototyping",
        "Design Systems",
        "User Research",
        "Brand Identity"
    ]
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-24 px-6 md:pt-48">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Services</h1>
        <p className="text-xl text-dim-gray dark:text-silver max-w-2xl mb-24">
            We build software that solves real problems. No fluff, no detours, just robust engineering and thoughtful design.
        </p>

        <div className="space-y-24">
            {services.map((service, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-12 md:gap-24">
                    <div className="md:w-1/3">
                        <div className="w-16 h-16 rounded-2xl bg-rich-black/5 dark:bg-white/10 flex items-center justify-center mb-8 text-rich-black dark:text-white-smoke">
                            {service.icon}
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                        <p className="text-lg text-dim-gray dark:text-silver mb-8">
                            {service.description}
                        </p>
                    </div>
                    <div className="md:w-2/3">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {service.details.map((detail, i) => (
                                <Card key={i} className="flex items-center gap-4 py-6" noHover>
                                    <CheckCircle2 className="text-accent" size={20} />
                                    <span className="font-medium">{detail}</span>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

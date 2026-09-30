import { Card } from "@/components/Card";
import { CAL_URL } from "@/lib/booking";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, Mail, MapPin } from "lucide-react";

interface Meeting {
  title: string;
  duration: string;
  description: string;
  slug: string;
}

// Slugs must match the event type URLs on Cal.com.
// The rest of the event types are listed on the Cal.com profile page.
const meetings: Meeting[] = [
  {
    title: "Start a Project",
    duration: "30 min",
    description: "Ready to build? Let's talk budget, timeline, and next steps.",
    slug: "15min",
  },
  {
    title: "Meet the Team",
    duration: "20 min",
    description: "Get to know who we are and how we work.",
    slug: "meet-the-team",
  },
  {
    title: "Project Consultation",
    duration: "45 min",
    description: "Map out features, users, and technical requirements.",
    slug: "30min",
  },
];

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 md:pt-48">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        <div className="md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Let&apos;s Talk</h1>
            <p className="text-xl text-dim-gray dark:text-silver leading-relaxed mb-12">
                Have a project in mind? Book a call at a time that works for you. Every meeting is handled personally by our founders.
            </p>

            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dim-gray/5 dark:bg-white/5 flex items-center justify-center">
                        <CalendarDays size={20} className="text-rich-black dark:text-white-smoke" />
                    </div>
                    <div>
                        <p className="text-sm text-dim-gray dark:text-silver">Available</p>
                        <p className="text-lg font-semibold">Monday to Friday, online</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dim-gray/5 dark:bg-white/5 flex items-center justify-center">
                        <Mail size={20} className="text-rich-black dark:text-white-smoke" />
                    </div>
                    <div>
                        <p className="text-sm text-dim-gray dark:text-silver">Prefer email?</p>
                        <a href="mailto:daerolabs@gmail.com" className="text-lg font-semibold hover:underline underline-offset-4">daerolabs@gmail.com</a>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-dim-gray/5 dark:bg-white/5 flex items-center justify-center">
                        <MapPin size={20} className="text-rich-black dark:text-white-smoke" />
                    </div>
                    <div>
                         <p className="text-sm text-dim-gray dark:text-silver">Based in</p>
                        <p className="text-lg font-semibold">Pangasinan, Philippines & Remote</p>
                    </div>
                </div>
            </div>

             <p className="mt-12 text-sm text-dim-gray dark:text-silver">
                We usually reply to emails within 24 hours.
            </p>
        </div>

        <div className="md:w-1/2">
            <Card noHover className="p-6 md:p-10">
                <h2 className="text-2xl font-bold mb-2">Book a Meeting</h2>
                <p className="text-dim-gray dark:text-silver mb-8">
                    Pick the type of call that fits what you need.
                </p>

                <ul className="space-y-3 mb-8">
                    {meetings.map((meeting) => (
                        <li key={meeting.slug}>
                            <a
                                href={`${CAL_URL}/${meeting.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 rounded-xl bg-dim-gray/5 dark:bg-white/5 border border-transparent hover:border-accent transition-colors"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span className="font-semibold">{meeting.title}</span>
                                        <span className="inline-flex items-center gap-1 text-xs text-dim-gray dark:text-silver">
                                            <Clock size={12} /> {meeting.duration}
                                        </span>
                                    </div>
                                    <p className="text-sm text-dim-gray dark:text-silver mt-1">{meeting.description}</p>
                                </div>
                                <ArrowUpRight size={18} className="shrink-0 text-dim-gray dark:text-silver group-hover:text-accent transition-colors" />
                            </a>
                        </li>
                    ))}
                </ul>

                <a
                    href={CAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-full bg-rich-black text-white dark:bg-white-smoke dark:text-rich-black font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                    See All Available Times <ArrowRight size={20} />
                </a>
            </Card>
        </div>
      </div>
    </div>
  );
}

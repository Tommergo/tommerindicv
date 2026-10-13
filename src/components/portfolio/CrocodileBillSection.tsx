import { Music, Speaker, Handshake, Truck, Users, TrendingUp, CalendarDays, BadgeCheck } from "lucide-react";
import bandBw from "@/assets/band-bw.png";
import bandLive from "@/assets/band-live.png";
import bandEvent from "@/assets/band-event.jpeg";
import barIlanStage from "@/assets/bar-ilan-stage.jpeg";
import cover from "@/assets/projects/crocodile-bill-inc.jpg";

const services = [
  { icon: Music, title: "Live music", desc: "Shows by the blues, soul and funk band Crocodile Bill, where I am manager and guitarist." },
  { icon: Speaker, title: "Sound and equipment", desc: "Live sound for events and jam nights, plus PA and equipment rental with transport, setup and teardown." },
];

const skills = [
  { icon: Handshake, title: "Clients", desc: "Scope each event with the client, price it, and stay the single point of contact through the night." },
  { icon: Truck, title: "Suppliers and partners", desc: "Negotiate with partners and coordinate equipment, transport and venues so every gig starts on time." },
  { icon: Users, title: "People", desc: "Manage the band's musicians and the crew on site: schedules, briefings and who does what." },
  { icon: TrendingUp, title: "Budget and growth", desc: "Own the budget, find new revenue opportunities, and run A/B tests on the band's social post formats to keep the ones that perform." },
];

const photos = [
  { src: bandEvent, alt: "Crocodile Bill live performance" },
  { src: barIlanStage, alt: "Performing on stage at Bar-Ilan University" },
  { src: bandLive, alt: "Tommer performing live with Crocodile Bill" },
  { src: bandBw, alt: "Crocodile Bill rehearsal" },
];

const CrocodileBillSection = () => (
  <div>
    <div className="flex flex-wrap gap-2 mb-6">
      <div className="inline-flex items-center gap-2 font-adv-display font-bold text-sm px-4 py-2 rounded border border-[hsl(var(--adv-gold)/0.6)] bg-[hsl(var(--adv-gold-light)/0.18)]">
        <BadgeCheck size={16} className="adv-text-gold" /> Registered business in Israel
      </div>
      <div className="inline-flex items-center gap-2 font-adv-display font-bold text-sm px-4 py-2 rounded border border-[hsl(var(--adv-gold)/0.6)] bg-[hsl(var(--adv-gold-light)/0.18)]">
        <CalendarDays size={16} className="adv-text-gold" /> About 3 events a month
      </div>
    </div>

    <p className="text-base md:text-lg leading-relaxed adv-text-soft mb-8">
      Every event is a small project with a client, a budget, suppliers, a crew and a hard deadline: the moment the show starts.
    </p>

    <figure className="adv-paper p-3 pb-4 mb-8 relative" style={{ transform: "rotate(-0.6deg)" }}>
      <img src={cover} alt="Crocodile Bill Inc. field journal: concert, logistics and A/B testing" width={1024} height={739} loading="lazy" className="w-full h-auto rounded-sm border border-[hsl(var(--adv-leather)/0.35)]" />
    </figure>

    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {services.map((s) => (
        <div key={s.title} className="rounded border border-[hsl(var(--adv-leather)/0.3)] bg-[hsl(var(--adv-parchment)/0.6)] p-5">
          <h3 className="font-adv-display font-bold flex items-center gap-2 mb-2"><s.icon size={18} className="adv-text-gold" /> {s.title}</h3>
          <p className="text-base adv-text-soft leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>

    <h3 className="font-adv-display font-bold text-lg mb-4">What running it takes</h3>
    <div className="grid sm:grid-cols-2 gap-4 mb-8">
      {skills.map((s) => (
        <div key={s.title} className="flex gap-3">
          <div className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center bg-[hsl(var(--adv-leather))] text-[hsl(var(--adv-gold-light))]">
            <s.icon size={17} />
          </div>
          <div>
            <p className="font-adv-display font-bold text-base">{s.title}</p>
            <p className="text-base adv-text-soft leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-4">
      {photos.map((p) => (
        <img key={p.alt} src={p.src} alt={p.alt} className="w-full rounded-sm object-cover aspect-square border border-[hsl(var(--adv-leather)/0.35)]" loading="lazy" />
      ))}
    </div>
  </div>
);

export default CrocodileBillSection;

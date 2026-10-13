import JournalProjectPage from "@/components/journal/JournalProjectPage";
import { MemoryGameContent } from "@/components/portfolio/ProjectsSection";
import img from "@/assets/projects/memory-game.jpg";

const MemoryGamePage = () => (
  <JournalProjectPage
    project={{
      title: "Memory Game: Music & Attention",
      stamp: "Expedition File №4",
      tag: "Controlled Experiment · ANOVA · Statistics",
      image: img,
      goal: "Answer a question people argue about but rarely measure: does the type of background music change how fast you complete a memory game? I built the game and ran the experiment myself.",
      story: [
        "I built a web memory game and ran a within-subjects experiment: 30 participants each played under three conditions (silence, loud music and focus music), with the order counterbalanced.",
        "I compared completion times with a one-way repeated measures ANOVA, checked the order of rounds for a learning effect, and made the one 148-second outlier in the focus condition switchable, to show how much it moves the result.",
        "The ANOVA was not significant (F = 1.631, p = 0.201): music type had no measurable effect on completion time, and counterbalancing showed no order effect.",
      ],
      skills: ["Experimental Design", "Within-Subjects Design", "Counterbalancing", "Repeated Measures ANOVA", "Outlier Analysis", "Web Development"],
      outcome: "An honest null result, reported with its outlier and order checks, plus an interactive dashboard and a playable version of the game so anyone can test the conditions themselves.",
    }}
    evidence={<MemoryGameContent />}
  />
);

export default MemoryGamePage;

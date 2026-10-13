import JournalProjectPage from "@/components/journal/JournalProjectPage";
import img from "@/assets/projects/memory-game.jpg";

const MemoryGamePage = () => (
  <JournalProjectPage
    project={{
      title: "Memory Game: Music & Attention",
      stamp: "Expedition File №3",
      tag: "Controlled Experiment · ANOVA · Statistics",
      image: img,
      goal: "Test a question everyone argues about but few measure: does background music help or hurt concentration? I designed a controlled memory-game experiment to find out.",
      story: [
        "I built a memory card game and ran a controlled experiment with participants playing under different music conditions.",
        "I designed the data collection to control for order effects and outliers, with a toggle to inspect how extreme results moved the conclusions.",
        "I analyzed the results with ANOVA to test whether the differences between conditions were statistically significant, not just noise.",
      ],
      skills: ["Experimental Design", "ANOVA", "Statistical Analysis", "Data Visualization", "Outlier Analysis"],
      outcome: "A statistically grounded answer on music and attention, presented through an interactive dashboard where anyone can explore the data and the ANOVA results themselves.",
    }}
  />
);

export default MemoryGamePage;

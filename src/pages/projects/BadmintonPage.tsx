import JournalProjectPage from "@/components/journal/JournalProjectPage";
import { BadmintonContent } from "@/components/portfolio/ProjectsSection";
import img from "@/assets/projects/badminton-ml.jpg";

const BadmintonPage = () => (
  <JournalProjectPage
    project={{
      title: "Badminton Performance Analytics",
      stamp: "Expedition File №3",
      tag: "Python · Logistic Regression · BWF Data",
      image: img,
      goal: "Help Bnei Herzliya's badminton program with two problems: improve its competitive success rate, and cut training costs, where shuttlecock consumption ran 66% over budget. I used BWF World Tour data to find which in-match moments actually decide who wins.",
      story: [
        "I took historical BWF World Tour data from Kaggle (points, tournament participation and win-loss records) and prepared it in Python.",
        "I fitted logistic regressions on five match situations: consecutive scoring runs, game-point performance, reaching 11 points first in the deciding game, the point gap after the first 10 points, and Game 1 against Game 3 performance as a fatigue proxy.",
        "Runs of 4 to 6 consecutive points sharply raised win probability, as did game-point performance, reaching 11 first and an early lead. The fatigue proxy showed almost no relationship (R = 0.05), so each game stands on its own.",
      ],
      skills: ["Python", "Logistic Regression", "Predictive Analytics", "BWF Data", "Organizational Behavior"],
      outcome: "A findings table that turns each result into one action for coaches and one for players: manage momentum with timeouts, train for pressure points, start every game strong and reset mentally between games. I also flagged the limits: elite BWF data may not match grassroots players in Herzliya, and new training plans need coach education.",
    }}
    evidence={<BadmintonContent />}
  />
);

export default BadmintonPage;

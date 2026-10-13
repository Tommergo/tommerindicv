import JournalProjectPage from "@/components/journal/JournalProjectPage";
import img from "@/assets/projects/badminton-ml.jpg";

const BadmintonPage = () => (
  <JournalProjectPage
    project={{
      title: "Badminton Performance ML",
      stamp: "Expedition File №2",
      tag: "Python · Regression · Sports Science",
      image: img,
      goal: "Discover how fatigue accumulates across a badminton match and whether performance drops can be predicted from rally data, turning raw match logs into actionable training insight.",
      story: [
        "I collected and cleaned match data rally by rally, handling missing values and inconsistent formats until the dataset was trustworthy.",
        "I engineered features around rally length, rest time and match progression, then fitted regression models to isolate the fatigue signal from the noise.",
        "Scatter analysis with a regression line against the y=x baseline revealed exactly where players start underperforming as matches drag on.",
      ],
      skills: ["Python", "Pandas", "Regression Modeling", "Feature Engineering", "Data Cleaning", "Matplotlib"],
      outcome: "A working predictive model that flags fatigue-driven performance drops, giving coaches a concrete signal for when to intervene in training and match strategy.",
    }}
  />
);

export default BadmintonPage;

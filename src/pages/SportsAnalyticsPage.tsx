import JournalProjectPage from "@/components/journal/JournalProjectPage";
import { SportsAnalyticsContent } from "@/components/portfolio/ProjectsSection";
import img from "@/assets/projects/sports-analytics.jpg";

const SportsAnalyticsPage = () => (
  <JournalProjectPage
    project={{
      title: "Sports Data Analytics, Bnei Herzliya",
      stamp: "Expedition File №2",
      tag: "Budget vs Results · Retention · Regression",
      image: img,
      goal: "Find where a youth sports organisation's budget and athletes were being lost: how budget distribution affects athlete development, why athletes drop out during transition ages, and which sports produce professional players most efficiently.",
      story: [
        "I analysed 1,247 athletes and a total budget of ₪1.43M, comparing what each sport received against the results it produced.",
        "The budget turned out to be highly concentrated in 3 large sports, while smaller sports showed stronger long-term development ROI.",
        "Dropout peaked during age transitions rather than early participation, and competitive programs carried higher pressure and dropout risk. A logistic regression modelled the probability of turning professional against years of training.",
      ],
      skills: ["Python", "Pandas", "Matplotlib", "Logistic Regression", "Statistical Analysis", "Budget vs Results"],
      outcome: "Three recommendations for the club's leadership: redistribute budget toward emerging sports, add structured support for athletes moving into competitive levels, and track athlete development with continuous analytics. 2nd place in the Sharks Innovation Competition.",
    }}
    evidence={<SportsAnalyticsContent />}
  />
);

export default SportsAnalyticsPage;

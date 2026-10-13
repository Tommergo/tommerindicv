import JournalProjectPage from "@/components/journal/JournalProjectPage";
import img from "@/assets/projects/sports-analytics.jpg";

const MeirMedicalPage = () => (
  <JournalProjectPage
    project={{
      title: "Operational KPI Analysis, Meir Medical Center",
      stamp: "Expedition File №1",
      tag: "Python · Tableau · KPIs",
      image: img,
      goal: "Work with the hospital's management on its real operational data, find where the process was failing, and present it to senior management as KPIs they could act on.",
      story: [
        "I cleaned and analysed the hospital's operational data in Python (pandas) and Excel, and built the KPI dashboard for senior management in Tableau.",
        "The analysis showed a clear correlation between faulty reporting and the war period. Data quality dropped sharply under stress, and the data-collection process broke down.",
        "I presented the conclusions to senior management through KPIs and advised on the solutions that followed.",
      ],
      skills: ["Python", "pandas", "Excel", "Tableau", "KPI Definition", "Correlation Analysis", "Presenting to Leadership"],
      outcome: "The hospital built emergency data-collection protocols on the strength of the findings. Final semester project, grade 95.",
    }}
  />
);

export default MeirMedicalPage;

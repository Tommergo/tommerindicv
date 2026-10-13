import JournalProjectPage from "@/components/journal/JournalProjectPage";
import img from "@/assets/projects/meir-medical.jpg";

const MeirMedicalPage = () => (
  <JournalProjectPage
    project={{
      title: "Operational KPI Analysis, Meir Medical Center",
      stamp: "Expedition File №1",
      tag: "Python · Tableau · KPIs",
      image: img,
      goal: "Work with the hospital's management on its real operational data, find where the process could improve, and present it to senior management as KPIs they could act on.",
      story: [
        "I cleaned and analysed the hospital's operational data in Python (pandas) and Excel, and built the KPI dashboard for senior management in Tableau.",
        "The analysis identified where data quality in the collection process could be improved.",
        "I presented the conclusions to senior management through KPIs and advised on the solutions that followed.",
      ],
      skills: ["Python", "pandas", "Excel", "Tableau", "KPI Definition", "Correlation Analysis", "Presenting to Leadership"],
      outcome: "The findings informed changes to the hospital's data-collection process. Final semester project, grade 95.",
    }}
  />
);

export default MeirMedicalPage;

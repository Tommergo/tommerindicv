import JournalProjectPage from "@/components/journal/JournalProjectPage";
import img from "@/assets/projects/face-pca.jpg";

const FacePcaPage = () => (
  <JournalProjectPage
    project={{
      title: "Face Data Analysis (PCA)",
      stamp: "Expedition File №4",
      tag: "Machine Learning · Eigenfaces · KNN",
      image: img,
      goal: "Understand face recognition from first principles: instead of using a library, build eigenfaces from scratch and classify faces with K-Nearest Neighbors.",
      story: [
        "I processed a dataset of face images, aligned and normalized them, and computed the mean face — the ghostly average that anchors everything.",
        "I implemented Principal Component Analysis manually to extract eigenfaces, the core patterns that capture how faces differ from one another.",
        "I projected faces into this lower-dimensional space and classified them with KNN, then evaluated accuracy as the number of components changed.",
      ],
      skills: ["PCA from Scratch", "KNN Classification", "NumPy", "Linear Algebra", "Image Processing", "Model Evaluation"],
      outcome: "A from-scratch face classification pipeline that demystifies how dimensionality reduction works — and proves I can build ML foundations, not just call APIs.",
    }}
  />
);

export default FacePcaPage;

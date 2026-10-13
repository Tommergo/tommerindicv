import JournalProjectPage from "@/components/journal/JournalProjectPage";
import { PCAContent } from "@/components/portfolio/ProjectsSection";
import img from "@/assets/projects/face-pca.jpg";

const FacePcaPage = () => (
  <JournalProjectPage
    project={{
      title: "Face Data Analysis (PCA)",
      stamp: "Expedition File №5",
      tag: "Machine Learning · PCA · Nearest Neighbor",
      image: img,
      goal: "Understand face recognition from first principles: implement PCA from scratch, then check it against MATLAB's built-in PCA on the same face recognition task.",
      story: [
        "I worked with 15 people, 11 grayscale 32 by 32 images each, split into 8 training and 3 test images per person.",
        "I computed the mean face, centred every image on it, built the covariance matrix and took its eigenvectors, sorted by eigenvalue, as the eigenfaces.",
        "I projected the images onto the top K eigenfaces and classified them with Nearest Neighbor, comparing accuracy as K changed.",
      ],
      skills: ["PCA from Scratch", "Nearest Neighbor Classification", "MATLAB", "Linear Algebra", "Eigenfaces", "Model Evaluation"],
      outcome: "My manual PCA matched MATLAB's built-in PCA exactly, both at 77.59% accuracy, which validated the implementation. It compressed 1024-dimensional images into a compact representation that still separates one person from another.",
    }}
    evidence={<PCAContent />}
  />
);

export default FacePcaPage;

// import React from "react";

// import { Leaf, ShieldCheck, Zap, Upload, ArrowRight } from "lucide-react";

// const LandingPage = ({ onGetStarted }) => {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         minWidth: "100vw",
//         background:
//           "linear-gradient(165deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
//         fontFamily: '"Poppins", sans-serif',
//         color: "#f0fdf4",
//         padding: "2rem",
//       }}
//     >
//       {/* Hero Section */}
//       <div
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           textAlign: "center",
//           paddingTop: "4rem",
//         }}
//       >
//         <Leaf size={70} color="#4ade80" strokeWidth={2.5} />

//         <h1
//           style={{
//             fontSize: "4rem",
//             fontWeight: "800",
//             margin: "1.5rem 0",
//             background:
//               "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #86efac 100%)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           PlantCare AI
//         </h1>

//         <p
//           style={{
//             fontSize: "1.4rem",
//             maxWidth: "700px",
//             margin: "0 auto 2.5rem",
//             color: "#a7f3d0",
//             lineHeight: "1.6",
//           }}
//         >
//           Instantly detect plant diseases using AI-powered image analysis.
//           Upload a photo and get accurate diagnosis in seconds.
//         </p>

//         <button
//           onClick={onGetStarted}
//           style={{
//             padding: "1.2rem 2.5rem",
//             fontSize: "1.2rem",
//             borderRadius: "30px",
//             border: "none",
//             background: "linear-gradient(135deg, #22c55e, #4ade80)",
//             color: "white",
//             fontWeight: "700",
//             cursor: "pointer",
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "0.75rem",
//             boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)",
//             transition: "all 0.3s ease",
//           }}
//         >
//           Get Started <ArrowRight size={20} />
//         </button>
//       </div>

//       {/* Features Section */}
//       <div
//         style={{
//           maxWidth: "1100px",
//           margin: "6rem auto 0",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//           gap: "2rem",
//         }}
//       >
//         <FeatureCard
//           icon={<Zap size={40} color="#4ade80" />}
//           title="Instant Detection"
//           description="Upload a plant image and get AI-powered diagnosis within seconds."
//         />

//         <FeatureCard
//           icon={<ShieldCheck size={40} color="#4ade80" />}
//           title="High Accuracy"
//           description="Powered by a fine-tuned ResNet50 deep learning model."
//         />

//         <FeatureCard
//           icon={<Upload size={40} color="#4ade80" />}
//           title="Easy to Use"
//           description="Simple drag-and-drop interface designed for farmers and gardeners."
//         />
//       </div>

//       {/* Footer */}
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "6rem",
//           color: "#86efac",
//           fontSize: "0.9rem",
//         }}
//       >
//         © {new Date().getFullYear()} PlantCare AI • Built with React & Flask
//       </div>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, description }) => {
//   return (
//     <div
//       style={{
//         background: "rgba(20, 83, 45, 0.4)",
//         borderRadius: "25px",
//         padding: "2.5rem",
//         textAlign: "center",
//         backdropFilter: "blur(15px)",
//         border: "1px solid rgba(74, 222, 128, 0.3)",
//         transition: "transform 0.3s ease",
//       }}
//     >
//       <div style={{ marginBottom: "1.5rem" }}>{icon}</div>
//       <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{title}</h3>
//       <p style={{ color: "#d1fae5", lineHeight: "1.6" }}>{description}</p>
//     </div>
//   );
// };

// export default LandingPage;




import React from "react";
import { Leaf, ShieldCheck, Zap, Upload, ArrowRight } from "lucide-react";

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Leaf size={70} color="#4ade80" strokeWidth={2.5} />

        <h1 className="hero-title">PlantCare AI</h1>

        <p className="hero-description">
          Instantly detect plant diseases using AI-powered image analysis.
          Upload a photo and get accurate diagnosis in seconds.
        </p>

        <button className="cta-button" onClick={onGetStarted}>
          Get Started <ArrowRight size={20} />
        </button>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <FeatureCard
          icon={<Zap size={40} color="#4ade80" />}
          title="Instant Detection"
          description="Upload a plant image and get AI-powered diagnosis within seconds."
        />

        <FeatureCard
          icon={<ShieldCheck size={40} color="#4ade80" />}
          title="High Accuracy"
          description="Powered by a fine-tuned ResNet50 deep learning model."
        />

        <FeatureCard
          icon={<Upload size={40} color="#4ade80" />}
          title="Easy to Use"
          description="Simple drag-and-drop interface designed for farmers and gardeners."
        />
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} PlantCare AI • Built with React & Flask
      </footer>

      {/* Styles */}
      <style>{`
        .landing-container {
          min-height: 100vh;min-width:100vw;
          background: linear-gradient(165deg, #0f2027 0%, #203a43 40%, #2c5364 100%);
          font-family: 'Poppins', sans-serif;
          color: #f0fdf4;
          padding: 2rem;
          text-align: center;
        }

        .hero-section {
          max-width: 900px;
          margin: 0 auto;
          padding-top: 4rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 1.5rem 0;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #86efac 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.3rem;
          max-width: 650px;
          margin: 0 auto 2.5rem;
          color: #a7f3d0;
          line-height: 1.6;
        }

        /* CTA Button */
        .cta-button {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          border-radius: 30px;
          border: none;
          background: linear-gradient(135deg, #22c55e, #4ade80);
          color: white;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 15px 35px rgba(34, 197, 94, 0.6);
        }

        .cta-button:active {
          transform: scale(0.97);
        }

        /* Features */
        .features-section {
          max-width: 1100px;
          margin: 5rem auto 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(20, 83, 45, 0.4);
          border-radius: 25px;
          padding: 2.5rem;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(74, 222, 128, 0.3);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(34, 197, 94, 0.25);
        }

        .feature-title {
          font-size: 1.4rem;
          margin: 1rem 0;
        }

        .feature-description {
          color: #d1fae5;
          line-height: 1.6;
        }

        .footer {
          margin-top: 5rem;
          color: #86efac;
          font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.4rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .cta-button {
            padding: 0.9rem 2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .landing-container {
            padding: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div>{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default LandingPage;



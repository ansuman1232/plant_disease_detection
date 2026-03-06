


import React, { useState, useRef } from 'react';

import { Upload,  Loader2, Leaf, AlertTriangle,  Sun, Bug } from 'lucide-react';

const PlantDiseaseDetector = () => {
 

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);





   




const analyzeImage = async () => {
  if (!selectedImage) return;
  
  setIsAnalyzing(true);
  setError(null);
  
  try {
    // Create FormData for backend file upload
    const formData = new FormData();
    formData.append('image', selectedImage);
    
    // Call YOUR Flask backend
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData  // Flask expects FormData
    });
    
    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Convert model class names (AppleBlackRot → Apple Black Rot)
    let diseaseInfoKey = result.disease;
    if (result.disease.includes('_')) {
      diseaseInfoKey = result.disease.replace(/_/g, ' ');
    }
    

    
    // Set diagnosis for your UI
  setDiagnosis({
  disease: result.disease,
  confidence: result.confidence,
  plantType: result.plantType || 'Unknown',
  affectedArea: result.affectedArea || 'leaves',
  reasoning: result.reasoning,

  symptoms: [],
  causes: [],
  treatment: [],
  prevention: [],
  organicSolutions: []
});
    
  } catch (err) {
    console.error('Prediction error:', err);
    setError('Backend not running? Start with `python app.py` on port 5000');
  } finally {
    setIsAnalyzing(false);
  }
};



const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setError(null);
      setDiagnosis(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };




  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setError(null);
      setDiagnosis(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


    const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDiagnosis(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };



 return (
    <div style={{
      minHeight: '100vh',
       minWidth: '100vw',
      background: 'linear-gradient(165deg, #0f2027 0%, #203a43 40%, #2c5364 100%)',
      fontFamily: '"Poppins", "Segoe UI", sans-serif',
      padding: '2rem',
      color: '#f0fdf4',
      position: 'relative',
      overflow: 'hidden',
   
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Merriweather:wght@300;400;700&display=swap');
        
        @keyframes leafFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(5deg); }
          66% { transform: translateY(-8px) rotate(-5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes growIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .upload-zone {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px dashed rgba(74, 222, 128, 0.4);
          background: linear-gradient(135deg, rgba(20, 83, 45, 0.4) 0%, rgba(34, 197, 94, 0.15) 100%);
          backdrop-filter: blur(10px);
        }
        
        .upload-zone:hover {
          border-color: #4ade80;
          background: linear-gradient(135deg, rgba(20, 83, 45, 0.6) 0%, rgba(34, 197, 94, 0.25) 100%);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(74, 222, 128, 0.3);
        }
        
        .button-organic {
          background: linear-gradient(135deg, #22c55e 0%, #4ade80 100%);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
        }
        
        .button-organic::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        
        .button-organic:hover::before {
          left: 100%;
        }
        
        .button-organic:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(34, 197, 94, 0.5);
        }
        
        .diagnosis-card {
          animation: growIn 0.5s ease-out;
          background: linear-gradient(135deg, rgba(20, 83, 45, 0.6) 0%, rgba(34, 197, 94, 0.2) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(74, 222, 128, 0.3);
        }
        
        .leaf-decoration {
          position: absolute;
          opacity: 0.1;
          animation: leafFloat 6s ease-in-out infinite;
        }
        
        .info-section {
          background: rgba(20, 83, 45, 0.3);
          border-left: 4px solid #4ade80;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .info-section:hover {
          background: rgba(20, 83, 45, 0.5);
          border-left-color: #22c55e;
          transform: translateX(5px);
        }
        
       
      `}</style>

      {/* Decorative leaf elements */}
      <div className="leaf-decoration" style={{ top: '5%', left: '5%', fontSize: '4rem' }}>🌿</div>
      <div className="leaf-decoration" style={{ top: '15%', right: '8%', fontSize: '3rem', animationDelay: '1s' }}>🍃</div>
      <div className="leaf-decoration" style={{ bottom: '20%', left: '10%', fontSize: '5rem', animationDelay: '2s' }}>🌱</div>
      <div className="leaf-decoration" style={{ bottom: '10%', right: '15%', fontSize: '3.5rem', animationDelay: '3s' }}>🌾</div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '1.5rem',
            marginBottom: '1rem'
          }}>
            <Leaf size={56} color="#4ade80" strokeWidth={2.5} />
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #86efac 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              letterSpacing: '-0.03em',
              fontFamily: '"Merriweather", serif'
            }}>
              PlantCare AI
            </h1>
          </div>
          <p style={{
            fontSize: '1.4rem',
            color: '#a7f3d0',
            fontWeight: '300',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Advanced plant disease detection 
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sun size={20} color="#fbbf24" />
              <span style={{ color: '#d1fae5', fontSize: '0.9rem' }}>80+ Diseases</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bug size={20} color="#ef4444" />
              <span style={{ color: '#d1fae5', fontSize: '0.9rem' }}>Pest Control</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div style={{ marginBottom: '3rem' }}>
          {!imagePreview ? (
            <div
              className="upload-zone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              style={{
                borderRadius: '30px',
                padding: '5rem 3rem',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)'
              }}>
                <Upload size={50} color="#ffffff" strokeWidth={2.5} />
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', color: '#d1fae5' }}>
                Upload Plant Image
              </p>
              <p style={{ color: '#86efac', fontSize: '1rem', lineHeight: '1.6' }}>
                Drop your image here or click to browse<br/>
                <span style={{ fontSize: '0.85rem', color: '#6ee7b7' }}>Supports JPG, JPEG, PNG • Get instant diagnosis</span>
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <div style={{
              borderRadius: '30px',
              overflow: 'hidden',
              background: 'rgba(20, 83, 45, 0.4)',
              border: '2px solid rgba(74, 222, 128, 0.3)',
              position: 'relative',
              backdropFilter: 'blur(10px)'
            }}>
              <button
                onClick={clearImage}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(15, 32, 39, 0.95)',
                  border: '2px solid rgba(239, 68, 68, 0.6)',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.95)';
                  e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 32, 39, 0.95)';
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >X
                
              </button>
              <img
                src={imagePreview}
                alt="Plant Preview"
                style={{
                  width: '100%',
                  maxHeight: '600px',
                  objectFit: 'contain',
                  display: 'block',
                  padding: '2rem'
                }}
              />
            </div>
          )}
        </div>

        {/* Analyze Button */}
        {imagePreview && !diagnosis && (
          <button
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className="button-organic"
            style={{
              width: '100%',
              padding: '1.5rem',
              border: 'none',
              borderRadius: '20px',
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'white',
              cursor: isAnalyzing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem',
              opacity: isAnalyzing ? 0.7 : 1
            }}
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} />
                Analyzing Plant Health...
              </>
            ) : (
              <>
                <Leaf size={28} />
                Diagnose Plant Disease
              </>
            )}
          </button>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '2px solid rgba(239, 68, 68, 0.6)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '3rem',
            color: '#fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            backdropFilter: 'blur(10px)'
          }}>
            <AlertTriangle size={32} color="#ef4444" />
            <p style={{ margin: 0, fontWeight: '600', fontSize: '1.1rem' }}>{error}</p>
          </div>
        )}

        {/* Diagnosis Results */}
        {diagnosis && (
          <div className="diagnosis-card" style={{
            borderRadius: '30px',
            padding: '3rem',
            marginTop: '3rem'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                 
                  <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    margin: 0,
                    color: '#d1fae5',
                    fontFamily: '"Merriweather", serif'
                  }}>
                    Diagnosis Complete
                  </h2>
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: '#86efac',
                  margin: 0
                }}>
                  
                  Affected Area: <strong style={{ color: '#d1fae5' }}>{diagnosis.affectedArea}</strong>
                </p>
              </div>
              
             
            </div>

            {/* Disease Name and Confidence */}
            <div style={{
              background: 'rgba(20, 83, 45, 0.5)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem',
              border: '1px solid rgba(74, 222, 128, 0.3)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: '#4ade80',
                  margin: 0
                }}>
                  {diagnosis.disease}
                </h3>
                <span style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#22c55e'
                }}>
                  {(diagnosis.confidence * 100).toFixed(1)}% Match
                </span>
              </div>
              
              <div style={{
                width: '100%',
                height: '14px',
                background: 'rgba(15, 32, 39, 0.8)',
                borderRadius: '7px',
                overflow: 'hidden',
                marginTop: '1rem'
              }}>
                <div
                  style={{
                    width: `${diagnosis.confidence * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 50%, #86efac 100%)',
                    borderRadius: '7px',
                    transition: 'width 1s ease-out',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)'
                  }}
                />
              </div>
            </div>

           

            {/* AI Reasoning */}
            {diagnosis.reasoning && (
              <div style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '20px',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h4 style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#bae6fd',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  🔍 AI Analysis
                </h4>
                <p style={{
                  margin: 0,
                  color: '#dbeafe',
                  lineHeight: '1.8',
                  fontSize: '1.05rem',
                  fontStyle: 'italic'
                }}>
                  {diagnosis.reasoning}
                </p>
              </div>
            )}

           

            {/* Action Buttons */}
            <div style={{
              marginTop: '3rem',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => {
                  clearImage();
                  setDiagnosis(null);
                }}
                className="button-organic"
                style={{
                  padding: '1.25rem 2.5rem',
                  border: 'none',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <Upload size={24} />
                Analyze Another Plant
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );


};

export default PlantDiseaseDetector;







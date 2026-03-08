# Plant Disease Detection

A web application that uses machine learning to detect and analyze plant diseases from images. Upload a photo of a plant, and get instant diagnosis with disease type, symptoms, and treatment recommendations.

## Features

### 🏠 Landing Page
- Clean, intuitive user interface
- Project overview and introduction
- Quick start guide
- Information about the application capabilities
<img width="1829" height="839" alt="image" src="https://github.com/user-attachments/assets/25c4638f-bb98-4c42-986f-6ceda25f171a" />

### 📸 Disease Detection Page
- **Image Upload**: Upload plant images from your laptop
- **Disease Analysis**: AI-powered disease identification
- **Detailed Results**:
  - **Disease Type**: Identifies the specific disease affecting the plant
  - **Symptoms**: Lists visible and non-visible symptoms
  - **Treatment**: Provides recommended treatment options and preventive measures
<img width="1878" height="913" alt="image" src="https://github.com/user-attachments/assets/2c612878-cdfd-4922-900c-e8bee70c772b" />
<img width="1457" height="902" alt="image" src="https://github.com/user-attachments/assets/c90557bd-46c7-4559-801a-b0787a4cb7fd" />


## How It Works

1. Navigate to the landing page for an overview
2. Click on the detection page
3. Upload an image of the affected plant
4. Wait for the analysis to complete
5. View comprehensive results including disease type, symptoms, and treatment options


## Tech Stack

- **Frontend**: React
- **Backend**: Flask 
- **ML Model**: ResNet-50


## Installation

### Prerequisites
download  model weights  from here :- https://drive.google.com/drive/folders/1bdXyhlfchsO4dsmutApotKCXnNO77XXu?usp=sharing
python 3.11

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ansuman1232/plant_disease_detection.git
   cd plant_disease_detection
   ```
2. make model folder in backend folder
3. add downloaded model weights file
4. Navigate to the backend folder
  ```bash
    cd backend
  ```
6. ```bash
   py -3.11 -m venv tf_env  
   tf_env/Scripts/activate
   tf_env/Scripts/python -m pip install tensorflow==2.19.0 flask flask-cors pillow numpy
   ```
7. to start the server
   ```bash
     tf_env/Scripts/python app.py 
   ```
6.In power shell go to frontendReact folder 
  type:- npm install
        npm run dev

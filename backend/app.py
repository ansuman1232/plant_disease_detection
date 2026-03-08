







from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# --- 1. Medical Knowledge Base (Expanded) ---
DISEASE_DATA = {
    'AppleBlackRot': {
        'plant': 'Apple',
        'symptoms': ['Purple spots on leaves', 'Fruit rot (mummification)', 'Cankers on branches'],
        'treatment': ['Prune infected branches', 'Remove mummified fruit', 'Apply Captan or Sulfur fungicides']
    },
    'AppleCedarRust': {
        'plant': 'Apple',
        'symptoms': ['Yellow-orange spots on leaves', 'Rust-colored pustules', 'Premature leaf drop'],
        'treatment': ['Remove nearby Juniper/Cedar trees', 'Apply Myclobutanil fungicide', 'Plant resistant varieties']
    },
    'AppleHealthy': {
        'plant': 'Apple',
        'symptoms': [],
        'treatment': ['Maintain regular watering', 'Annual pruning', 'Balanced fertilization']
    },
    'AppleScab': {
        'plant': 'Apple',
        'symptoms': ['Olive-green spots on leaves', 'Velvety fungal growth', 'Deformed fruit'],
        'treatment': ['Rake fallen leaves (sanitation)', 'Apply bio-fungicides', 'Copper soap sprays']
    },
    'CherryHealthy': {
        'plant': 'Cherry',
        'symptoms': [],
        'treatment': ['Regular pruning for airflow', 'Monitor for pests']
    },
    'CherryPowderyMildew': {
        'plant': 'Cherry',
        'symptoms': ['White powdery coating on leaves', 'Curled leaves', 'Stunted growth'],
        'treatment': ['Neem oil application', 'Sulfur sprays', 'Prune to improve air circulation']
    },
    'CornCercosporaLeafSpot': {
        'plant': 'Corn',
        'symptoms': ['Gray/tan rectangular lesions', 'Lesions run parallel to veins', 'Leaf blight'],
        'treatment': ['Crop rotation', 'Fungicides (Azoxystrobin)', 'Plant resistant hybrids']
    },
    'CornCommonRust': {
        'plant': 'Corn',
        'symptoms': ['Red/brown pustules on both leaf surfaces', 'Yellowing leaves'],
        'treatment': ['Usually managed by resistant hybrids', 'Fungicide only in severe early cases']
    },
    'CornHealthy': {
        'plant': 'Corn',
        'symptoms': [],
        'treatment': ['Ensure proper nitrogen levels', 'Weed control']
    },
    'CornNorthernLeafBlight': {
        'plant': 'Corn',
        'symptoms': ['Cigar-shaped gray lesions', 'Necrotic spots', 'Withered leaves'],
        'treatment': ['Crop rotation (1-2 years)', 'Manage residue', 'Foliar fungicides']
    },
    'GrapeBlackRot': {
        'plant': 'Grape',
        'symptoms': ['Brown circular spots on leaves', 'Shriveled black berries (mummies)'],
        'treatment': ['Remove infected fruit', 'Captan or Mancozeb sprays', 'Canopy management']
    },
    'GrapeEscaBlackMeasles': {
        'plant': 'Grape',
        'symptoms': ['Tiger-stripe pattern on leaves', 'Dark spots on berries', 'Vine decline'],
        'treatment': ['Prune out infected wood', 'No cure (remove severe vines)', 'Protect pruning wounds']
    },
    'GrapeHealthy': {
        'plant': 'Grape',
        'symptoms': [],
        'treatment': ['Mulching', 'Regular pruning']
    },
    'GrapeLeafBlight': {
        'plant': 'Grape',
        'symptoms': ['Irregular dark spots with yellow halos', 'Premature leaf drop'],
        'treatment': ['Copper-based fungicides', 'Improve air circulation', 'Remove leaf litter']
    },
    'PeachBacterialSpot': {
        'plant': 'Peach',
        'symptoms': ['Small water-soaked spots', 'Shot-hole effect (holes in leaves)', 'Cracked fruit'],
        'treatment': ['Copper sprays during dormancy', 'Oxytetracycline (severe cases)', 'Resistant varieties']
    },
    'PeachHealthy': {
        'plant': 'Peach',
        'symptoms': [],
        'treatment': ['Annual pruning', 'Fruit thinning']
    },
    'PepperBacterialSpot': {
        'plant': 'Pepper',
        'symptoms': ['Small dark spots with yellow halos', 'Leaf drop', 'Scabby spots on fruit'],
        'treatment': ['Copper sprays', 'Seed treatment', 'Remove infected plants immediately']
    },
    'PepperHealthy': {
        'plant': 'Pepper',
        'symptoms': [],
        'treatment': ['Consistent watering', 'Support/staking']
    },
    'PotatoEarlyBlight': {
        'plant': 'Potato',
        'symptoms': ['Target-pattern (bullseye) dark spots', 'Yellowing lower leaves'],
        'treatment': ['Chlorothalonil fungicide', 'Mulching to stop soil splash', 'Drip irrigation']
    },
    'PotatoHealthy': {
        'plant': 'Potato',
        'symptoms': [],
        'treatment': ['Hilling soil', 'Pest monitoring']
    },
    'PotatoLateBlight': {
        'plant': 'Potato',
        'symptoms': ['Large dark irregular patches', 'White mold on leaf undersides', 'Rotting tubers'],
        'treatment': ['Remove infected plants (Highly Contagious)', 'Copper fungicides', 'Avoid overhead watering']
    },
    'StrawberryHealthy': {
        'plant': 'Strawberry',
        'symptoms': [],
        'treatment': ['Mulch with straw', 'Renew beds every 3 years']
    },
    'StrawberryLeafScorch': {
        'plant': 'Strawberry',
        'symptoms': ['Purple spots with white centers', 'Browning leaf edges'],
        'treatment': ['Remove infected leaves', 'Fungicides if severe', 'Clean cultivation']
    },
    'TomatoBacterialSpot': {
        'plant': 'Tomato',
        'symptoms': ['Small brown scabs on fruit', 'Greasy spots on leaves'],
        'treatment': ['Copper + Mancozeb sprays', 'Avoid handling wet plants', 'Seed sanitation']
    },
    'TomatoEarlyBlight': {
        'plant': 'Tomato',
        'symptoms': ['Concentric ring spots (bullseye)', 'Lower leaves yellowing first'],
        'treatment': ['Mulching', 'Prune lower leaves', 'Copper fungicide']
    },
    'TomatoHealthy': {
        'plant': 'Tomato',
        'symptoms': [],
        'treatment': ['Stake plants', 'Regular watering']
    },
    'TomatoLateBlight': {
        'plant': 'Tomato',
        'symptoms': ['Dark greasy lesions', 'White fuzz in humid weather', 'Rapid plant death'],
        'treatment': ['Immediate removal of plants', 'Preventative fungicides', 'Destruction of cull piles']
    },
    'TomatoSeptoriaLeafSpot': {
        'plant': 'Tomato',
        'symptoms': ['Small circular spots with dark borders', 'Center of spot turns grey'],
        'treatment': ['Remove lower infected leaves', 'Chlorothalonil', 'Crop rotation']
    },
    'TomatoYellowLeafCurlVirus': {
        'plant': 'Tomato',
        'symptoms': ['Upward curling leaves', 'Yellow margins', 'Stunted growth'],
        'treatment': ['Control Whiteflies (vector)', 'Reflective mulches', 'Use resistant varieties (e.g., Tycoon)']
    }
}

CLASS_NAMES = list(DISEASE_DATA.keys())

def create_model():
    base_model = tf.keras.applications.ResNet50(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )
    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(29, activation='softmax')
    ])
    return model

print("🔄 Creating model architecture...")
model = create_model()

print("📥 Loading weights only...")

model.load_weights("model/plant_weights.weights.h5") 
print("✅ Weights loaded successfully!")

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    image = Image.open(io.BytesIO(file.read())).convert('RGB')
    image = image.resize((224, 224))
    
    image_array = tf.keras.applications.resnet50.preprocess_input(
        np.array(image, dtype=np.float32)[np.newaxis, ...]
    )
    
    predictions = model.predict(image_array, verbose=0)[0]
    predicted_idx = np.argmax(predictions)
    confidence = float(predictions[predicted_idx])
    
    predicted_class = CLASS_NAMES[predicted_idx]
    
    # --- 2. Fetch Enriched Data ---
    # Default fallback if class name mismatches
    info = DISEASE_DATA.get(predicted_class, {
        'plant': 'Unknown',
        'symptoms': [],
        'treatment': []
    })
    
    return jsonify({
        'disease': predicted_class,
        'confidence': confidence,
        'plantType': info['plant'],     # Now accurate
        'symptoms': info['symptoms'],   # Added Array
        'treatment': info['treatment'], # Added Array
        'affectedArea': 'leaves',
        'reasoning': f'Detected {predicted_class} ({confidence:.1%} confidence)'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)














# start command for server when we are "/PLANT_DISEASE_DETECTION_REPO/backend" :- tf_env/Scripts/python app.py



from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io


app = Flask(__name__)
CORS(app)



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
        tf.keras.layers.Dropout(0.5),  # adjust if different
        tf.keras.layers.Dense(29, activation='softmax')
    ])

    return model


print("🔄 Creating model architecture...")
model = create_model()

print("📥 Loading weights only...")
model.load_weights("model/plant_weights.weights.h5")
print("✅ Weights loaded successfully!")
    

CLASS_NAMES = [
    'AppleBlackRot', 'AppleCedarRust', 'AppleHealthy', 'AppleScab',
    'CherryHealthy', 'CherryPowderyMildew', 'CornCercosporaLeafSpot',
    'CornCommonRust', 'CornHealthy', 'CornNorthernLeafBlight',
    'GrapeBlackRot', 'GrapeEscaBlackMeasles', 'GrapeHealthy', 'GrapeLeafBlight',
    'PeachBacterialSpot', 'PeachHealthy', 'PepperBacterialSpot', 'PepperHealthy',
    'PotatoEarlyBlight', 'PotatoHealthy', 'PotatoLateBlight',
    'StrawberryHealthy', 'StrawberryLeafScorch',
    'TomatoBacterialSpot', 'TomatoEarlyBlight', 'TomatoHealthy',
    'TomatoLateBlight', 'TomatoSeptoriaLeafSpot', 'TomatoYellowLeafCurlVirus'
]

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    image = Image.open(io.BytesIO(file.read())).convert('RGB')
    image = image.resize((224, 224))
    
    # ResNet50 preprocessing
    image_array = tf.keras.applications.resnet50.preprocess_input(
        np.array(image, dtype=np.float32)[np.newaxis, ...]
    )
    
    predictions = model.predict(image_array, verbose=0)[0]
    predicted_idx = np.argmax(predictions)
    confidence = float(predictions[predicted_idx])
    
    predicted_class = CLASS_NAMES[predicted_idx]
    parts = predicted_class.split('_', 1)
    plant = parts[0] if len(parts) > 1 else 'Unknown'
    
    return jsonify({
        'disease': predicted_class,
        'confidence': confidence,
        'plantType': plant,
        'affectedArea': 'leaves',
        'reasoning': f'Detected {predicted_class} ({confidence:.1%} confidence)'
    })





if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)



# start command for server when we are "/plant-detector/backend" :- tf_env/Scripts/python app.py
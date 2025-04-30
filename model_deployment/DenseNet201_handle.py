import os
import json
import torch
import logging
from ts.torch_handler.base_handler import BaseHandler
from monai.transforms import (
    Compose, 
    LoadImaged, 
    EnsureChannelFirstd, 
    Orientationd, 
    ResizeD, 
    Spacingd, 
    ScaleIntensityd, 
    ToTensord
)
from monai.networks.nets import DenseNet201

logger = logging.getLogger(__name__)

class DenseNetHandler(BaseHandler):
    """
    Custom handler for DenseNet201 models trained on 3D medical images
    """
    def __init__(self):
        super(DenseNetHandler, self).__init__()
        self.initialized = False
        self.resized = (72, 72, 72) 
        
    def initialize(self, context):
        """
        Initialize model and transforms
        """
        self.manifest = context.manifest
        properties = context.system_properties
        model_dir = properties.get("model_dir")
        
        # Load model
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        model = DenseNet201(
            spatial_dims=3,
            in_channels=1,
            out_channels=2,
            init_features=64,
            growth_rate=32,
            block_config=(6, 12, 48, 32),
            pretrained=False
        )
        
        # Load checkpoint
        checkpoint_path = os.path.join(model_dir, "model.pth")
        if os.path.exists(checkpoint_path):
            checkpoint = torch.load(checkpoint_path, map_location=self.device)
            if "model_state_dict" in checkpoint:
                model.load_state_dict(checkpoint["model_state_dict"])
            else:
                # Fallback to direct loading if needed
                model.load_state_dict(checkpoint)
            logger.info("Model loaded successfully")
        else:
            logger.error(f"Missing the model checkpoint file: {checkpoint_path}")
            
        model.to(self.device)
        model.eval()
        self.model = model
        
        # Define transforms
        self.transforms = Compose([
            LoadImaged(keys=["image"]),
            EnsureChannelFirstd(keys=["image"]),
            Orientationd(keys=["image"], axcodes="RAS"),
            Spacingd(keys=["image"], pixdim=(1.0, 1.0, 1.0), mode="bilinear"),
            ResizeD(keys=["image"], spatial_size=self.resized, mode="nearest"),
            ScaleIntensityd(keys=["image"]),
            ToTensord(keys=["image"]),
        ])
        
        self.initialized = True
        logger.info("Model initialization complete")
        
    def preprocess(self, data):
        """
        Preprocess the input data
        """
        logger.info("Preprocessing input data")
        
        # Save input file to temp location
        input_file_path = "/tmp/input.nii"
        
        try:
            # Handle data from the 'data' field
            if len(data) > 0 and data[0].get("data"):
                logger.info("Found data in 'data' field")
                with open(input_file_path, "wb") as f:
                    f.write(data[0]["data"])
                
                # Create data dictionary for transform
                input_data = [{"image": input_file_path}]
                
                # Apply transforms
                transformed_data = self.transforms(input_data)
                logger.info(f"Input shape after transform: {transformed_data[0]['image'].shape}")
                return transformed_data[0]["image"].unsqueeze(0).to(self.device)
            else:
                logger.error("Unsupported input format")
                raise ValueError("Unsupported input format. Expected binary data.")
        except Exception as e:
            logger.error(f"Error in preprocessing: {e}")
            raise e
        
    def inference(self, data):
        """
        Run model inference
        """
        logger.info("Running inference")
        with torch.no_grad():
            outputs = self.model(data)
            return outputs
    
    def postprocess(self, inference_output):
        """
        Post-process the model output
        """
        logger.info("Post-processing model output")
        # Apply softmax to convert logits to probabilities
        probabilities = torch.softmax(inference_output, dim=1)
        
        # Get class prediction
        _, predicted = torch.max(probabilities, 1)
        
        # Create response with class probabilities and prediction
        result = {
            "prediction": predicted.item(),  # 0 for CN, 1 for AD
            "probabilities": {
                "CN": probabilities[0, 0].item(),  # Control/Normal probability
                "AD": probabilities[0, 1].item()   # Alzheimer's Disease probability
            }
        }
        
        return [result]

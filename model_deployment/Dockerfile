FROM pytorch/torchserve:latest

RUN pip install monai nibabel

# Copy model artifacts
COPY model_store /home/model-server/model-store/
COPY config.properties /home/model-server/config.properties

# Expose ports
EXPOSE 8080 8081 8082

# Start TorchServe when the container launches
CMD ["torchserve", "--start", "--disable-token-auth", "--model-store", "model-store", "--ts-config", "config.properties", "--models", "densenet201v2=densenet201v2.mar"]
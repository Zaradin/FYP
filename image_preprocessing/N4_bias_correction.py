import os
from nipype.interfaces.ants.segmentation import N4BiasFieldCorrection


def bias_field_correction(src_path, dst_path):
    """Perform N4 Bias Field Correction on a single file."""
    print("Running N4ITK bias field correction on:", src_path)
    try:
        # Set up N4BiasFieldCorrection instance
        n4 = N4BiasFieldCorrection()
        n4.inputs.input_image = src_path
        n4.inputs.output_image = dst_path

        # Set up the parameters for the N4ITK algorithm
        n4.inputs.dimension = 3  # 3D image
        n4.inputs.n_iterations = [100, 100, 60, 40]  # Number of iterations at different scales
        n4.inputs.shrink_factor = 3  # Downsample factor
        n4.inputs.convergence_threshold = 1e-4  # Threshold for convergence
        n4.inputs.bspline_fitting_distance = 300  # Distance for B-spline fitting
        
        # Run the bias field correction process
        res = n4.run()
        print("Output saved at:", dst_path)
        print(res.outputs)
        
    except RuntimeError as e:
        print("Failed on:", src_path)
        print(e)

if __name__ == '__main__':
    # input
    src_file = 'CN.nii'
    # output
    dst_file = 'CN_Bias_Corr.nii'

    # Run the bias field correction on the single file
    bias_field_correction(src_file, dst_file)

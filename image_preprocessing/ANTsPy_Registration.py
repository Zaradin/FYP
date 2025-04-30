import ants

# read / write images
img = ants.image_read('ADNI_002_S_1070_MR_MPR__GradWarp__B1_Correction__N3__Scaled_Br_20070217032644901_S23120_I40831.nii')
ants.image_write(img, 'MNI152_T1_1mm.nii')

# basic operations
img + img2
img - img2
img[:20,:20,:20] # indexing returns an image

# advanced operations
img = ants.smooth_image(img, 2)
img = ants.resample_image(img, (3,3,3))
img.smooth_image(2).resample_image((3,3,3)) # chaining

# convert to or from numpy
arr = img.numpy()
img2 = ants.from_numpy(arr * 2)

# segmentation
result = ants.atropos(a=img, m='[0.2,1x1]', c='[2,0]', i='kmeans[3]', x=ants.get_mask(img))

# registration
#result = ants.registration(fixed_image, moving_image, type_of_transform = 'SyN' )
result = ants.registration(
    fixed_image, 
    moving_image, 
    type_of_transform='Affine')  # Initial affine alignment
result = ants.registration(
    fixed_image, 
    reg['warpedmovout'], 
    type_of_transform='SyN')  # Apply SyN after affine transform


# plotting
ants.plot(img, overlay = img > img.mean())
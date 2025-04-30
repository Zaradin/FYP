from __future__ import division

import sys
import glob2
import os
import shutil
import pandas as pd

current_directory = os.getcwd()
parent_directory = os.path.dirname(current_directory)
user_dir = os.path.join(parent_directory, 'josh')
master_dir = os.path.join(user_dir, 'ADNI')
master_list = os.path.join(master_dir, 'ADNI1_Complete_1Yr_1.5T_10_13_2024.csv')
write_dir = os.path.join(user_dir, 'data')
label_dict = ['AD', 'MCI', 'CN']

if __name__ == '__main__':
    adni_data = glob2.glob(master_dir + '/**/*.nii')
    adni_data_scaled = [i for i in adni_data if 'Scaled_2' not in i]

    adni_list = pd.read_csv(master_list, skipinitialspace=True, dtype=str)

    completed = 0
    total = len(adni_data_scaled)
    for adni in adni_data_scaled:
        img_id = adni.split('_')[-1].split('.')[0]
        
        relevant_rows = adni_list[adni_list['Image Data ID'] == img_id]
        if len(relevant_rows) != 1:
            print(img_id)
            print('Mismatch error')
            completed += 1
            continue
        
        label = relevant_rows['Group'].values[0]
        if label not in label_dict:
            print(img_id)
            print(label)
            print('Label not found')
            completed += 1
            continue
        
        file_name = os.path.basename(adni)
        curr_dir = os.path.join(write_dir, label)
        dest_path = os.path.join(curr_dir, file_name)
        
        # Create the directory if it doesn't exist
        os.makedirs(curr_dir, exist_ok=True)
        
        # Copy the file
        shutil.copyfile(adni, dest_path)
        
        # Delete the original file
        os.remove(adni)
        
        completed += 1
        print('Completed ' + str(completed / total * 100) + '%')

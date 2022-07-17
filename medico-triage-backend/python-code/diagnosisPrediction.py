import os
import pandas as pd
import numpy as np


def main():
    f_path = "Symptom-Diagnosis-Linear-matrix.xlsx"
    sheet_name = "Sheet1"
    
    input_data = {
        "symptoms" : ["Fever", "Cough"]
    }

    input_symptoms = input_data['symptoms']
    input_symptoms = [x.lower() for x in input_symptoms]
    print(input_symptoms)

    # reading excel and checking column names for creating diagnosis dataframe
    diagnosis_column = [0]
    df_diagnosis = pd.read_excel(
        f_path, sheet_name=sheet_name, engine='openpyxl', usecols=diagnosis_column)

    # reading excel and checking column names for creating symptom dataframe
    df_read_all_data_subset = pd.read_excel(f_path, sheet_name=sheet_name, engine='openpyxl')
    list_symptoms = df_read_all_data_subset.head(0)

    df_diagnosis_symptom_zero_one_matrix = df_read_all_data_subset.copy() 
    # droping diagnosis column from the datafram
    df_diagnosis_symptom_zero_one_matrix = df_diagnosis_symptom_zero_one_matrix.iloc[: , 1:]

    # creating a symptom list using the dataframe header
    input_symptom_zero_one_matrix = []
    list_symptoms = [x.lower() for x in list_symptoms]
    for symptom in list_symptoms :
        if symptom in input_symptoms :
            input_symptom_zero_one_matrix.append(1)
        else :
            input_symptom_zero_one_matrix.append(0)     
    # removing empty first column from the symptoms row
    input_symptom_zero_one_matrix.pop(0)
    print(input_symptom_zero_one_matrix)

    # calculating cosine similarity
    symptom_zero_one_list = df_diagnosis_symptom_zero_one_matrix.to_numpy()
    input_symptom_zero_one_list = np.array(input_symptom_zero_one_matrix)
    similarity_scores = symptom_zero_one_list.dot(input_symptom_zero_one_list)/ (np.linalg.norm(symptom_zero_one_list, axis=1) * np.linalg.norm(input_symptom_zero_one_list))

    # creating a new DataFrame with diagnosis and cosine similarity value
    df_diagnosis_list_similarity_scores = pd.DataFrame()
    df_diagnosis_list_similarity_scores['Diagnosis'] = df_diagnosis.copy()
    df_diagnosis_list_similarity_scores['Similarity-Score'] = similarity_scores
    df_sorted_diagnosis = df_diagnosis_list_similarity_scores.sort_values(by=['Similarity-Score'], ascending=False).head(7)

    # deleting diagnois if cosine similarity not greater than 0
    df_sorted_diagnosis = df_sorted_diagnosis[df_sorted_diagnosis['Similarity-Score'] > 0]
    print(df_sorted_diagnosis.to_json(orient='records')) 

if __name__ == "__main__":
    main()
print("execution complete")


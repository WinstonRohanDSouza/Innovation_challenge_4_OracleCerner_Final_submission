import os
import json


def main():
    input_data = {
        "diagnosis" : ["Pulmonary Tuberculosis"]
    }
    input_diagnosis = input_data['diagnosis']
    input_diagnosis = [x.lower() for x in input_diagnosis][0]

    file_path = open('department.json')
    diagnois_department_data = json.load(file_path)
    print(type(diagnois_department_data))
    print(diagnois_department_data)
    print(input_diagnosis)

    if diagnois_department_data.get(input_diagnosis) != None :
        print(diagnois_department_data[input_diagnosis])

if __name__ == "__main__":
    main()
print("execution complete")


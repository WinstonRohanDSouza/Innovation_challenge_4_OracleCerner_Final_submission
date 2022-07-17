# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## version

node - 14.15.5

## Available Scripts

In the project directory, you can run:

### `npm i`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Workflow -

1.  Select Role
    option given
    1.Nurse
    2.Doctor
    3.Patient
2.  click on Next
3.  Nurse Workflow -

        1.It will redirect to patient details capture page (optional).
        2.click on next, redirects to symptoms page
        2.Enter symptoms
                    3.1. auto search with suggest the symoptoms when min character length is 2 like "fe"
                    3.2. can select multiple symptoms
                    3.3. click on search icon next to search box
                    3.4. shows the probable diagnosis list.
                    3.5. click on any disgnosis
                    3.6. shows the department, treatment and intervenstion suggested for the selected diagnosis

4.  Doctor Workflow

        1.It will redirect to redirects to symptoms page .
        2.Enter symptoms
                    2.1. auto search with suggest the symoptoms when min character length is 2 like "fe"
                    2.2. can select multiple symptoms
                    2.3. click on search icon next to search box
                    2.4. shows the probable diagnosis list.
                    2.5. click on any disgnosis
                    2.6. shows the  treatment and intervenstion suggested for the selected diagnosis

5.  Patient Workflow

        1.It will redirect to patient details capture page (optional).
        2.click on next, redirects to symptoms page
        2.Enter symptoms
                    3.1. auto search with suggest the symoptoms when min character length is 2 like "fe"
                    3.2. can select multiple symptoms
                    3.3. click on search icon next to search box
                    3.4. shows the probable diagnosis list.
                    3.5. click on any disgnosis
                    3.6. shows the department suggested for the selected diagnosis

6.  Symptoms search works when character length is more than 1.
7.  diagnosis search works with minimum of 2 symptoms.

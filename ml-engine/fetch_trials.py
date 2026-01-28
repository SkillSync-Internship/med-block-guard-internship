import requests
import pandas as pd
import os

os.makedirs('../data', exist_ok=True)

def fetch_clinical_trials(query="diabetes", max_results=10):
    base_url = "https://clinicaltrials.gov/api/v2/studies"
    params = {
        "query.term": query,
        "pageSize": max_results,
        "fields": "NCTId,BriefTitle,EligibilityModule,DesignModule,StatusModule"
    }
    
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        studies = data.get('studies', [])
        
        trial_list = []
        for s in studies:
            protocol = s.get('protocolSection', {})
            trial_list.append({
                "nct_id": protocol.get('identificationModule', {}).get('nctId'),
                "title": protocol.get('identificationModule', {}).get('briefTitle'),
                "gender": protocol.get('eligibilityModule', {}).get('gender'),
                "min_age": protocol.get('eligibilityModule', {}).get('minimumAge'),
                "status": protocol.get('statusModule', {}).get('overallStatus')
            })
        
        df = pd.DataFrame(trial_list)
        df.to_csv('../data/sample_trials.csv', index=False)
        print(f"successfully saved {len(df)} trials to data/sample_trials.csv")
    else:
        print(f"failed to fetch data: {response.status_code}")

if __name__ == "__main__":
    fetch_clinical_trials()
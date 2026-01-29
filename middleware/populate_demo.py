import requests

API_URL = "http://127.0.0.1:8000"

new_trials = [
    {"id": "NCT01111111", "title": "Cardiovascular Risk Study A", "data": "clean_data_001", "risk": "low risk"},
    {"id": "NCT02222222", "title": "Neuropathy Baseline Analysis", "data": "clean_data_002", "risk": "high risk"},
    {"id": "NCT03333333", "title": "Diabetes Prevention Phase II", "data": "clean_data_003", "risk": "low risk"},
]

def run_demo():
    for t in new_trials:
        requests.post(f"{API_URL}/register-trial", params={
            "nct_id": t["id"], "title": t["title"], "trial_data": t["data"], "bias_risk": t["risk"]
        })
    
    print("simulating tampering on NCT02222222...")
    requests.get(f"{API_URL}/verify/NCT02222222", params={"current_data": "TAMPERED_DATA_XYZ"})

if __name__ == "__main__":
    run_demo()
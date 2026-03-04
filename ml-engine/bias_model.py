import pandas as pd
import os

CSV_PATH = "../data/trials_for_blockchain.csv"

def calculate_bias_score():
    if not os.path.exists(CSV_PATH):
        print("csv not found")
        return

    df = pd.read_csv(CSV_PATH)
    
    min_col = 'min_age'

    def get_risk(row):
        score = 0
        try:
            val = float(row[min_col])
            if val > 30:
                score += 40
            if val < 18:
                score += 20
        except:
            pass
            
        return "high risk" if score >= 40 else "moderate risk" if score >= 20 else "low risk"

    df['bias_risk_level'] = df.apply(get_risk, axis=1)
    
    output_path = "../data/trials_with_bias_scores.csv"
    df.to_csv(output_path, index=False)
    print(f"analysis complete. results saved to {output_path}")
    print(df[['nct_id', 'min_age', 'bias_risk_level']].head())

if __name__ == "__main__":
    calculate_bias_score()
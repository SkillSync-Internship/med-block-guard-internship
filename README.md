## **Med-Block-Guard: Clinical Trial Integrity System**

An advanced machine learning and blockchain-integrated system designed to ensure the authenticity and integrity of clinical research data. This project serves as a security layer to classify clinical trial records for recruitment bias and data quality before anchoring them to an immutable ledger.

**Developed as part of a Blockchain Development Internship at Thaniya Technologies.**

---

## **Project Overview**

This project utilizes a **Logistic Regression** model trained on clinical metadata to identify patterns of recruitment bias, specifically focusing on demographic skews in age and gender. Once the data is analyzed for ethical integrity, its cryptographic fingerprint (**SHA-256**) is secured within a local blockchain-simulated ledger to prevent unauthorized tampering.

### **Key Features**

* **Real-time Bias Analysis:** Instant classification of clinical trial eligibility criteria using a trained Scikit-Learn backend.
* **Integrity Audit Scores:** Provides a risk percentage for every trial based on demographic inclusivity.
* **Blockchain Integrity:** Secured by a FastAPI middleware that monitors data tampering via SHA-256 hashing and world-state verification.
* **Security Dashboard:** A clean, high-contrast UI for monitoring system-wide data integrity and tamper alerts.
* **Privacy-Focused:** Fully local processing with no sensitive clinical data leaving the secure local server.

---

## **Tech Stack**

### **Backend & ML**

* **Python 3.12**: Core logic, data processing, and model execution.
* **FastAPI**: High-performance REST API for model serving and ledger management.
* **Scikit-Learn**: Implementation of Logistic Regression and TF-IDF Vectorization for bias detection.
* **Joblib**: Model serialization for rapid loading and prediction.

### **Frontend & Dashboard**

* **Next.js 15**: Modern React framework for optimized data fetching and dashboard management.
* **Tailwind CSS**: Utility-first CSS framework for high-contrast integrity status visualization.
* **Vanilla JavaScript**: Real-time data fetching and dynamic UI updates for tamper detection alerts.

---

## **Project Structure**

```text
Med-Block-Guard/
│
├── ml-engine/              # Python ML engine
│   ├── bias_model.py       # Bias risk scoring logic
│   ├── train_model.py      # Model training script
│   ├── detector_model.pkl  # Trained ML model
│   └── vectorizer.pkl      # TF-IDF vectorizer
│
├── middleware/             # FastAPI & Security Layer
│   ├── main.py             # API server with CORS and Hashing logic
│   ├── ledger.json         # Local persistent data ledger
│   ├── verify_integrity.py # Tamper detection script
│   └── dashboard.html      # Security monitor interface
│
├── blockchain/             # Infrastructure (Smart Contracts/Docker)
└── data/                   # ClinicalTrials.gov datasets

```

---

## **ML Implementation**

The model utilizes **TF-IDF Vectorization** to process eligibility criteria text from clinical trials. By identifying keywords that correlate with selection bias—such as overly restrictive age caps or exclusionary health histories—the system assigns an audit score to ensure representative science.

**Training the Model:**

```bash
cd ml-engine
python train_model.py

```

The system performs class balancing to ensure the detector provides an unbiased result for diverse clinical research verification.

---

## **Installation & Setup**

### **1. Backend & API**

```bash
cd middleware
# Activate your virtual environment first
uvicorn main:app --reload

```

### **2. Running Analysis**

```bash
cd ml-engine
python bias_model.py

```

### **3. Integrity Verification**

```bash
cd middleware
python verify_integrity.py

```

---

## **Authors**

### **Fragan Dsouza**  

🎓 3rd Year B.Tech. in Computer Science Engineering  

🏫 NMAM Institute of Technology  

💼 Intern @ **Thaniya Technologies** <br>

🔗 [LinkedIn](https://linkedin.com/in/fragan-dsouza) | 🔗 [GitHub](https://github.com/fragan7dsouza)



### **Hariharanath**  

🎓 3rd Year B.Tech. in Computer Science & Engineering (Full Stack Development)  

🏫 NMAM Institute of Technology  

💼 Intern @ **Thaniya Technologies**



### **Pratham B Shetty**  

🎓 3rd Year B.Tech. in Computer Science & Engineering (Full Stack Development)  

🏫 NMAM Institute of Technology  

💼 Intern @ **Thaniya Technologies**



### **Anup C**  

🎓 3rd Year B.Tech. in Computer Science & Engineering (Full Stack Development)  

🏫 NMAM Institute of Technology <br>

💼 Intern @ **Thaniya Technologies** <br>

🔗 [LinkedIn](https://www.linkedin.com/in/-anup-c-/) | 🔗 [GitHub](https://github.com/CodeAnup)


---

## **License**

This project is open-source under the **MIT License**.



# 🛡️ **Med-Block-Guard: Clinical Trial Integrity System**

An advanced machine learning and blockchain-integrated system designed to ensure the authenticity and integrity of academic and clinical research texts. This project serves as a security layer to classify data as **Human-written** or **AI-generated** before anchoring it to an immutable ledger.

**Developed as part of a Blockchain Development Internship at Thaniya Technologies.**

---

## 🔥 **Project Overview**

This project utilizes a **Logistic Regression** model trained on a massive dataset (~500k rows) to identify linguistic patterns, word frequencies, and structural nuances. Once a text is analyzed for authenticity, its cryptographic fingerprint (**SHA-256**) is secured within a local blockchain-simulated ledger.

### **Key Features**

* **Real-time ML Analysis:** Instant classification of academic text using a trained Scikit-Learn backend.
* **Probabilistic Results:** Provides a confidence percentage for every human vs. AI verdict.
* **Blockchain Integrity:** Secured by a FastAPI middleware that monitors data tampering via SHA-256 hashing.
* **Minimalist Dashboard:** A clean, high-contrast UI (Teal/White/Grey) for monitoring system-wide data integrity.
* **Privacy-Focused:** Fully local processing with no clinical data leaving the local server.

---

## 🚀 **Tech Stack**

### **Backend & ML**

* **Python 3.12**: Core logic, data processing, and model execution.
* **FastAPI**: High-performance REST API for model serving and ledger management.
* **Scikit-Learn**: Implementation of Logistic Regression and TF-IDF Vectorization.
* **Joblib**: Model serialization for rapid loading and prediction.

### **Frontend & Dashboard**

* **Vanilla HTML5**: Structure for the security monitoring dashboard.
* **Minimalist CSS3**: Custom teal, grey, and white styling without external frameworks.
* **Vanilla JavaScript**: Real-time data fetching and dynamic UI updates via the Fetch API.

---

## 📦 **Project Structure**

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
│   └── dashboard.html      # Minimalist security monitor
│
├── blockchain/             # Infrastructure (Fabric/Docker)
└── data/                   # Clinical trial datasets

```

---

## 🧠 **ML Implementation**

The model utilizes **TF-IDF Vectorization** with an `ngram_range` of (1, 2) to capture both individual words and common phrasing patterns.

**Training the Model:**

```bash
cd ml-engine
python train_model.py

```

The system performs class balancing to ensure the detector provides an unbiased result for academic research verification.

---

## 🛠️ **Installation & Setup**

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

## 👨‍💻 **Authors**

### **Fragan Dsouza**  
🎓 3rd Year B.E. in Computer Science Engineering  
🏫 NMAM Institute of Technology  

### **Hariharanath**  
🎓 3rd Year B.E. in Computer Science & Engineering (Full Stack Development)  
🏫 NMAM Institute of Technology  

### **Pratham B Shetty**  
🎓 3rd Year B.E. in Computer Science & Engineering (Full Stack Development)  
🏫 NMAM Institute of Technology  

💼 Intern @ **Thaniya Technologies** 🔗 [LinkedIn](https://linkedin.com/in/fragan-dsouza) | 🔗 [GitHub](https://github.com/fragan7dsouza)

---

## 📜 **License**

This project is open-source under the **MIT License**.


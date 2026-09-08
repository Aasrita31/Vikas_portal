# 🏛️ VIKAS – Single-Window Platform of TIH / IITTNiF

> **IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)**  
> *Technology Innovation Hub (TIH) on Positioning and Precision Technologies*  
> **Leadership:** Dr. Roshan K. Srivastav, Project Director (PD)

---

## 📌 1. What is the VIKAS Platform?

**VIKAS** is the flagship single-window digital gateway of IITTNiF. It brings together **startups, academic institutions, industry, government departments, schools, and domain experts** into a structured, outcome-driven innovation ecosystem under the National Mission on Interdisciplinary Cyber-Physical Systems (**NM-ICPS**).

> [!IMPORTANT]
> **Core Policy Position:**  
> **VIKAS is NOT an incubation or equity-based program.**  
> It is a **structured engagement, execution, and business enablement platform** that connects talent, technology, and funding to drive real-world deployment.

---

## 🔄 2. End-to-End System Workflow Diagram

```mermaid
flowchart TD
    classDef publicStyle fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;
    classDef opsStyle fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#92400e;
    classDef appStyle fill:#f3e8ff,stroke:#9333ea,stroke-width:2px,color:#6b21a8;
    classDef execStyle fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#15803d;
    classDef certStyle fill:#ffe4e6,stroke:#e11d48,stroke-width:2px,color:#9f1239;

    subgraph Layer1["1. Entry & Data Capture (Public Portal)"]
        S1["Applicant Enters Portal\n(Startup / Faculty / Student / Industry / Expert)"]:::publicStyle
        S2["Fills 7-Section Registration Form\n(Basic Info, Type, Domain, Intent, Problem Statement)"]:::publicStyle
        S3["Acknowledge Terms & Consent\n(Explicit non-incubation acknowledgement)"]:::publicStyle
        S4["System Generates Audit File Number\n(Format: VIKAS/2026/VERTICAL/ONBOARD/SERIAL)"]:::publicStyle
        S1 --> S2 --> S3 --> S4
    end

    subgraph Layer2["2. Screening (Operations)"]
        S5["Operations Anchor Review\n(Document verification & eligibility check)"]:::opsStyle
        S6{"Is File Complete & Valid?"}:::opsStyle
        S7["Return to Applicant for Revision"]:::opsStyle
        S8["Assign to 1 of 9 VIKAS Verticals\n(6.1 Tech Dev, 6.2 Startups, 6.3 HRD, etc.)"]:::opsStyle
        S4 --> S5 --> S6
        S6 -- "No (Deficient)" --> S7
        S7 --> S2
        S6 -- "Yes (Verified)" --> S8
    end

    subgraph Layer3["3. Governance & Decision Routing (Approval Matrix)"]
        S9{"Determine Case Authority"}:::appStyle
        S10["Pillar Lead Digital Approval\n(Standard domain projects, training, fellowships)"]:::appStyle
        S11["Project Director (PD) Approval\n(Dr. Roshan K. Srivastav - MoUs, Strategic, Industry, High-Budget)"]:::appStyle
        S8 --> S9
        S9 -- "Standard Program File" --> S10
        S9 -- "Strategic / MoU / High Value" --> S11
    end

    subgraph Layer4["4. Engagement & Vertical Execution"]
        S12["Official File Approved & Enrolled"]:::execStyle
        S13["6.1 Technology Dev\n(TRL 3 → 6 Prototype)"]:::execStyle
        S14["6.2 Startups\n(Revenue & Pilots)"]:::execStyle
        S15["6.3-6.9 Other Verticals\n(HRD, Schools, Labs, etc.)"]:::execStyle
        S16["Weekly Progress Logs & Mentor Milestone Verification"]:::execStyle
        S10 --> S12
        S11 --> S12
        S12 --> S13 & S14 & S15
        S13 & S14 & S15 --> S16
    end

    subgraph Layer5["5. Outcome Delivery & Official Certification"]
        S17["Certificate of Association\n(Signed by Dr. Roshan K. Srivastav, PD)"]:::certStyle
        S18["Formal 8-Clause Onboarding Letter\n(Ref No: IITTNiF/VIKAS/2026/...)"]:::certStyle
        S19["'Proud to be a VIKAS Startup' Badge"]:::certStyle
        S20["TRL 6 Qualification & Technology Transfer"]:::certStyle
        S16 --> S17 & S18 & S19 & S20
    end
```

---

## 📑 3. Step-by-Step Flow Explanation (Minimal & Clear)

### **Step 1: Stakeholder Entry & Data Capture (Public Portal)**
* **Who does it:** Startups, Faculty, Researchers, Industry, Schools, Experts.
* **Action:** Fills a 7-section single-window registration form:
  1. **Basic Details:** Name, Organization, Email, Phone, Location.
  2. **Stakeholder Type:** Startup, Student/Researcher, School, Institution, Industry, Government, Expert.
  3. **Domain Selection:** GIS/Remote Sensing, NavIC/PNT, AI/ML, Drone Tech, Digital Twin, etc.
  4. **Intent of Engagement:** Skill Dev, Project Participation, Collaboration, Tech Dev, Business.
  5. **Dynamic Details:** Tailored inputs (e.g. Startup stage, Expert experience, Lab requirements).
  6. **Problem Statement:** Open-text project or research proposal.
  7. **Consent:** Agrees to policies and explicitly acknowledges the non-incubation nature.
* **Result:** System assigns a unique digital tracking number (e.g. `VIKAS/2026/STARTUP/ONBOARD/101`).

---

### **Step 2: Administrative Screening (Operations Anchor)**
* **Who does it:** Operations Anchor / Secretariat Cell.
* **Action:**
  * Checks document authenticity, eligibility criteria, and endorsements.
  * Assigns the official vertical category (6.1 to 6.9).
  * Enforces compliance—no file moves forward without a verified digital audit log.

---

### **Step 3: Governance & Approval Matrix**
* **Who does it:** Domain Pillar Leads & Project Director (**Dr. Roshan K. Srivastav**).
* **Decision Rules:**

| Case Type | Approval Authority |
|---|---|
| **General Onboarding** | Automated / Operations Anchor |
| **Program Participation / Fellowships** | **Pillar Lead** *(Domain Head)* |
| **Startup Project Allocation** | **Startups Pillar + Project Director** |
| **Industry / Government Engagement** | **Project Director (PD)** |
| **Senior Expert Onboarding** | **Project Director (PD)** |
| **Strategic MoUs & National Alliances** | **Project Director (PD)** |

---

### **Step 4: Program Engagement & Vertical Execution (The 9 Verticals)**

Once approved, the file transitions into its active vertical:

```mermaid
graph LR
    V1["6.1 Technology Development"] --- D1["TDP projects, TRL 3 to 6 prototypes, lab testing"]
    V2["6.2 Startups & Enablement"] --- D2["Project allocation, revenue generation, pilot runs"]
    V3["6.3 HRD & Fellowships"] --- D3["Chanakya scholars, post-doc fellows, internships"]
    V4["6.4 Skill Development"] --- D4["Govt training, upskilling, certifications"]
    V5["6.5 Collaborations (MoUs)"] --- D5["Strategic alliances & international partnerships"]
    V6["6.6 Schools (VidyaGIS)"] --- D6["Spatial reasoning learning & teacher training"]
    V7["6.7 Institutions & Labs"] --- D7["SPIN Labs, PNT Labs, Centres of Excellence"]
    V8["6.8 Industry & Govt Interface"] --- D8["Real-world problem statements & consultancy"]
    V9["6.9 Experts Network"] --- D9["Advisory panels, domain mentors, peer reviewers"]
```

---

### **Step 5: Execution Monitoring & Outcome Deliverables**
* **Milestone Tracking:** Principal Investigators log weekly progress, evidence files, and test results.
* **Mentor Sign-off:** Domain experts verify deliverables at each milestone.
* **Formal Outputs Issued:**
  1. 📜 **Certificate of Association:** Official certificate signed by **Dr. Roshan K. Srivastav**, Project Director.
  2. 📄 **Formal 8-Clause Onboarding Letter:** Documented reference letter (`IITTNiF/VIKAS/YYYY/____`) specifying Scope, IP, Confidentiality, and Liability terms.
  3. 🏅 **"Proud to be a VIKAS Startup" Badge:** Official branding asset for social media and website inclusion.
  4. 🚀 **TRL 6 Qualification:** Technology prototype validated for commercial transfer or deployment.

---

## 🏛️ 4. System Roles & Responsibilities

```mermaid
classDiagram
    class PublicStakeholder {
        +Submit Onboarding Form()
        +Track Application Status()
        +Upload Milestone Evidence()
    }
    class OperationsAnchor {
        +Screen Documents()
        +Verify Eligibility()
        +Assign File Number()
        +Route to Verticals()
    }
    class PillarLead {
        +Review Domain Proposals()
        +Approve Program Allocations()
        +Verify Technical Milestones()
    }
    class ProjectDirector {
        +Dr. Roshan K. Srivastav
        +Approve Strategic Partnerships()
        +Approve High-Value Budgets()
        +Sign MoUs & Sanction Orders()
        +Issue Certificate of Association()
    }

    PublicStakeholder --> OperationsAnchor : Submits File
    OperationsAnchor --> PillarLead : Standard Routing
    OperationsAnchor --> ProjectDirector : Strategic / High-Value Routing
    PillarLead --> ProjectDirector : Escalation / Final Sanction
```

---

## 💡 5. How to Explain This to Anyone in 30 Seconds

> *"**VIKAS** is the single-window innovation platform of IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF).  
> Applicants—from startups to researchers—register through a 7-section portal. The Operations team screens and routes their file to one of 9 specialized verticals, where Domain Leads and the Project Director (**Dr. Roshan K. Srivastav**) review and approve them. Once active, the platform tracks weekly progress and mentor milestone verifications until issuing the official **Certificate of Association** and **TRL 6 prototype certification**."*

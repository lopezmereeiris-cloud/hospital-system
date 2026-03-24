import { formatPatientAddress, type PatientRecord } from "@/lib/patients";

export type EncounterType =
  | "Outpatient"
  | "Inpatient"
  | "Emergency"
  | "Teleconsult";

export type TreatmentOutcome =
  | "Improved"
  | "Transferred"
  | "HAMA"
  | "Expired"
  | "Absconded";

export interface MedicalVitalSigns {
  bloodPressure: string;
  heartRate: string;
  respiratoryRate: string;
  temperature: string;
  oxygenSaturation: string;
  heightCm: string;
  weightKg: string;
  bmi: string;
}

export interface MedicalPhysicalExamination {
  generalSurvey: string;
  heent: string;
  chestLungs: string;
  cardiovascular: string;
  abdomen: string;
  genitourinary: string;
  skinExtremities: string;
  neurologic: string;
}

export interface DiagnosticResult {
  category: "Laboratory" | "Imaging";
  name: string;
  date: string;
  result: string;
}

export interface MedicationOrder {
  genericName: string;
  quantity: string;
  dosage: string;
  frequency: string;
  route: string;
  totalCostPhp: number;
}

export interface ProcedureRecord {
  description: string;
  date: string;
  rvsCode?: string;
  outcome: string;
}

export interface ProgressNote {
  date: string;
  action: string;
  author: string;
}

export interface ReferralSource {
  facility: string;
  reason: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  encounterType: EncounterType;
  caseClassification: string;
  department: string;
  room?: string;
  facilityName: string;
  facilityAccreditationNumber: string;
  facilityAddress: string;
  attendingPhysician: string;
  physicianLicenseNumber: string;
  admissionDateTime: string;
  dischargeDateTime?: string;
  chiefComplaint: string;
  admittingDiagnosis: string;
  dischargeDiagnosis: string;
  icd10Code: string;
  caseRateCode?: string;
  historyOfPresentIllness: string;
  pastMedicalHistory: string;
  familyHistory: string;
  socialHistory: string;
  reviewOfSystems: string[];
  referredFrom?: ReferralSource;
  vitalSigns: MedicalVitalSigns;
  physicalExamination: MedicalPhysicalExamination;
  diagnostics: DiagnosticResult[];
  medicines: MedicationOrder[];
  procedures: ProcedureRecord[];
  courseInWard: ProgressNote[];
  disposition: string;
  outcomeOfTreatment: TreatmentOutcome;
  followUpInstructions: string;
  followUpDate?: string;
  certifiedBy: string;
  certifiedOn: string;
}

const FACILITY = {
  name: "MedAdmin Community Hospital",
  accreditationNumber: "HCI-26-01047",
  address: "12 Session Road, Barangay I, Baguio City, Benguet 2600",
};

type MedicalRecordSeed = Omit<
  MedicalRecord,
  | "facilityName"
  | "facilityAccreditationNumber"
  | "facilityAddress"
  | "certifiedBy"
  | "certifiedOn"
>;

function createMedicalRecord(seed: MedicalRecordSeed): MedicalRecord {
  return {
    facilityName: FACILITY.name,
    facilityAccreditationNumber: FACILITY.accreditationNumber,
    facilityAddress: FACILITY.address,
    certifiedBy: seed.attendingPhysician,
    certifiedOn: seed.dischargeDateTime ?? seed.admissionDateTime,
    ...seed,
  };
}

const dateFormatter = new Intl.DateTimeFormat("en-PH", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-PH", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 2,
});

const seedRecords: MedicalRecord[] = [
  createMedicalRecord({
    id: "MR-2025-001",
    patientId: "P-001",
    encounterType: "Inpatient",
    caseClassification: "Acute medical admission",
    department: "Internal Medicine",
    room: "Ward A-203",
    attendingPhysician: "Dr. Juan Dela Cruz",
    physicianLicenseNumber: "PRC-1204589",
    admissionDateTime: "2025-08-10T09:15:00",
    dischargeDateTime: "2025-08-12T15:40:00",
    chiefComplaint: "Severe headache, dizziness, and persistently elevated blood pressure.",
    admittingDiagnosis: "Hypertensive urgency; uncontrolled type 2 diabetes mellitus.",
    dischargeDiagnosis:
      "Hypertensive urgency improved; type 2 diabetes mellitus with hyperglycemia.",
    icd10Code: "I16.0",
    caseRateCode: "I10",
    historyOfPresentIllness:
      "Three-day history of headache and lightheadedness with home blood pressure readings above 180/100 mmHg. Patient also noted polyuria and poor glucose control after missing medications.",
    pastMedicalHistory:
      "Hypertension and type 2 diabetes mellitus diagnosed more than five years ago. No prior stroke or myocardial infarction.",
    familyHistory:
      "Both parents with hypertension; mother also had diabetes mellitus.",
    socialHistory:
      "Former smoker. Occasional alcohol intake. Works as a farmer with irregular meal schedule.",
    reviewOfSystems: ["Headache", "Dizziness", "Polyuria", "Fatigue"],
    vitalSigns: {
      bloodPressure: "188/104 mmHg",
      heartRate: "98 bpm",
      respiratoryRate: "20 cpm",
      temperature: "36.9 C",
      oxygenSaturation: "98%",
      heightCm: "165",
      weightKg: "68",
      bmi: "25.0",
    },
    physicalExamination: {
      generalSurvey: "Awake, coherent, mildly uncomfortable due to headache.",
      heent: "Pink palpebral conjunctivae, anicteric sclerae, no facial asymmetry.",
      chestLungs: "Clear breath sounds, no wheeze or crackles.",
      cardiovascular: "Adynamic precordium, regular rhythm, no murmur.",
      abdomen: "Soft, non-tender, normoactive bowel sounds.",
      genitourinary: "No dysuria or flank tenderness.",
      skinExtremities: "Warm extremities, no edema.",
      neurologic: "No focal neurologic deficit, oriented x3.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "Fasting blood sugar",
        date: "2025-08-10",
        result: "216 mg/dL",
      },
      {
        category: "Laboratory",
        name: "Serum creatinine",
        date: "2025-08-10",
        result: "1.0 mg/dL",
      },
      {
        category: "Imaging",
        name: "12-lead ECG",
        date: "2025-08-10",
        result: "Normal sinus rhythm; no acute ischemic changes.",
      },
    ],
    medicines: [
      {
        genericName: "Amlodipine",
        quantity: "6 tablets",
        dosage: "10 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 96,
      },
      {
        genericName: "Metformin",
        quantity: "6 tablets",
        dosage: "500 mg",
        frequency: "BID",
        route: "Oral",
        totalCostPhp: 72,
      },
      {
        genericName: "Paracetamol",
        quantity: "4 tablets",
        dosage: "500 mg",
        frequency: "PRN",
        route: "Oral",
        totalCostPhp: 20,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-08-10",
        action:
          "Admitted for blood pressure control, capillary blood glucose monitoring, and medication adjustment.",
        author: "Dr. Juan Dela Cruz",
      },
      {
        date: "2025-08-11",
        action:
          "Blood pressure trended down to 150/90 mmHg after antihypertensive titration. Diabetes counseling reinforced.",
        author: "Nurse Camille Reyes",
      },
      {
        date: "2025-08-12",
        action:
          "Patient clinically improved and discharged stable with home monitoring instructions.",
        author: "Dr. Juan Dela Cruz",
      },
    ],
    disposition: "Discharged stable to home.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Continue antihypertensive and diabetic medications, low-salt diet, home blood pressure log, and fasting glucose monitoring.",
    followUpDate: "2025-08-19",
  }),
  createMedicalRecord({
    id: "MR-2025-002",
    patientId: "P-002",
    encounterType: "Outpatient",
    caseClassification: "Follow-up consultation",
    department: "Pulmonology",
    room: "OPD 4",
    attendingPhysician: "Dr. Ana Reyes",
    physicianLicenseNumber: "PRC-1186742",
    admissionDateTime: "2025-10-05T08:45:00",
    dischargeDateTime: "2025-10-05T10:10:00",
    chiefComplaint: "Cough, wheezing, and nighttime shortness of breath.",
    admittingDiagnosis: "Acute asthma exacerbation, mild to moderate.",
    dischargeDiagnosis: "Asthma exacerbation improved; stable thyroid disorder on maintenance medication.",
    icd10Code: "J45.901",
    caseRateCode: "J45",
    historyOfPresentIllness:
      "Five-day history of productive cough with wheezing worse at night. Symptoms triggered after exposure to classroom dust and pollen.",
    pastMedicalHistory:
      "Known bronchial asthma and thyroid disorder. No prior intubation history.",
    familyHistory: "Mother with asthma; no family history of thyroid malignancy.",
    socialHistory:
      "Non-smoker. Teacher with frequent classroom dust exposure. No alcohol intake.",
    reviewOfSystems: ["Cough", "Wheezing", "Dyspnea", "No fever"],
    vitalSigns: {
      bloodPressure: "126/80 mmHg",
      heartRate: "92 bpm",
      respiratoryRate: "22 cpm",
      temperature: "36.8 C",
      oxygenSaturation: "97%",
      heightCm: "158",
      weightKg: "55",
      bmi: "22.0",
    },
    physicalExamination: {
      generalSurvey: "Alert, speaking in full sentences, with mild respiratory discomfort.",
      heent: "Mild nasal congestion, no pharyngeal erythema.",
      chestLungs: "Occasional expiratory wheeze over both lung fields.",
      cardiovascular: "Regular rate and rhythm, no murmur.",
      abdomen: "Soft and non-tender.",
      genitourinary: "No genitourinary complaints.",
      skinExtremities: "No cyanosis, good pulses.",
      neurologic: "Grossly intact.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "CBC",
        date: "2025-10-05",
        result: "Within reference range.",
      },
      {
        category: "Imaging",
        name: "Chest X-ray",
        date: "2025-10-05",
        result: "No focal infiltrates; mild hyperinflation.",
      },
    ],
    medicines: [
      {
        genericName: "Salbutamol",
        quantity: "1 inhaler",
        dosage: "100 mcg/puff",
        frequency: "2 puffs q6h PRN",
        route: "Inhalation",
        totalCostPhp: 385,
      },
      {
        genericName: "Montelukast",
        quantity: "14 tablets",
        dosage: "10 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 224,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-10-05",
        action:
          "Nebulization given in OPD with good response. Trigger avoidance and inhaler technique reviewed.",
        author: "Dr. Ana Reyes",
      },
    ],
    disposition: "Sent home after outpatient treatment with return precautions.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Use rescue inhaler as instructed, avoid dust and pollen exposure, and continue thyroid medication.",
    followUpDate: "2025-10-19",
  }),
  createMedicalRecord({
    id: "MR-2025-003",
    patientId: "P-003",
    encounterType: "Inpatient",
    caseClassification: "Pulmonary admission",
    department: "Pulmonology",
    room: "Isolation Room 2",
    attendingPhysician: "Dr. Sophia Bautista",
    physicianLicenseNumber: "PRC-1102458",
    admissionDateTime: "2025-03-27T13:20:00",
    dischargeDateTime: "2025-03-29T11:30:00",
    chiefComplaint: "Worsening productive cough and shortness of breath.",
    admittingDiagnosis: "Pulmonary tuberculosis on treatment; COPD exacerbation.",
    dischargeDiagnosis: "Pulmonary tuberculosis, ongoing treatment; COPD exacerbation improved.",
    icd10Code: "J44.1",
    caseRateCode: "A15",
    historyOfPresentIllness:
      "One-week history of increased sputum production and dyspnea with poor inhaler adherence. Patient already enrolled in TB-DOTS treatment.",
    pastMedicalHistory:
      "Pulmonary tuberculosis and chronic obstructive pulmonary disease. Current smoker.",
    familyHistory: "Father had chronic lung disease related to smoking.",
    socialHistory:
      "Current smoker and works as a miner. Moderate alcohol use. Lives with spouse.",
    reviewOfSystems: ["Cough", "Dyspnea", "Body weakness", "Weight loss"],
    referredFrom: {
      facility: "Itogon Rural Health Unit",
      reason: "Needed inpatient observation and oxygen therapy due to worsening dyspnea.",
    },
    vitalSigns: {
      bloodPressure: "132/84 mmHg",
      heartRate: "104 bpm",
      respiratoryRate: "24 cpm",
      temperature: "37.6 C",
      oxygenSaturation: "93% on room air",
      heightCm: "170",
      weightKg: "75",
      bmi: "26.0",
    },
    physicalExamination: {
      generalSurvey: "Cachectic-looking, tachypneic but oriented.",
      heent: "Dry lips, no cervical mass.",
      chestLungs: "Coarse breath sounds with bibasal crackles and wheeze.",
      cardiovascular: "Tachycardic, regular rhythm.",
      abdomen: "Flat, soft, non-tender.",
      genitourinary: "Unremarkable.",
      skinExtremities: "No edema, no cyanosis.",
      neurologic: "No gross deficits.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "Sputum AFB follow-up",
        date: "2025-03-27",
        result: "AFB smear positive, low bacillary load.",
      },
      {
        category: "Imaging",
        name: "Chest X-ray",
        date: "2025-03-27",
        result: "Patchy upper lobe infiltrates with hyperinflation.",
      },
    ],
    medicines: [
      {
        genericName: "Salbutamol",
        quantity: "6 nebules",
        dosage: "2.5 mg",
        frequency: "q8h",
        route: "Nebulization",
        totalCostPhp: 420,
      },
      {
        genericName: "Cotrimoxazole",
        quantity: "6 tablets",
        dosage: "800/160 mg",
        frequency: "BID",
        route: "Oral",
        totalCostPhp: 144,
      },
    ],
    procedures: [
      {
        description: "Oxygen therapy",
        date: "2025-03-27",
        outcome: "Maintained oxygen saturation above 95%.",
      },
    ],
    courseInWard: [
      {
        date: "2025-03-27",
        action: "Placed on isolation precautions, oxygen support, and bronchodilator therapy.",
        author: "Dr. Sophia Bautista",
      },
      {
        date: "2025-03-28",
        action: "Dyspnea improved; patient educated on TB-DOTS compliance and smoking cessation.",
        author: "Nurse Angela Ramos",
      },
    ],
    disposition: "Discharged stable to continue TB-DOTS treatment as outpatient.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Continue TB-DOTS medications, use inhaler regularly, avoid smoking, and return for repeat sputum evaluation.",
    followUpDate: "2025-04-05",
  }),
  createMedicalRecord({
    id: "MR-2025-004",
    patientId: "P-004",
    encounterType: "Outpatient",
    caseClassification: "Geriatric follow-up",
    department: "Family Medicine",
    room: "OPD 2",
    attendingPhysician: "Dr. Marco Tan",
    physicianLicenseNumber: "PRC-1139084",
    admissionDateTime: "2025-07-26T09:00:00",
    dischargeDateTime: "2025-07-26T10:00:00",
    chiefComplaint: "Lightheadedness and generalized weakness.",
    admittingDiagnosis: "Symptomatic anemia; hypertension under treatment.",
    dischargeDiagnosis: "Iron deficiency anemia improved with medication adjustment; hypertension controlled.",
    icd10Code: "D50.9",
    caseRateCode: "D64",
    historyOfPresentIllness:
      "Two-week history of fatigue and intermittent dizziness, especially on standing. No melena or hematemesis reported.",
    pastMedicalHistory:
      "Hypertension, arthritis, and recurrent anemia. No prior blood transfusion.",
    familyHistory: "Siblings with hypertension; no family history of colon cancer.",
    socialHistory:
      "Retired widow, non-smoker, no alcohol intake, ambulates with minimal assistance.",
    reviewOfSystems: ["Dizziness", "Body weakness", "Joint pain"],
    vitalSigns: {
      bloodPressure: "138/82 mmHg",
      heartRate: "86 bpm",
      respiratoryRate: "18 cpm",
      temperature: "36.7 C",
      oxygenSaturation: "99%",
      heightCm: "152",
      weightKg: "60",
      bmi: "26.0",
    },
    physicalExamination: {
      generalSurvey: "Awake, ambulatory, appears mildly pale.",
      heent: "Pale palpebral conjunctivae, no icterus.",
      chestLungs: "Clear breath sounds.",
      cardiovascular: "Regular rhythm, no murmur.",
      abdomen: "Soft, non-tender, no organomegaly.",
      genitourinary: "No urinary symptoms.",
      skinExtremities: "No edema, mild knee tenderness.",
      neurologic: "No focal deficit.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "Hemoglobin",
        date: "2025-07-26",
        result: "10.4 g/dL",
      },
      {
        category: "Laboratory",
        name: "Serum ferritin",
        date: "2025-07-26",
        result: "Low, consistent with iron deficiency.",
      },
    ],
    medicines: [
      {
        genericName: "Ferrous sulfate",
        quantity: "30 tablets",
        dosage: "325 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 180,
      },
      {
        genericName: "Amlodipine",
        quantity: "30 tablets",
        dosage: "5 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 150,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-07-26",
        action:
          "Reviewed CBC results, restarted iron supplementation, and advised hydration and slow positional changes.",
        author: "Dr. Marco Tan",
      },
    ],
    disposition: "Managed as outpatient.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Take iron supplement after meals, continue antihypertensive therapy, and monitor for black stools or worsening fatigue.",
    followUpDate: "2025-08-09",
  }),
  createMedicalRecord({
    id: "MR-2025-005",
    patientId: "P-005",
    encounterType: "Emergency",
    caseClassification: "Chest pain evaluation",
    department: "Emergency Medicine",
    room: "ER Bay 3",
    attendingPhysician: "Dr. Juan Dela Cruz",
    physicianLicenseNumber: "PRC-1204589",
    admissionDateTime: "2025-03-01T18:20:00",
    dischargeDateTime: "2025-03-01T23:00:00",
    chiefComplaint: "Intermittent chest tightness with sweating.",
    admittingDiagnosis: "Rule-out acute coronary syndrome.",
    dischargeDiagnosis: "Stable angina; diabetes mellitus type 2 on maintenance medication.",
    icd10Code: "I20.9",
    caseRateCode: "I20",
    historyOfPresentIllness:
      "Presented with several hours of substernal chest tightness after exertion, associated with diaphoresis, relieved by rest.",
    pastMedicalHistory:
      "Heart disease and type 2 diabetes mellitus. No prior coronary intervention documented.",
    familyHistory: "Father with ischemic heart disease.",
    socialHistory: "Former smoker, works in transport services, no illicit drug use.",
    reviewOfSystems: ["Chest pain/discomfort", "Sweating", "No syncope"],
    vitalSigns: {
      bloodPressure: "144/88 mmHg",
      heartRate: "90 bpm",
      respiratoryRate: "20 cpm",
      temperature: "36.8 C",
      oxygenSaturation: "98%",
      heightCm: "168",
      weightKg: "79",
      bmi: "28.0",
    },
    physicalExamination: {
      generalSurvey: "Alert, not in overt distress at time of examination.",
      heent: "Unremarkable.",
      chestLungs: "Equal chest expansion, clear breath sounds.",
      cardiovascular: "Regular rhythm, no murmur, no edema.",
      abdomen: "Soft and non-tender.",
      genitourinary: "No relevant findings.",
      skinExtremities: "Warm extremities, no cyanosis.",
      neurologic: "No focal deficits.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "Troponin I",
        date: "2025-03-01",
        result: "Negative.",
      },
      {
        category: "Imaging",
        name: "12-lead ECG",
        date: "2025-03-01",
        result: "Sinus rhythm with nonspecific ST-T changes.",
      },
    ],
    medicines: [
      {
        genericName: "Aspirin",
        quantity: "1 tablet",
        dosage: "80 mg",
        frequency: "STAT",
        route: "Oral",
        totalCostPhp: 4,
      },
      {
        genericName: "Atorvastatin",
        quantity: "7 tablets",
        dosage: "40 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 98,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-03-01",
        action:
          "Observed in ER with serial vital signs and ECG. No recurrent chest pain while under observation.",
        author: "Dr. Juan Dela Cruz",
      },
    ],
    disposition: "Discharged with cardiology follow-up and ER return precautions.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Continue aspirin, statin, and diabetic medication. Return immediately for persistent chest pain or dyspnea.",
    followUpDate: "2025-03-05",
  }),
  createMedicalRecord({
    id: "MR-2025-006",
    patientId: "P-006",
    encounterType: "Teleconsult",
    caseClassification: "Mental health follow-up",
    department: "Psychiatry",
    attendingPhysician: "Dr. Ana Reyes",
    physicianLicenseNumber: "PRC-1186742",
    admissionDateTime: "2025-07-18T14:00:00",
    dischargeDateTime: "2025-07-18T14:40:00",
    chiefComplaint: "Persistent anxiety, poor sleep, and low mood.",
    admittingDiagnosis: "Generalized anxiety disorder; depressive symptoms.",
    dischargeDiagnosis: "Anxiety disorder and depression, stable on maintenance therapy.",
    icd10Code: "F41.1",
    historyOfPresentIllness:
      "Patient reported increased worry and sleep disturbance after work-related stress over the previous month.",
    pastMedicalHistory:
      "Known anxiety and depression. No history of self-harm or psychiatric admission.",
    familyHistory: "Maternal aunt with depression.",
    socialHistory:
      "Works in a call center, non-smoker, no alcohol misuse, lives with supportive family.",
    reviewOfSystems: ["Anxiety", "Insomnia", "Poor concentration", "No suicidal ideation"],
    vitalSigns: {
      bloodPressure: "118/76 mmHg",
      heartRate: "78 bpm",
      respiratoryRate: "18 cpm",
      temperature: "36.6 C",
      oxygenSaturation: "99%",
      heightCm: "160",
      weightKg: "57",
      bmi: "22.3",
    },
    physicalExamination: {
      generalSurvey: "Well-groomed, cooperative, speaking coherently.",
      heent: "Unremarkable.",
      chestLungs: "No respiratory distress.",
      cardiovascular: "Regular pulse reported.",
      abdomen: "No abdominal complaints.",
      genitourinary: "Not assessed during teleconsult.",
      skinExtremities: "No reported issues.",
      neurologic: "No focal deficits reported.",
    },
    diagnostics: [],
    medicines: [
      {
        genericName: "Sertraline",
        quantity: "30 tablets",
        dosage: "50 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 420,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-07-18",
        action:
          "Medication adherence reviewed, relaxation exercises reinforced, and sleep hygiene counseling provided.",
        author: "Dr. Ana Reyes",
      },
    ],
    disposition: "Teleconsult completed; no emergency psychiatric referral indicated.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Continue sertraline daily, avoid caffeine late in the day, and seek urgent consult for suicidal thoughts or panic episodes.",
    followUpDate: "2025-08-15",
  }),
  createMedicalRecord({
    id: "MR-2025-007",
    patientId: "P-007",
    encounterType: "Outpatient",
    caseClassification: "Hypertension clinic follow-up",
    department: "Family Medicine",
    room: "OPD 1",
    attendingPhysician: "Dr. Marco Tan",
    physicianLicenseNumber: "PRC-1139084",
    admissionDateTime: "2025-05-04T10:15:00",
    dischargeDateTime: "2025-05-04T11:00:00",
    chiefComplaint: "Occasional occipital headache and elevated home blood pressure readings.",
    admittingDiagnosis: "Stage 1 hypertension, uncontrolled.",
    dischargeDiagnosis: "Primary hypertension with improved home blood pressure plan.",
    icd10Code: "I10",
    caseRateCode: "I10",
    historyOfPresentIllness:
      "Two-week history of morning headaches with home blood pressure averaging 150/90 mmHg after medication nonadherence.",
    pastMedicalHistory: "Known hypertension. No diabetes, stroke, or kidney disease.",
    familyHistory: "Mother with hypertension.",
    socialHistory:
      "Office-based work, sedentary lifestyle, occasionally eats high-sodium processed food.",
    reviewOfSystems: ["Headache", "No chest pain", "No dyspnea"],
    vitalSigns: {
      bloodPressure: "152/92 mmHg",
      heartRate: "84 bpm",
      respiratoryRate: "18 cpm",
      temperature: "36.7 C",
      oxygenSaturation: "99%",
      heightCm: "172",
      weightKg: "77",
      bmi: "26.0",
    },
    physicalExamination: {
      generalSurvey: "Ambulatory, comfortable, not in acute distress.",
      heent: "No visual field defect; moist mucosa.",
      chestLungs: "Clear breath sounds.",
      cardiovascular: "Regular rhythm, no murmur.",
      abdomen: "Soft, non-tender.",
      genitourinary: "No urinary complaint.",
      skinExtremities: "No edema.",
      neurologic: "No focal deficits.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "Serum creatinine",
        date: "2025-05-04",
        result: "0.9 mg/dL",
      },
    ],
    medicines: [
      {
        genericName: "Losartan",
        quantity: "30 tablets",
        dosage: "50 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 240,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-05-04",
        action:
          "Counseled on DASH diet, daily exercise, and regular home blood pressure monitoring.",
        author: "Dr. Marco Tan",
      },
    ],
    disposition: "Outpatient management continued.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Take losartan daily, reduce salt intake, and return if blood pressure exceeds 180/110 mmHg or symptoms worsen.",
    followUpDate: "2025-05-18",
  }),
  createMedicalRecord({
    id: "MR-2026-008",
    patientId: "P-008",
    encounterType: "Outpatient",
    caseClassification: "Nephrology follow-up",
    department: "Nephrology",
    room: "Renal Clinic",
    attendingPhysician: "Dr. Sophia Bautista",
    physicianLicenseNumber: "PRC-1102458",
    admissionDateTime: "2026-02-19T07:50:00",
    dischargeDateTime: "2026-02-19T09:20:00",
    chiefComplaint: "Leg swelling and blood pressure monitoring for chronic kidney disease.",
    admittingDiagnosis: "Chronic kidney disease with hypertensive nephropathy.",
    dischargeDiagnosis:
      "Chronic kidney disease, stable; hypertension requiring continued control.",
    icd10Code: "N18.3",
    caseRateCode: "N18",
    historyOfPresentIllness:
      "Reported mild bilateral leg swelling and occasional fatigue over one week. No decreased urine output.",
    pastMedicalHistory:
      "Chronic kidney disease and hypertension. Prior instruction to avoid contrast dye due to allergy and renal risk.",
    familyHistory: "Sibling with hypertension; no known hereditary renal disease.",
    socialHistory: "Homemaker, non-smoker, low activity tolerance.",
    reviewOfSystems: ["Edema", "Fatigue", "No dysuria", "No fever"],
    vitalSigns: {
      bloodPressure: "146/88 mmHg",
      heartRate: "82 bpm",
      respiratoryRate: "18 cpm",
      temperature: "36.8 C",
      oxygenSaturation: "98%",
      heightCm: "154",
      weightKg: "61",
      bmi: "25.7",
    },
    physicalExamination: {
      generalSurvey: "Calm, ambulatory, mild pedal edema.",
      heent: "No pallor, moist mucosa.",
      chestLungs: "Clear breath sounds.",
      cardiovascular: "Regular rhythm, no gallop.",
      abdomen: "Soft and non-tender.",
      genitourinary: "No costovertebral angle tenderness.",
      skinExtremities: "1+ bilateral pedal edema.",
      neurologic: "No focal neurologic deficit.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "Serum creatinine",
        date: "2026-02-19",
        result: "1.8 mg/dL",
      },
      {
        category: "Laboratory",
        name: "eGFR",
        date: "2026-02-19",
        result: "Consistent with CKD stage 3.",
      },
    ],
    medicines: [
      {
        genericName: "Amlodipine",
        quantity: "30 tablets",
        dosage: "5 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 150,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2026-02-19",
        action:
          "Renal diet discussed, fluid intake reviewed, and nephrotoxic medication avoidance emphasized.",
        author: "Dr. Sophia Bautista",
      },
    ],
    disposition: "Continue nephrology outpatient care.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Low-salt diet, daily weight log, and return earlier for worsening edema or reduced urine output.",
    followUpDate: "2026-03-19",
  }),
  createMedicalRecord({
    id: "MR-2025-009",
    patientId: "P-009",
    encounterType: "Outpatient",
    caseClassification: "Acute respiratory visit",
    department: "Pulmonology",
    room: "OPD 4",
    attendingPhysician: "Dr. Ana Reyes",
    physicianLicenseNumber: "PRC-1186742",
    admissionDateTime: "2025-03-12T13:10:00",
    dischargeDateTime: "2025-03-12T14:00:00",
    chiefComplaint: "Shortness of breath and chest tightness after peanut exposure.",
    admittingDiagnosis: "Bronchial asthma exacerbation.",
    dischargeDiagnosis: "Asthma exacerbation improved after bronchodilator therapy.",
    icd10Code: "J45.901",
    caseRateCode: "J45",
    historyOfPresentIllness:
      "Developed wheezing and chest tightness after accidental peanut exposure earlier in the day.",
    pastMedicalHistory: "Known bronchial asthma requiring rescue and maintenance inhalers.",
    familyHistory: "Brother with childhood asthma.",
    socialHistory: "Non-smoker, no alcohol use, avoids food allergens when possible.",
    reviewOfSystems: ["Dyspnea", "Chest tightness", "Wheezing"],
    vitalSigns: {
      bloodPressure: "124/78 mmHg",
      heartRate: "96 bpm",
      respiratoryRate: "22 cpm",
      temperature: "36.6 C",
      oxygenSaturation: "96%",
      heightCm: "163",
      weightKg: "59",
      bmi: "22.2",
    },
    physicalExamination: {
      generalSurvey: "Mild respiratory distress but able to speak in full sentences.",
      heent: "No tongue swelling, patent airway.",
      chestLungs: "Diffuse expiratory wheezes.",
      cardiovascular: "Regular rhythm.",
      abdomen: "Soft and non-tender.",
      genitourinary: "No relevant findings.",
      skinExtremities: "No urticaria noted at consult time.",
      neurologic: "Intact.",
    },
    diagnostics: [],
    medicines: [
      {
        genericName: "Salbutamol",
        quantity: "1 inhaler",
        dosage: "100 mcg/puff",
        frequency: "2 puffs q6h PRN",
        route: "Inhalation",
        totalCostPhp: 385,
      },
      {
        genericName: "Budesonide",
        quantity: "1 inhaler",
        dosage: "200 mcg/puff",
        frequency: "BID",
        route: "Inhalation",
        totalCostPhp: 620,
      },
    ],
    procedures: [
      {
        description: "Nebulization treatment",
        date: "2025-03-12",
        outcome: "Wheezing improved after one session.",
      },
    ],
    courseInWard: [
      {
        date: "2025-03-12",
        action: "Observed after nebulization and discharged once respiratory symptoms improved.",
        author: "Dr. Ana Reyes",
      },
    ],
    disposition: "Outpatient discharge after symptom relief.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Avoid peanut exposure, continue controller inhaler, and proceed to ER for lip swelling or severe dyspnea.",
    followUpDate: "2025-03-26",
  }),
  createMedicalRecord({
    id: "MR-2025-010",
    patientId: "P-010",
    encounterType: "Inpatient",
    caseClassification: "Medical admission",
    department: "Internal Medicine",
    room: "Ward B-112",
    attendingPhysician: "Dr. Juan Dela Cruz",
    physicianLicenseNumber: "PRC-1204589",
    admissionDateTime: "2025-05-01T11:10:00",
    dischargeDateTime: "2025-05-03T14:15:00",
    chiefComplaint: "Progressive fatigue, pallor, and poor appetite.",
    admittingDiagnosis: "Symptomatic anemia; chronic liver disease under evaluation.",
    dischargeDiagnosis: "Symptomatic anemia improved; chronic liver disease without acute decompensation.",
    icd10Code: "D64.9",
    caseRateCode: "D64",
    historyOfPresentIllness:
      "Reported one month of easy fatigability and appetite loss with no overt bleeding.",
    pastMedicalHistory: "Liver disease and recurrent anemia.",
    familyHistory: "No known hematologic malignancy.",
    socialHistory: "Previously drank alcohol socially, now abstinent.",
    reviewOfSystems: ["Body weakness", "Pallor", "Poor appetite"],
    vitalSigns: {
      bloodPressure: "118/74 mmHg",
      heartRate: "94 bpm",
      respiratoryRate: "18 cpm",
      temperature: "36.8 C",
      oxygenSaturation: "99%",
      heightCm: "157",
      weightKg: "53",
      bmi: "21.5",
    },
    physicalExamination: {
      generalSurvey: "Pale but cooperative and ambulatory.",
      heent: "Pale palpebral conjunctivae, no scleral icterus.",
      chestLungs: "Clear breath sounds.",
      cardiovascular: "Regular rhythm, flow murmur appreciated.",
      abdomen: "Soft, mildly distended, no guarding.",
      genitourinary: "No complaint.",
      skinExtremities: "No edema or ecchymosis.",
      neurologic: "No focal deficits.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "Hemoglobin",
        date: "2025-05-01",
        result: "8.8 g/dL",
      },
      {
        category: "Imaging",
        name: "Whole abdominal ultrasound",
        date: "2025-05-02",
        result: "Chronic parenchymal liver changes; no ascites.",
      },
    ],
    medicines: [
      {
        genericName: "Ferrous sulfate",
        quantity: "30 tablets",
        dosage: "325 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 180,
      },
      {
        genericName: "Folic acid",
        quantity: "30 tablets",
        dosage: "5 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 120,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-05-01",
        action: "Observed for symptomatic anemia and evaluated for chronic liver disease complications.",
        author: "Dr. Juan Dela Cruz",
      },
      {
        date: "2025-05-02",
        action: "Dietitian referral made and medication compliance reinforced.",
        author: "Nurse Diane Flores",
      },
    ],
    disposition: "Discharged improved with hepatology follow-up.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Continue iron and folic acid supplementation, avoid alcohol, and monitor for jaundice or abdominal distention.",
    followUpDate: "2025-05-17",
  }),
  createMedicalRecord({
    id: "MR-2025-011",
    patientId: "P-011",
    encounterType: "Inpatient",
    caseClassification: "Cardiometabolic admission",
    department: "Internal Medicine",
    room: "Telemetry 1",
    attendingPhysician: "Dr. Juan Dela Cruz",
    physicianLicenseNumber: "PRC-1204589",
    admissionDateTime: "2025-03-24T16:00:00",
    dischargeDateTime: "2025-03-25T13:30:00",
    chiefComplaint: "Palpitations, elevated blood pressure, and uncontrolled blood sugar.",
    admittingDiagnosis: "Hypertensive urgency; uncontrolled diabetes mellitus; stable ischemic heart disease.",
    dischargeDiagnosis:
      "Hypertension and diabetes stabilized; no acute coronary syndrome documented.",
    icd10Code: "I16.0",
    caseRateCode: "I10",
    historyOfPresentIllness:
      "Presented with palpitations and high home blood pressure, associated with missed medications for two days.",
    pastMedicalHistory:
      "Heart disease, hypertension, and type 2 diabetes mellitus.",
    familyHistory: "Strong family history of hypertension and diabetes.",
    socialHistory: "Former smoker, limited exercise due to work schedule.",
    reviewOfSystems: ["Palpitations", "Headache", "Polyuria"],
    vitalSigns: {
      bloodPressure: "176/100 mmHg",
      heartRate: "102 bpm",
      respiratoryRate: "20 cpm",
      temperature: "36.8 C",
      oxygenSaturation: "98%",
      heightCm: "169",
      weightKg: "81",
      bmi: "28.4",
    },
    physicalExamination: {
      generalSurvey: "Alert, anxious about elevated blood pressure.",
      heent: "No facial asymmetry, moist mucosa.",
      chestLungs: "Clear breath sounds.",
      cardiovascular: "Tachycardic but regular rhythm.",
      abdomen: "Soft and non-tender.",
      genitourinary: "No urinary complaint.",
      skinExtremities: "No edema.",
      neurologic: "No focal deficits.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "Random blood sugar",
        date: "2025-03-24",
        result: "248 mg/dL",
      },
      {
        category: "Imaging",
        name: "12-lead ECG",
        date: "2025-03-24",
        result: "Sinus tachycardia, no acute ischemic changes.",
      },
    ],
    medicines: [
      {
        genericName: "Metoprolol",
        quantity: "14 tablets",
        dosage: "50 mg",
        frequency: "BID",
        route: "Oral",
        totalCostPhp: 210,
      },
      {
        genericName: "Metformin",
        quantity: "14 tablets",
        dosage: "500 mg",
        frequency: "BID",
        route: "Oral",
        totalCostPhp: 168,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-03-24",
        action: "Observed under telemetry and medications resumed with closer blood pressure and glucose monitoring.",
        author: "Dr. Juan Dela Cruz",
      },
      {
        date: "2025-03-25",
        action: "Patient stabilized and educated on medication adherence before discharge.",
        author: "Nurse Rey Navarro",
      },
    ],
    disposition: "Discharged stable.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Continue maintenance medications consistently and return immediately for chest pain, severe headache, or persistent palpitations.",
    followUpDate: "2025-04-02",
  }),
  createMedicalRecord({
    id: "MR-2025-012",
    patientId: "P-012",
    encounterType: "Outpatient",
    caseClassification: "Preventive care visit",
    department: "Family Medicine",
    room: "Wellness Clinic",
    attendingPhysician: "Dr. Marco Tan",
    physicianLicenseNumber: "PRC-1139084",
    admissionDateTime: "2025-09-20T08:20:00",
    dischargeDateTime: "2025-09-20T09:10:00",
    chiefComplaint: "Routine annual physical examination.",
    admittingDiagnosis: "No active disease on presentation.",
    dischargeDiagnosis: "Clinically well adult for preventive follow-up.",
    icd10Code: "Z00.0",
    historyOfPresentIllness:
      "No acute complaints. Requested wellness visit and counseling on diet because of food allergies.",
    pastMedicalHistory: "No chronic illness documented.",
    familyHistory: "Mother with hypertension; otherwise non-contributory.",
    socialHistory: "Non-smoker, occasional exercise, no alcohol misuse.",
    reviewOfSystems: ["No current symptoms reported"],
    vitalSigns: {
      bloodPressure: "112/70 mmHg",
      heartRate: "74 bpm",
      respiratoryRate: "16 cpm",
      temperature: "36.5 C",
      oxygenSaturation: "99%",
      heightCm: "159",
      weightKg: "54",
      bmi: "21.4",
    },
    physicalExamination: {
      generalSurvey: "Well appearing and in no distress.",
      heent: "Normal findings.",
      chestLungs: "Clear breath sounds.",
      cardiovascular: "Regular rhythm.",
      abdomen: "Flat, soft, non-tender.",
      genitourinary: "No complaint.",
      skinExtremities: "No rash or edema.",
      neurologic: "Grossly normal.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "CBC",
        date: "2025-09-20",
        result: "Within normal limits.",
      },
    ],
    medicines: [],
    procedures: [],
    courseInWard: [
      {
        date: "2025-09-20",
        action:
          "Preventive counseling given regarding balanced diet, dairy avoidance alternatives, and age-appropriate screening.",
        author: "Dr. Marco Tan",
      },
    ],
    disposition: "Home after routine outpatient evaluation.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Maintain healthy lifestyle, schedule annual wellness visit, and return earlier for acute concerns.",
    followUpDate: "2026-09-20",
  }),
  createMedicalRecord({
    id: "MR-2025-013",
    patientId: "P-013",
    encounterType: "Outpatient",
    caseClassification: "Hypertension follow-up",
    department: "Family Medicine",
    room: "OPD 1",
    attendingPhysician: "Dr. Marco Tan",
    physicianLicenseNumber: "PRC-1139084",
    admissionDateTime: "2025-09-06T10:40:00",
    dischargeDateTime: "2025-09-06T11:20:00",
    chiefComplaint: "Headache and intermittent dizziness.",
    admittingDiagnosis: "Primary hypertension, suboptimally controlled.",
    dischargeDiagnosis: "Primary hypertension, improved after counseling and dose reinforcement.",
    icd10Code: "I10",
    caseRateCode: "I10",
    historyOfPresentIllness:
      "Experienced intermittent headache for one week with missed antihypertensive doses while traveling.",
    pastMedicalHistory: "Known hypertension.",
    familyHistory: "Father and older brother have hypertension.",
    socialHistory: "Driver by occupation, eats irregular meals, no smoking.",
    reviewOfSystems: ["Headache", "Dizziness", "No chest pain"],
    vitalSigns: {
      bloodPressure: "150/94 mmHg",
      heartRate: "80 bpm",
      respiratoryRate: "18 cpm",
      temperature: "36.7 C",
      oxygenSaturation: "99%",
      heightCm: "171",
      weightKg: "74",
      bmi: "25.3",
    },
    physicalExamination: {
      generalSurvey: "Comfortable, speaking in full sentences.",
      heent: "No visual blurring during consult.",
      chestLungs: "Clear breath sounds.",
      cardiovascular: "Regular rate and rhythm.",
      abdomen: "Soft and non-tender.",
      genitourinary: "No relevant findings.",
      skinExtremities: "No edema.",
      neurologic: "Grossly intact.",
    },
    diagnostics: [],
    medicines: [
      {
        genericName: "Amlodipine",
        quantity: "30 tablets",
        dosage: "5 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 150,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-09-06",
        action:
          "Reinforced medication compliance and advised home blood pressure checks at least twice weekly.",
        author: "Dr. Marco Tan",
      },
    ],
    disposition: "Outpatient follow-up continued.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Resume daily amlodipine, decrease sodium intake, and seek ER care for severe headache or neurologic symptoms.",
    followUpDate: "2025-09-20",
  }),
  createMedicalRecord({
    id: "MR-2025-014",
    patientId: "P-014",
    encounterType: "Emergency",
    caseClassification: "Breakthrough seizure episode",
    department: "Emergency Medicine",
    room: "ER Bay 1",
    attendingPhysician: "Dr. Sophia Bautista",
    physicianLicenseNumber: "PRC-1102458",
    admissionDateTime: "2025-05-22T05:50:00",
    dischargeDateTime: "2025-05-22T15:00:00",
    chiefComplaint: "Witnessed generalized seizure at home.",
    admittingDiagnosis: "Breakthrough seizure in known epilepsy.",
    dischargeDiagnosis: "Epilepsy with breakthrough seizure, likely due to missed medication dose.",
    icd10Code: "G40.909",
    caseRateCode: "G40",
    historyOfPresentIllness:
      "Family reported one generalized tonic-clonic seizure lasting about two minutes after missed evening carbamazepine dose.",
    pastMedicalHistory: "Epilepsy on maintenance carbamazepine. No recent head trauma.",
    familyHistory: "No family history of seizure disorder.",
    socialHistory: "Lives with family who supervise medication schedule.",
    reviewOfSystems: ["Seizure", "Post-ictal drowsiness", "No fever"],
    vitalSigns: {
      bloodPressure: "128/82 mmHg",
      heartRate: "88 bpm",
      respiratoryRate: "18 cpm",
      temperature: "36.7 C",
      oxygenSaturation: "99%",
      heightCm: "156",
      weightKg: "51",
      bmi: "21.0",
    },
    physicalExamination: {
      generalSurvey: "Awake after post-ictal period, cooperative.",
      heent: "No scalp injury or tongue laceration.",
      chestLungs: "Clear breath sounds.",
      cardiovascular: "Regular rhythm.",
      abdomen: "Soft, non-tender.",
      genitourinary: "No complaint.",
      skinExtremities: "No trauma noted.",
      neurologic: "No focal neurologic deficit after recovery.",
    },
    diagnostics: [
      {
        category: "Laboratory",
        name: "Serum sodium",
        date: "2025-05-22",
        result: "Normal.",
      },
      {
        category: "Imaging",
        name: "Non-contrast cranial CT",
        date: "2025-05-22",
        result: "No acute intracranial hemorrhage.",
      },
    ],
    medicines: [
      {
        genericName: "Carbamazepine",
        quantity: "30 tablets",
        dosage: "200 mg",
        frequency: "BID",
        route: "Oral",
        totalCostPhp: 360,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-05-22",
        action:
          "Observed for recurrent seizure; no repeat event noted. Family instructed on seizure first aid and strict medication compliance.",
        author: "Dr. Sophia Bautista",
      },
    ],
    disposition: "Discharged once neurologically stable.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Take carbamazepine on schedule, avoid sleep deprivation, and return immediately for recurrent seizure or prolonged confusion.",
    followUpDate: "2025-06-05",
  }),
  createMedicalRecord({
    id: "MR-2025-015",
    patientId: "P-015",
    encounterType: "Outpatient",
    caseClassification: "Acute primary care visit",
    department: "Family Medicine",
    room: "OPD 3",
    attendingPhysician: "Dr. Ana Reyes",
    physicianLicenseNumber: "PRC-1186742",
    admissionDateTime: "2025-04-04T09:30:00",
    dischargeDateTime: "2025-04-04T10:15:00",
    chiefComplaint: "Loose bowel movement and abdominal cramps.",
    admittingDiagnosis: "Acute gastroenteritis.",
    dischargeDiagnosis: "Acute gastroenteritis, mild dehydration improved after oral rehydration advice.",
    icd10Code: "A09",
    caseRateCode: "A09",
    historyOfPresentIllness:
      "Two-day history of watery stools with abdominal cramps after eating street food. No blood in stool.",
    pastMedicalHistory: "No chronic disease documented.",
    familyHistory: "Non-contributory.",
    socialHistory: "Student, no smoking or alcohol use.",
    reviewOfSystems: ["Diarrhea", "Abdominal cramp/pain", "No vomiting", "No fever"],
    vitalSigns: {
      bloodPressure: "110/70 mmHg",
      heartRate: "88 bpm",
      respiratoryRate: "18 cpm",
      temperature: "36.9 C",
      oxygenSaturation: "99%",
      heightCm: "167",
      weightKg: "58",
      bmi: "20.8",
    },
    physicalExamination: {
      generalSurvey: "Alert and mildly dehydrated by history.",
      heent: "Slightly dry oral mucosa.",
      chestLungs: "Clear breath sounds.",
      cardiovascular: "Regular rhythm.",
      abdomen: "Soft with mild diffuse tenderness, no rebound.",
      genitourinary: "No urinary complaint.",
      skinExtremities: "Good capillary refill, no edema.",
      neurologic: "Grossly normal.",
    },
    diagnostics: [],
    medicines: [
      {
        genericName: "Oral rehydration salts",
        quantity: "5 sachets",
        dosage: "1 sachet diluted as directed",
        frequency: "After each loose stool",
        route: "Oral",
        totalCostPhp: 75,
      },
      {
        genericName: "Zinc sulfate",
        quantity: "10 tablets",
        dosage: "20 mg",
        frequency: "OD",
        route: "Oral",
        totalCostPhp: 90,
      },
    ],
    procedures: [],
    courseInWard: [
      {
        date: "2025-04-04",
        action:
          "Advised oral rehydration, bland diet, and food safety precautions. No stool studies requested due to mild presentation.",
        author: "Dr. Ana Reyes",
      },
    ],
    disposition: "Managed as outpatient.",
    outcomeOfTreatment: "Improved",
    followUpInstructions:
      "Increase oral fluids, avoid oily and street food, and return for blood in stool, persistent vomiting, or fever.",
    followUpDate: "2025-04-08",
  }),
];

export const medicalRecords: MedicalRecord[] = seedRecords.sort(
  (left, right) =>
    new Date(right.admissionDateTime).getTime() -
    new Date(left.admissionDateTime).getTime()
);

export function getMedicalRecordsByPatientId(patientId: string) {
  return medicalRecords.filter((record) => record.patientId === patientId);
}

export function getLatestMedicalRecord(patientId: string) {
  return getMedicalRecordsByPatientId(patientId)[0] ?? null;
}

export function formatMedicalRecordDate(value?: string) {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return dateFormatter.format(parsed);
}

export function formatMedicalRecordDateTime(value?: string) {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return dateTimeFormatter.format(parsed);
}

export function formatMedicationTotal(totalCostPhp: number) {
  return currencyFormatter.format(totalCostPhp);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildList(items: string[]) {
  if (items.length === 0) {
    return `<p class="muted">None documented.</p>`;
  }

  return `<ul>${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}

function buildDiagnosticsTable(items: DiagnosticResult[]) {
  if (items.length === 0) {
    return `<p class="muted">No diagnostics recorded.</p>`;
  }

  return `
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Date</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.category)}</td>
                <td>${escapeHtml(item.name)}</td>
                <td>${escapeHtml(formatMedicalRecordDate(item.date))}</td>
                <td>${escapeHtml(item.result)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function buildMedicationTable(items: MedicationOrder[]) {
  if (items.length === 0) {
    return `<p class="muted">Drugs and medicines not required.</p>`;
  }

  return `
    <table>
      <thead>
        <tr>
          <th>Generic Name</th>
          <th>Quantity</th>
          <th>Dosage</th>
          <th>Frequency</th>
          <th>Route</th>
          <th>Total Cost</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.genericName)}</td>
                <td>${escapeHtml(item.quantity)}</td>
                <td>${escapeHtml(item.dosage)}</td>
                <td>${escapeHtml(item.frequency)}</td>
                <td>${escapeHtml(item.route)}</td>
                <td>${escapeHtml(formatMedicationTotal(item.totalCostPhp))}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function buildProcedureTable(items: ProcedureRecord[]) {
  if (items.length === 0) {
    return `<p class="muted">No procedures documented.</p>`;
  }

  return `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Procedure</th>
          <th>RVS Code</th>
          <th>Outcome</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(formatMedicalRecordDate(item.date))}</td>
                <td>${escapeHtml(item.description)}</td>
                <td>${escapeHtml(item.rvsCode || "-")}</td>
                <td>${escapeHtml(item.outcome)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function buildProgressNotes(items: ProgressNote[]) {
  if (items.length === 0) {
    return `<p class="muted">No course-in-ward notes documented.</p>`;
  }

  return `
    <div class="timeline">
      ${items
        .map(
          (item) => `
            <div class="timeline-item">
              <div class="timeline-date">${escapeHtml(formatMedicalRecordDate(item.date))}</div>
              <div class="timeline-content">
                <strong>${escapeHtml(item.author)}</strong>
                <p>${escapeHtml(item.action)}</p>
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function buildVitals(record: MedicalRecord) {
  const vitals = [
    `BP: ${record.vitalSigns.bloodPressure}`,
    `HR: ${record.vitalSigns.heartRate}`,
    `RR: ${record.vitalSigns.respiratoryRate}`,
    `Temp: ${record.vitalSigns.temperature}`,
    `SpO2: ${record.vitalSigns.oxygenSaturation}`,
    `Height: ${record.vitalSigns.heightCm} cm`,
    `Weight: ${record.vitalSigns.weightKg} kg`,
    `BMI: ${record.vitalSigns.bmi}`,
  ];

  return buildList(vitals);
}

function buildPhysicalExam(record: MedicalRecord) {
  const physicalExamEntries = [
    ["General Survey", record.physicalExamination.generalSurvey],
    ["HEENT", record.physicalExamination.heent],
    ["Chest/Lungs", record.physicalExamination.chestLungs],
    ["Cardiovascular", record.physicalExamination.cardiovascular],
    ["Abdomen", record.physicalExamination.abdomen],
    ["GU", record.physicalExamination.genitourinary],
    ["Skin/Extremities", record.physicalExamination.skinExtremities],
    ["Neurologic", record.physicalExamination.neurologic],
  ];

  return `
    <div class="grid two-col">
      ${physicalExamEntries
        .map(
          ([label, value]) => `
            <div class="field">
              <div class="label">${escapeHtml(label)}</div>
              <div class="value">${escapeHtml(value)}</div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function buildEncounterSection(record: MedicalRecord) {
  const rows = [
    ["Encounter Type", record.encounterType],
    ["Case Classification", record.caseClassification],
    ["Department", record.department],
    ["Room / Area", record.room || "-"],
    ["Attending Physician", record.attendingPhysician],
    ["PRC / License", record.physicianLicenseNumber],
    ["Admitted", formatMedicalRecordDateTime(record.admissionDateTime)],
    ["Discharged", formatMedicalRecordDateTime(record.dischargeDateTime)],
    ["Admitting Diagnosis", record.admittingDiagnosis],
    ["Discharge Diagnosis", record.dischargeDiagnosis],
    ["ICD-10 Code", record.icd10Code],
    ["Case Rate Code", record.caseRateCode || "-"],
    ["Disposition", record.disposition],
    ["Outcome", record.outcomeOfTreatment],
  ];

  if (record.referredFrom) {
    rows.push([
      "Referred From",
      `${record.referredFrom.facility} - ${record.referredFrom.reason}`,
    ]);
  }

  return `
    <div class="grid two-col">
      ${rows
        .map(
          ([label, value]) => `
            <div class="field">
              <div class="label">${escapeHtml(label)}</div>
              <div class="value">${escapeHtml(value)}</div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function buildHistorySection(record: MedicalRecord) {
  return `
    <div class="grid two-col">
      <div class="field">
        <div class="label">Chief Complaint</div>
        <div class="value">${escapeHtml(record.chiefComplaint)}</div>
      </div>
      <div class="field">
        <div class="label">History of Present Illness</div>
        <div class="value">${escapeHtml(record.historyOfPresentIllness)}</div>
      </div>
      <div class="field">
        <div class="label">Past Medical History</div>
        <div class="value">${escapeHtml(record.pastMedicalHistory)}</div>
      </div>
      <div class="field">
        <div class="label">Family History</div>
        <div class="value">${escapeHtml(record.familyHistory)}</div>
      </div>
      <div class="field span-2">
        <div class="label">Social History</div>
        <div class="value">${escapeHtml(record.socialHistory)}</div>
      </div>
      <div class="field span-2">
        <div class="label">Pertinent Signs and Symptoms / ROS</div>
        <div class="value">${buildList(record.reviewOfSystems)}</div>
      </div>
    </div>
  `;
}

function buildPatientSummary(patient: PatientRecord) {
  const rows = [
    ["Patient ID", patient.patient_id],
    ["Full Name", patient.name],
    ["Date of Birth", patient.date_of_birth || "-"],
    ["Age", String(patient.age)],
    ["Sex", patient.gender],
    ["Civil Status", patient.civil_status || "-"],
    ["Nationality", patient.nationality || "-"],
    ["Contact Number", patient.contact_number || "-"],
    ["Email", patient.email || "-"],
    ["PhilHealth Number", patient.philhealth_number || "-"],
    ["Blood Type", patient.blood_type || "-"],
    ["Address", formatPatientAddress(patient.address)],
    ["Known Allergies", patient.allergies || "None reported"],
    ["Current Medications", patient.current_medications || "None reported"],
    ["Existing Conditions", patient.existing_conditions || "None reported"],
  ];

  return `
    <section class="section">
      <h2>Patient Data</h2>
      <div class="grid two-col">
        ${rows
          .map(
            ([label, value]) => `
              <div class="field ${label === "Address" || label === "Known Allergies" || label === "Current Medications" || label === "Existing Conditions" ? "span-2" : ""}">
                <div class="label">${escapeHtml(label)}</div>
                <div class="value">${escapeHtml(value)}</div>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function buildRecordSection(record: MedicalRecord) {
  return `
    <section class="section record-break">
      <div class="record-header">
        <div>
          <div class="record-title">${escapeHtml(record.id)} - ${escapeHtml(record.encounterType)}</div>
          <div class="record-subtitle">${escapeHtml(
            formatMedicalRecordDateTime(record.admissionDateTime)
          )} | ${escapeHtml(record.department)}</div>
        </div>
        <div class="record-badge">${escapeHtml(record.outcomeOfTreatment)}</div>
      </div>

      <h2>Encounter Summary</h2>
      ${buildEncounterSection(record)}

      <h2>Reason for Admission</h2>
      ${buildHistorySection(record)}

      <h2>Physical Examination</h2>
      <div class="subsection">
        <h3>Vital Signs</h3>
        ${buildVitals(record)}
      </div>
      <div class="subsection">
        <h3>Pertinent Findings per System</h3>
        ${buildPhysicalExam(record)}
      </div>

      <h2>Course in Ward / Episode of Care</h2>
      ${buildProgressNotes(record.courseInWard)}

      <h2>Laboratory and Imaging</h2>
      ${buildDiagnosticsTable(record.diagnostics)}

      <h2>Drugs and Medicines</h2>
      ${buildMedicationTable(record.medicines)}

      <h2>Procedures</h2>
      ${buildProcedureTable(record.procedures)}

      <h2>Outcome and Follow-up</h2>
      <div class="grid two-col">
        <div class="field">
          <div class="label">Disposition</div>
          <div class="value">${escapeHtml(record.disposition)}</div>
        </div>
        <div class="field">
          <div class="label">Follow-up Date</div>
          <div class="value">${escapeHtml(formatMedicalRecordDate(record.followUpDate))}</div>
        </div>
        <div class="field span-2">
          <div class="label">Follow-up Instructions</div>
          <div class="value">${escapeHtml(record.followUpInstructions)}</div>
        </div>
        <div class="field">
          <div class="label">Certified By</div>
          <div class="value">${escapeHtml(record.certifiedBy)}</div>
        </div>
        <div class="field">
          <div class="label">Certified On</div>
          <div class="value">${escapeHtml(formatMedicalRecordDateTime(record.certifiedOn))}</div>
        </div>
      </div>
    </section>
  `;
}

export function buildMedicalRecordPrintDocument(patient: PatientRecord, records: MedicalRecord[]) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(patient.name)} Medical Record History</title>
        <style>
          :root {
            color-scheme: light;
            font-family: Arial, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 24px;
            color: #0f172a;
            background: #ffffff;
            line-height: 1.45;
          }

          .header {
            border: 1px solid #cbd5e1;
            border-radius: 16px;
            padding: 20px 24px;
            margin-bottom: 20px;
            background: #f8fafc;
          }

          .header h1 {
            margin: 0 0 6px;
            font-size: 26px;
          }

          .header p {
            margin: 4px 0;
            color: #475569;
          }

          .section {
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 18px 20px;
            margin-bottom: 16px;
          }

          h2 {
            font-size: 16px;
            margin: 0 0 12px;
          }

          h3 {
            font-size: 14px;
            margin: 0 0 10px;
          }

          .grid {
            display: grid;
            gap: 12px;
          }

          .two-col {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .field {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px;
            background: #ffffff;
          }

          .span-2 {
            grid-column: 1 / -1;
          }

          .label {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #64748b;
            margin-bottom: 6px;
          }

          .value,
          .value p {
            font-size: 13px;
            margin: 0;
          }

          .muted {
            color: #64748b;
            margin: 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }

          th,
          td {
            border: 1px solid #cbd5e1;
            padding: 8px;
            vertical-align: top;
            text-align: left;
          }

          th {
            background: #eff6ff;
          }

          ul {
            margin: 0;
            padding-left: 18px;
          }

          .timeline {
            display: grid;
            gap: 10px;
          }

          .timeline-item {
            border-left: 3px solid #2563eb;
            padding-left: 12px;
          }

          .timeline-date {
            font-size: 12px;
            font-weight: 700;
            color: #1d4ed8;
            margin-bottom: 4px;
          }

          .timeline-content p {
            margin: 4px 0 0;
            font-size: 12px;
          }

          .record-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 16px;
          }

          .record-title {
            font-size: 18px;
            font-weight: 700;
          }

          .record-subtitle {
            font-size: 13px;
            color: #475569;
            margin-top: 4px;
          }

          .record-badge {
            border-radius: 999px;
            border: 1px solid #86efac;
            background: #f0fdf4;
            color: #166534;
            padding: 6px 10px;
            font-size: 12px;
            font-weight: 700;
            white-space: nowrap;
          }

          .record-break {
            page-break-inside: avoid;
          }

          @media print {
            body {
              padding: 0;
            }

            .section,
            .header {
              break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${escapeHtml(patient.name)} Medical Record History</h1>
          <p>${escapeHtml(FACILITY.name)}</p>
          <p>${escapeHtml(FACILITY.address)}</p>
          <p>PhilHealth-aligned encounter summary for print or Save as PDF.</p>
        </div>

        ${buildPatientSummary(patient)}
        ${records.map((record) => buildRecordSection(record)).join("")}
      </body>
    </html>
  `;
}

export function openMedicalRecordPrintPreview(
  patient: PatientRecord,
  records: MedicalRecord[]
) {
  if (typeof window === "undefined" || records.length === 0) return;

  const previewWindow = window.open("", "_blank", "noopener,noreferrer,width=1100,height=900");
  if (!previewWindow) return;

  previewWindow.document.write(buildMedicalRecordPrintDocument(patient, records));
  previewWindow.document.close();
  previewWindow.focus();

  const triggerPrint = () => {
    previewWindow.print();
  };

  previewWindow.addEventListener("load", triggerPrint, { once: true });
}


// Seed script for local development
// This runs automatically when MongoDB container starts for the first time

db = db.getSiblingDB('back_office_dev');

// Insert system settings for analytics config
db.systemSettings.insertOne({
  name: "analyticsConfig",
  videoLimit: 5,
  scanVideoAgainAfterXDays: 7,
  aiEngine: "text_classification_by_categories",
  temperature: 0.0,
  createdAt: new Date(),
  updatedAt: new Date()
});

print("✅ Seeded systemSettings collection with analyticsConfig");

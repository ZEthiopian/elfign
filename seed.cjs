// seed.cjs
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

// Path to your Firebase Admin SDK JSON
const serviceAccount = require("./elfign-5205e-firebase-adminsdk-fbsvc-81e83dbd4e.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "elfign-5205e.appspot.com", // ✅ Correct bucket
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Define unit types
const unitTypes = {
  A: { type: "1 BED, 1 BATH", size: "67.8M²", description: "Include a dressing & a lavish room area", price: 85000, image: "A.png" },
  B: { type: "3 BED, 2 BATH", size: "172.4M²", description: "Includes a laundry & lavish living room", price: 175000, image: "B.png" },
  C: { type: "1 BED, 2 BATH", size: "72.3M²", description: "Include a dressing & a lavish room area", price: 110000, image: "C.png" },
  D: { type: "2 BED, 2 BATH", size: "116.7M²", description: "Includes a laundry & lavish living room", price: null, image: "D.png" },
  E: { type: "3 BED, 2 BATH", size: "183.6M²", description: "Includes a laundry & lavish living room", price: 110000, image: "E.png" },
  F: { type: "3 BED, 2 BATH", size: "142.3M²", description: "Refined Retreat", price: 160000, image: "F.png" },
};

// Floors 5 to 21
const floors = Array.from({ length: 21 - 5 + 1 }, (_, i) => 5 + i);

// Helper to upload image to Firebase Storage
async function uploadImage(fileName) {
  const filePath = path.join(__dirname, "assets", fileName);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return null;
  }

  const fileUpload = bucket.file(fileName);
  await bucket.upload(filePath, { destination: fileName, public: true });

  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
}

// Seed all units
async function seedUnits() {
  for (const floor of floors) {
    for (const [key, unit] of Object.entries(unitTypes)) {
      const imageUrl = await uploadImage(unit.image);

      const unitData = {
        id: `${key}${floor}`,
        floor,
        sold: false,
        type: unit.type,
        size: unit.size,
        description: unit.description,
        price: unit.price,
        image: imageUrl,
      };

      await db.collection("units").doc(unitData.id).set(unitData);
      console.log(`✅ Seeded unit ${unitData.id}`);
    }
  }
  console.log("🎉 All units have been seeded!");
}

seedUnits().catch(err => {
  console.error("❌ Error seeding units:", err);
});

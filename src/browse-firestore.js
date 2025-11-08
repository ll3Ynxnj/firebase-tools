#!/usr/bin/env node
// browse-firestore.js - Firestore data browsing tool
const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('GOOGLE_APPLICATION_CREDENTIALS environment variable is required');
  process.exit(1);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Parse command line arguments
const args = process.argv.slice(2);
const collectionPath = args[0] || 'products';
const limit = parseInt(args[1]) || 10;

// Fetch and display data
async function browseCollection() {
  try {
    console.log(`\nFetching ${limit} documents from '${collectionPath}' collection...\n`);

    const snapshot = await db.collection(collectionPath).limit(limit).get();

    if (snapshot.empty) {
      console.log('No documents found.');
      process.exit(0);
    }

    console.log(`Found ${snapshot.size} documents:\n`);
    console.log('═'.repeat(80));

    snapshot.forEach((doc, index) => {
      console.log(`\n[${index + 1}] Document ID: ${doc.id}`);
      console.log('─'.repeat(80));

      const data = doc.data();

      // Format and display data nicely
      for (const [key, value] of Object.entries(data)) {
        let displayValue = value;

        // Convert Timestamp to ISO date string
        if (value && typeof value.toDate === 'function') {
          displayValue = value.toDate().toISOString();
        }
        // Handle arrays
        else if (Array.isArray(value)) {
          displayValue = `[${value.join(', ')}]`;
        }
        // Handle objects
        else if (typeof value === 'object' && value !== null) {
          displayValue = JSON.stringify(value, null, 2);
        }

        console.log(`  ${key}: ${displayValue}`);
      }
    });

    console.log('\n' + '═'.repeat(80));
    console.log(`\nTotal: ${snapshot.size} documents shown`);

    // Get total count of collection
    const allDocs = await db.collection(collectionPath).count().get();
    console.log(`Total documents in collection: ${allDocs.data().count}`);
    console.log('');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit(0);
  }
}

// Show usage
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node browse-firestore.js [collection] [limit]

Arguments:
  collection  Collection path (default: products)
  limit       Number of documents to fetch (default: 10)

Examples:
  node browse-firestore.js                    # Show 10 products
  node browse-firestore.js products 5         # Show 5 products
  node browse-firestore.js insurers 20        # Show 20 insurers
  node browse-firestore.js metadata 1         # Show 1 metadata document
  `);
  process.exit(0);
}

browseCollection();

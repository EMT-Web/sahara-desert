# 📦 Bulk Content Import Scripts

## ✅ What's Built

I've created a **modular import system** split into multiple files to avoid timeouts:

### **Core Scripts:**
- ✅ `import-all.js` - Main script (imports guides, experiences, destinations)
- ✅ `import-guides.js` - Imports 6 guides only
- ✅ `import-experiences.js` - Imports 8 experiences only
- ✅ `import-destinations.js` - Imports 10 destinations only

### **Parsers:**
- ✅ `parsers/guides-parser.js` - Guide data (6 guides)
- ✅ `parsers/experiences-parser.js` - Experience data (8 experiences)
- ✅ `parsers/destinations-parser.js` - Destination data (10 destinations)

### **Utilities:**
- ✅ `utils/sanity-client.js` - Sanity client setup
- ✅ `utils/content-helpers.js` - Helper functions

### **Still To Build:**
- ⏳ `parsers/tours-parser.js` - Tour data (20+ tours - separate due to size)
- ⏳ `import-tours.js` - Tour import script

---

## 🚀 Quick Start

### **Step 1: Get Sanity API Token**

1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Select project: **"Visit Sahara Desert"**
3. Go to **API** → **Tokens**
4. Click **"Add API token"**
5. Name: `Content Import Token`
6. Permissions: **Editor**
7. **Copy the token**

### **Step 2: Add to .env.local**

```env
SANITY_API_TOKEN=your-token-here
```

### **Step 3: Run Import**

```bash
# Import everything (guides, experiences, destinations)
node scripts/import-all.js

# OR import separately:
node scripts/import-guides.js
node scripts/import-experiences.js
node scripts/import-destinations.js
```

---

## 📋 What Gets Imported

### **✅ Ready Now:**
- **6 Guides** (Mustafa, Ahmad, Youssef, Said, Abdul, Hsyan)
- **8 Experiences** (Camel Trekking, Desert Camping, Luxury Camping, etc.)
- **10 Destinations** (Merzouga, Erg Chigaga, Draa Valley, etc.)

### **⏳ Coming Next:**
- **20+ Tours** (will be in separate files due to size)

---

## ⚠️ Notes

1. **Images**: Upload manually in Sanity Studio
2. **Tours**: Will be imported separately (coming soon)
3. **Duplicates**: Script skips if content already exists
4. **Review**: Always review imported content

---

## 🐛 Troubleshooting

**Error: "SANITY_API_TOKEN not found"**
- Add token to `.env.local`
- Restart terminal

**Error: "Cannot find module"**
- Run from project root
- Check all files exist in `scripts/` directory

---

**See `BULK_IMPORT_INSTRUCTIONS.md` for detailed guide!**


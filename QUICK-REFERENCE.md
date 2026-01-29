# 🎯 QUICK FILE REPLACEMENT GUIDE

## EXACTLY WHAT TO DO

### Step 1: Replace These 4 Files

| Old File | Replace With | Status |
|----------|--------------|--------|
| `stripe-payment.js` | `stripe-payment-fixed.js` | ✅ Rename it |
| `coin-detail.html` | `coin-detail-fixed.html` | ✅ Rename it |
| `coin-detail.js` | `coin-detail-UPDATED.js` | ✅ Rename it |
| `demo-page.html` | `demo-page-fixed.html` | ✅ Rename it |

### Step 2: Add This New File

| File | Location | Action |
|------|----------|--------|
| `coin-data.js` | Project root | ✅ Copy as-is |

### Step 3: Update 2 HTML Files

#### In `index.html` (line ~950):

**Before:**
```html
<script src="script.js"></script>
<script src="stripe-payment.js"></script>
```

**After:**
```html
<script src="coin-data.js"></script>
<script src="script.js"></script>
<script src="stripe-payment.js"></script>
```

#### In `coin-detail.html` (line ~970):

**Before:**
```html
<script src="script.js"></script>
<script src="stripe-payment.js"></script>
<script src="coin-detail.js"></script>
```

**After:**
```html
<script src="coin-data.js"></script>
<script src="script.js"></script>
<script src="stripe-payment.js"></script>
<script src="coin-detail.js"></script>
```

---

## DONE! 🎉

Upload all files to Netlify and test!

---

## TESTING CHECKLIST

### Must Test:
1. ✅ Homepage → Click "Invest Now" → Modal opens
2. ✅ Move ownership slider → Share quantity updates
3. ✅ Type in share quantity → Slider moves
4. ✅ Click +/- buttons → Both update
5. ✅ Select crypto payment → Options appear
6. ✅ Click "Proceed to Payment" → Redirects to Stripe

### Should Test:
7. ✅ Coin detail page loads
8. ✅ 3D model rotates
9. ✅ Calculator works
10. ✅ "Invest Now" passes quantity to modal

---

## FILES DELIVERED

1. ✅ **stripe-payment-fixed.js** - Complete payment with working slider
2. ✅ **coin-detail-fixed.html** - Fixed HTML structure
3. ✅ **coin-detail-UPDATED.js** - Fixed calculator functions
4. ✅ **demo-page-fixed.html** - Fixed logo fallback
5. ✅ **coin-data.js** - NEW! Shared database
6. ✅ **COMPLETE-DEPLOYMENT-GUIDE.md** - Full instructions
7. ✅ **COMPLETE-ISSUES-ANALYSIS.md** - Detailed fixes documentation

---

**Total Time:** 5-10 minutes to deploy
**Status:** ✅ Ready for production

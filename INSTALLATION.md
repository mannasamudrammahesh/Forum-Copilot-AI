# 🚀 Forum Copilot AI - Installation Guide

## ⚡ **Zero-Configuration Setup**

This project uses **completely free HuggingFace models** - no API keys required!

### **1. Clone & Install**
```bash
git clone <repository-url>
cd forum-copilot-ai
npm install
```

### **2. Run Immediately**
```bash
npm run dev
```

### **3. Open Browser**
```
http://localhost:3000
```

**That's it!** The app works out of the box.

## 🎯 **For Judges - Instant Demo**

1. **Main Page**: See the professional interface
2. **Click any thread**: Experience live chat with AI analysis
3. **Post a message**: Watch real-time sentiment & toxicity detection
4. **Visit `/live-demo`**: Test AI features interactively

## 🔧 **Optional Configuration**

The app works perfectly without any configuration, but you can customize:

### **Environment Variables** (Optional)
Create `.env.local` file:
```env
# Optional: Force mock AI (set to 'true' to use enhanced fallback patterns)
USE_MOCK_AI=false

# Optional: Disable HuggingFace models (set to 'false' to use only mock AI)
USE_HUGGINGFACE=true
```

## 🚀 **Production Deployment**

### **Vercel (Recommended)**
1. Push to GitHub
2. Connect to Vercel  
3. Deploy automatically (no environment variables needed!)

### **Other Platforms**
```bash
npm run build
npm start
```

## 🏆 **Why Zero Configuration?**

- **Free Models**: HuggingFace models require no API keys
- **Smart Fallbacks**: Enhanced regex patterns when models are loading
- **Production Ready**: Works immediately for judges and users
- **Unlimited Usage**: No quotas, rate limits, or costs

## 🎮 **Testing Features**

- **Live Chat**: Every thread has real-time messaging
- **AI Analysis**: Instant sentiment and toxicity detection
- **Thread Summaries**: AI-generated TL;DR summaries
- **Performance**: Sub-second responses with caching

**Perfect for hackathon judging!** 🏆
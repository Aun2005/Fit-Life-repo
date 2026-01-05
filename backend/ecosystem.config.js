module.exports = {
  apps: [{
    name: 'fitlife-backend',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

---

## **PART 5: Deploy Backend to AWS EC2**

### **Step 1: Launch EC2 Instance**

1. **Login to AWS Console:** https://console.aws.amazon.com
2. **Search for "EC2"** in the search bar
3. Click **"Launch Instance"**

### **Step 2: Configure Instance**

**Name:**
```

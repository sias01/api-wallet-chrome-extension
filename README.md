# 🔑 API Wallet – Secure API Key Storage for Chrome  

## 📌 Overview  
**API Wallet** is a Chrome extension designed to securely store and manage API keys for various platforms. It provides an easy-to-use interface to save, retrieve, and delete API keys, ensuring quick access while maintaining security.  

## ✨ Features  
- **Auto-detect platform** – Automatically fetches the current website's hostname.  
- **Secure storage** – Stores API keys using Chrome's `storage.sync`.  
- **Masked API key display** – Protects sensitive information by showing only partial keys.  
- **One-click copy** – Easily copy API keys with a single click.  
- **Simple UI** – Minimalistic, user-friendly interface with a modern design.  
- **Easy management** – Update or delete API keys effortlessly.  

## 📸 Screenshots  
(You can add screenshots here)  

## 🚀 Installation  
1. **Download the extension files** (or clone this repository).  
2. Open **Google Chrome** and navigate to:  
   `chrome://extensions/`  
3. Enable **Developer Mode** (toggle in the top-right corner).  
4. Click **Load Unpacked**, then select the extracted folder.  
5. The extension is now installed and ready to use!  

## 📖 How to Use  
1. Click on the **API Wallet** extension icon in the Chrome toolbar.  
2. Enter the **Platform Name** and **API Key**.  
3. Click **Add API** to save it securely.  
4. Click on an entry to view the full API key.  
5. Click **Copy** to copy the API key or **Delete** to remove it.  

## 🛠️ Technologies Used  
- **Manifest v3** for Chrome extensions.  
- **JavaScript (popup.js, background.js)** for logic and storage.  
- **HTML & CSS (popup.html)** for the user interface.  
- **Chrome Storage API** for saving API keys.  

## 🔒 Security Considerations  
- API keys are stored using Chrome’s **sync storage** for availability across devices.  
- Only partial API keys are displayed to prevent accidental leaks.  
- Users must explicitly confirm updates to existing keys.  

## 📜 License  
This project is open-source under the **MIT License**.  


## Contact
For questions, feedback, or suggestions:
- **Author**: [Shreyas Desai](https://github.com/sias01)
- **Email**: ssdesai306@gmail.com

Feel free to open issues or contribute to make this project better!
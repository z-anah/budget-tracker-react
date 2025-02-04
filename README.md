# budget-tracker-react
 
### **💰 Budget Tracker MVP – Concept**  

**📌 Overview:**  
A simple **Budget Tracker** web app for a single user to manage project, income, and expenses.

---

### **🚀 Tech Stack:**  
- **Frontend:** React (Vite), Tailwind CSS, React Router, React Hook Form, Framer Motion, React Toastify
- **State Management:** Zustand  
- **Data Storage:** Firebase Firestore 
- **Deployment:** Vercel
- **APIs:** Axios, React Query

---

### **📂 Features:**  
#### 📝 **Core Features:**  
- ✅ Add, edit, and delete transactions  
- ✅ Categorize income & expenses  
- ✅ Display total balance & recent transactions  
- ✅ Monthly spending breakdown (charts)  

---

### **Updated Database Tables for Multiple Projects MVP (Firestore)**

When you are managing **multiple projects** within the **Budget Tracker**, you'll need to extend the structure to handle different projects, each with its own income, expenses, and budget settings.

---

### **Database Tables:**

1. **Users**
   - `userId` (string) – Unique user identifier
   - `email` (string) – User's email address
   - `createdAt` (timestamp) – Account creation date
   - `displayName` (string) – User's display name
   - `password` (string) – Encrypted password

2. **Projects**  
   (New table for handling multiple projects)
   - `projectId` (string) – Unique project identifier
   - `userId` (string) – Reference to the user who owns the project
   - `name` (string) – Name of the project (e.g., "Website Redesign", "Freelance Contract")
   - `description` (string) – Description of the project
   - `createdAt` (timestamp) – Date when the project was created

3. **Transactions**
   - `transactionId` (string) – Unique transaction identifier
   - `projectId` (string) – Reference to the project the transaction is related to
   - `amount` (number) – Transaction amount (positive for income, negative for expenses)
   - `category` (string) – Category of the transaction (e.g., "Food", "Salary")
   - `type` (string) – Type of transaction ("income" or "expense")
   - `description` (string) – Description of the transaction
   - `date` (timestamp) – Date of the transaction
   - `createdAt` (timestamp) – Date when the transaction was added

4. **Categories**
   - `categoryId` (string) – Unique category identifier
   - `projectId` (string) – Reference to the project this category belongs to
   - `name` (string) – Name of the category (e.g., "Food", "Entertainment")
   - `icon` (string) – Optional icon or image for the category

---

### **📂 Pages:**
1. **Home Page**
    - **URL:** `/`
    - **Description:** Displays the list of projects the user is managing
    - **Actions:** Create, edit, and delete projects

2. **Project Page**
    - **URL:** `/project/:projectId`
    - **Description:** Displays the details of the project, including the budget, income, and expenses
    - **Actions:** Add, edit, and delete transactions

3. **Transaction Page**
    - **URL:** `/project/:projectId/transaction/:transactionId`
    - **Description:** Displays the details of a specific transaction
    - **Actions:** Edit and delete the transaction

4. **Statistics Page**
    - **URL:** `/project/:projectId/statistics`
    - **Description:** Displays the statistics of the project, including the monthly spending breakdown
    - **Actions:** View spending breakdown by category

---

### **🚀 Deployment on Vercel:**  
```sh
npm run build
vercel
```

🔗 **Goal:** Show frontend skills & gradual project improvement! 🚀

---

### **📚 Resources:**
```
npm install react react-dom
npm install vite
npm install tailwindcss
npm install react-router-dom
npm install react-hook-form
npm install framer-motion
npm install react-toastify
npm install zustand
npm install firebase
npm install axios
npm install react-query
```
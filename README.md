# Code Card

Generate unique, code-themed digital business cards instantly! Code Card provides a live preview mimicking a code editor, letting you create and share your contact information with a distinct developer flair.

---

## 🚀 Live Demo

Check out the live version here: **[card.andresmit.co.za](https://card.andresmit.co.za)**

---

## 🎨 Key Features

*   **Live Preview:** See your business card update in real-time as you type, displayed in a stylish code editor format.
*   **Data Persistence via URL:** Share your generated card easily – all data is encoded directly into the URL hash.
*   **QR Code Generation:** Instantly create a QR code linking to your shareable card URL for quick scanning.
*   **PNG Download:** Download your code-themed business card as a PNG image using `html2canvas`.
*   **Dark Mode:** Built with a sleek, Dracula-inspired dark theme.
*   **Responsive Design:** Works smoothly on desktop and mobile devices.

---

## 💻 Tech Stack

*   **Frontend:** React.js
*   **Styling:** CSS (with CSS Variables for theming)
*   **PNG Generation:** `html2canvas`
*   **QR Code Generation:** `qrcode.react`

---

## 🛠️ Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    cd YOUR_REPO_NAME
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *(Or `yarn install` if you use Yarn)*


3.  **Run the development server:**
    ```bash
    npm start
    ```
    *(Or `yarn start`)*


4.  Open [http://localhost:3000](http://localhost:3000) (or the port specified) in your browser.

---

## ⚙️ How to Use

1.  Open the app.
2.  Fill in your details (Name, Title, Email, Website/Link) in the form on the left.
3.  Watch the "Live Preview" on the right update instantly, showing your card as a JSON-like structure in a code editor theme.
4.  Use the buttons:
    *   **Download as PNG:** Saves the preview area as an image file.
    *   **Copy Shareable Link:** Copies the current URL (with your encoded data) to your clipboard.
    *   **Show/Hide QR Code:** Generates a QR code for the shareable link.

---

## 💡 Future Ideas (Potential Enhancements)

*   [ ] Different code editor themes (Monokai, Solarized, etc.)
*   [ ] Multiple card templates/layouts (beyond JSON view)
*   [ ] More field options (Phone, Social Links)
*   [ ] Option to save/load card data locally or via a simple backend.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
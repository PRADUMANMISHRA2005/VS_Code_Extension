# Project Wizard 🚀

Project Wizard is a VS Code extension that helps developers quickly scaffold projects, generate Competitive Programming workspaces, and analyze code complexity using Gemini AI.

---

## ✨ Features

### 🏗️ Tech Stack Composer

Create project structures by choosing your preferred stack:

#### Frontend

* React
* Next.js
* None

#### Backend

* Express
* None

#### Database

* MongoDB
* PostgreSQL
* MySQL
* None

#### Extras

* TypeScript
* Docker
* ESLint
* Prettier
* Git Init
* README Generation

---

### ⚡ Competitive Programming Starter

Generate ready-to-use Competitive Programming workspaces with support for:

* C++
* Java

Features:

* Platform folders

  * Codeforces
  * LeetCode
  * CodeChef
  * AtCoder

* Ready-to-use templates

* `input.txt` and `output.txt`

* Built-in algorithm snippets

* Snippet selection during project creation

Supported snippets:

* Binary Search
* DSU (Disjoint Set Union)
* Dijkstra
* Segment Tree
* Fenwick Tree
* Sieve of Eratosthenes
* Modular Exponentiation
* Modular Arithmetic
* KMP
* Z Function
* Trie
* Topological Sort

Generated structure:

```text
CP/
├── Codeforces/
├── LeetCode/
├── CodeChef/
├── AtCoder/
├── templates/
├── snippets/
├── input.txt
├── output.txt
└── main.cpp / Main.java
```

---

### 🧠 Complexity Analyzer

Analyze the time and space complexity of your code using Gemini AI.

The extension provides:

* Function-wise complexity analysis
* Overall time complexity
* Overall space complexity
* Explanations for each result
* Beautiful in-editor result display

---

## 📦 Installation

1. Install the extension.
2. Obtain a Gemini API key.
3. Open VS Code Settings.
4. Add:

```json
{
  "projectWizard.geminiApiKey": "YOUR_API_KEY"
}
```

---

## 🚀 Usage

### Create Project

```text
Ctrl + Shift + P
→ Project Wizard: Create Project
```

### Analyze Complexity

```text
Ctrl + Shift + P
→ Project Wizard: Analyze Complexity
```

---

## 🛠️ Built With

* TypeScript
* VS Code Extension API
* Google Gemini API

---

## 🔮 Future Plans

* AI-powered project structure generation
* More project templates
* Additional programming language support
* More Competitive Programming snippets
* Custom snippet creation
* Project export and sharing support

---

## 👥 Contributors

Project Wizard was collaboratively developed by:

* Praduman Mishra
* Aayush Yadav

---

Made by Praduman Mishra and Aayush Yadav.

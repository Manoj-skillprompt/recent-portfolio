# Open-Source Developer Portfolio Template

🚀 **Transform your personal portfolio into a production-ready, reusable open-source template.**

This template is designed for developers who want to create a stunning, informative, and easily deployable personal portfolio website. With a focus on clean architecture, excellent documentation, and beginner-friendly setup, anyone can clone this repository, update a few configuration files, and deploy their own portfolio in minutes.

---

## ✨ Features

*   **Configurable Content:** All personal information, projects, experience, and skills are driven by configuration files.
*   **Centralized Configuration:** Dedicated folder (`src/config/`) for managing site settings, profile details, social links, and more.
*   **Content-Driven:** Content for blogs can be managed via Markdown/MDX files (`src/content/blog/`).
*   **Environment Variables:** Sensitive information and key settings can be managed via `.env` files for security and flexibility.
*   **Easy Setup Wizard:** An interactive CLI script (`npm run setup`) guides users through the initial configuration process.
*   **Comprehensive Documentation:** A detailed README with guides for installation, configuration, deployment, and customization.
*   **Beginner-Friendly:** Designed for minimal developer experience – clone, configure, run, deploy.
*   **Multiple Deployment Options:** Guides for deploying to popular platforms like Vercel, Netlify, Cloudflare Pages.
*   **Developer Experience:** Configured with ESLint, Prettier, Husky, TypeScript strict mode, and Conventional Commits for a smooth development workflow.
*   **SEO Optimized:** Configurable SEO meta tags, favicons, sitemaps.
*   **Theming:** Easy customization of colors, fonts, and other design aspects.
*   **Accessibility:** Built with best practices for keyboard navigation, semantic HTML, and ARIA attributes.
*   **Performance:** Optimized for speed with Lighthouse scores aiming for 95+.
*   **GitHub Integration:** Tools to easily display GitHub repositories (requires configuration).
*   **Modular Architecture:** Components are designed for reusability and easy customization.

---

## 🧑‍💻 Tech Stack

*   **Framework:** [Astro](https://astro.build/)
*   **UI:** [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
*   **Content:** Markdown/MDX (`.mdx` files)
*   **Language:** TypeScript (for configuration and components)
*   **CLI Tooling:** [Clack](https://github.com/natemoo-bg/clack) for Setup Wizard
*   **Utilities:** ESLint, Prettier, Husky, lint-staged

---

## 📁 Folder Structure

```
├── .env                  # Your project's environment variables (ignored by Git)
├── .env.example          # Example environment variables
├── .gitignore            # Files ignored by Git
├── .vscode/              # VS Code settings (optional)
├── public/               # Static assets (images, fonts, favicon)
├── src/
│   ├── components/       # Reusable UI components (React/Astro)
│   ├── config/           # Centralized configuration files
│   │   ├── site.ts
│   │   ├── profile.ts
│   │   ├── socials.ts
│   │   ├── experience.json
│   │   ├── projects.json
│   │   └── skills.json
│   ├── content/          # Content collections (e.g., blog posts)
│   │   └── blog/
│   │       └── *.mdx     # Blog post files
│   ├── layouts/          # Astro page layouts
│   ├── pages/            # Astro page routes
│   ├── styles/           # Global CSS styles
│   └── ...               # Other source files
├── astro.config.mjs      # Astro project configuration
├── package.json          # Project dependencies and scripts
├── README.md             # This file
├── setup.js              # Setup wizard script
├── LICENSE               # MIT License file
└── ...                   # Other project files
```

---

## ⚡ Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-portfolio-repo.git
    cd your-portfolio-repo
    ```
    *(Replace `https://github.com/your-username/your-portfolio-repo.git` with the actual repository URL. If creating a new repo from this template, use GitHub's "Use this template" feature.)*

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # pnpm install
    # or
    # yarn install
    ```

---

## 🛠️ Configuration

Run the interactive setup wizard:

```bash
npm run setup
# or
# pnpm setup
# or
# yarn setup
```

This will prompt you for your:
*   Full Name
*   Portfolio Title
*   Site Description
*   Email Address
*   GitHub Username
*   LinkedIn Username/URL
*   Twitter/X Username
*   Resume Link
*   Theme Preference

Following the wizard, you will need to:

1.  **Edit `.env` file:** This file is critical for your deployment. It will be pre-populated by the setup wizard, but you should review and update it with your specific values like `NEXT_PUBLIC_SITE_URL`, analytics IDs, and any API keys. **Ensure `.env` is added to your `.gitignore` file**, which is handled by default.
2.  **Place your Resume:** If your resume link is `/files/resume.pdf` (as defaulted), place your `resume.pdf` file inside the `public/files/` directory.
3.  **Update Placeholder Images:** Replace any placeholder images (e.g., in `public/` or referenced in MDX files) with your own.
4.  **Customize Content:** Edit the JSON files in `src/config/` (e.g., `projects.json`, `experience.json`, `skills.json`) to add your personal projects, experience, and skills. You can also add/edit Markdown/MDX files in `src/content/blog/`.
5.  **Theme Customization:** Adjust theme colors, fonts, and other style properties primarily within `src/styles/global.css` and by modifying theme-related settings if any are introduced in `src/config/`.

---

## 💡 Development

Start the Astro development server:

```bash
npm run dev
# or
# pnpm dev
# or
# yarn dev
```

This will launch a local development server, typically at `http://localhost:4321`.

---

## 🚀 Deployment

This template is designed for easy deployment. Here are guides for popular platforms:

### Vercel

1.  Ensure your `.env` file is correctly configured.
2.  Connect your GitHub repository to Vercel.
3.  Vercel will automatically detect Astro and deploy. You might need to set environment variables in Vercel's dashboard for `NEXT_PUBLIC_*` variables.

### Netlify

1.  Configure your `.env` file.
2.  Connect your GitHub repository to Netlify.
3.  Set your build command to `npm run build` and your publish directory to `dist/`.
4.  Add environment variables in Netlify's dashboard.

### Cloudflare Pages

1.  Configure your `.env` file.
2.  Connect your GitHub repository to Cloudflare Pages.
3.  Set your build command to `npm run build` and your build output directory to `dist/`.

---

## 🤔 FAQ

*   **How do I add a new project?**
    Edit `src/config/projects.json` and add a new JSON object for your project.

*   **How do I add a blog post?**
    Create a new `.mdx` file in `src/content/blog/` and follow the frontmatter structure defined in `src/content.config.ts`.

*   **How do I change the theme colors?**
    Modify the CSS variables or Tailwind configuration within `src/styles/global.css` and possibly `astro.config.mjs` if you're customizing Tailwind.

---

## ✍️ Customization Guide

Refer to the **Configuration** section and the comments within the files in `src/config/` and `setup.js` for guidance on how to customize your portfolio.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5.  Push to the branch (`git push origin feature/AmazingFeature`).
6.  Open a pull request.

Please ensure you follow the **Code of Conduct**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits & Acknowledgements

*   Built with ❤️ using [Astro](https://astro.build/).
*   Powered by [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/).
*   Interactive setup wizard powered by [Clack](https://github.com/natemoo-bg/clack).
*   Initial template structure inspired by Astro's minimal starter.

---

*This README is a living document and will be updated as the template evolves.*

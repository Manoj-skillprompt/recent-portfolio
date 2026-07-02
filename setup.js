// setup.js
// This script will guide users through setting up the portfolio template.

// Use clack for interactive prompts
// Assuming @clack/prompts is installed and available
import { intro, text, select, confirm, outro } from '@clack/prompts';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Helper function to escape strings for shell/env files
function escapeStringForEnv(str) {
  // Basic escaping: handle quotes and newlines
  return `"${str.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
}

async function runSetup() {
  intro('Welcome to the Portfolio Setup Wizard! 🚀');

  // --- Collect User Information ---

  const fullName = await text({
    message: 'What is your full name?',
    placeholder: 'e.g. Jane Doe',
    validate: (value) => {
      if (value.length === 0) return 'Full name is required.';
    }
  });

  const portfolioTitle = await text({
    message: 'What is your portfolio title?',
    placeholder: 'e.g. Jane Doe - Web Developer',
    initialValue: `${fullName} - Portfolio`,
    validate: (value) => {
      if (value.length === 0) return 'Portfolio title is required.';
    }
  });

  const siteDescription = await text({
    message: 'Enter a short description for your portfolio.',
    placeholder: 'e.g. Creative Full-Stack Developer specializing in modern web technologies.',
    validate: (value) => {
      if (value.length === 0) return 'Site description is required.';
    }
  });

  const email = await text({
    message: 'What is your email address?',
    placeholder: 'e.g. jane.doe@example.com',
    validate: (value) => {
      if (value.length === 0) return 'Email is required.';
      if (!value.includes('@')) return 'Please enter a valid email address.';
    }
  });

  const githubUsername = await text({
    message: 'What is your GitHub username?',
    placeholder: 'e.g. janedoe',
  });

  const linkedinUsername = await text({
    message: 'What is your LinkedIn username or profile URL?',
    placeholder: 'e.g. janedoe',
  });

  const twitterUsername = await text({
    message: 'What is your Twitter/X username?',
    placeholder: 'e.g. janedoe',
  });

  const resumeUrl = await text({
    message: 'Link to your resume (e.g., /files/resume.pdf or a URL).',
    placeholder: '/files/resume.pdf',
    initialValue: '/files/resume.pdf',
  });

  const themePreference = await select({
    message: 'Choose your preferred theme.',
    options: [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'system', label: 'System Default' },
    ],
    initialValue: 'dark',
  });

  // --- Prepare .env content ---
  const envContent = `
# Environment variables for your portfolio
# These are for your local development and production setup.
# Populate them with your actual details.

# General Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:4321 # Update this for production deployment
NEXT_PUBLIC_SITE_TITLE=${escapeStringForEnv(portfolioTitle)}
NEXT_PUBLIC_SITE_DESCRIPTION=${escapeStringForEnv(siteDescription)}

# GitHub Integration
NEXT_PUBLIC_GITHUB_USERNAME=${githubUsername || 'your-github-username'}

# Social Links
NEXT_PUBLIC_LINKEDIN_USERNAME=${linkedinUsername || 'your-linkedin-username'}
NEXT_PUBLIC_TWITTER_USERNAME=${twitterUsername || 'your-twitter-username'}

# Email for contact/mailto links (use the one provided)
NEXT_PUBLIC_EMAIL=${email}

# Resume URL
NEXT_PUBLIC_RESUME_URL=${escapeStringForEnv(resumeUrl)}

# Analytics (Example variables, uncomment and configure if needed)
# NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
# NEXT_PUBLIC_UMAMI_ID=your-umami-id
# NEXT_PUBLIC_UMAMI_URL=https://analytics.yourdomain.com

# Theme Preference (used by your application's theme Toggler)
NEXT_PUBLIC_THEME=${themePreference}
  `.trim();

  // --- Write/Update Files ---

  // 1. Update .env file
  const envPath = path.join(process.cwd(), '.env');
  fs.writeFileSync(envPath, envContent, 'utf-8');
  console.log(`\n✅ Updated .env file with your configuration.`);

  // 2. Update config files (site.ts, profile.ts, socials.ts)
  //    (These will now directly use NEXT_PUBLIC_ variables which are populated from .env)
  //    No direct file write needed here as config files are already set to read env vars.
  //    We *could* modify the config files themselves to directly include these values
  //    if we wanted to be absolutely sure, but reading from env is the standard.
  //    For profile.ts, we'll explicitly update the initial value for name/role if they are empty.
  const profileConfigPath = path.join(process.cwd(), 'src/config/profile.ts');
  let profileConfigContent = fs.readFileSync(profileConfigPath, 'utf-8');

  // Ensure name and role in profile.ts are set correctly if they were empty
  profileConfigContent = profileConfigContent.replace(
    /name: import.meta.env.NEXT_PUBLIC_FULL_NAME \|\| \'Jane Doe\'/,
    `name: import.meta.env.NEXT_PUBLIC_FULL_NAME || '${fullName}'`
  );
   profileConfigContent = profileConfigContent.replace(
    /role: import.meta.env.NEXT_PUBLIC_ROLE \|\| \'Full-Stack Developer\'/,
    `role: import.meta.env.NEXT_PUBLIC_ROLE || '${fullName.includes(' ') ? fullName.split(' ')[1] : 'Developer'}'` // Attempt to infer role from full name if possible, else default
  );
  fs.writeFileSync(profileConfigPath, profileConfigContent, 'utf-8');
  console.log(`✅ Updated src/config/profile.ts defaults.`);

  // Update socials.ts to use the correct env var names explicitly if they were placeholders
    const socialsConfigPath = path.join(process.cwd(), 'src/config/socials.ts');
    let socialsConfigContent = fs.readFileSync(socialsConfigPath, 'utf-8');
    // Ensure the variables used in socials.ts match .env correctly
    socialsConfigContent = socialsConfigContent.replace(
      /\s*githubUsername = import.meta.env.NEXT_PUBLIC_GITHUB_USERNAME \|\| \'your-github-username\'/,
      `    githubUsername = import.meta.env.NEXT_PUBLIC_GITHUB_USERNAME || 'your-github-username'`
    );
    socialsConfigContent = socialsConfigContent.replace(
      /\s*linkedinUsername = import.meta.env.NEXT_PUBLIC_LINKEDIN_USERNAME \|\| \'your-linkedin-username\'/,
      `    linkedinUsername = import.meta.env.NEXT_PUBLIC_LINKEDIN_USERNAME || 'your-linkedin-username'`
    );
    socialsConfigContent = socialsConfigContent.replace(
      /\s*twitterUsername = import.meta.env.NEXT_PUBLIC_TWITTER_USERNAME \|\| \'your-twitter-username\'/,
      `    twitterUsername = import.meta.env.NEXT_PUBLIC_TWITTER_USERNAME || 'your-twitter-username'`
    );
    socialsConfigContent = socialsConfigContent.replace(
      /\s*websiteUrl = import.meta.env.NEXT_PUBLIC_SITE_URL \|\| \'https:\/\/yourwebsite.com\'/,
      `    websiteUrl = import.meta.env.NEXT_PUBLIC_SITE_URL || 'https://yourwebsite.com'`
    );
     socialsConfigContent = socialsConfigContent.replace(
      /\s*resumeUrl = import.meta.env.NEXT_PUBLIC_RESUME_URL \|\| \`\/files\/resume.pdf\`/g, // Use template literal regex for robustness
      `    resumeUrl = import.meta.env.NEXT_PUBLIC_RESUME_URL || '/files/resume.pdf'`
    );
    fs.writeFileSync(socialsConfigPath, socialsConfigContent, 'utf-8');
    console.log(`✅ Updated src/config/socials.ts defaults.`);

  // 3. Add setup script to package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  packageJson.scripts.setup = 'node setup.js';
  // Ensure dev script is available
  if (!packageJson.scripts.dev) {
    packageJson.scripts.dev = 'astro dev';
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
  console.log(`✅ Added "setup": "node setup.js" to your package.json scripts.`);

  // --- Final Output ---
  outro(`
Setup complete! 🎉
You can now run 'npm run setup' to re-run the wizard,
or 'npm run dev' to start your local development server.

Remember to:
- Add your personal details to the .env file.
- Replace placeholder images and content.
- Commit your changes!
  `);
}

runSetup().catch(console.error);

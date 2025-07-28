# Deployment Guide 🚀

This guide will help you deploy the Golf Skins Tracker to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository `skins-tracker`
5. Make it **Public** (required for free GitHub Pages)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Upload Your Files

### Option A: Using GitHub Web Interface

1. In your new repository, click "uploading an existing file"
2. Drag and drop all your project files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `package.json`
   - `README.md`
   - `.gitignore`
3. Add a commit message like "Initial commit"
4. Click "Commit changes"

### Option B: Using Git Commands

```bash
# Clone your repository (replace YOUR_USERNAME with your GitHub username)
git clone https://github.com/YOUR_USERNAME/skins-tracker.git

# Copy your project files into the cloned directory
cp index.html styles.css script.js package.json README.md .gitignore skins-tracker/

# Navigate to the repository
cd skins-tracker

# Add all files
git add .

# Commit the changes
git commit -m "Initial commit"

# Push to GitHub
git push origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section (in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

## Step 4: Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-2 minutes
- You'll see a green checkmark when it's ready
- Your site will be available at: `https://YOUR_USERNAME.github.io/skins-tracker`

## Step 5: Update README

1. Edit the `README.md` file
2. Replace `your-username` with your actual GitHub username in the live demo link
3. Commit and push the changes

## Custom Domain (Optional)

If you want to use a custom domain:

1. In GitHub Pages settings, enter your domain name
2. Add a `CNAME` file to your repository with your domain
3. Configure your DNS settings with your domain provider

## Troubleshooting

### Site Not Loading
- Check that all files are in the root directory
- Ensure `index.html` is named correctly
- Wait a few minutes for GitHub to build the site

### Styling Issues
- Make sure `styles.css` is in the same directory as `index.html`
- Check that the CSS file path in `index.html` is correct

### JavaScript Errors
- Verify `script.js` is in the correct location
- Check browser console for any errors
- Ensure all file paths are relative

## Updating Your Site

To update your site:

1. Make changes to your local files
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```
3. GitHub Pages will automatically rebuild and deploy

## Performance Tips

- Keep file sizes small
- Optimize images if you add any
- Use relative paths for all resources
- Test locally before pushing changes

## Support

If you encounter issues:
1. Check the GitHub Pages documentation
2. Verify all files are in the correct location
3. Check browser console for errors
4. Ensure your repository is public

Your Golf Skins Tracker should now be live and accessible to anyone with the URL! 🏌️‍♂️ 
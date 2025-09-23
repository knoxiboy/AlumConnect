# Discord Integration Implementation Guide

## Overview
This document outlines the implementation of Discord widget integration into the AlumConnect platform, replacing the existing networking hub components with a Discord community widget.

## Changes Required

### 1. Student Network Page
- Remove all existing tabs (News Feed, Success Stories, Polls & Surveys, Messages)
- Keep only "My Network" and "Mentorship Requests" tabs
- Move these two tabs to the Student Profile page

### 2. Alumni Network Page
- Remove all existing tabs (News Feed, Success Stories, Polls & Surveys, Messages)
- Keep only "My Network" and "Mentorship Requests" tabs
- Move these two tabs to the Alumni Profile page

### 3. Profile Pages Enhancement
- Add "My Network" section to both StudentProfile and AlumniProfile components
- Add "Mentorship Requests" section to both StudentProfile and AlumniProfile components

### 4. Discord Widget Integration
- Replace the removed networking hub content with Discord widget
- Use WidgetBot.io embed solution

## Implementation Steps

### Step 1: Modify Network Pages
1. Remove unused tab content from StudentNetwork.jsx
2. Remove unused tab content from AlumniNetwork.jsx
3. Keep only the core networking functionality

### Step 2: Enhance Profile Pages
1. Add "My Network" section to StudentProfile.jsx
2. Add "Mentorship Requests" section to StudentProfile.jsx
3. Add "My Network" section to AlumniProfile.jsx
4. Add "Mentorship Requests" section to AlumniProfile.jsx

### Step 3: Discord Widget Integration
1. Replace the tab content in both Network pages with Discord widget
2. Use the following WidgetBot configuration:
   ```html
   <iframe 
     src="https://e.widgetbot.io/channels/123456789012345678/987654321098765432"
     width="800" 
     height="600"
     frameborder="0"
   ></iframe>
   ```

### Step 4: Update Navigation
1. Remove "Network" link from navigation menus
2. Ensure "Profile" link is prominent

## WidgetBot Configuration

To implement the Discord widget, we'll use WidgetBot.io which provides an easy way to embed Discord servers:

1. Create a WidgetBot server:
   - Go to https://widgetbot.io/
   - Connect your Discord server
   - Configure channels to display
   - Get your Server ID and Channel ID from the WidgetBot dashboard

2. Update the widget configuration in the code:
   - Replace the placeholder IDs in AlumniNetwork.jsx and StudentNetwork.jsx
   - Use your actual Server ID and Channel ID

3. Embed the widget:
   ```html
   <iframe 
     src="https://e.widgetbot.io/channels/YOUR_SERVER_ID/YOUR_CHANNEL_ID"
     width="100%" 
     height="600"
     frameborder="0"
   ></iframe>
   ```

## Fallback Implementation

For development and testing purposes, you can use a placeholder widget that shows a setup message:

```html
<div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
  <h3 className="text-lg font-semibold text-slate-700 mb-2">Discord Community</h3>
  <p className="text-slate-600 mb-4">Connect with alumni and students through our Discord community.</p>
  <p className="text-sm text-slate-500">To enable this feature:</p>
  <ol className="text-sm text-slate-500 list-decimal list-inside space-y-1 mt-2 text-left max-w-md mx-auto">
    <li>Create a Discord server for your institution</li>
    <li>Set up WidgetBot at widgetbot.io</li>
    <li>Replace the placeholder IDs in the code</li>
  </ol>
  <button 
    onClick={() => alert('Discord integration setup required')}
    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
  >
    Connect to Discord
  </button>
</div>
```

## CSS Customization

WidgetBot allows for CSS customization to match the AlumConnect theme:

```css
/* Example customization */
.widgetbot-container {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Testing

1. Verify widget loads correctly on all network pages
2. Ensure responsive design works on mobile devices
3. Test different Discord server configurations
4. Verify profile page enhancements work correctly

## Deployment

1. Commit changes with message "Discord Integration - Networking Hub Enhancement"
2. Test on staging environment
3. Deploy to production

## Setting Up Discord Integration

### Prerequisites
- A Discord server for your institution
- Administrative access to the Discord server
- A WidgetBot.io account

### Step-by-Step Setup

1. **Create Discord Server**
   - Create a new Discord server or use an existing one
   - Set up appropriate channels (e.g., #general, #mentorship, #alumni-networking)

2. **Configure WidgetBot**
   - Go to https://widgetbot.io/
   - Click "Add to Server" and follow the OAuth flow
   - Select your server and grant necessary permissions
   - Configure which channels should be accessible

3. **Get Server and Channel IDs**
   - In Discord, enable Developer Mode (User Settings → Advanced → Developer Mode)
   - Right-click on your server icon and select "Copy ID" for Server ID
   - Right-click on the channel you want to embed and select "Copy ID" for Channel ID

4. **Update the Code**
   - Replace the placeholder widget in AlumniNetwork.jsx and StudentNetwork.jsx
   - Update the iframe src with your actual Server ID and Channel ID:
   ```html
   <iframe 
     src="https://e.widgetbot.io/channels/YOUR_SERVER_ID/YOUR_CHANNEL_ID"
     width="100%" 
     height="600"
     frameborder="0"
   ></iframe>
   ```

5. **Test the Integration**
   - Run the application locally
   - Verify the widget loads correctly
   - Test messaging functionality

### Troubleshooting

- **Widget not loading**: Ensure WidgetBot has been properly added to your server
- **Permission errors**: Check that WidgetBot has read permissions for the selected channel
- **CORS issues**: Make sure you're using the correct WidgetBot domain (e.widgetbot.io)
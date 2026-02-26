/**
 * Global Configuration for WhatsApp MD Bot
 */

module.exports = {
    // Bot Owner Configuration
    ownerNumber: ['91xxxxxxxxxxx','917023951514'], // Add your number without + or spaces (e.g., 919876543210)
    ownerName: ['Knight Bot Mini', 'Professor'], // Owner names corresponding to ownerNumber array
    
    // Bot Configuration
    botName: 'Knight Bot Mini',
    prefix: '.',
    sessionName: 'session',
    sessionID: process.env.SESSION_ID || 'KnightBot!H4sIAAAAAAAAA5VU25KqRhT9l34d6whKg1o1VeGmKAwoFxVTeWigxR7uDYh6yud8Sn4p+ZsUzpkz5yE5mfDU9GXttfdae38FeUFqrOMrmH0FJSVn1OB+2VxLDGZAao9HTMEARKhBYAYWcl51zNjY2Ktxp8CyNc7D025/K2Q2tdD54KntJFTCxXLLPIP7AJRtkJLwJ4CKXBpGuL5ufX6vWNN0dVKTkbkfa452g35UdxK+5PvJrVSSZ3DvERGhJI/V8oQzTFGq4+saEfo5+p6mBCJv7hwZ+pD4xLWCoeVW0+4cSXB6S1xnUa0KN3Kzl8/RD3ZqOMZbp4z8bEWelMO0VYJWg4faWpV+XFnxCWrJk77PJ2/0axLnOFpGOG9Ic/103TfW0HAx5c0aawvbOtWXgltalrCe+PBSbctNzUWUj8T1vv4cceRvPKdZ74bKxqDlSJM1iTF2V01hRngUhVP9sNG0W6KLYvIj8TV990ryf+rOiArXMtTjOPjaFmanKnJVWhixiyUspE7Xw7lgVkOL3XWfoz/mBEheqTTsRg4feTga2no0shduKIS5ypQmsTe5fFxNE+aDPmpa+jOWx7NvmD53iO1iLmt5PBG3Vmbv6EHCycrb3s7CWkmHodIwpMBqpfC48aB+oayws31FXtUHL5HHFSt1egqRcqCReVbi50dGCb4uIzBj7wNAcUzqhqKGFHm/xzEDgKKzg0OKm0d1wcsKDQPBfA2szoz8Rojgem5cjVV2NrP65bZ0WrTxqOidvfAZDEBJixDXNY40UjcFvb7gukYxrsHs198GIMeX5k23PtqYHYAjoXXj5W2ZFih6F/X9EIVh0eaNc81DuV9gCmbMxzZuGpLHdV/GNkc0PJEzlk+oqcHsiNIaf08QUxyBWUNb/L1p5SJ61H3uSApUXDAA2UMPEoEZGDEsy3FwzLGcMGOFX+ovXQ+LyvJLjhswADnqb4O/fv/zjy9gANLHK5bl+MmUHY84nmensH/YH9y/E+7xI9wgktZgBuR1dTmV3FxdB2L8wiwW0iYW5VgEHwm+G+VNiUvmkgIuBLg6Vnx6mHuQVcdjuGoN95ZK/O12UO1ox3NUKp7/AQTMgMm5BIreWtX33ok3zVjsJI5sg8xglRFs90nLVMZSZ6tbsOBD9mi7ayfAiv/aGcpcOXq3SbHkTlblHzdNOfal01GGSvfcR4vwmYT4x2CCde2GihgUnLoKhkqxaCtffbIiAq0npnq6JiSj49jdxcocn4NXyYFBnWyrBLZXwdwIrM93e3urh1qbubfA4iG/L6XuzcKPFkq/jS7ycFcvXf97JPgxCb5J9J9SvhHvHcfcBz9gfJst/9KfUnhIuMqy2ydnz7flzt5akW1On5yAMBO4wfVkZKv7bdvqHQL3+28DUKaoORY0AzNQZwECA0CLtvfvMj8WP4kkS8ulLMZyn3aK6kb86AmXZLhuUFaCGSsII5ZhBQjfbq1pUWqoPvW21LmTxvUGv4pl6TSoeW8xIPafaujg/jf8EsEafQcAAA==',
    newsletterJid: '120363161513685998@newsletter', // Newsletter JID for menu forwarding
    updateZipUrl: 'https://github.com/mruniquehacker/KnightBot-Mini/archive/refs/heads/main.zip', // URL to latest code zip for .update command
    
    // Sticker Configuration
    packname: 'Knight Bot Mini',
    
    // Bot Behavior
    selfMode: false, // Private mode - only owner can use commands
    autoRead: false,
    autoTyping: false,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'bot', // set bot or all via cmd
    autoDownload: false,
    
    // Group Settings Defaults
    defaultGroupSettings: {
      antilink: false,
      antilinkAction: 'delete', // 'delete', 'kick', 'warn'
      antitag: false,
      antitagAction: 'delete',
      antiall: false, // Owner only - blocks all messages from non-admins
      antiviewonce: false,
      antibot: false,
      anticall: false, // Anti-call feature
      antigroupmention: false, // Anti-group mention feature
      antigroupmentionAction: 'delete', // 'delete', 'kick'
      welcome: false,
      welcomeMessage: '╭╼━≪•𝙽𝙴𝚆 𝙼𝙴𝙼𝙱𝙴𝚁•≫━╾╮\n┃𝚆𝙴𝙻𝙲𝙾𝙼𝙴: @user 👋\n┃Member count: #memberCount\n┃𝚃𝙸𝙼𝙴: time⏰\n╰━━━━━━━━━━━━━━━╯\n\n*@user* Welcome to *@group*! 🎉\n*Group 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽*\ngroupDesc\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ botName*',
      goodbye: false,
      goodbyeMessage: 'Goodbye @user 👋 We will never miss you!',
      antiSpam: false,
      antidelete: false,
      nsfw: false,
      detect: false,
      chatbot: false,
      autosticker: false // Auto-convert images/videos to stickers
    },
    
    // API Keys (add your own)
    apiKeys: {
      // Add API keys here if needed
      openai: '',
      deepai: '',
      remove_bg: ''
    },
    
    // Message Configuration
    messages: {
      wait: '⏳ Please wait...',
      success: '✅ Success!',
      error: '❌ Error occurred!',
      ownerOnly: '👑 This command is only for bot owner!',
      adminOnly: '🛡️ This command is only for group admins!',
      groupOnly: '👥 This command can only be used in groups!',
      privateOnly: '💬 This command can only be used in private chat!',
      botAdminNeeded: '🤖 Bot needs to be admin to execute this command!',
      invalidCommand: '❓ Invalid command! Type .menu for help'
    },
    
    // Timezone
    timezone: 'Asia/Kolkata',
    
    // Limits
    maxWarnings: 3,
    
    // Social Links (optional)
    social: {
      github: 'https://github.com/mruniquehacker',
      instagram: 'https://instagram.com/yourusername',
      youtube: 'http://youtube.com/@mr_unique_hacker'
    }
};
  

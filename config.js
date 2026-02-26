/**
 * الإعدادات العامة للبوت - النسخة العربية الكاملة
 */

module.exports = {
    // إعدادات مالك البوت
    ownerNumber: ['01144534147','01061891947'], // حط أرقام المالكين هنا (بدون + أو مسافات)
    ownerName: ['البوت العربي', 'المطور'], // أسماء المالكين
    
    // إعدادات البوت
    botName: 'البوت العربي',
    prefix: '.',
    sessionName: 'session',
    sessionID: process.env.SESSION_ID || 'KnightBot!H4sIAAAAAAAAA5VU25KqRhT9l34d6whKg1o1VeGmKAwoFxVTeWigxR7uDYh6yud8Sn4p+ZsUzpkz5yE5mfDU9GXttfdae38FeUFqrOMrmH0FJSVn1OB+2VxLDGZAao9HTMEARKhBYAYWcl51zNjY2Ktxp8CyNc7D025/K2Q2tdD54KntJFTCxXLLPIP7AJRtkJLwJ4CKXBpGuL5ufX6vWNN0dVKTkbkfa452g35UdxK+5PvJrVSSZ3DvERGhJI/V8oQzTFGq4+saEfo5+p6mBCJv7hwZ+pD4xLWCoeVW0+4cSXB6S1xnUa0KN3Kzl8/RD3ZqOMZbp4z8bEWelMO0VYJWg4faWpV+XFnxCWrJk77PJ2/0axLnOFpGOG9Ic/103TfW0HAx5c0aawvbOtWXgltalrCe+PBSbctNzUWUj8T1vv4cceRvPKdZ74bKxqDlSJM1iTF2V01hRngUhVP9sNG0W6KLYvIj8TV990ryf+rOiArXMtTjOPjaFmanKnJVWhixiyUspE7Xw7lgVkOL3XWfoz/mBEheqTTsRg4feTga2no0shduKIS5ypQmsTe5fFxNE+aDPmpa+jOWx7NvmD53iO1iLmt5PBG3Vmbv6EHCycrb3s7CWkmHodIwpMBqpfC48aB+oayws31FXtUHL5HHFSt1egqRcqCReVbi50dGCb4uIzBj7wNAcUzqhqKGFHm/xzEDgKKzg0OKm0d1wcsKDQPBfA2szoz8Rojgem5cjVV2NrP65bZ0WrTxqOidvfAZDEBJixDXNY40UjcFvb7gukYxrsHs198GIMeX5k23PtqYHYAjoXXj5W2ZFih6F/X9EIVh0eaNc81DuV9gCmbMxzZuGpLHdV/GNkc0PJEzlk+oqcHsiNIaf08QUxyBWUNb/L1p5SJ61H3uSApUXDAA2UMPEoEZGDEsy3FwzLGcMGOFX+ovXQ+LyvJLjhswADnqb4O/fv/zjy9gANLHK5bl+MmUHY84nmensH/YH9y/E+7xI9wgktZgBuR1dTmV3FxdB2L8wiwW0iYW5VgEHwm+G+VNiUvmkgIuBLg6Vnx6mHuQVcdjuGoN95ZK/O12UO1ox3NUKp7/AQTMgMm5BIreWtX33ok3zVjsJI5sg8xglRFs90nLVMZSZ6tbsOBD9mi7ayfAiv/aGcpcOXq3SbHkTlblHzdNOfal01GGSvfcR4vwmYT4x2CCde2GihgUnLoKhkqxaCtffbIiAq0npnq6JiSj49jdxcocn4NXyYFBnWyrBLZXwdwIrM93e3urh1qbubfA4iG/L6XuzcKPFkq/jS7ycFcvXf97JPgxCb5J9J9SvhHvHcfcBz9gfJst/9KfUnhIuMqy2ydnz7flzt5akW1On5yAMBO4wfVkZKv7bdvqHQL3+28DUKaoORY0AzNQZwECA0CLtvfvMj8WP4kkS8ulLMZyn3aK6kb86AmXZLhuUFaCGSsII5ZhBQjfbq1pUWqoPvW21LmTxvUGv4pl6TSoeW8xIPafaujg/jf8EsEafQcAAA==',
    newsletterJid: '120363161513685998@newsletter',
    updateZipUrl: 'https://github.com/mruniquehacker/KnightBot-Mini/archive/refs/heads/main.zip',
    
    // إعدادات الملصقات (ستيكر)
    packname: 'البوت العربي',
    
    // سلوك البوت
    selfMode: false,
    autoRead: false,
    autoTyping: false,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'bot',
    autoDownload: false,
    
    // إعدادات المجموعات الافتراضية
    defaultGroupSettings: {
      antilink: false,
      antilinkAction: 'delete',
      antitag: false,
      antitagAction: 'delete',
      antiall: false,
      antiviewonce: false,
      antibot: false,
      anticall: false,
      antigroupmention: false,
      antigroupmentionAction: 'delete',
      welcome: false,
      welcomeMessage: '╭╼━≪•عضو جديد•≫━╾╮\n┃أهلاً: @user 👋\n┃عدد الأعضاء: #memberCount\n┃الوقت: time⏰\n╰━━━━━━━━━━━━━━━╯\n\n*@user* نورت *@group*! 🎉\n*وصف المجموعة*\ngroupDesc\n\n> *تشغيل بواسطة botName*',
      goodbye: false,
      goodbyeMessage: 'مع السلامة @user 👋 مش هننساك!',
      antiSpam: false,
      antidelete: false,
      nsfw: false,
      detect: false,
      chatbot: false,
      autosticker: false
    },
    
    // مفاتيح API (حط مفاتيحك هنا لو عندك)
    apiKeys: {
      openai: '',
      deepai: '',
      remove_bg: ''
    },
    
    // إعدادات الرسائل (كلها عربي)
    messages: {
      wait: '⏳ فضلاً انتظر... جاري التنفيذ',
      success: '✅ تم بنجاح!',
      error: '❌ حدث خطأ!',
      ownerOnly: '👑 هذا الأمر لمالك البوت فقط!',
      adminOnly: '🛡️ هذا الأمر للمشرفين فقط!',
      groupOnly: '👥 هذا الأمر يعمل في المجموعات فقط!',
      privateOnly: '💬 هذا الأمر يعمل في الخاص فقط!',
      botAdminNeeded: '🤖 لازم أكون مشرف عشان أنفذ الأمر!',
      invalidCommand: '❓ أمر غير معروف! اكتب .menu للمساعدة'
    },
    
    // المنطقة الزمنية
    timezone: 'Africa/Cairo', // غيرتها لمصر (عدلها لبلدك لو حابب)
    
    // الحدود القصوى
    maxWarnings: 3,
    
    // روابط التواصل (حط روابطك)
    social: {
      github: 'https://github.com/seifriyad501-jpg',
      instagram: 'https://instagram.com/yourusername',
      youtube: 'https://youtube.com/@yourchannel'
    }
};

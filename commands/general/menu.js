/**
 * قائمة الأوامر الرئيسية - عرض جميع الأوامر المتاحة (نسخة عربية)
 */

const config = require('../../config');
const { loadCommands } = require('../../utils/commandLoader');

module.exports = {
  name: 'menu',
  aliases: ['help', 'اوامر', 'مساعدة', 'القائمة'],
  category: 'عام',
  description: 'عرض جميع الأوامر المتاحة',
  usage: 'menu',
  
  async execute(sock, msg, args, extra) {
    try {
      const commands = loadCommands();
      const categories = {};
      
      // تجميع الأوامر حسب الفئة
      commands.forEach((cmd, name) => {
        if (cmd.name === name) { // نحسب الأوامر الأساسية فقط (مش الأسماء البديلة)
          const category = cmd.category || 'غير مصنف';
          if (!categories[category]) {
            categories[category] = [];
          }
          categories[category].push(cmd);
        }
      });
      
      const ownerNames = Array.isArray(config.ownerName) ? config.ownerName : [config.ownerName];
      const displayOwner = ownerNames[0] || config.ownerName || 'مالك البوت';
      
      // بداية القائمة
      let menuText = `╭━━『 *${config.botName || 'البوت العربي'}* 』━━╮\n\n`;
      menuText += `👋 مرحباً @${extra.sender.split('@')[0]}!\n\n`;
      menuText += `⚡ البادئة: ${config.prefix || '(بدون بادئة)'}\n`;
      menuText += `📦 إجمالي الأوامر: ${commands.size}\n`;
      menuText += `👑 المالك: ${displayOwner}\n\n`;
      
      // أوامر عامة
      if (categories.general) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🧭 أوامر عامة\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.general.forEach(cmd => {
// من غير وصف مؤقتاً
menuText += `│ ➜ ${config.prefix}${cmdName}\n`;
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }
      
      // أوامر الذكاء الاصطناعي
      if (categories.ai) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🤖 أوامر الذكاء الاصطناعي\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.ai.forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }
      
      // أوامر المجموعات
      if (categories.group) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🔵 أوامر المجموعات\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.group.forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }
      
      // أوامر المشرفين
      if (categories.admin) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🛡️ أوامر المشرفين\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.admin.forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }
      
      // أوامر المالك
      if (categories.owner) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 👑 أوامر المالك\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.owner.forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }
      
      // أوامر الوسائط
      if (categories.media) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🎞️ أوامر الوسائط\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.media.forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }
      
      // أوامر ترفيهية
      if (categories.fun) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🎭 أوامر ترفيهية\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.fun.forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }
      
      // أوامر الأدوات
      if (categories.utility) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🔧 أوامر الأدوات\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.utility.forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }

      // أوامر الأنمي
      if (categories.anime) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 👾 أوامر الأنمي\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.anime.forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }

      // أوامر صناعة النصوص (Textmaker)
      if (categories.textmaker) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 🖋️ أوامر صناعة النصوص\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories.textmaker.forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }
      
      // الفئات غير المصنفة
      if (categories['غير مصنف']) {
        menuText += `┏━━━━━━━━━━━━━━━━━\n`;
        menuText += `┃ 📁 أوامر أخرى\n`;
        menuText += `┗━━━━━━━━━━━━━━━━━\n`;
        categories['غير مصنف'].forEach(cmd => {
          const cmdName = cmd.name || 'غير معروف';
          const desc = cmd.description || 'لا يوجد وصف';
          menuText += `│ ➜ ${config.prefix}${cmdName} - ${desc}\n`;
        });
        menuText += `\n`;
      }
      
      menuText += `╰━━━━━━━━━━━━━━━━━\n\n`;
      menuText += `💡 اكتب ${config.prefix}help <اسم_الأمر> لمزيد من المعلومات\n`;
      menuText += `🌟 إصدار البوت: 1.0.0\n`;
      
      // إرسال القائمة مع الصورة
      const fs = require('fs');
      const path = require('path');
      const imagePath = path.join(__dirname, '../../utils/bot_image.jpg');
      
      if (fs.existsSync(imagePath)) {
        // إرسال الصورة مع النص
        const imageBuffer = fs.readFileSync(imagePath);
        await sock.sendMessage(extra.from, {
          image: imageBuffer,
          caption: menuText,
          mentions: [extra.sender],
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: config.newsletterJid || '120363161513685998@newsletter',
              newsletterName: config.botName || 'البوت العربي',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      } else {
        // لو الصورة مش موجودة، ابعت نص بس
        await sock.sendMessage(extra.from, {
          text: menuText,
          mentions: [extra.sender]
        }, { quoted: msg });
      }
      
    } catch (error) {
      await extra.reply(`❌ خطأ: ${error.message}`);
    }
  }
};

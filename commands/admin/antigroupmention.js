/**
 * أمر منع منشن المجموعة - تشغيل/إيقاف حماية منشن المجموعة مع خيارات الحذف أو الطرد
 */

const database = require('../../database');

module.exports = {
  name: 'منع_المنشن', // الاسم الأساسي للأمر (عربي)
  aliases: ['منع', 'agm'], // أسماء بديلة (منع, agm)
  category: 'ادمن', // الفئة
  description: 'تفعيل/إلغاء حماية منشن المجموعة (حذف/طرد)',
  usage: '.منع_المنشن <تشغيل/ايقاف/ضبط/عرض>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      // عرض المساعدة والإعدادات الحالية إذا لم يكتب المستخدم أي خيارات
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? '🟢 مفعل' : '🔴 غير مفعل';
        const action = settings.antigroupmentionAction === 'delete' ? '🗑️ حذف' : '👢 طرد';
        return extra.reply(
          `📌 *إعدادات منع منشن المجموعة*\n\n` +
          `الحالة: *${status}*\n` +
          `الإجراء: *${action}*\n\n` +
          `*طريقة الاستخدام:*\n` +
          `  .منع_المنشن تشغيل\n` +
          `  .منع_المنشن ايقاف\n` +
          `  .منع_المنشن ضبط حذف | طرد\n` +
          `  .منع_المنشن عرض`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      // تشغيل الميزة
      if (opt === 'تشغيل' || opt === 'on') {
        if (database.getGroupSettings(extra.from).antigroupmention) {
          return extra.reply('*✅ منع المنشن مفعل بالفعل*');
        }
        database.updateGroupSettings(extra.from, { antigroupmention: true });
        return extra.reply('*✅ تم تفعيل منع منشن المجموعة*');
      }
      
      // إيقاف الميزة
      if (opt === 'ايقاف' || opt === 'off') {
        database.updateGroupSettings(extra.from, { antigroupmention: false });
        return extra.reply('*✅ تم إيقاف منع منشن المجموعة*');
      }
      
      // ضبط الإجراء (حذف أو طرد)
      if (opt === 'ضبط' || opt === 'set') {
        if (args.length < 2) {
          return extra.reply('*❌ حدد الإجراء: .منع_المنشن ضبط حذف | طرد*');
        }
        
        const setAction = args[1].toLowerCase();
        if (setAction !== 'حذف' && setAction !== 'طرد') {
          return extra.reply('*❌ إجراء غير صالح. اختر "حذف" أو "طرد".*');
        }
        
        // تحويل الكلمة العربية للقيمة المخزنة في قاعدة البيانات
        const dbAction = setAction === 'حذف' ? 'delete' : 'kick';
        
        database.updateGroupSettings(extra.from, { 
          antigroupmentionAction: dbAction,
          antigroupmention: true // يتم التفعيل تلقائياً عند ضبط الإجراء
        });
        return extra.reply(`*✅ تم ضبط إجراء منع المنشن على: ${setAction}*`);
      }
      
      // عرض الإعدادات الحالية
      if (opt === 'عرض' || opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antigroupmention ? '🟢 مفعل' : '🔴 غير مفعل';
        const action = settings.antigroupmentionAction === 'delete' ? '🗑️ حذف' : '👢 طرد';
        return extra.reply(`*⚙️ إعدادات منع المنشن:*\nالحالة: ${status}\nالإجراء: ${action}`);
      }
      
      // إذا كتب المستخدم خيار غير معروف
      return extra.reply('*❓ استخدم .منع_المنشن لعرض التعليمات.*');
      
    } catch (error) {
      await extra.reply(`❌ خطأ: ${error.message}`);
    }
  }
};

/**
 * أمر منع الروابط - تشغيل/إيقاف حماية الروابط مع خيارات الحذف أو الطرد
 */

const database = require('../../database');

module.exports = {
  name: 'منع_الروابط', // الاسم الأساسي للأمر (عربي)
  aliases: ['منع_الرابط', 'antilink'], // أسماء بديلة
  category: 'ادمن', // الفئة
  description: 'تفعيل/إلغاء حماية الروابط (حذف/طرد)',
  usage: '.منع_الروابط <تشغيل/ايقاف/ضبط/عرض>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,
  
  async execute(sock, msg, args, extra) {
    try {
      // عرض المساعدة والإعدادات الحالية إذا لم يكتب المستخدم أي خيارات
      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? '🟢 مفعل' : '🔴 غير مفعل';
        const action = settings.antilinkAction === 'delete' ? '🗑️ حذف' : '👢 طرد';
        return extra.reply(
          `🔗 *إعدادات منع الروابط*\n\n` +
          `الحالة: *${status}*\n` +
          `الإجراء: *${action}*\n\n` +
          `*طريقة الاستخدام:*\n` +
          `  .منع_الروابط تشغيل\n` +
          `  .منع_الروابط ايقاف\n` +
          `  .منع_الروابط ضبط حذف | طرد\n` +
          `  .منع_الروابط عرض`
        );
      }
      
      const opt = args[0].toLowerCase();
      
      // تشغيل الميزة
      if (opt === 'تشغيل' || opt === 'on') {
        if (database.getGroupSettings(extra.from).antilink) {
          return extra.reply('*✅ منع الروابط مفعل بالفعل*');
        }
        database.updateGroupSettings(extra.from, { antilink: true });
        return extra.reply('*✅ تم تفعيل منع الروابط*');
      }
      
      // إيقاف الميزة
      if (opt === 'ايقاف' || opt === 'off') {
        database.updateGroupSettings(extra.from, { antilink: false });
        return extra.reply('*✅ تم إيقاف منع الروابط*');
      }
      
      // ضبط الإجراء (حذف أو طرد)
      if (opt === 'ضبط' || opt === 'set') {
        if (args.length < 2) {
          return extra.reply('*❌ حدد الإجراء: .منع_الروابط ضبط حذف | طرد*');
        }
        
        const setAction = args[1].toLowerCase();
        if (setAction !== 'حذف' && setAction !== 'طرد') {
          return extra.reply('*❌ إجراء غير صالح. اختر "حذف" أو "طرد".*');
        }
        
        // تحويل الكلمة العربية للقيمة المخزنة في قاعدة البيانات
        const dbAction = setAction === 'حذف' ? 'delete' : 'kick';
        
        database.updateGroupSettings(extra.from, { 
          antilinkAction: dbAction,
          antilink: true // يتم التفعيل تلقائياً عند ضبط الإجراء
        });
        return extra.reply(`*✅ تم ضبط إجراء منع الروابط على: ${setAction}*`);
      }
      
      // عرض الإعدادات الحالية
      if (opt === 'عرض' || opt === 'get') {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? '🟢 مفعل' : '🔴 غير مفعل';
        const action = settings.antilinkAction === 'delete' ? '🗑️ حذف' : '👢 طرد';
        return extra.reply(`*⚙️ إعدادات منع الروابط:*\nالحالة: ${status}\nالإجراء: ${action}`);
      }
      
      // إذا كتب المستخدم خيار غير معروف
      return extra.reply('*❓ استخدم .منع_الروابط لعرض التعليمات.*');
      
    } catch (error) {
      await extra.reply(`❌ خطأ: ${error.message}`);
    }
  }
};

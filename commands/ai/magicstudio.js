/**
 * أمر توليد الصور بالذكاء الاصطناعي
 * توليد صور من النص باستخدام عدة مصادر
 */

const axios = require('axios');

// عدة مصادر للصور (لو مصدر وقع، يجرب اللي بعده)
const APIS = [
  {
    name: 'Prodia',
    url: (prompt) => `https://api.akuari.my.id/ai/text2img?prompt=${encodeURIComponent(prompt)}`,
    type: 'direct'
  },
  {
    name: 'Stable Diffusion',
    url: (prompt) => `https://api.erdwpe.com/api/ai/sd?prompt=${encodeURIComponent(prompt)}`,
    type: 'direct'
  },
  {
    name: 'HuggingFace',
    url: (prompt) => `https://api.agatz.xyz/api/aiimage?text=${encodeURIComponent(prompt)}`,
    type: 'direct'
  },
  {
    name: 'Lexica',
    url: (prompt) => `https://api.xyroinee.xyz/api/ai/lexica?q=${encodeURIComponent(prompt)}`,
    type: 'direct'
  }
];

module.exports = {
  name: 'تخيل',
  aliases: ['imagine', 'aiimage', 'generate', 'draw', 'صور'],
  category: 'ذكاء',
  description: 'توليد صورة بالذكاء الاصطناعي من النص',
  usage: '.تخيل <النص المطلوب>',
  
  async execute(sock, msg, args, extra) {
    try {
      // جمع النص اللي المستخدم كتبه
      const prompt = args.join(' ').trim();
      
      // لو مفيش نص، يطلب من المستخدم يكتب حاجة
      if (!prompt) {
        return extra.reply(
          '🎨 *توليد الصور بالذكاء الاصطناعي*\n\n' +
          '❌ لازم تكتب وصف للصورة.\n\n' +
          '📝 *أمثلة:*\n' +
          '.تخيل غروب الشمس فوق الجبال\n' +
          '.تخيل قطة سايبربانك بأضواء نيون'
        );
      }

      // رسالة انتظار
      await extra.reply('⏳ *جاري توليد الصورة...*\nمن فضلك انتظر 30-60 ثانية.');
      
      let imageBuffer = null;
      let lastError = null;

      // نجرب كل المصادر بالترتيب
      for (const api of APIS) {
        try {
          console.log(`جاري تجربة ${api.name}...`);
          
          const response = await axios.get(api.url(prompt), {
            responseType: 'arraybuffer',
            timeout: 60000, // 60 ثانية كحد أقصى
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          // لو جابت نتيجة
          if (response.data && response.data.length > 0) {
            // لو النتيجة JSON (بعض المواقع بترجع رابط صورة)
            if (response.headers['content-type']?.includes('application/json')) {
              const textData = Buffer.from(response.data).toString();
              try {
                const json = JSON.parse(textData);
                if (json.error || json.status === false) {
                  console.log(`${api.name} رجع خطأ:`, json);
                  continue;
                }
                // استخراج رابط الصورة من JSON
                const imageUrl = json.result?.url || json.url || json.image || json.data?.url;
                if (imageUrl) {
                  const imgResponse = await axios.get(imageUrl, {
                    responseType: 'arraybuffer',
                    timeout: 30000
                  });
                  imageBuffer = Buffer.from(imgResponse.data);
                  break;
                }
              } catch (e) {
                console.log(`${api.name} فشل في قراءة JSON`);
              }
            } else {
              // لو الصورة مباشرة
              imageBuffer = Buffer.from(response.data);
              
              // نتأكد إن الصورة مش فارغة
              if (imageBuffer.length > 1000) {
                break;
              }
            }
          }
        } catch (err) {
          console.log(`${api.name} فشل:`, err.message);
          lastError = err;
          continue; // نجرب المصدر اللي بعده
        }
      }

      // لو كل المصادر فشلت
      if (!imageBuffer || imageBuffer.length < 1000) {
        throw new Error(lastError?.message || 'كل المصادر فشلت في توليد الصورة');
      }

      // نتأكد إن حجم الصورة مناسب (واتساب بيقبل حتى 5 ميجا)
      if (imageBuffer.length > 5 * 1024 * 1024) {
        return extra.reply('❌ حجم الصورة كبير جداً. جرب وصف أبسط.');
      }

      // نرسل الصورة للمستخدم
      await sock.sendMessage(extra.from, {
        image: imageBuffer,
        caption: `🎨 *الوصف:* ${prompt}\n✨ تم التوليد باستخدام ${APIS.find(api => api.name)?.name || 'الذكاء الاصطناعي'}`
      }, { quoted: msg });

    } catch (error) {
      console.error('خطأ في أمر التخيل:', error);
      
      // رسائل خطأ حسب نوع المشكلة
      if (error.message.includes('timed out') || error.code === 'ECONNABORTED') {
        await extra.reply('❌ الوقت انتهى. الخوادم مشغولة حالياً. حاول مرة تانية.');
      } else if (error.message.includes('socket')) {
        await extra.reply('❌ مشكلة في الاتصال. تأكد من اتصالك بالنت.');
      } else {
        await extra.reply(`❌ فشل توليد الصورة: ${error.message}\n\nحاول بوصف مختلف.`);
      }
    }
  }
};

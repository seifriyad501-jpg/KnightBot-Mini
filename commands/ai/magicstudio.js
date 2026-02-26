/**
 * Generate AI Image Command - Multiple API Support
 * Generate AI-powered images from text prompts using various APIs
 */

const axios = require('axios');

// Multiple API endpoints for fallback
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
  name: 'imagine',
  aliases: ['aiimage', 'generate', 'draw', 'تخيل'],
  category: 'ai',
  description: 'Generate AI image from text prompt',
  usage: '.imagine <your prompt>',
  
  async execute(sock, msg, args, extra) {
    try {
      const prompt = args.join(' ').trim();
      
      if (!prompt) {
        return extra.reply(
          '🎨 *Generate AI Images*\n\n' +
          'Please provide a prompt.\n\n' +
          'Example:\n' +
          '.imagine a beautiful sunset over mountains\n' +
          '.imagine cyberpunk cat with neon lights'
        );
      }

      // Send initial waiting message
      await extra.reply('⏳ *Generating your image...*\nPlease wait 30-60 seconds.');
      
      let imageBuffer = null;
      let lastError = null;

      // Try each API until one works
      for (const api of APIS) {
        try {
          console.log(`Trying ${api.name} API...`);
          
          const response = await axios.get(api.url(prompt), {
            responseType: 'arraybuffer',
            timeout: 60000, // 60 seconds timeout
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          if (response.data && response.data.length > 0) {
            // Check if response is JSON (contains error)
            if (response.headers['content-type']?.includes('application/json')) {
              const textData = Buffer.from(response.data).toString();
              try {
                const json = JSON.parse(textData);
                if (json.error || json.status === false) {
                  console.log(`${api.name} returned error:`, json);
                  continue;
                }
                // Some APIs return image URL in JSON
                if (json.result?.url || json.url || json.image || json.data?.url) {
                  const imageUrl = json.result?.url || json.url || json.image || json.data?.url;
                  const imgResponse = await axios.get(imageUrl, {
                    responseType: 'arraybuffer',
                    timeout: 30000
                  });
                  imageBuffer = Buffer.from(imgResponse.data);
                  break;
                }
              } catch (e) {
                console.log(`${api.name} JSON parse failed`);
              }
            } else {
              // Direct image response
              imageBuffer = Buffer.from(response.data);
              
              // Check if buffer is valid image (simple check)
              if (imageBuffer.length > 1000) {
                break;
              }
            }
          }
        } catch (err) {
          console.log(`${api.name} failed:`, err.message);
          lastError = err;
          continue; // Try next API
        }
      }

      // If no API worked
      if (!imageBuffer || imageBuffer.length < 1000) {
        throw new Error(lastError?.message || 'All APIs failed to generate image');
      }

      // Check file size (WhatsApp limit ~5MB)
      if (imageBuffer.length > 5 * 1024 * 1024) {
        return extra.reply('❌ Generated image is too large for WhatsApp. Try a simpler prompt.');
      }

      // Send the image
      await sock.sendMessage(extra.from, {
        image: imageBuffer,
        caption: `🎨 *Prompt:* ${prompt}\n✨ Generated using AI`
      }, { quoted: msg });

    } catch (error) {
      console.error('Error in imagine command:', error);
      
      // Handle specific errors
      if (error.message.includes('timed out') || error.code === 'ECONNABORTED') {
        await extra.reply('❌ Request timed out. The servers are busy. Please try again later.');
      } else if (error.message.includes('socket')) {
        await extra.reply('❌ Network error. Please check your connection and try again.');
      } else {
        await extra.reply(`❌ Failed to generate image: ${error.message}\n\nTry again with a different prompt.`);
      }
    }
  }
};

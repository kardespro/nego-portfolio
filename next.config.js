/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.scdn.co', 'cdn.discordapp.com', 'bencan.net', 'i.imgur.com', 'avatars.githubusercontent.com', 'nego.rocks'],
  },
  compress: true,
  turboPack: {
    enabled: true, // TurboPack'ı etkinleştirme veya devre dışı bırakma
    polyfill: true, // TurboPack polyfill'ini etkinleştirme veya devre dışı bırakma
    targets: ["es5", "module"], // Hedef platformları belirleme (örneğin, es5, es6, es7)
    // Diğer TurboPack ayarlarını burada belirleyebilirsiniz
  },
  generateBuildId: async () => {
    // Rastgele bir sayı veya benzersiz bir kimlik oluşturabilirsiniz
    return "nego.rocks";
  }
};

module.exports = nextConfig;

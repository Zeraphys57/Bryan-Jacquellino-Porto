module.exports = {
    darkMode: 'class', // Atur ke 'class' jika kamu menggunakan class dark:, atau 'media' untuk mengikuti preferensi sistem.
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // Pastikan path ini sesuai dengan struktur project kamu.
      './index.html',
    ],
    theme: {
        extend: {
            customForms: (theme) => ({
                dark: theme('@custom-variant dark'),
                light: theme('@custom-variant light'),
              }),
        },
      },
    plugins: [],
  };
  
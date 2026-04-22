import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import bryanImg from "../assets/Bryan.jpg";
import Lanyard from './Lanyard';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 550,
      easing: 'ease-out',
      offset: 50,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-16 px-4 py-12 bg-transparent">
      
      <div
        className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24 p-4 md:p-8 w-full max-w-7xl mx-auto"
        data-aos="fade-up"
      >
        {/* Div untuk Foto */}
        <div className="relative group flex-shrink-0">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-500 blur opacity-50 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-70 transition duration-300 rounded-full z-0"></div>

          {/* Gambar utama */}
          <img
            src={bryanImg}
            alt="bryan"
            className="relative w-64 h-96 sm:w-72 sm:h-[27rem] md:w-80 md:h-[30rem] lg:w-96 lg:h-[36rem] rounded-full shadow-xl z-10 object-cover transition-transform duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
          />

          <div className="absolute top-full left-1/2 -translate-x-1/2 w-[200vw] h-[100vh] z-0 hidden md:block">
            <Lanyard
              transparent={true}
              position={[9, 5, 20]} // Mengatur posisi kamera
              fov={20}
            />
          </div>
        </div>

        

        {/* teks 1 */}
        <div className="flex-1 min-w-0 w-full md:w-auto">
          <div className="text-left z-10" data-aos="fade-left">
          <div className="bg-transparent p-4 rounded-xl shadow-md">
            <p className="text-base sm:text-lg lg:text-xl text-gray-900 dark:text-gray-100 text-justify">
              Hai, aku Bryan Jacquellino!<br/><br/>
              Sekarang aku masih kuliah di jurusan IT dan lagi aktif banget ngulik dunia desain dan
              development website. Selain buat nambah skill, aku juga mulai buka jasa bikin website
              secara freelance. Mulai dari desain tampilannya biar estetik dan user-friendly, sampai
              bagian fungsionalnya yang sesuai kebutuhan kamu—entah itu buat personal branding,
              portofolio, bisnis, atau bahkan toko online.<br/><br/>
              Aku suka banget ngegabungin tampilan yang clean sama fitur-fitur yang interaktif, supaya
              website-nya nggak cuma kelihatan keren tapi juga nyaman dipakai.
              Cocok buat kamu yang mau punya website yang beda dari yang lain, aku siap bantuin dari awal sampai jadi!
            </p>
          </div>
        </div>
      </div>
    </div>
     

      {/* teks 2*/}
      <div className="w-full max-w-4xl mx-auto px-4 py-2 md:ml-auto md:mr-16 lg:mr-32">
        <div data-aos="fade-left">
          <div className="bg-transparent p-4 rounded-xl shadow-md">
            <p className="text-base sm:text-lg lg:text-xl text-gray-900 dark:text-gray-100 text-justify">
            Untuk bikin website, aku lebih suka pakai framework React karena dia ngasih kebebasan dan
            fleksibilitas tinggi buat ngatur komponen-komponen UI. Jadi kodenya bisa lebih rapi dan gampang
            di-maintain. Nah, biar tampilannya kelihatan lebih clean dan modern, aku gabungin sama Tailwind CSS.
            Tailwind ini enaknya karena utility-first,
            jadi styling bisa langsung ditulis di class tanpa perlu bikin file CSS panjang-panjang.<br/><br/>

            Kombinasi React + Tailwind ini menurutku pas banget karena React bantu urus logika dan
            interaktivitas, sementara Tailwind bikin styling jadi super cepat dan konsisten. Selain itu,
            dengan setup ini, aku bisa bikin website yang responsif dan kelihatan keren di berbagai device,
            dari HP sampai laptop. Proses develop-nya juga lebih efisien, jadi aku bisa fokus ke
            fungsionalitas dan desain tanpa ribet.<br/><br/>

            Pokoknya aku mau hasilin website yang nggak cuma fungsional,
            tapi juga enak diliat dan nyaman dipakai.
            </p>
          </div>
        </div>
      </div>

      {/* Teks 3 */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
          <div
              className="z-10"
              data-aos="fade-up"
          >
              <div className="bg-transparent p-4 rounded-xl shadow-md">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-900 dark:text-gray-100 text-justify">
                      Sebelumnya aku sempat menyelesaikan program D1 di bidang IT di Taiwan.
                      Selama di sana, aku belajar banyak hal fundamental seputar teknologi—mulai dari basic
                      programming, jaringan, sampai pengenalan sistem komputer. Tapi bukan cuma soal teknis,
                      pengalaman tinggal dan belajar di luar negeri juga ngajarin aku tentang pentingnya
                      adaptasi, kerja sama tim lintas budaya, dan cara berpikir yang lebih terbuka. Bekal
                      itulah yang bikin aku makin semangat dan siap ngembangin skill aku lebih jauh
                      sekarang, khususnya di dunia web development.
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default About;
import CharHomePage from "../../../assets/images/homechar.png";
export default function Banners() {
  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl font-bold mb-4">
              Halo 👋 , Selamat datang di platform{" "}
              <span className="tracking-tighter text-ultramarine-950">
                bluemonster.
              </span>
            </h1>
            <p>
              <span className="tracking-tighter font-semibold text-ultramarine-950">
                bluemonster.
              </span>{" "}
              adalah platform belajar yang menyediakan berbagai materi untuk
              meningkatkan pengetahuan dan keterampilan Anda. Kami menyediakan
              konten berkualitas dan pengalaman belajar yang interaktif.
              Bergabunglah dengan kami sekarang dan mulailah perjalanan belajar
              Anda!
            </p>
            <button className="bg-ultramarine-950 mt-4 font-semibold text-ultramarine-50 px-8 py-2 rounded">
              Mulai Sekarang
            </button>
          </div>
          <div className="lg:w-1/2 lg:pl-12  flex justify-end">
            <img
              src={CharHomePage}
              alt="Gambar"
              className="w-80 animate-bounce h-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}

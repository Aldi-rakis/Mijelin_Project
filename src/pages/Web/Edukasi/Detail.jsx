import React from 'react'
import minyak from '../../../assets/img_edukasi.png'
const Detail = () => {


  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className='max-w-[550px] justify-center items-center mx-auto bg-[#FFFFFF]  shadow-xl h-[100vh] pb-[100px]'>


      <div className='relative w-full bg-center bg-cover'>
        <div className='absolute top-2 w-full text-center flex justify-center items-start h-6'>
          <img onClick={goBack} className='w-[40px] left-0 absolute ml-5 h-[40px] bg-white rounded-lg p-1 shadow-sm border' src='../src/assets/back_arrow.png' alt="" />
          <h1 className='text-[25px] font-semibold text-[#fff]'>Tukar</h1>
        </div>

        <div className='w-full h-[350px]'>
          <img className='w-full h-full object-cover' src={minyak} alt="" />
        </div>

        {/* Card Poin */}
  <div className='relative -translate-y-[40px]  w-full px-[40px] bg-[#fff]  rounded-3xl z-10 h-[calc(100vh-100px)] overflow-y-auto text-justify'>
          <p id='title' className='text-lg lg:text-2xl font-bold mt-10'>Bahaya Minyak Jelantah Bagi Lingkungan    </p>

          <p id='date' className='text-sm text-[#8696BB] mt-3'>Mijelin, 9 September 2024</p>

          <p dangerouslySetInnerHTML={{ __html: content }}  id='content' className='text-sm text-[#000000] mt-4 leading-7'>Kita sering mendengar istilah minyak jelantah, tapi seberapa sering kita menyadari bahaya yang mengintai di balik minyak bekas ini? Di balik kenikmatan gorengan yang renyah, ada ancaman serius yang harus kita hadapi—terutama bagi lingkungan. Minyak jelantah yang asal dibuang ternyata bisa berdampak buruk pada bumi kita. Yuk, kita bahas lebih lanjut kenapa kamu harus mulai peduli!

            1. Merusak Ekosistem Air
            Minyak jelantah yang dibuang sembarangan ke saluran air atau sungai bisa mencemari air dengan cara yang nggak main-main. Minyak ini bisa membentuk lapisan tipis di permukaan air, menghalangi oksigen untuk masuk. Akibatnya? Ekosistem air terganggu, ikan dan makhluk air lain bisa mati karena kekurangan oksigen. Kebayang, kan, dampaknya kalau banyak sungai jadi tempat "pembuangan" minyak bekas?

            2. Tanah Menjadi Tidak Subur
            Mungkin kamu berpikir, "Ya udah, buang aja ke tanah, kan bisa meresap?" Ternyata, salah besar! Minyak jelantah yang dibuang ke tanah malah membuat tanah menjadi tidak subur. Minyak ini sulit terurai secara alami, jadi tanah yang tercemar minyak jelantah nggak bisa menyerap air dengan baik, bahkan bisa mematikan mikroorganisme yang berperan penting dalam kesuburan tanah. Alih-alih subur, tanah jadi mati.

            3. Pencemaran Udara
            Kamu pernah mencium bau nggak sedap dari minyak yang sudah dipakai berkali-kali? Bayangkan kalau minyak jelantah itu dibakar. Selain menyebarkan bau tak sedap, proses pembakaran minyak bekas ini bisa melepaskan zat berbahaya ke udara, seperti karbon dioksida (CO2) dan senyawa kimia lain yang bisa memperparah pemanasan global. Efeknya? Udara yang kita hirup jadi lebih tercemar, belum lagi ancaman perubahan iklim yang semakin mengkhawatirkan.

            4. Menyumbang Sampah yang Sulit
            Diolah
            Kebanyakan orang mengira bahwa minyak jelantah nggak lebih dari sampah rumah tangga biasa. Padahal, jika minyak jelantah dibuang bersama sampah lainnya, proses daur ulang atau pengolahan sampah jadi jauh lebih sulit. Minyak ini bisa meresap ke sampah organik, merusak potensi daur ulang, dan memperlambat proses penguraian. Hasil akhirnya, tumpukan sampah semakin banyak, dan bumi semakin kewalahan.

            5. Menjadi Sumber Penyakit
            Kita sering berpikir minyak jelantah hanya berbahaya untuk kesehatan jika digunakan berulang kali untuk memasak. Namun, setelah dibuang sembarangan, minyak ini juga bisa memicu pertumbuhan bakteri berbahaya di lingkungan sekitar. Bau yang dihasilkan juga bisa mengundang hama seperti lalat dan tikus. Lingkungan jadi semakin kotor, dan kesehatan kita pun terancam.

            Solusi: Jangan Buang, Daur Ulang!
            Jadi, apa solusinya? Alih-alih membuang minyak jelantah sembarangan, kamu bisa mulai mengumpulkannya dan mengirimkannya ke pusat daur ulang. Beberapa perusahaan dan komunitas sekarang sudah menyediakan tempat penampungan minyak jelantah untuk didaur ulang menjadi biodiesel atau produk lain yang bermanfaat.

            Nah, gimana? Sekarang udah tau kan, bahaya minyak jelantah nggak bisa dianggap remeh? Mulai dari diri sendiri dengan nggak buang minyak jelantah sembarangan. Yuk, kita jaga bumi kita bersama!

          </p>
        </div>
      </div>


    </div>
  )
}

export default Detail
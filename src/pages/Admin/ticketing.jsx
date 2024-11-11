// Ticketing.js
import React, { useEffect, useState } from 'react';

function Ticketing() {
  const [queue, setQueue] = useState(5); // Jumlah antrean saat ini
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inQueue, setInQueue] = useState(false);
  const [step, setStep] = useState(1);

  // Membuka modal antrean
  const handleWarTicket = () => {
    setIsModalOpen(true);
    setInQueue(true);
  };

  // Efek untuk menghitung mundur antrean
  useEffect(() => {
    if (inQueue && queue > 1) {
      const interval = setInterval(() => {
        setQueue((prevQueue) => prevQueue - 1);
      }, 3000);

      return () => clearInterval(interval);
    } else if (inQueue && queue === 1) {
      setStep(2); // Pindah ke tahap "Masuk Antrian"
      setInQueue(false);
    }
  }, [inQueue, queue]);

  // Mengarahkan ke pembayaran
  const handleProceedToPayment = () => {
    setStep(3); // Pindah ke tahap "Payment"
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-semibold text-blue-600 mb-8">War Ticket</h1>
        <button
          onClick={handleWarTicket}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-200"
        >
          Masuk Antrian
        </button>

        {/* Modal Pop-up untuk antrean */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
              {step === 1 && (
                <>
                  <h2 className="text-xl font-semibold text-center text-blue-600">Anda Masuk ke Antrean</h2>
                  <p className="mt-4 text-center text-gray-600">
                    Anda berada di antrian {queue}. Masih ada {queue - 1} orang lagi. Mohon tunggu...
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-xl font-semibold text-center text-green-600">Anda Sudah Masuk Antrian!</h2>
                  <p className="mt-4 text-center text-gray-600">Apakah Anda ingin melanjutkan ke pembayaran?</p>
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleProceedToPayment}
                      className="py-2 px-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition duration-200"
                    >
                      Lanjut ke Pembayaran
                    </button>
                  </div>
                </>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        <div className="flex justify-center space-x-6 mt-8">
          <StepIndicator step={1} currentStep={step} label="Menunggu Antrian" />
          <StepIndicator step={2} currentStep={step} label="Masuk Antrian" />
          <StepIndicator step={3} currentStep={step} label="Payment" />
        </div>

        {/* Conditional Rendering for each step */}
        {step === 3 && <PaymentSection />}
      </div>
    </div>
  );
}

function StepIndicator({ step, currentStep, label }) {
  const isActive = currentStep >= step;
  return (
    <div className="text-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
          isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
        }`}
      >
        {step}
      </div>
      <p className={`mt-2 text-sm font-medium ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>{label}</p>
    </div>
  );
}

function PaymentSection() {
  return (
    <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-purple-600">Pembayaran</h2>
      <p className="mt-4 text-center text-gray-600">Selesaikan pembayaran untuk mengonfirmasi pemesanan tiket Anda.</p>
      <button className="mt-6 w-full py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition duration-200">
        Bayar Sekarang
      </button>
    </div>
  );
}

export default Ticketing;

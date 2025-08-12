import React, { useState, useEffect } from 'react';

const MobileOptimizedPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    // Check if popup has been shown before
    const hasSeenPopup = localStorage.getItem('hasSeenMobilePopup');
    
    // Check if device is desktop (screen width > 768px)
    const isDesktop = window.innerWidth > 768;
    
    // Check if current path is admin page
    const isAdminPage = window.location.pathname.includes('/admin');
    
    // Get current URL
    setCurrentURL(window.location.href);
    
    // Show popup only on desktop, not admin page, and if user hasn't seen it before
    if (isDesktop && !isAdminPage && hasSeenPopup !== 'permanent') {
      // Delay popup untuk memberikan waktu halaman load
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowPopup(false);
    // Remember that user has seen the popup for this session
    localStorage.setItem('hasSeenMobilePopup', 'session');
  };

  const handleDontShowAgain = () => {
    setShowPopup(false);
    // Set a flag to never show again
    localStorage.setItem('hasSeenMobilePopup', 'permanent');
  };

  const handleShowQR = () => {
    setShowQRCode(true);
  };

  const copyURL = () => {
    navigator.clipboard.writeText(currentURL);
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[10000] transition-all duration-300';
    toast.textContent = 'URL copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-sm w-full mx-4 shadow-2xl transform transition-all duration-300 animate-bounce-in">
        {/* Header dengan Icon Mobile */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-t-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-2xl mx-auto mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center">📱 Mobile-First App</h3>
            <p className="text-blue-100 text-sm text-center mt-1">Mijelin Experience</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showQRCode ? (
            <>
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  🎯 Pengalaman Terbaik di Mobile
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Aplikasi <span className="font-semibold text-blue-600">Mijelin</span> dirancang khusus untuk perangkat mobile. 
                  Buka di smartphone untuk pengalaman yang optimal!
                </p>
              </div>

              {/* Features Icons */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600">Touch Friendly</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600">Fast Performance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600">User Friendly</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleShowQR}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <span>Scan QR Code</span>
                </button>
                
                <button
                  onClick={handleDismiss}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Lanjutkan di Desktop
                </button>
                
                <button
                  onClick={handleDontShowAgain}
                  className="w-full text-gray-500 hover:text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm"
                >
                  Jangan tampilkan lagi
                </button>
              </div>
            </>
          ) : (
            <>
              {/* QR Code Section */}
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  📱 Scan QR Code
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Scan dengan kamera smartphone untuk membuka di mobile
                </p>
                
                {/* QR Code - Using online QR generator */}
                <div className="bg-white p-4 rounded-xl border-2 border-gray-200 mx-auto w-fit">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentURL)}`}
                    alt="QR Code"
                    className="w-36 h-36 mx-auto"
                  />
                </div>
                
                <p className="text-xs text-gray-500 mt-3">
                  Atau copy URL untuk dibuka di mobile browser
                </p>
              </div>

              {/* URL Copy Section */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={currentURL}
                    readOnly
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
                  />
                  <button
                    onClick={copyURL}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Back Button */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowQRCode(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  ← Kembali
                </button>
                <button
                  onClick={handleDismiss}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-200 text-sm"
                >
                  Tutup
                </button>
              </div>
            </>
          )}

          {/* Pro Tip - only show on main screen */}
          {!showQRCode && (
            <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
              <div className="flex items-center space-x-2">
                <span className="text-lg">💡</span>
                <div>
                  <p className="text-xs text-amber-800 font-medium">Pro Tip:</p>
                  <p className="text-xs text-amber-700">
                    Gunakan QR code untuk akses cepat di mobile device!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% { 
            transform: scale(0.3) translateY(-50px);
            opacity: 0;
          }
          50% { 
            transform: scale(1.05) translateY(-10px);
            opacity: 0.8;
          }
          70% { 
            transform: scale(0.95) translateY(5px);
            opacity: 0.9;
          }
          100% { 
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
};

export default MobileOptimizedPopup;

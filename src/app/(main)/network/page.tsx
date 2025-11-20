'use client';
import React, { useState } from 'react';

interface Recommendation {
  name: string;
  title: string;
  connection?: string;
  followers?: string;
  imgSrc: string;
  type: 'Kết nối' | 'Theo dõi';
}

interface NetworkData {
  invited: number;
  connections: number;
  following: number;
}

const connectionData: NetworkData = {
  invited: 2,
  connections: 580,
  following: 150
};

const initialSampleRecommendations: Recommendation[] = [
  { name: 'Thu Hoai Do', title: 'HR Manager | Recruitment Specialist', connection: 'Dựa trên hồ sơ của bạn', imgSrc: 'https://placehold.co/100x100/A0B4C8/FFFFFF?text=THD', type: 'Kết nối' },
  { name: 'Hoang Anh Vu', title: 'Student at Posts and Telecommunication', connection: 'Dựa trên hồ sơ của bạn', imgSrc: 'https://placehold.co/100x100/90EE90/000000?text=HAV', type: 'Kết nối' },
  { name: 'Truong Thanh Nguyen', title: 'Developer at FPT Software', connection: 'Dựa trên hồ sơ của bạn', imgSrc: 'https://placehold.co/100x100/ADD8E6/000000?text=TTN', type: 'Kết nối' },
  { name: 'Pham Ngoc Anh (Rachel)', title: 'Student at Foreign Trade University', connection: 'Dựa trên hồ sơ của bạn', imgSrc: 'https://placehold.co/100x100/FFB6C1/000000?text=PNA', type: 'Kết nối' },
  { name: 'Huyen Vu Khanh', title: 'Learning & Development Associate | EY Vietnam', followers: '13.590 người theo dõi', imgSrc: 'https://placehold.co/100x100/F08080/FFFFFF?text=HVK', type: 'Theo dõi' },
  { name: 'Hung Huynh', title: 'Not KOL or LinkedIn Idol', followers: '19.778 người theo dõi', imgSrc: 'https://placehold.co/100x100/DDA0DD/FFFFFF?text=HH', type: 'Theo dõi' },
];

const initialNewConnections: Recommendation[] = [
  { name: 'HOA TV', title: 'GAME DEV', connection: 'Dựa trên hồ sơ của bạn', imgSrc: 'https://placehold.co/100x100/F0A8A8/FFFFFF?text=HTV', type: 'Kết nối' },
  { name: 'Lưu Mai HR', title: 'Marketing Manager', connection: 'Dựa trên hồ sơ của bạn', imgSrc: 'https://placehold.co/100x100/A8F0A8/000000?text=LMH', type: 'Kết nối' },
  { name: 'Ann Nguyen', title: 'Marketing Manager', connection: 'Dựa trên hồ sơ của bạn', imgSrc: 'https://placehold.co/100x100/A8A8F0/FFFFFF?text=AN', type: 'Kết nối' },
  { name: 'Vuong Pham Minh', title: 'ERP Functional Consultant', connection: 'Dựa trên hồ sơ của bạn', imgSrc: 'https://placehold.co/100x100/F0F0A8/000000?text=VPM', type: 'Kết nối' },
];

const SummaryItem: React.FC<{ count: number; label: string }> = ({ count, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl font-bold text-linkedin-blue">{count}</span>
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

const NetworkSummary: React.FC<{ data: NetworkData }> = ({ data }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm sticky top-20">
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">Tổng quan về mạng lưới</h2>
    </div>
    <div className="flex justify-around p-4 border-b border-gray-200 text-center">
      <SummaryItem count={data.invited} label="Đã gửi lời mời" />
      <SummaryItem count={data.connections} label="Kết nối" />
      <SummaryItem count={data.following} label="Đang theo dõi" />
    </div>
    <div className="p-4 text-linkedin-blue font-semibold hover:bg-gray-100 cursor-pointer">
      Hiển thị thêm
    </div>
    <div className="p-4 border-t border-gray-200">
      <img 
        src="https://placehold.co/300x250/F8F8F8/333333?text=See+who's+hiring+on+LinkedIn" 
        alt="Quảng cáo"
        className="w-full rounded-md"
      />
    </div>
    <footer className="p-4 text-xs text-gray-500">
      <div className="flex flex-wrap gap-x-3 text-[10px] font-semibold text-gray-600">
        <a href="#" className="hover:underline">Giới thiệu</a>
        <a href="#" className="hover:underline">Trợ năng</a>
        <a href="#" className="hover:underline">Trung tâm trợ giúp</a>
        <a href="#" className="hover:underline">Quyền riêng tư và điều khoản</a>
      </div>
      <div className="flex flex-wrap gap-x-3 mt-2 text-[10px] font-semibold text-gray-600">
        <a href="#" className="hover:underline">Lựa chọn quảng cáo</a>
        <a href="#" className="hover:underline">Dịch vụ kinh doanh</a>
        <a href="#" className="hover:underline">Tải ứng dụng LinkedIn</a>
        <a href="#" className="hover:underline">Khác</a>
      </div>
      <p className="mt-2 flex items-center text-gray-500">
        <svg className="w-4 h-4 mr-1 text-linkedin-blue" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5 1.11-2.5 2.48-2.5 2.48 1.119 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.966v16h4.966v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.931v-8.418c0-7.042-8.441-6.79-11.006-3.69z"/></svg>
        LinkedIn Corporation © 2025
      </p>
    </footer>
  </div>
);

const RecommendationCard: React.FC<{ user: Recommendation; onDismiss: (name: string) => void }> = ({ user, onDismiss }) => (
  <div className="relative bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
    <button 
      className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 z-20"
      onClick={() => onDismiss(user.name)}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>

    <div className="w-full h-14 bg-gradient-to-r from-linkedin-blue/30 to-linkedin-blue/10 rounded-t-xl absolute top-0 left-0"></div>

    <img src={user.imgSrc} alt={user.name} className="w-20 h-20 rounded-full object-cover border-2 border-white mt-4 z-10" />
    
    <div className="mt-2 w-full">
      <h3 className="text-base font-semibold text-gray-900 truncate">{user.name}</h3>
      <p className="text-sm text-gray-500 h-10 overflow-hidden line-clamp-2">{user.title}</p>

      {user.type === 'Theo dõi' && (
        <span className="inline-block px-2 py-0.5 mt-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
          Phổ biến trên LinkedIn
        </span>
      )}

      <p className="text-xs text-gray-500 mt-2 mb-4">
        {user.type === 'Kết nối' ? user.connection : user.followers}
      </p>
      
      <button 
        className={`w-full py-1.5 text-sm font-semibold rounded-full border transition-colors 
          ${user.type === 'Kết nối'
            ? 'border-linkedin-blue text-linkedin-blue hover:bg-blue-50'
            : 'border-linkedin-blue bg-linkedin-blue text-white hover:bg-[#004182]'
          }`}
      >
        {user.type === 'Kết nối' ? (
          <>
            <svg className="w-4 h-4 inline-block mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            Kết nối
          </>
        ) : (
          <>
            <svg className="w-4 h-4 inline-block mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3"/></svg>
            Theo dõi
          </>
        )}
      </button>
    </div>
  </div>
);

const RecommendationList: React.FC<{ title: string; recommendations: Recommendation[]; cols?: number; onDismiss: (name: string) => void }> = ({ title, recommendations, cols = 3, onDismiss }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {title === "Phổ biến trên LinkedIn" && (
        <button className="text-linkedin-blue font-semibold hover:bg-blue-50 rounded-md px-3 py-1">
          Hiển thị tất cả
        </button>
      )}
      {title === "Những người bạn có thể biết dựa trên hoạt động gần đây của bạn" && (
        <button className="text-linkedin-blue font-semibold hover:bg-blue-50 rounded-md px-3 py-1">
          Quản lý
        </button>
      )}
    </div>

    <div className={`grid gap-4 ${cols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
      {recommendations.map((user) => (
        <RecommendationCard key={user.name} user={user} onDismiss={onDismiss} />
      ))}
    </div>
  </div>
);

const NetworkPage: React.FC = () => {
  const [allRecommendations, setAllRecommendations] = useState<Recommendation[]>([
    ...initialSampleRecommendations,
    ...initialNewConnections
  ]);

  const handleDismiss = (name: string) => {
    setAllRecommendations(prev => prev.filter(user => user.name !== name));
  };

  const connectionRecommendations = allRecommendations.filter(r => r.type === 'Kết nối');
  const followRecommendations = allRecommendations.filter(r => r.type === 'Theo dõi');

  const newConnections = connectionRecommendations.filter(r =>
    initialNewConnections.some(i => i.name === r.name)
  );

  const popularRecommendations = followRecommendations.filter(r =>
    initialSampleRecommendations.some(i => i.name === r.name && i.type === 'Theo dõi')
  );

  const otherRecommendations = connectionRecommendations.filter(r =>
    !initialNewConnections.some(i => i.name === r.name)
  );

  return (
    <div className="bg-linkedin-bg min-h-screen py-6">
      <main className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <NetworkSummary data={connectionData} />
          </div>

          <div className="lg:col-span-9 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mới 5 đồng nghiệp của bạn kết nối ngay hôm nay</h2>
                <p className="text-sm text-gray-600 mt-1">Nguồn người tuyển dụng lưu ý ý đến mạng lưới mạnh mẽ. Hãy bắt đầu với bạn bè, đồng đội và người quản lý.</p>
              </div>
              <button className="flex items-center bg-linkedin-blue text-white font-semibold py-2 px-4 rounded-md hover:bg-[#004182] transition-colors mt-4 md:mt-0">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                Tìm kiếm những người bạn biết
              </button>
            </div>

            <RecommendationList 
              title="Những người bạn có thể biết dựa trên hoạt động gần đây của bạn"
              recommendations={newConnections}
              cols={4}
              onDismiss={handleDismiss}
            />

            <RecommendationList 
              title="Phổ biến trên LinkedIn"
              recommendations={popularRecommendations}
              cols={3}
              onDismiss={handleDismiss}
            />

            <RecommendationList 
              title="Các đề xuất khác cho bạn"
              recommendations={otherRecommendations}
              cols={3}
              onDismiss={handleDismiss}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NetworkPage;

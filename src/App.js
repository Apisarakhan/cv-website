import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profilePic from './aj.png';  

// --- DATA SECTION (UPDATED) ---

const educationData = [
  { 
    year: "2564", 
    title: "Ph.D. in Computer Science and Information Engineering", 
    place: "National Central University, Taoyuan, Taiwan (R.O.C)",
    desc: "Collage of Electrical Engineering & Computer Science"
  },
  { 
    year: "2555", 
    title: "M.S. (Computer Science)", 
    place: "สถาบันบัณฑิตพัฒนบริหารศาสตร์ (NIDA), ประเทศไทย",
    desc: "หลักสูตรมหาบัณฑิต สาขาวิทยาการคอมพิวเตอร์"
  },
  { 
    year: "2551", 
    title: "B.S. (Computer Science), เกียรตินิยมอันดับหนึ่ง", 
    place: "มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา, ประเทศไทย",
    desc: "หลักสูตรวิทยาการคอมพิวเตอร์"
  }
];

const experienceData = [
  { period: "2552 - ปัจจุบัน", role: "อาจารย์ประจำ", place: "ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ คณะวิทยาศาสตร์ ศรีราชา มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา" },
  { period: "ปัจจุบัน", role: "ประธานหลักสูตรวิทยาการคอมพิวเตอร์", place: "ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ คณะวิทยาศาสตร์" },
  { period: "2564 - ปัจจุบัน", role: "ICDL Trainer Thailand", place: "-" },
  { period: "2563 - 2565", role: "ผู้ช่วยคณบดี ฝ่ายวิเทศสัมพันธ์", place: "คณะวิทยาศาสตร์ ศรีราชา มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา" },
  { period: "2551 - 2552", role: "นักพัฒนาระบบ (System Developer)", place: "Soft Square Group, Thailand" }
];

const researchData = [
  { 
    id: 1, 
    year: "2568 - ปัจจุบัน", 
    title: "Diplodia Cloud App: AI-Based Diplodia Ear Rot Detection", 
    role: "หัวหน้าโครงการ", 
    details: "ร่วมกับ บริษัท Syngenta Seeds (Thailand) Limited" 
  },
  { 
    id: 2, 
    year: "2566 - ปัจจุบัน", 
    title: "การสกัดและระบุข้อมูลจากฉลากยาไทยสำหรับการใช้งานของผู้สูงอายุโดยใช้เทคนิคการเรียนรู้เชิงลึก", 
    role: "หัวหน้าโครงการ", 
    details: "ทุนพัฒนานักวิจัย คณะวิทยาศาสตร์ ศรีราชา ประจำปีงบประมาณ 2566" 
  },
  { 
    id: 3, 
    year: "2565 - ปัจจุบัน", 
    title: "การพัฒนาตัวแบบเพื่อการค้นหาสถานที่ที่น่าสนใจและนำเสนอข้อมูลสำหรับการท่องเที่ยวประเทศไทย", 
    role: "ผู้ร่วมโครงการ", 
    details: "ร่วมกับ คณะวิทยาศาสตร์ ศรีราชา" 
  },
  { 
    id: 4, 
    year: "2565 - 2566", 
    title: "วิจัยและพัฒนาต้นแบบโมบายแอปพลิเคชันการฝึกฝนบอดี้เวทโดยแบบจำลองอัจฉริยะ", 
    role: "หัวหน้าโครงการ", 
    details: "ร่วมกับ บริษัท ลอนช์แพลทฟอร์ม" 
  },
  { 
    id: 5, 
    year: "2565 - 2566", 
    title: "การพัฒนาระบบบันทึกข้อมูลสภาพแวดล้อมในแปลงข้าวเพื่อเตรียมพร้อมรับการเปลี่ยนแปลงของภูมิอากาศโลก", 
    role: "ผู้ร่วมโครงการ", 
    details: "โครงการวิจัยย่อย ร่วมกับ ศูนย์พันธุวิศวกรรมและเทคโนโลยีชีวภาพแห่งชาติ (BIOTEC)" 
  },
  { 
    id: 6, 
    year: "2564 - 2565", 
    title: "การศึกษาทักษะด้านเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) เพื่อเพิ่มประสิทธิภาพการค้นหาเนื้อหาสำหรับภาษาโปรแกรม", 
    role: "ผู้ร่วมโครงการ", 
    details: "ร่วมกับ คณะวิทยาศาสตร์ ศรีราชา" 
  },
  { 
    id: 7, 
    year: "2560 - 2562", 
    title: "An automatic recommendation system for student class study and major/career planning", 
    role: "นักวิจัย", 
    details: "งานวิจัยร่วมระหว่างไต้หวัน-มองโกเลีย, รหัสโครงการ MOST 105-2923-S-008 -001 -MY3" 
  },
  { 
    id: 8, 
    year: "2560 - 2563", 
    title: "Summer Students-Training Program (新南向國際交流)", 
    role: "ผู้ประสานงานโครงการ", 
    details: "ความร่วมมือระหว่างมหาวิทยาลัยไทยและไต้หวัน" 
  }
];

const speakerData = [
  { year: "พ.ค. 2568", title: "พื้นฐาน AI และ Basic CNN, YOLO, Computer Vision", place: "Super AI Season 5 (AI Innovator) ม.เกษตรฯ ศรีราชา ร่วมกับ สมาคม AI แห่งประเทศไทย" },
  { year: "พ.ค. 2568", title: "การสร้างเวิร์กโฟลว์และแอปพลิเคชันอัตโนมัติด้วย Microsoft Automate และ Power Apps", place: "Digital Academy Thailand" },
  { year: "ม.ค. 2568", title: "การเพิ่ม Productivity ในการทำงานด้วย Generative AI (3 รุ่น)", place: "สถาบันวิจัยและพัฒนาอัญมณีและเครื่องประดับแห่งชาติ (GIT)" },
  { year: "2567-2568", title: "Data Analytics Module on Business Intelligence", place: "BOI-STI Upskill Training for Western Digital (Thailand)" },
  { year: "2567", title: "Microsoft 365: Planner, Teams, Forms และ Power Automate (3 รุ่น)", place: "Digital Academy Thailand" },
  { year: "2566", title: "Power BI Reporting and Data Presentation Tools", place: "Office of Basic Education Commission (OBEC)" },
  { year: "2566", title: "NoSQL with MongoDB", place: "Office of Basic Education Commission (OBEC)" },
  { year: "พ.ย. 2566", title: "The Implementation of Deep Learning for Research Based on Real Life Problems", place: "School of Computing, Telkom University" },
  { year: "2565-2566", title: "Smart Chatbot in Line Application (4 รุ่น)", place: "Digital Academy Thailand" },
  { year: "ก.ค. 2565", title: "การใช้เครื่องมือสร้างรายงานและการนำเสนอข้อมูลสารสนเทศ (Data Visualization)", place: "รูปแบบออนไลน์" },
  { year: "มิ.ย. 2565", title: "Web Application with PHP", place: "ร่วมกับเอ็มเวริค์กรุ๊ป กระทรวงพาณิชย์" },
  { year: "ก.พ. 2565", title: "Advanced Data Science and Machine Learning", place: "Digital Academy Thailand" },
  { year: "2565", title: "เครื่องมือสนับสนุนการวิเคราะห์ข้อมูลด้วย AI และ Machine Learning Tools", place: "ร่วมกับเอ็มเวริค์กรุ๊ป กระทรวงพาณิชย์" },
  { year: "2562", title: "ฝึกอบรมเชิงปฏิบัติการการเขียนข้อเสนองานนวัตกรรม", place: "Excise Innovation Awards 2019 กรมสรรพสามิต" },
  { year: "2560-2562", title: "คณะกรรมการการประชุมวิชาการระดับนานาชาติ", place: "Int. Conf. on Ubi-Media Computing" },
  { year: "2556", title: "ผู้ช่วยวิทยากร: พัฒนาเทคโนโลยีสารสนเทศภายใต้แผนแม่บท ICT", place: "กรมปศุสัตว์" }
];

const pubData = [
  { 
    year: "2025", 
    title: "SIFT-Based Depth Estimation for Accurate 3D Reconstruction in Cultural Heritage Preservation", 
    source: "Applied System Innovation", 
    fullCitation: `Porawat Visutsak, Porawat, Xiabi Liu, Chalothon Choothong, and Fuangfar Pensiri. 2025. "SIFT-Based Depth Estimation for Accurate 3D Reconstruction in Cultural Heritage Preservation" Applied System Innovation 8, no. 2: 43. https://doi.org/10.3390/asi8020043, (2025)` 
  },
  { 
    year: "2023", 
    title: "Apply Machine-Learning Model for Clustering Rowing Players", 
    source: "Proceedings of the 2023 12th Int. Conf. on Networks (IEEE)", 
    fullCitation: `Patcharawit Wilaikaew, Watchara Noisriphan, Chien Chang Chen, Jirawan Charoensuk, Somchoke Ruengitinun, Chalothon Chootong, “Apply Machine-Learning Model for Clustering Rowing Players”, Proceedings of the 2023 12th International Conference on Networks, Communication and Computing, pp 218-224, (2023)` 
  },
  { 
    year: "2022", 
    title: "Tech-Talk-Sum: fine-tuning extractive summarization and enhancing BERT text contextualization", 
    source: "Multimedia Tools and Applications", 
    fullCitation: `Chalothon Chootong, Timothy K Shih, “Tech-Talk-Sum: fine-tuning extractive summarization and enhancing BERT text contextualization for technological talk videos”, Multimedia Tools and Applications, pp. 1-18 (2022)` 
  },
  { 
    year: "2022", 
    title: "Cognitive level classification on information communication technology skills for blog", 
    source: "Int. Journal of Electrical & Computer Engineering", 
    fullCitation: `Chalothon Chootong, Jirawan Charoensuk. Cognitive level classification on information communication technology skills for blog. International Journal of Electrical & Computer Engineering (2088-8708). 2022;12(6):6387-6396. doi:10.11591/ijece.v12i6.pp6387-6396, (2022)` 
  },
  { 
    year: "2022", 
    title: "Development and Visualization of PS-Dict: a Programmer Skills Dictionary", 
    source: "ITC-CSCC (IEEE)", 
    fullCitation: `Jirawan Charoensuk, Thaninrat Phansiri, Jessada Abdulroman and Chalothon Chootong, Development and Visualization of PS-Dict: a Programmer Skills Dictionary, 2022 37th International Technical Conference on Circuits/Systems, Computers and Communications (ITC-CSCC), 2022, pp. 383-386, doi: 10.1109/ITC-CSCC55581.2022.9895097, (2022)` 
  },
  { 
    year: "2021", 
    title: "An attention enhanced sentence feature network for subtitle extraction and summarization", 
    source: "Expert System With Applications", 
    fullCitation: `Chalothon Chootong, Timothy K Shih, Ankhtuya Ochirbat, Worapot Sommool, Yung-Yu Zhuang, “An attention enhanced sentence feature network for subtitle extraction and summarization”, Expert System With Applications, 178 (2021)` 
  },
  { 
    year: "2021", 
    title: "Predicting the determinants of online learning adoption during the COVID-19 outbreak", 
    source: "Interactive Technology and Smart Education", 
    fullCitation: `Nattaporn Thongsri, Chalothon Chootong, Orawan Tripak, Piyaporn Piyawanitsatian, Rungtip Saengae, “Predicting the determinants of online learning adoption during the COVID-19 outbreak: a two-staged hybrid SEM-neural network approach”, Interactive Technology and Smart Education, ISSN: 1741-5659, 2021` 
  },
  { 
    year: "2019", 
    title: "LCRec: Learning Content Recommendation (Wiki-based Skill Book)", 
    source: "Journal of Internet Technology", 
    fullCitation: `Chalothon Chootong, Timothy K. Shih, Ankhtuya Ochirbat, Worapot Sommool, WKTM Gunarathne, Carl K .Chang, “LCRec: Learning Content Recommendation (Wiki-based Skill Book)”, Journal of Internet Technology, Vol. 20(6), pp. 1753-1766, 2019.` 
  },
  { 
    year: "2018", 
    title: "Hybrid occupation recommendation for adolescents on interest, profile, and behavior", 
    source: "Telematics and Informatics", 
    fullCitation: `Ankhtuya Ochirbat, Timothy K Shih, Chalothon Chootong, Worapot Sommool, WKTM Gunarathne, Hai-Hui Wang, Zhao-Heng Ma, “Hybrid occupation recommendation for adolescents on interest, profile, and behavior”, Telematics and Informatics, Vol. 35(3), pp. 534-550, 2018.` 
  },
  { 
    year: "2012", 
    title: "Trading Signal Generation Using A Combination of Chart Patterns and Indicators", 
    source: "IJCSI", 
    fullCitation: `Chalothon Chootong, Ohm Sornil, “Trading Signal Generation Using A Combination of Chart Patterns and Indicators”, International Journal of Computer Science Issues (IJCSI), Vol 9(6), pp.202, 2012.` 
  },
  { 
    year: "2019", 
    title: "Automatic Book Generation by using ICT Job-Skills and Computing Curricula", 
    source: "Ubi-Media Computing (IEEE)", 
    fullCitation: `Ankhtuya Ochirbat, Timothy K Shih, Chalothon Chootong, Worapot Sommool, WKTM Gunarathne, “Automatic Book Generation by using ICT Job-Skills and Computing Curricula”, 2019 Twelfth International Conference on Ubi-Media Computing (Ubi-Media), IEEE, pp. 74-78, 2019.` 
  },
  { 
    year: "2019", 
    title: "VA Algorithm for Elderly’s Falling Detection with 2D-Pose-Estimation", 
    source: "Ubi-Media Computing (IEEE)", 
    fullCitation: `Pichayakul Jenpoomjai, Potsawat Wosri, Somchoke Ruengittinun, Chih-Lin Hu, Chalothon Chootong, “VA Algorithm for Elderly’s Falling Detection with 2D-Pose-Estimation”, 2019 Twelfth International Conference on Ubi-Media Computing (Ubi-Media), IEEE, pp. 236-240, 2019.` 
  },
  { 
    year: "2018", 
    title: "Web-Based Learning Object Search Engine Solution Together with Data Visualization", 
    source: "IEEE COMPSAC", 
    fullCitation: `WKTM Gunarathne, Chalothon Chootong, Worapot Sommool, Ankhtuya Ochirbat, Yi-Cheng Chen, Sorel Reisman, Timothy K Shih, “Web-Based Learning Object Search Engine Solution Together with Data Visualization: The Case of MERLOT II”, 2018 IEEE 42nd Annual Computer Software and Applications Conference (COMPSAC), IEEE, pp. 1026-1031, 2018.` 
  },
  { 
    year: "2017", 
    title: "Home care with IoT support: Architecture design and functionality", 
    source: "Ubi-Media Computing", 
    fullCitation: `Chih-Lin Hu, Ssuwei Chen, Liangxing Guo, Chalothon Chootong, Lin Hui, “Home care with IoT support: Architecture design and functionality”, Ubi-media Computing and Workshops (Ubi-Media), 2017 10th International Conference on Ubi-Media Computing, IEEE, 2017.` 
  },
  { 
    year: "2017", 
    title: "Online courses recommendation system based on industry occupation skills requirements", 
    source: "Ubi-Media Computing", 
    fullCitation: `Hai-Hui Wang, Chalothon Chootong, Ankhtuya Ochirbat, Worapot Sommool, WKTM Gunarathn, Timothy K Shih, “Online courses recommendation system based on industry occupation skills requirements”, Ubi-media Computing and Workshops (Ubi-Media), 2017 10th International Conference on Ubi-Media Computing, IEEE, 2017.` 
  },
  { 
    year: "2012", 
    title: "Combining Chart Patterns and Indicators for Identifying Stock Trading Signals", 
    source: "ICSTE", 
    fullCitation: `Chalothon Chootong, Ohm Sornil, “Combining Chart Patterns and Indicators for Identifying Stock Trading Signals”, International Conference on Software Technology and Engineering (ICSTE 2012), ASME Press, 2012.` 
  }
];

// --- COMPONENTS ---

const Background = () => (
  <div className="fixed inset-0 -z-10 bg-white overflow-hidden leading-none">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-sky-50"></div>
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 0.95, 1], opacity: [0.2, 0.35, 0.2], y: [0, -40, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute top-0 -left-40 w-[700px] h-[700px] bg-blue-100/60 rounded-full blur-[130px] mix-blend-multiply pointer-events-none"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute -bottom-60 right-0 w-[800px] h-[800px] bg-indigo-200/30 rounded-full blur-[160px] mix-blend-multiply pointer-events-none"
    />
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-darken pointer-events-none"></div>
  </div>
);

const GlassCard = ({ children, className = "", onClick, isInteractive = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={isInteractive ? { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)" } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    onClick={onClick}
    className={`
      bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm
      ${isInteractive ? 'cursor-pointer hover:border-sky-300' : ''}
      transition-colors duration-300 p-6 ${className}
      relative z-10
    `}
  >
    {children}
  </motion.div>
);

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm relative overflow-hidden group transition-all duration-300
      ${active ? 'text-white shadow-lg shadow-sky-200 scale-105' : 'bg-white/60 text-slate-500 hover:text-sky-600 hover:bg-white'}
    `}
  >
    {active && (
      <motion.div 
        layoutId="activeTabBg"
        className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600"
      />
    )}
    <i className={`${icon} relative z-10 ${active ? 'text-white' : 'text-slate-400 group-hover:text-sky-500'}`}></i>
    <span className="relative z-10 whitespace-nowrap">{label}</span>
  </button>
);

// --- COMPONENT: DETAIL MODAL ---
const DetailModal = ({ item, onClose }) => {
  if (!item) return null;

  // Determine content based on item type (Research or Publication)
  // We use check if 'role' exists to identify Research
  const isResearch = item.role !== undefined;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-start">
           <div>
             <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-full mb-2">
               {item.year}
             </span>
             <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug pr-8">
               {item.title}
             </h3>
           </div>
           <button 
             onClick={onClose}
             className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-red-500 hover:text-white transition-colors"
           >
             <i className="fas fa-times"></i>
           </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
           {isResearch ? (
             <div className="space-y-4">
               <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">สถานะโครงการ / บทบาท</h4>
                  <p className="text-slate-700 font-medium flex items-center gap-2">
                    <i className="fas fa-user-tag text-sky-500"></i> {item.role}
                  </p>
               </div>
               <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-100">
                  <h4 className="text-sm font-bold text-sky-800 mb-2">รายละเอียดโครงการ</h4>
                  <div className="text-slate-600 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: item.details }} />
               </div>
             </div>
           ) : (
             <div className="space-y-4">
               <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">แหล่งที่มา / ตีพิมพ์</h4>
                  <p className="text-slate-700 font-medium italic font-serif text-lg">
                    {item.source}
                  </p>
               </div>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-600 mb-2">Full Citation</h4>
                  <p className="text-slate-600 font-serif leading-relaxed text-sm">
                    {item.fullCitation}
                  </p>
               </div>
             </div>
           )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-sky-600 transition-colors shadow-lg shadow-slate-300/50"
           >
             ปิดหน้าต่าง
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN APP ---

function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedItem, setSelectedItem] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <div className="min-h-screen font-['Sarabun'] text-slate-800 selection:bg-sky-200">
      <Background />

      {/* MODAL POPUP */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-16 pb-8 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          
          {/* Profile Image */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="shrink-0 relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-white border-[6px] border-white shadow-2xl flex items-center justify-center relative z-10 overflow-hidden">
               <img src={profilePic} alt="ผศ.ดร.ชโลธร ชูทอง" className="w-full h-full object-cover object-top" />
            </div>
          </motion.div>

          {/* Profile Text */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center md:text-left space-y-3"
          >
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
               <span className="px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs font-bold tracking-wide border border-sky-100 shadow-sm">
                 KASETSART UNIVERSITY
               </span>
               <span className="px-4 py-1 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 text-indigo-800 rounded-full text-xs font-bold tracking-wide border border-indigo-100 shadow-sm flex items-center gap-1.5">
                 <i className="fas fa-certificate text-indigo-500"></i>
                 Ph.D. Computer Science
               </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              ผศ.ดร.<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">ชโลธร</span> ชูทอง
            </h1>
            
            <div className="text-xl text-slate-600 font-medium">
              อาจารย์ประจำ & ประธานหลักสูตรวิทยาการคอมพิวเตอร์
            </div>
            
            <p className="text-slate-500">
              คณะวิทยาศาสตร์ ศรีราชา มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
               <motion.a 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 href="mailto:chootong.c@ku.th" 
                 className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-sky-600 transition-colors shadow-lg shadow-sky-900/20"
               >
                  <i className="fas fa-envelope"></i> chootong.c@ku.th
               </motion.a>
               <motion.div 
                 whileHover={{ scale: 1.05 }}
                 className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm cursor-default"
               >
                  <i className="fas fa-phone text-sky-500"></i> 097-998-7959
               </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- NAVIGATION --- */}
      <div className="sticky top-0 z-50 py-4 backdrop-blur-md bg-white/70 border-b border-white/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar flex gap-3 md:justify-center p-1">
          <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon="fas fa-user-circle" label="ประวัติ & การศึกษา" />
          <TabButton active={activeTab === 'research'} onClick={() => setActiveTab('research')} icon="fas fa-microchip" label="โครงการวิจัย" />
          <TabButton active={activeTab === 'speaker'} onClick={() => setActiveTab('speaker')} icon="fas fa-microphone-alt" label="วิทยากร" />
          <TabButton active={activeTab === 'publication'} onClick={() => setActiveTab('publication')} icon="fas fa-book-open" label="ผลงานวิชาการ" />
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <main className="max-w-6xl mx-auto px-4 py-10 pb-32 min-h-[60vh] relative z-10">
        <AnimatePresence mode="wait">
        
        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
           <motion.div 
             key="profile"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="grid grid-cols-1 md:grid-cols-2 gap-8"
           >
             <GlassCard className="h-full border-t-4 border-t-sky-500">
                 <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600"><i className="fas fa-graduation-cap"></i></div>
                   การศึกษา
                 </h2>
                 <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100 ml-2">
                   {educationData.map((edu, i) => (
                      <div key={i} className="relative pl-10 group">
                        <div className="absolute left-[11px] top-2 w-3 h-3 bg-white border-2 border-sky-500 rounded-full group-hover:scale-150 group-hover:bg-sky-500 transition-all duration-300 shadow-sm"></div>
                        <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded mb-1 inline-block border border-sky-100">{edu.year}</span>
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-sky-700 transition-colors">{edu.title}</h3>
                        <p className="text-slate-600 text-sm mt-1">{edu.place}</p>
                        <p className="text-xs text-slate-400 mt-1 italic">{edu.desc}</p>
                      </div>
                   ))}
                 </div>
             </GlassCard>

             <GlassCard className="h-full border-t-4 border-t-indigo-400">
                 <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-500"><i className="fas fa-briefcase"></i></div>
                   ประสบการณ์ทำงาน
                 </h2>
                 <div className="space-y-4">
                   {experienceData.map((exp, i) => (
                      <motion.div 
                        whileHover={{ x: 5 }}
                        key={i} 
                        className="p-4 rounded-xl bg-white/50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all hover:shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-slate-800">{exp.role}</h4>
                           <span className="text-xs font-bold bg-white text-slate-500 px-2 py-1 rounded border border-slate-100 shadow-sm">{exp.period}</span>
                        </div>
                        <p className="text-sm text-slate-600">{exp.place}</p>
                      </motion.div>
                   ))}
                 </div>
             </GlassCard>
           </motion.div>
        )}

        {/* TAB 2: RESEARCH */}
        {activeTab === 'research' && (
           <motion.div 
             key="research"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="grid grid-cols-1 md:grid-cols-2 gap-6"
           >
             {researchData.map((item, i) => (
                 <GlassCard 
                   key={i} 
                   isInteractive={true}
                   onClick={() => setSelectedItem(item)}
                   className="relative overflow-hidden group hover:bg-white border-l-4 border-l-transparent hover:border-l-sky-500 flex flex-col h-full"
                 >
                   <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-100 to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>
                   
                   <div className="relative z-10 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded border ${item.year.includes('ปัจจุบัน') ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                           {item.year}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-sky-700 transition-colors leading-snug mb-2">
                          {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-auto flex items-center gap-1">
                         <i className="fas fa-user-tag text-sky-400"></i> {item.role}
                      </p>
                      
                      <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-xs font-bold text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                           ดูรายละเอียด 
                           <i className="fas fa-external-link-alt"></i>
                        </span>
                      </div>
                   </div>
                 </GlassCard>
             ))}
           </motion.div>
        )}

        {/* TAB 3: SPEAKER */}
        {activeTab === 'speaker' && (
           <motion.div 
             key="speaker"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="grid grid-cols-1 md:grid-cols-2 gap-4"
           >
             <div className="md:col-span-2 mb-4 text-center">
                 <h2 className="text-3xl font-bold text-slate-800 inline-block relative">
                   วิทยากรและบริการวิชาการ
                   <div className="absolute bottom-1 left-0 w-full h-3 bg-violet-200/50 -z-10"></div>
                 </h2>
                 <p className="text-slate-500 mt-2">วิทยากรอบรมบรรยายและปฏิบัติการ</p>
             </div>
             {speakerData.map((item, i) => (
                 <GlassCard key={i} className="hover:bg-white hover:shadow-lg hover:shadow-violet-100 transition-all border-l-[6px] border-l-violet-400 group cursor-default">
                   <div className="flex gap-4">
                      <div className="shrink-0 w-14 text-center">
                        <div className="text-lg font-black text-violet-300 group-hover:text-violet-500 transition-colors">
                            {item.year.includes("25") ? item.year.split(' ')[1] || item.year : item.year}
                        </div>
                        <div className="text-[10px] text-slate-400">{item.year.includes(" ") ? item.year.split(' ')[0] : ''}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-relaxed group-hover:text-violet-700 transition-colors">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-2 bg-violet-50 text-violet-700 inline-block px-2 py-1 rounded border border-violet-100">
                           <i className="fas fa-map-marker-alt mr-1"></i> {item.place}
                        </p>
                      </div>
                   </div>
                 </GlassCard>
             ))}
           </motion.div>
        )}

        {/* TAB 4: PUBLICATIONS */}
        {activeTab === 'publication' && (
           <motion.div 
             key="publication"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-4 max-w-4xl mx-auto"
           >
             <div className="text-center mb-8">
                 <h2 className="text-3xl font-bold text-slate-800 inline-block relative">
                   ผลงานทางวิชาการ
                   <div className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/50 -z-10"></div>
                 </h2>
                 <p className="text-slate-500 mt-2">Academic Publications & Proceedings</p>
             </div>
             {pubData.map((pub, i) => (
                 <GlassCard 
                   key={i} 
                   isInteractive={true}
                   onClick={() => setSelectedItem(pub)}
                   className="flex gap-6 items-start group hover:border-blue-300"
                 >
                   <div className="hidden sm:flex flex-col items-center shrink-0 w-16 pt-1 border-r border-slate-100 pr-4">
                      <span className="text-xl font-black text-slate-300 group-hover:text-blue-500 transition-colors">{pub.year}</span>
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="sm:hidden text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded mb-2 inline-block">{pub.year}</span>
                        <i className="fas fa-expand text-slate-300 group-hover:text-blue-400 transition-colors ml-auto"></i>
                      </div>
                      
                      <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-relaxed">
                          {pub.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-2 italic font-serif">
                          {pub.source}
                      </p>
                   </div>
                 </GlassCard>
             ))}
           </motion.div>
        )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center py-10 bg-white/80 border-t border-slate-100 mt-auto backdrop-blur-sm relative z-10">
         <div className="flex justify-center items-center gap-2 mb-2">
            <i className="fas fa-atom text-sky-600"></i>
            <span className="font-bold text-slate-800">Kasetsart University</span>
         </div>
         <p className="text-sm text-slate-500">
           Faculty of Science at Sriracha, Kasetsart University Sriracha Campus
         </p>
         <p className="text-xs text-slate-300 mt-4">&copy; 2025 Asst. Prof. Dr. Chalothon Chootong</p>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CoreBenefits } from './components/CoreBenefits';
import { Services } from './components/Services';
import { SpeedTest } from './components/SpeedTest';
import { FaqSection } from './components/FaqSection';
import { Pricing } from './components/Pricing';
import { CoverageMap } from './components/CoverageMap';
import { ReferralSection } from './components/ReferralSection';
import { SuccessStories } from './components/SuccessStories';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SupportChatWidget } from './components/SupportChatWidget';
import { ClientPortalModal } from './components/ClientPortalModal';
import { SupportTicketModal } from './components/SupportTicketModal';
import { Plan } from './types';
import { X, Wifi } from 'lucide-react';

export default function App() {
  const [selectedPlanForInquiry, setSelectedPlanForInquiry] = useState<Plan | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isSupportTicketModalOpen, setIsSupportTicketModalOpen] = useState(false);
  const [supportTicketTab, setSupportTicketTab] = useState<'fast_login' | 'create' | 'client_portal' | 'admin_portal' | 'client_db' | 'ai_diagnostics' | 'android_app'>('admin_portal');

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlanForInquiry(plan);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenGeneralInquiry = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenFastLogin = () => {
    setSupportTicketTab('fast_login');
    setIsSupportTicketModalOpen(true);
  };

  const handleOpenSupportTicket = () => {
    setSupportTicketTab('create');
    setIsSupportTicketModalOpen(true);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
          {/* App Header */}
          <Header
            onOpenInquiryModal={handleOpenGeneralInquiry}
            onOpenClientPortal={() => setIsClientPortalOpen(true)}
            onOpenSupportTicket={handleOpenSupportTicket}
            onOpenFastLogin={handleOpenFastLogin}
          />

          <main>
            {/* Hero Section */}
            <Hero onOpenInquiryModal={handleOpenGeneralInquiry} />

            {/* Core Benefits - Glassmorphism Cards */}
            <CoreBenefits />

            {/* Services Section */}
            <Services />

            {/* Interactive Broadband Speed Test Utility */}
            <SpeedTest onSelectPlan={handleSelectPlan} onOpenInquiry={handleOpenGeneralInquiry} />

            {/* Frequently Asked Questions Section */}
            <FaqSection />

            {/* Pricing & Packages */}
            <Pricing onSelectPlan={handleSelectPlan} />

            {/* Mithapukur Interactive Coverage Map */}
            <CoverageMap />

            {/* Refer a Neighbor Rewards Section */}
            <ReferralSection />

            {/* Customer Success Stories & Local Testimonials Carousel */}
            <SuccessStories />

            {/* Connection Inquiry Form & Contact Info */}
            <ContactSection
              initialPlan={selectedPlanForInquiry}
              onOpenSupportTicket={() => setIsSupportTicketModalOpen(true)}
            />
          </main>

          {/* Footer */}
          <Footer
            onOpenSupportTicket={handleOpenSupportTicket}
            onOpenClientPortal={() => setIsClientPortalOpen(true)}
          />

          {/* Floating Support Chat Widget */}
          <SupportChatWidget onOpenSupportTicket={() => setIsSupportTicketModalOpen(true)} />

          {/* Delta Client Portal, Excel Database & Marketing Analytics Modal */}
          <ClientPortalModal
            isOpen={isClientPortalOpen}
            onClose={() => setIsClientPortalOpen(false)}
          />

          {/* Dedicated Mithapukur Support Ticket Portal Modal */}
          <SupportTicketModal
            isOpen={isSupportTicketModalOpen}
            onClose={() => setIsSupportTicketModalOpen(false)}
            initialTab={supportTicketTab}
          />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

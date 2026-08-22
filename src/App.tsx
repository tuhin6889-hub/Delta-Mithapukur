import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { TopPromoBanner } from './components/TopPromoBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CoreBenefits } from './components/CoreBenefits';
import { Services } from './components/Services';
import { SpeedTest } from './components/SpeedTest';
import { Pricing } from './components/Pricing';
import { CoverageMap } from './components/CoverageMap';
import { ReferralSection } from './components/ReferralSection';
import { SuccessStories } from './components/SuccessStories';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SupportChatWidget } from './components/SupportChatWidget';
import { ClientPortalModal } from './components/ClientPortalModal';
import { SupportTicketModal } from './components/SupportTicketModal';
import { FaqModal } from './components/FaqModal';
import { AndroidApkDownloadModal } from './components/AndroidApkDownloadModal';
import { UnifiedLoginPage } from './components/UnifiedLoginPage';
import { Plan } from './types';
import { X, Wifi } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'login_portal' | 'public_website'>('login_portal');
  const [authenticatedUser, setAuthenticatedUser] = useState<{ role: string; data?: any } | null>(null);
  const [selectedPlanForInquiry, setSelectedPlanForInquiry] = useState<Plan | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isSupportTicketModalOpen, setIsSupportTicketModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [supportTicketTab, setSupportTicketTab] = useState<'fast_login' | 'create' | 'qr_ticket' | 'client_portal' | 'admin_portal' | 'noc_telemetry' | 'client_db' | 'ai_diagnostics' | 'android_app'>('admin_portal');

  const handleLoginSuccess = (userRole: 'client' | 'staff' | 'manager' | 'guest', userData?: any) => {
    setAuthenticatedUser({ role: userRole, data: userData });
    setCurrentView('public_website');
    
    if (userRole === 'client') {
      setSupportTicketTab('client_portal');
      setIsSupportTicketModalOpen(true);
    } else if (userRole === 'staff') {
      setSupportTicketTab('admin_portal');
      setIsSupportTicketModalOpen(true);
    } else if (userRole === 'manager') {
      setSupportTicketTab('admin_portal');
      setIsSupportTicketModalOpen(true);
    }
  };

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

  const handleOpenSupportTicket = (tab?: 'fast_login' | 'create' | 'qr_ticket' | 'client_portal' | 'admin_portal' | 'noc_telemetry' | 'client_db' | 'ai_diagnostics' | 'android_app') => {
    setSupportTicketTab(tab || 'create');
    setIsSupportTicketModalOpen(true);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        {currentView === 'login_portal' ? (
          <UnifiedLoginPage
            onLoginSuccess={handleLoginSuccess}
            onExplorePublicWebsite={() => setCurrentView('public_website')}
            onOpenSupportTicket={handleOpenSupportTicket}
            onOpenDownloadApk={() => setIsApkModalOpen(true)}
          />
        ) : (
          <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
            {/* Dismissible Top Promotional & Maintenance Alert Banner */}
            <TopPromoBanner
              onClaimOffer={handleOpenGeneralInquiry}
              onViewPricing={() => {
                const pricingEl = document.getElementById('pricing');
                pricingEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSupportTicket={handleOpenSupportTicket}
            />

            {/* App Header */}
            <Header
              onOpenInquiryModal={handleOpenGeneralInquiry}
              onOpenClientPortal={() => setIsClientPortalOpen(true)}
              onOpenSupportTicket={handleOpenSupportTicket}
              onOpenFastLogin={() => setCurrentView('login_portal')}
              onOpenDownloadApk={() => setIsApkModalOpen(true)}
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

            {/* Footer with Quick Navigation FAQ trigger */}
            <Footer
              onOpenSupportTicket={handleOpenSupportTicket}
              onOpenClientPortal={() => setIsClientPortalOpen(true)}
              onOpenFaq={() => setIsFaqModalOpen(true)}
            />

            {/* Floating Support Chat Widget */}
            <SupportChatWidget onOpenSupportTicket={() => setIsSupportTicketModalOpen(true)} />
          </div>
        )}

        {/* Frequently Asked Questions (FAQ) Modal */}
        <FaqModal
          isOpen={isFaqModalOpen}
          onClose={() => setIsFaqModalOpen(false)}
        />

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
          authenticatedUser={authenticatedUser}
          onRoleChange={(role) => setAuthenticatedUser(prev => ({ role, data: prev?.data }))}
        />

        {/* Full Complete Android Client Support & Billing APK Modal */}
        <AndroidApkDownloadModal
          isOpen={isApkModalOpen}
          onClose={() => setIsApkModalOpen(false)}
        />
      </LanguageProvider>
    </ThemeProvider>
  );
}

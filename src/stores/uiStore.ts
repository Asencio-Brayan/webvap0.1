import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  isAgeVerified: boolean;
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  ageBannerDismissed: boolean;
  verifyAge: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  dismissAgeBanner: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      isAgeVerified: false,
      isCartOpen: false,
      isMobileMenuOpen: false,
      ageBannerDismissed: false,

      verifyAge: () => set({ isAgeVerified: true }),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

      toggleMobileMenu: () =>
        set({ isMobileMenuOpen: !get().isMobileMenuOpen }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      dismissAgeBanner: () => set({ ageBannerDismissed: true }),
    }),
    {
      name: 'auravapes-ui',
      partialize: (state) => ({
        isAgeVerified: state.isAgeVerified,
      }),
    }
  )
);

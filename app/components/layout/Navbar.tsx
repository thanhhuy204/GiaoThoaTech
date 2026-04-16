"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { logout, selectAuthUser, selectAuthInitialized } from "@/lib/authSlice";
import "./Navbar.css";
import Link from "next/link";

type NavItem =
  | { label: string; href: string; dropdown?: never }
  | {
      label: string;
      dropdown: { label: string; href: string }[];
      href?: never;
    };

const NAV_ITEMS: NavItem[] = [
  {
    label: "navbar.products",
    dropdown: [
      { label: "navbar.productsDeadboltGo", href: "/products/deadbolt-go" },
      { label: "navbar.productsKeybox3", href: "/products/keybox-3" },
      { label: "navbar.productsPadlock2", href: "/products/padlock-2" },
      {
        label: "navbar.productsCellularDeadbolt",
        href: "/products/cellular-deadbolt",
      },
      { label: "navbar.productsPadlockLite", href: "/products/padlock-lite" },
      { label: "navbar.productsMortiseTouch", href: "/products/mortise-touch" },
      { label: "navbar.productsGateLock", href: "/products/gate-lock" },
    ],
  },
  {
    label: "navbar.solutions",
    dropdown: [
      {
        label: "navbar.solutionsShortTermRental",
        href: "/solutions/short-term-rental",
      },
      {
        label: "navbar.solutionsAccessControl",
        href: "/solutions/access-control",
      },
    ],
  },
  {
    label: "navbar.explore",
    dropdown: [
      { label: "navbar.exploreCaseStudies", href: "/case-studies" },
      { label: "navbar.exploreTechnology", href: "/technology" },
      { label: "navbar.exploreIntegrations", href: "/integrations" },
      { label: "navbar.exploreOverview", href: "/overview" },
      { label: "navbar.exploreContact", href: "/contact" },
    ],
  },
  { label: "navbar.privacyPolicy", href: "/privacy-policy" },
];

function LocaleFlag({
  code,
  width = 24,
  height = 16,
  className = "navbar-lang-flag",
}: {
  code: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const isVi = code === "vi";
  const flagSrc = isVi ? "/images/flags/vi.svg" : "/images/flags/en.svg";
  return (
    <Image
      src={flagSrc}
      alt=""
      width={width}
      height={height}
      className={className}
    />
  );
}

/** Emoji + ảnh cờ — dùng cho nút hiển thị locale hiện tại */
function NavbarLanguageVisual({ locale: currentLocale }: { locale: string }) {
  const emoji = currentLocale === "vi" ? "🇻🇳" : "🇺🇸";
  return (
    <span className="navbar-lang-display" aria-hidden>
      <span className="navbar-lang-emoji">{emoji}</span>
      <LocaleFlag code={currentLocale} />
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const t = useTranslations();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const authInitialized = useAppSelector(selectAuthInitialized);

  const locale = useMemo(() => {
    const first = pathname.split("/").filter(Boolean)[0];
    return first === "vi" ? "vi" : "en";
  }, [pathname]);

  const getNextPathname = (newLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const hasLocalePrefix = segments[0] === "en" || segments[0] === "vi";
    if (hasLocalePrefix) {
      return `/${[newLocale, ...segments.slice(1)].join("/")}`;
    }
    return `/${newLocale}${pathname}`;
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (label: string) => {
    setOpen((prev) => (prev === label ? null : label));
  };

  const handleLanguageToggle = () => {
    const newLocale = locale === "vi" ? "en" : "vi";
    const qs = searchParams.toString();
    const next = getNextPathname(newLocale);
    if (next !== pathname) {
      router.push(`${next}${qs ? `?${qs}` : ""}`);
    }
    setOpen(null);
    setMobile(false);
  };

  const languageToggleAriaLabel =
    locale === "vi"
      ? t("navbar.switchToEnglish")
      : t("navbar.switchToVietnamese");

  async function handleLogout() {
    await fetch("/bff/auth/logout", { method: "POST" });
    dispatch(logout());
    setOpen(null);
    router.push(`/${locale}`);
  }

  return (
    <nav ref={navRef} className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/images/logo/Logo.png"
            alt="MobiSure"
            width={120}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="navbar-nav hidden-mobile">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="navbar-item">
              {item.dropdown ? (
                <>
                  <button
                    className={`navbar-link ${open === item.label ? "active" : ""}`}
                    onClick={() => toggle(item.label)}
                    aria-expanded={open === item.label}
                  >
                    {t(item.label)}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {open === item.label && (
                    <div className="navbar-dropdown">
                      {item.dropdown.map((d) => (
                        <a key={d.label} href={d.href}>
                          {t(d.label)}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a href={item.href} className="navbar-link">
                  {t(item.label)}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="navbar-right hidden-mobile">
          {authInitialized && !authUser && (
            <a
              href={`/${locale}/auth/login`}
              className="navbar-link navbar-btn"
            >
              {t("navbar.login")}
            </a>
          )}
          <Link href="/contact" className="btn-primary navbar-contact">
            {t("navbar.contact")}
          </Link>
          <button
            type="button"
            className="navbar-link navbar-lang-toggle"
            onClick={handleLanguageToggle}
            aria-label={languageToggleAriaLabel}
          >
            <NavbarLanguageVisual locale={locale} />
          </button>
          {/* User icon — chỉ hiện khi đã đăng nhập, luôn ở góc phải cùng */}
          {authUser && (
            <div className="navbar-item">
              <button
                className="navbar-user-btn"
                onClick={() => toggle("user")}
                aria-expanded={open === "user"}
                aria-label={`Tài khoản ${authUser.userName}`}
              >
                <span className="navbar-user-avatar" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
              </button>
              {open === "user" && (
                <div className="navbar-dropdown right navbar-dropdown-user">
                  {/* DropdownUserInfo */}
                  <div className="navbar-user-info">
                    <span
                      className="navbar-user-avatar navbar-user-avatar-lg"
                      aria-hidden="true"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <div className="navbar-user-text">
                      <p className="navbar-user-name">
                        {authUser.fullName || authUser.userName}
                        <span
                          className="navbar-online-dot"
                          aria-label="Online"
                        />
                      </p>
                      <p className="navbar-user-email">{authUser.email}</p>
                    </div>
                  </div>

                  {/* Links section */}
                  <div className="navbar-dropdown-divider" />
                  <div className="navbar-user-actions">
                    <a
                      href={`/${locale}/account`}
                      className="navbar-user-account-link"
                      onClick={() => setOpen(null)}
                    >
                      <span className="navbar-action-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      {t("navbar.account")}
                    </a>
                    <a
                      href={`/${locale}/account/change-password`}
                      className="navbar-user-account-link"
                      onClick={() => setOpen(null)}
                    >
                      <span className="navbar-action-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                      {t("navbar.changePassword")}
                    </a>
                  </div>

                  {/* Cài đặt section */}
                  <div className="navbar-dropdown-divider" />
                  <div className="navbar-settings-section">
                    <p className="navbar-settings-label">
                      {t("navbar.settings")}
                    </p>
                    <button
                      className="navbar-settings-item"
                      onClick={() => setOpen(null)}
                    >
                      <span className="navbar-action-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                      </span>
                      {t("navbar.notifications")}
                    </button>
                    <button
                      className="navbar-settings-item"
                      onClick={() => setOpen(null)}
                    >
                      <span className="navbar-action-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </span>
                      {t("navbar.language")}
                    </button>
                    <button
                      className="navbar-settings-item"
                      onClick={() => setOpen(null)}
                    >
                      <span className="navbar-action-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                        </svg>
                      </span>
                      {t("navbar.preferences")}
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="navbar-dropdown-divider" />
                  <div className="navbar-user-actions">
                    <button
                      className="navbar-user-logout"
                      onClick={handleLogout}
                    >
                      <span className="navbar-action-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                      </span>
                      {t("navbar.logout")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => {
            setMobile(!mobile);
            setMobileOpen(null);
          }}
          className="navbar-burger show-mobile"
          aria-label={mobile ? "Close menu" : "Open menu"}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#374151"
            strokeWidth="2"
          >
            <path
              d={mobile ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div className="navbar-mobile-menu">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="navbar-mobile-item">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setMobileOpen(
                        mobileOpen === item.label ? null : item.label,
                      )
                    }
                    className={`navbar-mobile-btn ${mobileOpen === item.label ? "active" : ""}`}
                  >
                    {t(item.label)}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {mobileOpen === item.label && (
                    <div className="navbar-mobile-submenu">
                      {item.dropdown.map((d) => (
                        <a key={d.label} href={d.href}>
                          {t(d.label)}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a href={item.href} className="navbar-mobile-link">
                  {t(item.label)}
                </a>
              )}
            </div>
          ))}
          <div className="navbar-mobile-actions">
            {authInitialized && !authUser && (
              <a
                href={`/${locale}/auth/login`}
                className="btn-outline navbar-mobile-login"
              >
                {t("navbar.signIn")}
              </a>
            )}
            <Link href="/contact" className="btn-primary navbar-mobile-contact">
              Contact Us
            </Link>
            {authUser && (
              <div className="navbar-mobile-user-row">
                <div className="navbar-mobile-user-info">
                  <span className="navbar-user-avatar" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span className="navbar-mobile-user-name">
                    {authUser.userName}
                  </span>
                </div>
                <a
                  href={`/${locale}/account`}
                  className="navbar-mobile-account-link"
                  onClick={() => setMobile(false)}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {t("navbar.account")}
                </a>
                <button
                  className="navbar-mobile-logout-btn"
                  onClick={handleLogout}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  {t("navbar.logout")}
                </button>
              </div>
            )}
          </div>
          <div className="navbar-mobile-lang">
            <p className="navbar-mobile-lang-title">{t("navbar.language")}</p>
            <button
              type="button"
              className="navbar-lang-toggle navbar-lang-toggle--mobile"
              onClick={handleLanguageToggle}
              aria-label={languageToggleAriaLabel}
            >
              <NavbarLanguageVisual locale={locale} />
              <span className="navbar-mobile-lang-hint" aria-hidden>
                {languageToggleAriaLabel}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

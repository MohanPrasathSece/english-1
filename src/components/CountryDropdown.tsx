import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Country {
  name: string;
  iso: string;
  dialCode: string;
  regex: RegExp;
  example: string;
}

export const countries: Country[] = [
  { name: "Switzerland", iso: "CH", dialCode: "41", regex: /^[1-9]\d{8}$/, example: "791234567" },
  { name: "France", iso: "FR", dialCode: "33", regex: /^[1-9]\d{8}$/, example: "612345678" },
  { name: "Belgium", iso: "BE", dialCode: "32", regex: /^[1-9]\d{8}$/, example: "471234567" },
  { name: "Canada", iso: "CA", dialCode: "1", regex: /^[2-9]\d{9}$/, example: "5141234567" },
  { name: "USA", iso: "US", dialCode: "1", regex: /^[2-9]\d{9}$/, example: "2025550143" },
  { name: "UK", iso: "GB", dialCode: "44", regex: /^7\d{9}$/, example: "7123456789" },
  { name: "Germany", iso: "DE", dialCode: "49", regex: /^[1-9]\d{9,10}$/, example: "1701234567" },
  { name: "Spain", iso: "ES", dialCode: "34", regex: /^[67]\d{8}$/, example: "612345678" },
  { name: "Italy", iso: "IT", dialCode: "39", regex: /^3\d{9}$/, example: "3123456789" },
  { name: "Netherlands", iso: "NL", dialCode: "31", regex: /^6\d{8}$/, example: "612345678" },
  { name: "Sweden", iso: "SE", dialCode: "46", regex: /^[1-9]\d{8}$/, example: "701234567" },
  { name: "Australia", iso: "AU", dialCode: "61", regex: /^4\d{8}$/, example: "412345678" },
  { name: "India", iso: "IN", dialCode: "91", regex: /^[6-9]\d{9}$/, example: "9876543210" },
  { name: "UAE", iso: "AE", dialCode: "971", regex: /^5\d{8}$/, example: "501234567" },
  { name: "Singapore", iso: "SG", dialCode: "65", regex: /^[89]\d{7}$/, example: "81234567" },
  { name: "South Africa", iso: "ZA", dialCode: "27", regex: /^[6-8]\d{8}$/, example: "821234567" },
  { name: "Brazil", iso: "BR", dialCode: "55", regex: /^9\d{9}$/, example: "9123456789" },
  { name: "Mexico", iso: "MX", dialCode: "52", regex: /^[1-9]\d{9}$/, example: "5512345678" },
  { name: "Japan", iso: "JP", dialCode: "81", regex: /^[789]0\d{8}$/, example: "9012345678" },
  { name: "Cyprus", iso: "CY", dialCode: "357", regex: /^9\d{7}$/, example: "99123456" }
];

export function cleanPhoneNumber(phone: string, dialCode: string): string {
  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00" + dialCode)) {
    digits = digits.slice(("00" + dialCode).length);
  } else if (digits.startsWith(dialCode)) {
    digits = digits.slice(dialCode.length);
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return digits;
}

interface CountryDropdownProps {
  selectedCountry: Country;
  onChange: (country: Country) => void;
}

export default function CountryDropdown({ selectedCountry, onChange }: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-lg bg-white/80 hover:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-700">{selectedCountry.iso}</span>
        <span className="text-gray-400 text-xs">+{selectedCountry.dialCode}</span>
        <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-medical-lg z-50 py-1"
            role="listbox"
          >
            {countries.map((country) => (
              <li
                key={country.iso}
                onClick={() => {
                  onChange(country);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 transition-colors ${
                  selectedCountry.iso === country.iso ? "bg-primary/5 font-semibold text-primary" : "text-gray-700"
                }`}
                role="option"
                aria-selected={selectedCountry.iso === country.iso}
              >
                <span className="truncate">{country.name} ({country.iso})</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-gray-400">+{country.dialCode}</span>
                  {selectedCountry.iso === country.iso && <Check size={14} className="text-primary" />}
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

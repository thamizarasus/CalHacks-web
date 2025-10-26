import { useEffect } from "react";
import logo from "../../assets/foodallerguard-logo.svg";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Logo + Tagline */}
        <div className="text-center mb-14">
          <div className="flex justify-center">
            <img src={logo} alt="FoodAllerGuard Logo" className="h-20 w-auto mx-auto mb-6" />
          </div>
          <p className="text-orange-600 font-medium tracking-wide">
            Scan Menus. Eat Safely.
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 my-3">
            About FoodAllerGuard
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make dining safe and worry-free for everyone with food allergies.
            FoodAllerGuard was born from a simple idea: technology should protect people, not just inform them.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-sm p-8 border">
            <div className="bg-orange-100 rounded-2xl w-14 h-14 flex items-center justify-center mb-4">
              <span className="text-orange-600 text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals with food allergies to dine confidently anywhere in the world
              through intelligent, accessible technology that puts safety first.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 border">
            <div className="bg-orange-100 rounded-2xl w-14 h-14 flex items-center justify-center mb-4">
              <span className="text-orange-600 text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A world where food allergies no longer limit social experiences, travel, or dining choices—
              where everyone can enjoy meals with peace of mind.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-orange-50 rounded-3xl px-8 md:px-20 py-14 mt-16 shadow-sm">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">
            Our Story
          </h2>
          <p className="text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
          The concept for FoodAllerGuard began around 2024. We were having lunch at a restaurant when, suddenly, one of our members had an adverse reaction to the item they were eating. After the affected individual received all relevant care, we were able to determine why they had that reaction: the allergens were not clearly listed in the menu. Hence, FoodAllerGuard came into being, a web app (soon to be mobile) that allows users to upload photos of their menus or menu PDFs and learn exactly which allergens  are present in the food that can affect them.
          </p>
        </div>

      </div>
    </div>
  );
}

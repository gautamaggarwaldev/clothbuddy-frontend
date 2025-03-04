/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import avatar from "../assets/avatar.png";
import navImage from "../assets/navImage.png";
import menClothing from "../product category data/Men.ts";
import womenClothing from "../product category data/Women.ts";

const TellUsAbout: React.FC = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    productCategory: "Select",
    storeDescription: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "Store Name...",
  });

  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map(
          (country: any) => country.name.common
        );
        countryNames.sort(); 
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log("Form Data Submitted:", formData);
    setFormData({
      storeName: "",
      productCategory: "Select",
      storeDescription: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "Store Name...",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#fff] to-[#a4c8e1]">
      <header className="flex justify-between items-center px-6 py-4 md:px-12 border-b">
        <div className="font-extrabold text-2xl md:text-[40px] font-sans leading-none">
          ClothBuddy
        </div>
        <div className="flex flex-col items-center">
          <img
            className="w-8 h-8 md:w-12 md:h-12 rounded-full"
            src={avatar}
            alt="User Avatar"
          />
          <div className="text-sm md:text-base font-bold">My Account</div>
        </div>
      </header>

      <div className="relative w-full">
        <img
          src={navImage}
          className="w-full object-cover h-30 md:h-48 lg:h-60"
          alt="Hero"
        />
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">
                Enter your Store Name
              </label>
              <input
                type="text"
                name="storeName"
                placeholder="Store Name..."
                className="w-full p-2 border rounded-md"
                value={formData.storeName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-semibold">
                Select Product Category
              </label>
              <select
                name="productCategory"
                className="w-full p-2 border rounded-md"
                value={formData.productCategory}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <optgroup label="Men's Clothing">
                    {menClothing.map((item: string, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                    ))}
                </optgroup>
                <optgroup label="Women's Clothing">
                    {womenClothing.map((item: string, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                    ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold">
              Enter your Store Description
            </label>
            <textarea
              name="storeDescription"
              placeholder="Store Description..."
              className="w-full p-2 border rounded-md"
              value={formData.storeDescription}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <h3 className="text-lg font-bold">Address</h3>

          <div>
            <label className="block font-semibold">
              Address line 1 (Required)
            </label>
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1..."
              className="w-full p-2 border rounded-md"
              value={formData.addressLine1}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Address line 2</label>
            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2..."
              className="w-full p-2 border rounded-md"
              value={formData.addressLine2}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">City</label>
              <input
                type="text"
                name="city"
                placeholder="City..."
                className="w-full p-2 border rounded-md"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-semibold">State</label>
              <input
                type="text"
                name="state"
                placeholder="State..."
                className="w-full p-2 border rounded-md"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode..."
                className="w-full p-2 border rounded-md"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-semibold">Country</label>
              <select
                name="country"
                className="w-full p-2 border rounded-md"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-bold"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default TellUsAbout;
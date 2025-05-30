//React
import React from "react";

const SkeletonBoard = () => {
  return (
    <div className="flex bg-[#2a2b2f] text-white min-h-screen">
      {/* Navigation Bar */}
      <nav className="w-16 bg-[#1c1d22] p-4 flex flex-col items-center">
      <div className="h-10 w-10 bg-gray-700 rounded-full mb-[75px] mt-7 animate-pulse"></div>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-10 bg-gray-700 rounded-full mb-6 animate-pulse"
          ></div>
        ))}
        <div className="h-10 w-10 bg-gray-700 rounded-full  mt-[300px] animate-pulse"></div>
      </nav>

      {/* Sidebar */}
      <aside className="w-80 bg-[#222327] p-4 flex flex-col">
        {/* Logo */}
        <div className="h-12 bg-gray-600 rounded mb-10"></div>
        {/* Navigation Links */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-9 bg-gray-600 rounded mb-4 animate-pulse"
          ></div>
        ))}
        {/* Footer Section */}
        <div className="mt-auto flex justify-evenly animate-pulse">
          <div className="h-10 w-1/3 bg-gray-600 rounded-full"></div>
          <div className="h-10 w-1/3 bg-gray-600 rounded-full"></div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-600 rounded w-1/3"></div>
          <div className="flex gap-4">
            <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
          </div>
        </header>

        {/* Filter and Buttons */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-10">
          <div className="h-8 bg-gray-600 rounded w-[150px]"></div>
          <div className="h-8 bg-gray-600 rounded w-[150px]"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-8 w-14 bg-gray-600 rounded"></div>
            <div className="h-8 w-14 bg-gray-600 rounded"></div>
            <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
            <div className="h-8 w-32 bg-gray-600 rounded-full"></div>
          </div>
        </div>
        <hr className="border-gray-600 mb-4"/>

        {/* Columns */}
        <div className="flex gap-4">
          {/* Column */}
          {["To do", "In Progress", "completed"].map((_, index) => (
            <div
              key={index}
              className="flex-1 bg-[#2a2b2f] p-4 rounded-lg border border-dashed border-gray-500"
            >
              {/* Column Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-8 bg-gray-600 rounded w-1/3"></div>
                <div className="h-8  bg-gray-600 rounded w-1/3"></div>
              </div>
              {/* Cards */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-600 p-4 rounded-lg mb-4 animate-pulse"
                >
                  {/* Card Title */}
                  <div className="flex justify-between">
                  <div className="h-5 bg-gray-500 rounded w-2/3 mb-4"></div>
                  <div className="flex gap-4">
                  <div className="h-7 w-7 bg-gray-500 rounded-full"></div>
                  <div className="h-7 w-7 bg-gray-500 rounded-full"></div>
                  </div>
                  </div>
                  {/* Card Subtitle */}
                  <div className="h-5 bg-gray-500 rounded w-1/2 mb-4"></div>
                  {/* Progress Bar */}
                  <div className="h-3 bg-gray-500 rounded-full w-full mb-2"></div>
                  {/* Date */}
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-2 flex-row justify-between">
                  <div className="h-6 bg-gray-500 rounded w-1/4"></div>
                  <div className="flex gap-4">
                    <div className="h-7 w-7 bg-gray-500 rounded-full"></div>
                    <div className="h-7 w-7 bg-gray-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SkeletonBoard;

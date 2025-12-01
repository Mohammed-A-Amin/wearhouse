"use client";
import React from "react";

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex gap-2 items-center p-4 bg-white rounded-md shadow">
      <select
        value={filters.category}
        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
        className="px-2 py-1 border rounded"
      >
        <option value="">All Categories</option>
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="outerwear">Outerwear</option>
        <option value="accessories">Accessories</option>
      </select>

      <select
        value={filters.gender}
        onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
        className="px-2 py-1 border rounded bg-white"
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="unisex">Unisex</option>
      </select>

        <select
        value={filters.color}
        onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
        className="px-2 py-1 border rounded bg-white"
      >
        <option value="">All Colors</option>
        <option value="pink">Pink</option>
        <option value="black">Black</option>
        <option value="green">Green</option>
        <option value="white">White</option>
        <option value="gray">Gray</option>
        <option value="yellow">Yellow</option>
      </select>

      <input
        type="number"
        placeholder="min"
        value={filters.priceMin}
        onChange={(e) => setFilters(prev => ({ ...prev, priceMin: Number(e.target.value || 0) }))}
        className="w-20 px-2 py-1 border rounded bg-white"
      />
      <input
        type="number"
        placeholder="max"
        value={filters.priceMax}
        onChange={(e) => setFilters(prev => ({ ...prev, priceMax: Number(e.target.value || 9999) }))}
        className="w-20 px-2 py-1 border rounded bg-white"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { pills } from "../data/pills";
import { Search, Activity, Pill as PillIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PillFinderPage() {
  const [query, setQuery] = useState("");
  const [symptom, setSymptom] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    const filtered = pills.filter(
      (pill) =>
        pill.name.toLowerCase().includes(query.toLowerCase()) ||
        pill.imprint.toLowerCase().includes(query.toLowerCase()) ||
        pill.symptoms.some((s) =>
          s.toLowerCase().includes(symptom.toLowerCase())
        )
    );
    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Find your pill & make sure it’s safe
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Identify pills by imprint, color, shape, or symptoms — or scan with AI.
        </p>

        <div className="max-w-2xl mx-auto flex gap-4 bg-white rounded-xl shadow p-4">
          <div className="flex items-center flex-1 border rounded-lg px-3">
            <PillIcon className="h-5 w-5 text-emerald-500 mr-2" />
            <input
              type="text"
              placeholder="Enter pill name or imprint"
              className="w-full focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center flex-1 border rounded-lg px-3">
            <Activity className="h-5 w-5 text-emerald-500 mr-2" />
            <input
              type="text"
              placeholder="Enter symptoms (e.g., headache, fever)"
              className="w-full focus:outline-none"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
            />
          </div>

          <Button onClick={handleSearch} className="bg-emerald-600 text-white">
            <Search className="h-5 w-5 mr-2" /> Search
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Results</h2>
        {results.length === 0 ? (
          <p className="text-gray-500">No results yet. Try searching above.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {results.map((pill) => (
              <Card
                key={pill.id}
                className="hover:shadow-lg transition border rounded-xl"
              >
                <CardContent className="flex gap-4 p-6">
                  <img
                    src={pill.image}
                    alt={pill.name}
                    className="w-20 h-20 object-contain rounded-md border"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-emerald-700">
                      {pill.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Imprint: {pill.imprint}
                    </p>
                    <p className="text-sm text-gray-600">
                      {pill.color} • {pill.shape}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Symptoms: {pill.symptoms.join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
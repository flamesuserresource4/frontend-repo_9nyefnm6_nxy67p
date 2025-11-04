import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

export default function UploadPanel({ onData }) {
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      onData(Array.isArray(json) ? json : json?.items || json?.data || []);
    } catch (e) {
      alert('Could not parse JSON. Please export a valid Spotify data file.');
    } finally {
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div id="upload" className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h3 className="text-base font-semibold text-white">Upload your Spotify data</h3>
          <p className="mt-1 text-sm text-white/60">
            Drop in a JSON export of your listening history to populate the dashboard.
          </p>
        </div>
        <label className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-violet-500/90 px-4 py-2 text-sm font-medium text-white shadow shadow-violet-500/30 transition hover:bg-violet-400">
          <Upload className="h-4 w-4" />
          Choose JSON file
          <input
            ref={inputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      </div>
    </div>
  );
}
